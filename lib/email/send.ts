import { getResend } from "./resend"
import { render } from "@react-email/components"
import SignalAlertEmail from "./templates/signal-alert"
import SignalAlertsBundleEmail from "./templates/signal-alerts-bundle"
import DigestEmail from "./templates/digest"
import WeeklyReportEmail from "./templates/weekly-report"
import InvoiceEmail from "./templates/invoice"
import TrialReminderEmail from "./templates/trial-reminder"
import WelcomeEmail from "./templates/welcome"
import TrialDay1Email from "./templates/trial-day1"
import TrialDay3Email from "./templates/trial-day3"
import TrialDay6Email from "./templates/trial-day6"
import ReactivationDay0Email from "./templates/reactivation-day0"
import ReactivationDay3Email from "./templates/reactivation-day3"
import ReactivationDay7Email from "./templates/reactivation-day7"

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
  ema220: number
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
      ema220: opts.ema220,
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
    ema220: number
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

export async function sendWeeklyReport(opts: {
  to: string
  userName?: string
  newSignalsCount: number
  totalSignalsCount: number
  topSignals: Array<{
    symbol: string
    exchange: "NSE" | "US"
    heat: "breakout" | "boiling" | "simmering" | "cooling"
    price: number
    distancePct: number
  }>
  strategyWinRate?: number
  strategyAvgReturn?: number
  weekOf: string
  unsubscribeToken: string
}) {
  const resend = getResend()
  const digestUnsub = unsubscribeUrl(opts.unsubscribeToken, "digest")

  const topSignalsWithUrl = opts.topSignals.map((s) => ({
    ...s,
    url: `${APP_URL}/scanner/${s.symbol}`,
  }))

  const html = await render(
    WeeklyReportEmail({
      userName: opts.userName,
      newSignalsCount: opts.newSignalsCount,
      totalSignalsCount: opts.totalSignalsCount,
      topSignals: topSignalsWithUrl,
      strategyWinRate: opts.strategyWinRate,
      strategyAvgReturn: opts.strategyAvgReturn,
      weekOf: opts.weekOf,
      unsubscribeUrl: digestUnsub,
    })
  )

  return resend.emails.send({
    from: FROM_MARKETING,
    to: opts.to,
    replyTo: "support@signalsky.app",
    subject: `📊 Week in Review — ${opts.newSignalsCount} new signals`,
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

export async function sendTrialDrip(opts: {
  to: string
  userName?: string
  day: 1 | 3 | 6
  topSignal?: {
    symbol: string
    exchange: "NSE" | "US"
    heat: "breakout" | "boiling" | "simmering" | "cooling"
    price: number
    distancePct: number
  }
  winRate?: number
  avgReturn?: number
  symbolCount?: number
  watchlistCount?: number
  journalCount?: number
  openTrades?: number
  unsubscribeToken: string
}) {
  const resend = getResend()
  const unsub = unsubscribeUrl(opts.unsubscribeToken, "all")

  let html: string
  let subject: string

  if (opts.day === 1) {
    html = await render(
      TrialDay1Email({
        userName: opts.userName,
        topSignal: opts.topSignal,
        scannerUrl: `${APP_URL}/scanner`,
        unsubscribeUrl: unsub,
      })
    )
    subject = "Here's your first Reset & Reclaim signal to watch"
  } else if (opts.day === 3) {
    html = await render(
      TrialDay3Email({
        userName: opts.userName,
        winRate: opts.winRate,
        avgReturn: opts.avgReturn,
        symbolCount: opts.symbolCount,
        performanceUrl: `${APP_URL}/performance`,
        unsubscribeUrl: unsub,
      })
    )
    subject = `The strategy that's finding ${opts.winRate ? `${Math.round(opts.winRate)}%` : "65%"} win rate setups`
  } else {
    html = await render(
      TrialDay6Email({
        userName: opts.userName,
        watchlistCount: opts.watchlistCount ?? 0,
        journalCount: opts.journalCount ?? 0,
        openTrades: opts.openTrades ?? 0,
        pricingUrl: `${APP_URL}/pricing`,
        unsubscribeUrl: unsub,
      })
    )
    subject = "Last chance: your trial ends tomorrow"
  }

  return resend.emails.send({
    from: FROM_MARKETING,
    to: opts.to,
    subject,
    html,
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
}

export async function sendReactivationEmail(opts: {
  to: string
  userName?: string
  topSignal?: {
    symbol: string
    exchange: "NSE" | "US"
    heat: string
    price: number
    distancePct: number
  }
  unsubscribeToken: string
}) {
  const resend = getResend()
  const unsub = unsubscribeUrl(opts.unsubscribeToken, "all")

  const html = await render(
    ReactivationDay0Email({
      userName: opts.userName,
      topSignal: opts.topSignal,
      pricingUrl: `${APP_URL}/pricing`,
      unsubscribeUrl: unsub,
    })
  )

  return resend.emails.send({
    from: FROM_MARKETING,
    to: opts.to,
    subject: "Your SignalSky trial ended — here's what you missed today",
    html,
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  })
}

export async function sendReactivationDay3(opts: {
  to: string
  userName?: string
  watchlistSignals?: { symbol: string; exchange: "NSE" | "US"; heat: string; distancePct: number }[]
  unsubscribeToken: string
}) {
  const resend = getResend()
  const unsub = unsubscribeUrl(opts.unsubscribeToken, "all")
  const html = await render(
    ReactivationDay3Email({
      userName: opts.userName,
      watchlistSignals: opts.watchlistSignals,
      pricingUrl: `${APP_URL}/pricing`,
      unsubscribeUrl: unsub,
    })
  )
  return resend.emails.send({
    from: FROM_MARKETING,
    to: opts.to,
    subject: "Stocks you were watching have moved",
    html,
    headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  })
}

export async function sendReactivationDay7(opts: {
  to: string
  userName?: string
  unsubscribeToken: string
}) {
  const resend = getResend()
  const unsub = unsubscribeUrl(opts.unsubscribeToken, "all")
  const html = await render(
    ReactivationDay7Email({
      userName: opts.userName,
      pricingUrl: `${APP_URL}/pricing`,
      unsubscribeUrl: unsub,
    })
  )
  return resend.emails.send({
    from: FROM_MARKETING,
    to: opts.to,
    subject: "Still thinking about it? This is our last email.",
    html,
    headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  })
}
