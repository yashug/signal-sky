import { readFileSync } from "fs"
import { Resend } from "resend"

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

const APP_URL = "https://signalsky.app"
const UNSUB_URL = `${APP_URL}/api/email/unsubscribe?token=sample-unsub-token-12345&type=all`
const resend = new Resend(process.env.RESEND_API_KEY!)

const heading = "Portfolio Heatmap is now live 🗺️"
const bodyText = `We just shipped the Portfolio Heatmap — a visual overview of all your watchlist positions colour-coded by heat level at a glance.\n\nYou can now see across all your signals whether they're breaking out, boiling, simmering, or cooling — without opening each one individually.\n\nWe also turned on Telegram + Email alerts this week. If you haven't connected Telegram yet, you can do it from Settings → Alerts.`
const ctaUrl = `${APP_URL}/scanner`

const paragraphs = bodyText.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
const paragraphsHtml = paragraphs.map(p =>
  `<p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7">${p.replace(/\n/g, "<br>")}</p>`
).join("")
const paragraphsText = paragraphs.join("\n\n")

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,'Times New Roman',serif">
<div style="max-width:520px;margin:0 auto;padding:40px 24px">
  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#111827;font-family:'Segoe UI',Arial,sans-serif;letter-spacing:-.01em">SignalSky</p>
  <hr style="border:none;border-top:2px solid #2563eb;width:32px;margin:0 0 28px;text-align:left">
  <p style="margin:0 0 20px;font-size:17px;font-weight:700;color:#111827;font-family:'Segoe UI',Arial,sans-serif;line-height:1.3">${heading}</p>
  <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7">Hi Yaswanth,</p>
  ${paragraphsHtml}
  <p style="margin:0 0 16px"><a href="${ctaUrl}" style="color:#2563eb;font-size:15px;font-weight:600;text-decoration:underline">Open Scanner →</a></p>
  <p style="margin:24px 0 0;color:#374151;font-size:15px;line-height:1.7">— Yaswanth<br><span style="color:#6b7280;font-size:13px">SignalSky</span></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 16px">
  <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif">
    You're receiving this because you signed up for SignalSky.<br>
    <a href="${UNSUB_URL}" style="color:#9ca3af">Unsubscribe</a> · YG IT Global Solutions, Hyderabad, Telangana 502300, India
  </p>
</div>
</body></html>`

const text = `Hi Yaswanth,\n\n${paragraphsText}\n\nOpen Scanner: ${ctaUrl}\n\n— Yaswanth\nSignalSky\n\n---\nUnsubscribe: ${UNSUB_URL}\nYG IT Global Solutions, Hyderabad, Telangana 502300, India`

const { data, error } = await resend.emails.send({
  from: "Yaswanth from SignalSky <hi@signalsky.app>",
  to: "gosulayaswanth2@gmail.com",
  replyTo: "hi@signalsky.app",
  subject: "Portfolio Heatmap is live on SignalSky",
  html,
  text,
  headers: {
    "List-Unsubscribe": `<${UNSUB_URL}>`,
  },
})

if (error) console.error("❌", JSON.stringify(error))
else console.log("✅ Promo sent:", data?.id)
