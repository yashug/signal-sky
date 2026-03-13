import { readFileSync } from "fs"
import { Resend } from "resend"
import puppeteer from "puppeteer"
import { render } from "@react-email/components"
import * as React from "react"

const envFile = readFileSync(".env.local", "utf-8")
for (const line of envFile.split("\n")) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) continue
  const idx = trimmed.indexOf("=")
  if (idx < 0) continue
  const key = trimmed.slice(0, idx).trim()
  const val = trimmed.slice(idx + 1).replace(/^"|"$/g, "").replace(/\\n$/, "").trim()
  process.env[key] ??= val
}

const resend = new Resend(process.env.RESEND_API_KEY!)

// Generate PDF
const { renderInvoiceHtml } = await import("../lib/email/invoice-template.js") as any
const html = renderInvoiceHtml({
  invoiceNo: "INV-2026-0312",
  date: "12 Mar 2026",
  userName: "Yaswanth Gosu",
  userEmail: "gosulayaswanth2@gmail.com",
  planName: "SignalSky Pro — Monthly Plan",
  period: "12 Mar 2026 – 11 Apr 2026",
  subtotal: "253.39",
  gstAmount: "45.61",
  total: "299.00",
  currency: "INR",
  transactionId: "PHONEPE-OID-20260312-SAMPLE",
  paymentMethod: "PhonePe UPI · Auto-debit Mandate",
})

const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] })
const page = await browser.newPage()
await page.setViewport({ width: 800, height: 1080 })
await page.setContent(html, { waitUntil: "networkidle0" })
// Measure actual content height so PDF is exactly one page
const contentHeight = await page.evaluate(() => document.documentElement.scrollHeight)
const pdf = await page.pdf({
  width: "800px",
  height: `${contentHeight}px`,
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
})
await browser.close()
console.log(`📄 PDF: ${(pdf.length / 1024).toFixed(1)} KB`)

// Render invoice email template
const { default: InvoiceEmail } = await import("../lib/email/templates/invoice.js") as any
const emailHtml = await render(React.createElement(InvoiceEmail, {
  userName: "Yaswanth",
  userEmail: "gosulayaswanth2@gmail.com",
  planName: "Pro Monthly",
  amount: 299,
  currency: "INR",
  transactionId: "PHONEPE-OID-20260312-SAMPLE",
  date: "12 Mar 2026",
}))

const { data, error } = await resend.emails.send({
  from: "SignalSky <support@signalsky.app>",
  to: "gosulayaswanth2@gmail.com",
  replyTo: "support@signalsky.app",
  subject: "Payment confirmed — Pro Monthly ✓",
  html: emailHtml,
  attachments: [{
    filename: "SignalSky-Invoice-INV-2026-0312.pdf",
    content: Buffer.from(pdf).toString("base64"),
  }],
})

if (error) console.error("❌", JSON.stringify(error))
else console.log("✅ Invoice sent:", data?.id)
