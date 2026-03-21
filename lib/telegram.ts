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
