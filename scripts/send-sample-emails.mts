/**
 * Sample email sender script
 * Run: npx tsx scripts/send-sample-emails.mts
 */
import { render } from "@react-email/components"
import { Resend } from "resend"
import puppeteer from "puppeteer"
import * as React from "react"
import { readFileSync } from "fs"

// Load env vars from .env.local
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

const RESEND_API_KEY = process.env.RESEND_API_KEY!
const APP_URL = "https://signalsky.app"
const TO_EMAIL = "gosulayaswanth2@gmail.com"
const UNSUB_TOKEN = "sample-unsub-token-12345"
const UNSUB_URL = `${APP_URL}/api/email/unsubscribe?token=${UNSUB_TOKEN}&type=alerts`

const resend = new Resend(RESEND_API_KEY)

// ─── Sample signals ─────────────────────────────────────────────────────────
const SIGNALS = [
  { symbol: "RELIANCE.NS", exchange: "NSE" as const, heat: "boiling" as const,   price: 2847,   ath: 2882,  ema200: 2650,  distancePct: 1.2  },
  { symbol: "INFY.NS",     exchange: "NSE" as const, heat: "simmering" as const, price: 1721,   ath: 1785,  ema200: 1630,  distancePct: 3.6  },
  { symbol: "HDFCBANK.NS", exchange: "NSE" as const, heat: "breakout" as const,  price: 1892,   ath: 1880,  ema200: 1750,  distancePct: -0.6 },
  { symbol: "TCS.NS",      exchange: "NSE" as const, heat: "boiling" as const,   price: 3540,   ath: 3612,  ema200: 3290,  distancePct: 2.0  },
]

// ─── Generate PDF Invoice via Puppeteer ─────────────────────────────────────
async function generateInvoicePDF(): Promise<Buffer> {
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
  await page.setContent(html, { waitUntil: "networkidle0" })
  await page.setViewport({ width: 800, height: 1080 })
  const pdf = await page.pdf({
    width: "800px",
    height: "1080px",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  })
  await browser.close()
  return Buffer.from(pdf)
}

async function main() {
  console.log("📧 Sending sample emails to", TO_EMAIL, "\n")

  // 1. Bundled signal alert email (all 4 signals in one email)
  console.log("1/2  Sending bundled signal alert email (4 signals)...")
  const { default: SignalAlertsBundleEmail } = await import("../lib/email/templates/signal-alerts-bundle.js") as any
  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

  const signalsWithUrl = SIGNALS.map((s) => ({
    ...s,
    signalUrl: `${APP_URL}/scanner/${s.symbol}`,
  }))

  const alertHtml = await render(
    React.createElement(SignalAlertsBundleEmail, {
      userName: "Yaswanth",
      signals: signalsWithUrl,
      market: "india",
      date,
      unsubscribeUrl: UNSUB_URL,
    })
  )

  const { data: alertData, error: alertErr } = await resend.emails.send({
    from: "SignalSky <support@signalsky.app>",
    to: TO_EMAIL,
    replyTo: "support@signalsky.app",
    subject: `🔔 4 new signals — India (NSE) · ${date}`,
    html: alertHtml,
    headers: {
      "List-Unsubscribe": `<${UNSUB_URL}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
  if (alertErr) console.error("   ❌ Alert error:", alertErr)
  else console.log("   ✅ Bundled alert sent:", alertData?.id)

  // 2. Invoice with PDF
  console.log("\n2/2  Generating invoice PDF and sending...")
  const { default: InvoiceEmail } = await import("../lib/email/templates/invoice.js") as any
  const pdfBuffer = await generateInvoicePDF()
  console.log(`   📄 PDF generated: ${(pdfBuffer.length / 1024).toFixed(1)} KB`)

  const invoiceHtml = await render(
    React.createElement(InvoiceEmail, {
      userName: "Yaswanth",
      userEmail: TO_EMAIL,
      planName: "Pro Monthly",
      amount: 299,
      currency: "INR",
      transactionId: "PHONEPE-OID-20260312-SAMPLE",
      date: "12 Mar 2026",
    })
  )

  const { data: invData, error: invErr } = await resend.emails.send({
    from: "SignalSky <support@signalsky.app>",
    to: TO_EMAIL,
    replyTo: "support@signalsky.app",
    subject: "Payment confirmed — Pro Monthly ✓",
    html: invoiceHtml,
    attachments: [
      {
        filename: "SignalSky-Invoice-INV-2026-0312.pdf",
        content: pdfBuffer.toString("base64"),
      },
    ],
  })
  if (invErr) console.error("   ❌ Invoice error:", invErr)
  else console.log("   ✅ Invoice sent:", invData?.id)

  console.log("\n✅ Done — check", TO_EMAIL)
}

main().catch(console.error)
