import { randomUUID } from "crypto"
import { prisma } from "@/lib/prisma"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME ?? "signalsky_bot"

export async function sendTelegramMessage(chatId: string, text: string): Promise<void> {
  if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set")
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Telegram API error ${res.status}: ${body}`)
  }
}

export async function generateVerifyToken(userId: string): Promise<string> {
  // Short unique token, not crypto-secret — just for linking
  const token = randomUUID().replace(/-/g, "").slice(0, 20)
  const expiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  await prisma.user.update({
    where: { id: userId },
    data: {
      telegramVerifyToken: token,
      telegramVerifyTokenExpiry: expiry,
    },
  })

  return token
}

export function getTelegramDeepLink(token: string): string {
  return `https://t.me/${BOT_NAME}?start=${token}`
}

export function formatBundledSignalsMessage(opts: {
  market: "india" | "us"
  signals: Array<{
    symbol: string
    exchange: "NSE" | "US"
    heat: "breakout" | "boiling" | "simmering" | "cooling"
    price: number
    ath: number
    ema220: number
    distancePct: number
  }>
  appUrl?: string
}): string {
  const { market, signals, appUrl } = opts
  const base = appUrl ?? "https://signalsky.app"
  const marketLabel = market === "india" ? "India (NSE)" : "US Markets"
  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

  const HEAT_EMOJI: Record<string, string> = {
    breakout: "🚀", boiling: "🔥", simmering: "🌡️", cooling: "❄️",
  }
  const HEAT_LABEL: Record<string, string> = {
    breakout: "Breakout", boiling: "Boiling", simmering: "Simmering", cooling: "Cooling",
  }

  const lines: string[] = [
    `🔔 <b>${signals.length} new signal${signals.length !== 1 ? "s" : ""} — ${marketLabel}</b>`,
    `<i>${date}</i>`,
    ``,
  ]

  for (const s of signals) {
    const currency = s.exchange === "NSE" ? "₹" : "$"
    const emoji = HEAT_EMOJI[s.heat] ?? "📊"
    const label = HEAT_LABEL[s.heat] ?? s.heat
    const distLabel = s.distancePct <= 0
      ? `${Math.abs(s.distancePct).toFixed(1)}% above ATH`
      : `${s.distancePct.toFixed(1)}% below ATH`
    const symbolClean = s.symbol.replace(".NS", "")
    const url = `${base}/scanner/${s.symbol}`

    lines.push(
      `${emoji} <a href="${url}"><b>${symbolClean}</b></a> · ${label} · ${distLabel}`,
      `Price: <code>${currency}${s.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</code>  EMA220: <code>${currency}${s.ema220.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</code>`,
      ``,
    )
  }

  lines.push(`<a href="${base}/scanner">View all on SignalSky →</a>`)
  return lines.join("\n")
}

export function formatSignalMessage(opts: {
  symbol: string
  exchange: "NSE" | "US"
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  ath: number
  ema200: number
  ema220: number
  distancePct: number
  appUrl?: string
}): string {
  const { symbol, exchange, heat, price, ath, ema200, ema220, distancePct, appUrl } = opts
  const currency = exchange === "NSE" ? "₹" : "$"
  const url = `${appUrl ?? "https://signalsky.app"}/scanner/${symbol}`

  const HEAT_EMOJI: Record<string, string> = {
    breakout: "🚀",
    boiling: "🔥",
    simmering: "🌡️",
    cooling: "❄️",
  }
  const HEAT_LABEL: Record<string, string> = {
    breakout: "Breakout",
    boiling: "Boiling",
    simmering: "Simmering",
    cooling: "Cooling",
  }

  const emoji = HEAT_EMOJI[heat] ?? "📊"
  const label = HEAT_LABEL[heat] ?? heat
  const distLabel = distancePct <= 0
    ? `${Math.abs(distancePct).toFixed(1)}% above ATH`
    : `${distancePct.toFixed(1)}% below ATH`

  return [
    `🚨 <b>New Signal: ${symbol} (${exchange})</b>`,
    `Heat: ${emoji} ${label} — ${distLabel}`,
    `Price: <code>${currency}${price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</code>`,
    `EMA220: <code>${currency}${ema220.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</code>`,
    `Pre-set ATH: <code>${currency}${ath.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</code>`,
    ``,
    `<a href="${url}">View on SignalSky →</a>`,
  ].join("\n")
}
