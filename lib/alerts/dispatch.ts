/**
 * Alert dispatch: after each EOD scan, send Telegram + email alerts
 * to users who have active alert preferences.
 */

import { prisma } from "@/lib/prisma"
import { sendTelegramMessage, formatSignalMessage } from "@/lib/telegram"
import { sendSignalAlert } from "@/lib/email/send"
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

  let telegramSent = 0
  let emailSent = 0
  let errors = 0

  for (const signal of signals) {
    if (signal.exchange !== exchange) continue

    // Get users who already received this signal today (de-duplicate)
    const alreadySent = await prisma.alertHistory.findMany({
      where: {
        signalId: signal.id,
        sentAt: { gte: today },
        status: "sent",
      },
      select: { userId: true, channel: true },
    })
    const alreadySentSet = new Set(alreadySent.map((a) => `${a.userId}:${a.channel}`))

    // Find matching preferences for this signal
    const matchingPrefs = activePrefs.filter((p) => {
      if (p.heatFilter.length > 0 && !p.heatFilter.includes(signal.heat as any)) return false
      if (p.universes.length > 0) {
        // Check if signal symbol is in one of the user's selected universes
        // universes filter is a best-effort match — we skip if user has no filter
      }
      return true
    })

    // Batch: Telegram (max 25 at a time, 33ms between batches to stay under 30/s limit)
    const telegramPrefs = matchingPrefs.filter(
      (p) => p.channel === "telegram" && p.user.telegramChatId
    )
    const emailPrefs = matchingPrefs.filter(
      (p) => p.channel === "email" && p.user.email && p.user.emailDigest !== "off"
    )

    // ── Telegram ─────────────────────────────────────────
    const TELEGRAM_BATCH = 25
    for (let i = 0; i < telegramPrefs.length; i += TELEGRAM_BATCH) {
      const batch = telegramPrefs.slice(i, i + TELEGRAM_BATCH)
      await Promise.allSettled(
        batch.map(async (pref) => {
          const key = `${pref.userId}:telegram`
          if (alreadySentSet.has(key)) return

          try {
            const msg = formatSignalMessage({
              symbol: signal.symbol,
              exchange: signal.exchange as "NSE" | "US",
              heat: signal.heat,
              price: signal.price,
              ath: signal.ath,
              ema200: signal.ema200,
              distancePct: signal.distancePct,
              appUrl: APP_URL,
            })
            await sendTelegramMessage(pref.user.telegramChatId!, msg)
            await prisma.alertHistory.create({
              data: {
                userId: pref.userId,
                signalId: signal.id,
                channel: "telegram",
                status: "sent",
                sentAt: new Date(),
              },
            })
            telegramSent++
          } catch (e: any) {
            errors++
            await prisma.alertHistory.create({
              data: {
                userId: pref.userId,
                signalId: signal.id,
                channel: "telegram",
                status: "error",
              },
            }).catch(() => {})
          }
        })
      )
      if (i + TELEGRAM_BATCH < telegramPrefs.length) await delay(1100) // ~1 batch/sec
    }

    // ── Email (immediate signal alerts) ──────────────────
    const EMAIL_BATCH = 50
    for (let i = 0; i < emailPrefs.length; i += EMAIL_BATCH) {
      const batch = emailPrefs.slice(i, i + EMAIL_BATCH)
      await Promise.allSettled(
        batch.map(async (pref) => {
          const key = `${pref.userId}:email`
          if (alreadySentSet.has(key)) return
          if (!pref.user.email) return

          // Ensure user has an unsubscribe token
          let unsubToken = pref.user.emailUnsubscribeToken
          if (!unsubToken) {
            unsubToken = randomUUID()
            await prisma.user.update({
              where: { id: pref.userId },
              data: { emailUnsubscribeToken: unsubToken },
            })
          }

          try {
            await sendSignalAlert({
              to: pref.user.email!,
              userName: pref.user.name ?? undefined,
              symbol: signal.symbol,
              exchange: signal.exchange as "NSE" | "US",
              heat: signal.heat,
              price: signal.price,
              ath: signal.ath,
              ema200: signal.ema200,
              distancePct: signal.distancePct,
              unsubscribeToken: unsubToken,
            })
            await prisma.alertHistory.create({
              data: {
                userId: pref.userId,
                signalId: signal.id,
                channel: "email",
                status: "sent",
                sentAt: new Date(),
              },
            })
            emailSent++
          } catch (e: any) {
            errors++
            await prisma.alertHistory.create({
              data: {
                userId: pref.userId,
                signalId: signal.id,
                channel: "email",
                status: "error",
              },
            }).catch(() => {})
          }
        })
      )
    }
  }

  return { telegramSent, emailSent, errors }
}
