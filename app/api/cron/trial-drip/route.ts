import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTrialDrip } from "@/lib/email/send"
import { randomUUID } from "crypto"

/**
 * GET /api/cron/trial-drip
 * Sends trial drip emails at Day 1 (4h after signup), Day 3, and Day 6 (1 day before expiry).
 * Schedule: 0 * * * * (hourly)
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()

  // Day 1: users whose trial started 4-28 hours ago (created_at within that window)
  // Since trialEndsAt = createdAt + 7 days, we can compute:
  // trialEndsAt BETWEEN (now + 6 days + 20 hours) AND (now + 7 days)
  const day1WindowStart = new Date(now.getTime() + (6 * 24 + 20) * 60 * 60 * 1000)
  const day1WindowEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  // Day 3: trial is 4-5 days from expiry (7 days total - 3 days elapsed = 4 days remaining)
  const day3WindowStart = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000)
  const day3WindowEnd = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)

  // Day 6: trial ends in 20-28 hours
  const day6WindowStart = new Date(now.getTime() + 20 * 60 * 60 * 1000)
  const day6WindowEnd = new Date(now.getTime() + 28 * 60 * 60 * 1000)

  // Get a top signal for day 1 emails
  const topSignalRow = await prisma.$queryRawUnsafe(`
    SELECT symbol, exchange, heat, price::double precision as price, distance_pct::double precision as distance_pct
    FROM signals
    WHERE is_active = true AND distance_pct BETWEEN -5 AND 5
    ORDER BY distance_pct ASC
    LIMIT 1
  `) as { symbol: string; exchange: string; heat: string; price: number; distance_pct: number }[]

  const topSignal = topSignalRow[0] ? {
    symbol: topSignalRow[0].symbol,
    exchange: topSignalRow[0].exchange as "NSE" | "US",
    heat: topSignalRow[0].heat as "breakout" | "boiling" | "simmering" | "cooling",
    price: topSignalRow[0].price,
    distancePct: topSignalRow[0].distance_pct,
  } : undefined

  // Fetch backtest aggregates for Day 3 email
  const aggregateRow = await prisma.$queryRawUnsafe(`
    SELECT
      AVG(win_rate)::double precision AS win_rate,
      AVG(avg_return)::double precision AS avg_return,
      COUNT(*)::int AS symbol_count
    FROM (
      SELECT DISTINCT ON (symbol) symbol, win_rate, avg_return
      FROM backtests
      ORDER BY symbol, computed_at DESC
    ) latest
  `) as { win_rate: number; avg_return: number; symbol_count: number }[]

  const agg = aggregateRow[0]

  // Find Day 1 users
  const day1Users = await prisma.user.findMany({
    where: {
      tier: "FREE",
      email: { not: null },
      emailMarketing: true,
      trialEndsAt: { gte: day1WindowStart, lt: day1WindowEnd },
    },
    select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
  })

  // Find Day 3 users
  const day3Users = await prisma.user.findMany({
    where: {
      tier: "FREE",
      email: { not: null },
      emailMarketing: true,
      trialEndsAt: { gte: day3WindowStart, lt: day3WindowEnd },
    },
    select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
  })

  // Find Day 6 users
  const day6Users = await prisma.user.findMany({
    where: {
      tier: "FREE",
      email: { not: null },
      emailMarketing: true,
      trialEndsAt: { gte: day6WindowStart, lt: day6WindowEnd },
    },
    select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
  })

  let sent = 0
  let errors = 0

  // Process Day 1
  for (const user of day1Users) {
    if (!user.email) continue

    const alreadySent = await prisma.alertHistory.findFirst({
      where: { userId: user.id, channel: "trial-drip-day1", status: "sent" },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    try {
      await sendTrialDrip({
        to: user.email,
        userName: user.name ?? undefined,
        day: 1,
        topSignal,
        unsubscribeToken: unsubToken,
      })
      await prisma.alertHistory.create({
        data: { userId: user.id, channel: "trial-drip-day1", status: "sent", sentAt: new Date() },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/trial-drip] Day1 failed for ${user.email}: ${e.message}`)
    }
  }

  // Process Day 3 — includes backtest aggregates
  for (const user of day3Users) {
    if (!user.email) continue

    const alreadySent = await prisma.alertHistory.findFirst({
      where: { userId: user.id, channel: "trial-drip-day3", status: "sent" },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    try {
      await sendTrialDrip({
        to: user.email,
        userName: user.name ?? undefined,
        day: 3,
        winRate: agg?.win_rate,
        avgReturn: agg?.avg_return,
        symbolCount: agg?.symbol_count,
        unsubscribeToken: unsubToken,
      })
      await prisma.alertHistory.create({
        data: { userId: user.id, channel: "trial-drip-day3", status: "sent", sentAt: new Date() },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/trial-drip] Day3 failed for ${user.email}: ${e.message}`)
    }
  }

  // Process Day 6 — needs watchlist/journal counts
  for (const user of day6Users) {
    if (!user.email) continue

    const alreadySent = await prisma.alertHistory.findFirst({
      where: { userId: user.id, channel: "trial-drip-day6", status: "sent" },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    const [watchlistCount, journalCount, openTrades] = await Promise.all([
      prisma.watchlistItem.count({ where: { userId: user.id } }),
      prisma.journalTrade.count({ where: { userId: user.id } }),
      prisma.journalTrade.count({ where: { userId: user.id, status: "OPEN" } }),
    ])

    try {
      await sendTrialDrip({
        to: user.email,
        userName: user.name ?? undefined,
        day: 6,
        watchlistCount,
        journalCount,
        openTrades,
        unsubscribeToken: unsubToken,
      })
      await prisma.alertHistory.create({
        data: { userId: user.id, channel: "trial-drip-day6", status: "sent", sentAt: new Date() },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/trial-drip] Day6 failed for ${user.email}: ${e.message}`)
    }
  }

  return NextResponse.json({ ok: true, sent, errors })
}

export const maxDuration = 60
