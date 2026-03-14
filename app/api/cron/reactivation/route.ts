import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendReactivationEmail, sendReactivationDay3, sendReactivationDay7 } from "@/lib/email/send"
import { randomUUID } from "crypto"

/**
 * GET /api/cron/reactivation
 * Sends reactivation emails to users whose trial has expired.
 * - Day 0: trial expired in last 24h
 * - Day 3: trial expired 3-4 days ago
 * - Day 7: trial expired 7-8 days ago
 * Schedule: 0 3 * * * (3 AM UTC daily)
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()

  // Day 0: Trial expired in last 24 hours
  const day0Start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const day0End = new Date(now.getTime())

  // Day 3: trial expired 3-4 days ago
  const day3Start = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)
  const day3End = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

  // Day 7: trial expired 7-8 days ago
  const day7Start = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000)
  const day7End = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Get top signal for Day 0 email
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
    heat: topSignalRow[0].heat,
    price: topSignalRow[0].price,
    distancePct: topSignalRow[0].distance_pct,
  } : undefined

  const [day0Users, day3Users, day7Users] = await Promise.all([
    prisma.user.findMany({
      where: {
        tier: "FREE",
        email: { not: null },
        emailMarketing: true,
        trialEndsAt: { gte: day0Start, lt: day0End },
      },
      select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
    }),
    prisma.user.findMany({
      where: {
        tier: "FREE",
        email: { not: null },
        emailMarketing: true,
        trialEndsAt: { gte: day3Start, lt: day3End },
      },
      select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
    }),
    prisma.user.findMany({
      where: {
        tier: "FREE",
        email: { not: null },
        emailMarketing: true,
        trialEndsAt: { gte: day7Start, lt: day7End },
      },
      select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
    }),
  ])

  let sent = 0
  let errors = 0

  // Process Day 0
  for (const user of day0Users) {
    if (!user.email) continue

    const alreadySent = await prisma.alertHistory.findFirst({
      where: { userId: user.id, channel: "reactivation-day0", status: "sent" },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    try {
      await sendReactivationEmail({
        to: user.email,
        userName: user.name ?? undefined,
        topSignal,
        unsubscribeToken: unsubToken,
      })
      await prisma.alertHistory.create({
        data: { userId: user.id, channel: "reactivation-day0", status: "sent", sentAt: new Date() },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/reactivation] Day0 failed for ${user.email}: ${e.message}`)
    }
  }

  // Process Day 3 — include watchlist signals
  for (const user of day3Users) {
    if (!user.email) continue

    const alreadySent = await prisma.alertHistory.findFirst({
      where: { userId: user.id, channel: "reactivation-day3", status: "sent" },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    const watchlistItems = await prisma.watchlistItem.findMany({
      where: { userId: user.id },
      select: { symbol: true, exchange: true },
      take: 5,
    })

    const symbols = watchlistItems.map((w) => w.symbol)

    let watchlistSignals: { symbol: string; exchange: "NSE" | "US"; heat: string; distancePct: number }[] = []
    if (symbols.length > 0) {
      const signalRows = await prisma.$queryRawUnsafe(`
        SELECT symbol, exchange, heat, distance_pct::double precision as distance_pct
        FROM signals
        WHERE is_active = true AND symbol = ANY($1::text[])
        ORDER BY distance_pct ASC
      `, symbols) as { symbol: string; exchange: string; heat: string; distance_pct: number }[]

      watchlistSignals = signalRows.map((s) => ({
        symbol: s.symbol,
        exchange: s.exchange as "NSE" | "US",
        heat: s.heat,
        distancePct: s.distance_pct,
      }))
    }

    try {
      await sendReactivationDay3({
        to: user.email,
        userName: user.name ?? undefined,
        watchlistSignals: watchlistSignals.length > 0 ? watchlistSignals : undefined,
        unsubscribeToken: unsubToken,
      })
      await prisma.alertHistory.create({
        data: { userId: user.id, channel: "reactivation-day3", status: "sent", sentAt: new Date() },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/reactivation] Day3 failed for ${user.email}: ${e.message}`)
    }
  }

  // Process Day 7
  for (const user of day7Users) {
    if (!user.email) continue

    const alreadySent = await prisma.alertHistory.findFirst({
      where: { userId: user.id, channel: "reactivation-day7", status: "sent" },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    try {
      await sendReactivationDay7({
        to: user.email,
        userName: user.name ?? undefined,
        unsubscribeToken: unsubToken,
      })
      await prisma.alertHistory.create({
        data: { userId: user.id, channel: "reactivation-day7", status: "sent", sentAt: new Date() },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/reactivation] Day7 failed for ${user.email}: ${e.message}`)
    }
  }

  return NextResponse.json({ ok: true, sent, errors })
}

export const maxDuration = 60
