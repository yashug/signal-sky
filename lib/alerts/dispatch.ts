/**
 * Alert dispatch: after each EOD scan, send Telegram + email alerts
 * to users who have active alert preferences.
 */

import { prisma } from "@/lib/prisma"
import { sendTelegramMessage, formatBundledSignalsMessage } from "@/lib/telegram"
import { sendBundledAlerts } from "@/lib/email/send"
import { randomUUID } from "crypto"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"

type SignalData = {
  id: string
  symbol: string
  exchange: string
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  ath: number
  ema200: number
  ema220: number
  distancePct: number
}

// Delay helper for rate limiting
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function dispatchAlerts(
  market: "india" | "us",
  signals: SignalData[]
): Promise<{ telegramSent: number; emailSent: number; errors: number }> {
  if (signals.length === 0) return { telegramSent: 0, emailSent: 0, errors: 0 }

  const exchange = market === "india" ? "NSE" : "US"
  const today = new Date(new Date().toISOString().split("T")[0])

  // Load active alert preferences for this channel
  const preferences = await prisma.alertPreference.findMany({
    where: { isActive: true },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          telegramChatId: true,
          emailDigest: true,
          emailMarketing: true,
          emailUnsubscribeToken: true,
          tier: true,
          trialEndsAt: true,
        },
      },
    },
  })

  // Only PRO users or active trial users get alerts
  const activePrefs = preferences.filter((p) => {
    const user = p.user
    if (user.tier === "PRO" || user.tier === "INSTITUTIONAL") return true
    if (user.trialEndsAt && new Date(user.trialEndsAt) > new Date()) return true
    return false
  })

  // Filter signals to this market's exchange
  const marketSignals = signals.filter((s) => s.exchange === exchange)
  if (marketSignals.length === 0) return { telegramSent: 0, emailSent: 0, errors: 0 }

  // Already-sent lookup for all signals × users today
  const alreadySentRows = await prisma.alertHistory.findMany({
    where: {
      signalId: { in: marketSignals.map((s) => s.id) },
      sentAt: { gte: today },
      status: "sent",
    },
    select: { userId: true, signalId: true, channel: true },
  })
  const alreadySentSet = new Set(alreadySentRows.map((a) => `${a.userId}:${a.signalId}:${a.channel}`))

  let telegramSent = 0
  let emailSent = 0
  let errors = 0

  // ── Telegram: one bundled message per user with all their matching signals ──
  const telegramUserMap = new Map<string, { pref: (typeof activePrefs)[0]; signals: typeof marketSignals }>()

  for (const signal of marketSignals) {
    const telegramPrefs = activePrefs.filter((p) => {
      if (p.channel !== "telegram" || !p.user.telegramChatId) return false
      if (p.heatFilter.length > 0 && !p.heatFilter.includes(signal.heat as any)) return false
      const key = `${p.userId}:${signal.id}:telegram`
      if (alreadySentSet.has(key)) return false
      return true
    })
    for (const pref of telegramPrefs) {
      if (!telegramUserMap.has(pref.userId)) {
        telegramUserMap.set(pref.userId, { pref, signals: [] })
      }
      telegramUserMap.get(pref.userId)!.signals.push(signal)
    }
  }

  const TELEGRAM_BATCH = 25
  const telegramEntries = Array.from(telegramUserMap.entries())
  for (let i = 0; i < telegramEntries.length; i += TELEGRAM_BATCH) {
    const batch = telegramEntries.slice(i, i + TELEGRAM_BATCH)
    await Promise.allSettled(
      batch.map(async ([userId, { pref, signals: userSignals }]) => {
        try {
          const msg = formatBundledSignalsMessage({
            market,
            signals: userSignals.map((s) => ({
              symbol: s.symbol,
              exchange: s.exchange as "NSE" | "US",
              heat: s.heat,
              price: s.price,
              ath: s.ath,
              ema220: s.ema220,
              distancePct: s.distancePct,
            })),
            appUrl: APP_URL,
          })
          await sendTelegramMessage(pref.user.telegramChatId!, msg)
          await prisma.alertHistory.createMany({
            data: userSignals.map((s) => ({
              userId,
              signalId: s.id,
              channel: "telegram",
              status: "sent",
              sentAt: new Date(),
            })),
            skipDuplicates: true,
          })
          telegramSent++
        } catch {
          errors++
          await prisma.alertHistory.createMany({
            data: userSignals.map((s) => ({
              userId,
              signalId: s.id,
              channel: "telegram",
              status: "error",
            })),
            skipDuplicates: true,
          }).catch(() => {})
        }
      })
    )
    if (i + TELEGRAM_BATCH < telegramEntries.length) await delay(1100)
  }

  // ── Email: ONE bundled email per user with ALL their matching new signals ──
  // Build a map: userId → signals they should receive
  const userSignalMap = new Map<string, { pref: (typeof activePrefs)[0]; signals: typeof marketSignals }>()

  for (const signal of marketSignals) {
    const emailPrefs = activePrefs.filter((p) => {
      if (p.channel !== "email" || !p.user.email || p.user.emailDigest === "off") return false
      if (p.heatFilter.length > 0 && !p.heatFilter.includes(signal.heat as any)) return false
      const key = `${p.userId}:${signal.id}:email`
      if (alreadySentSet.has(key)) return false
      return true
    })
    for (const pref of emailPrefs) {
      if (!userSignalMap.has(pref.userId)) {
        userSignalMap.set(pref.userId, { pref, signals: [] })
      }
      userSignalMap.get(pref.userId)!.signals.push(signal)
    }
  }

  // Send one bundled email per user
  const EMAIL_BATCH = 50
  const userEntries = Array.from(userSignalMap.entries())
  for (let i = 0; i < userEntries.length; i += EMAIL_BATCH) {
    const batch = userEntries.slice(i, i + EMAIL_BATCH)
    await Promise.allSettled(
      batch.map(async ([userId, { pref, signals: userSignals }]) => {
        if (!pref.user.email) return

        // Ensure unsubscribe token
        let unsubToken = pref.user.emailUnsubscribeToken
        if (!unsubToken) {
          unsubToken = randomUUID()
          await prisma.user.update({ where: { id: userId }, data: { emailUnsubscribeToken: unsubToken } })
        }

        try {
          await sendBundledAlerts({
            to: pref.user.email!,
            userName: pref.user.name ?? undefined,
            market,
            signals: userSignals.map((s) => ({
              symbol: s.symbol,
              exchange: s.exchange as "NSE" | "US",
              heat: s.heat,
              price: s.price,
              ath: s.ath,
              ema200: s.ema200,
              ema220: s.ema220,
              distancePct: s.distancePct,
            })),
            unsubscribeToken: unsubToken,
          })
          // Log history for each signal in this bundle
          await prisma.alertHistory.createMany({
            data: userSignals.map((s) => ({
              userId,
              signalId: s.id,
              channel: "email",
              status: "sent",
              sentAt: new Date(),
            })),
            skipDuplicates: true,
          })
          emailSent++
        } catch {
          errors++
          await prisma.alertHistory.createMany({
            data: userSignals.map((s) => ({
              userId,
              signalId: s.id,
              channel: "email",
              status: "error",
            })),
            skipDuplicates: true,
          }).catch(() => {})
        }
      })
    )
  }

  return { telegramSent, emailSent, errors }
}
