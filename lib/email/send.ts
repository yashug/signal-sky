import { getResend } from "./resend"
import { render } from "@react-email/components"
import SignalAlertEmail from "./templates/signal-alert"
import SignalAlertsBundleEmail from "./templates/signal-alerts-bundle"
import DigestEmail from "./templates/digest"
import InvoiceEmail from "./templates/invoice"
import TrialReminderEmail from "./templates/trial-reminder"
import WelcomeEmail from "./templates/welcome"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"
const FROM_TRANSACTIONAL = "SignalSky <support@signalsky.app>"
const FROM_MARKETING = "SignalSky <hi@signalsky.app>"

function unsubscribeUrl(token: string, type: "alerts" | "digest" | "all" = "alerts") {
  return `${APP_URL}/api/email/unsubscribe?token=${token}&type=${type}`
}

export async function sendSignalAlert(opts: {
  to: string
  userName?: string
  symbol: string
  exchange: "NSE" | "US"
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  ath: number
  ema200: number
  distancePct: number
  unsubscribeToken: string
}) {
  const resend = getResend()
  const signalUrl = `${APP_URL}/scanner/${opts.symbol}`
  const html = await render(
    SignalAlertEmail({
      userName: opts.userName,
      symbol: opts.symbol,
      exchange: opts.exchange,
      heat: opts.heat,
      price: opts.price,
      ath: opts.ath,
      ema200: opts.ema200,
      distancePct: opts.distancePct,
      signalUrl,
      unsubscribeUrl: unsubscribeUrl(opts.unsubscribeToken),
    })
  )

  const unsub = unsubscribeUrl(opts.unsubscribeToken)
  return resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to: opts.to,
    subject: `🔔 New signal: ${opts.symbol} (${opts.exchange})`,
    html,
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
}

export async function sendBundledAlerts(opts: {
  to: string
  userName?: string
  market: "india" | "us"
  signals: Array<{
    symbol: string
    exchange: "NSE" | "US"
    heat: "breakout" | "boiling" | "simmering" | "cooling"
    price: number
    ath: number
    ema200: number
    distancePct: number
  }>
  unsubscribeToken: string
}) {
  const resend = getResend()
  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  const unsub = unsubscribeUrl(opts.unsubscribeToken)
  const count = opts.signals.length
  const marketLabel = opts.market === "india" ? "India (NSE)" : "US Markets"

  const signalsWithUrl = opts.signals.map((s) => ({
    ...s,
    signalUrl: `${APP_URL}/scanner/${s.symbol}`,
  }))

  const html = await render(
    SignalAlertsBundleEmail({
      userName: opts.userName,
      signals: signalsWithUrl,
      market: opts.market,
      date,
      unsubscribeUrl: unsub,
    })
  )

  return resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to: opts.to,
    replyTo: "support@signalsky.app",
    subject: `🔔 ${count} new signal${count !== 1 ? "s" : ""} — ${marketLabel} · ${date}`,
    html,
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
}

export async function sendDigest(opts: {
  to: string
  userName?: string
  cadence: "daily" | "weekly"
  signals: Array<{ symbol: string; exchange: "NSE" | "US"; heat: "breakout" | "boiling" | "simmering" | "cooling"; price: number; distancePct: number }>
  unsubscribeToken: string
}) {
  const resend = getResend()
  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  const digestUnsub = unsubscribeUrl(opts.unsubscribeToken, "digest")

  const signalsWithUrl = opts.signals.map((s) => ({
    ...s,
    url: `${APP_URL}/scanner/${s.symbol}`,
  }))

  const html = await render(
    DigestEmail({
      userName: opts.userName,
      cadence: opts.cadence,
      signals: signalsWithUrl,
      date,
      unsubscribeUrl: digestUnsub,
    })
  )

  const subject = opts.cadence === "weekly"
    ? `📊 Weekly digest — ${opts.signals.length} signals`
    : `📊 Daily digest — ${opts.signals.length} signals (${date})`

  return resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to: opts.to,
    replyTo: "support@signalsky.app",
    subject,
    html,
    headers: {
      "List-Unsubscribe": `<${digestUnsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
}

export async function sendInvoice(opts: {
  to: string
  userName?: string
  planName: string
  amount: number
  transactionId: string
}) {
  const resend = getResend()
  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

  const html = await render(
    InvoiceEmail({
      userName: opts.userName,
      userEmail: opts.to,
      planName: opts.planName,
      amount: opts.amount,
      currency: "INR",
      transactionId: opts.transactionId,
      date,
    })
  )

  return resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to: opts.to,
    subject: `Payment confirmed — ${opts.planName}`,
    html,
  })
}

export async function sendTrialReminder(opts: {
  to: string
  userName?: string
  daysLeft: number
  unsubscribeToken: string
}) {
  const resend = getResend()
  const unsub = unsubscribeUrl(opts.unsubscribeToken, "all")

  const html = await render(
    TrialReminderEmail({
      userName: opts.userName,
      daysLeft: opts.daysLeft,
      pricingUrl: `${APP_URL}/pricing`,
      unsubscribeUrl: unsub,
    })
  )

  return resend.emails.send({
    from: FROM_MARKETING,
    to: opts.to,
    subject: `Your SignalSky trial ends in ${opts.daysLeft} day${opts.daysLeft !== 1 ? "s" : ""}`,
    html,
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
}

export async function sendWelcome(opts: {
  to: string
  userName?: string
  trialDays: number
  unsubscribeToken: string
}) {
  const resend = getResend()
  const unsub = unsubscribeUrl(opts.unsubscribeToken, "all")

  const html = await render(
    WelcomeEmail({
      userName: opts.userName,
      trialDays: opts.trialDays,
      scannerUrl: `${APP_URL}/scanner`,
      unsubscribeUrl: unsub,
    })
  )

  return resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to: opts.to,
    subject: "Welcome to SignalSky 🎯",
    html,
  })
}
