import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getBacktestAggregates } from "@/lib/data/backtests"
import { sendWeeklyReport } from "@/lib/email/send"
import { randomUUID } from "crypto"

/**
 * GET /api/cron/weekly-report
 * Sends a weekly performance report email to users with emailDigest = "weekly".
 * Schedule: 0 3 * * 0 (3 AM UTC Sunday = 8:30 AM IST Sunday)
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date()
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  const weekOf = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  // Signals created this week
  const [newSignals, allActiveSignals, aggregates] = await Promise.all([
    prisma.signal.count({
      where: {
        isActive: true,
        signalDate: { gte: sevenDaysAgo },
      },
    }),
    prisma.signal.findMany({
      where: {
        isActive: true,
        distancePct: { gte: -5, lte: 15 },
      },
      select: {
        symbol: true,
        exchange: true,
        heat: true,
        price: true,
        distancePct: true,
      },
      orderBy: { distancePct: "asc" },
      take: 5,
    }),
    getBacktestAggregates(),
  ])

  // Get users with weekly digest enabled and active access
  const users = await prisma.user.findMany({
    where: {
      email: { not: null },
      emailDigest: "weekly",
      AND: [
        {
          OR: [
            { tier: { in: ["PRO", "INSTITUTIONAL"] } },
            { trialEndsAt: { gt: today } },
          ],
        },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      emailUnsubscribeToken: true,
    },
  })

  let sent = 0
  let errors = 0

  for (const user of users) {
    if (!user.email) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    try {
      await sendWeeklyReport({
        to: user.email,
        userName: user.name ?? undefined,
        newSignalsCount: newSignals,
        totalSignalsCount: allActiveSignals.length,
        topSignals: allActiveSignals.map((s) => ({
          symbol: s.symbol,
          exchange: s.exchange as "NSE" | "US",
          heat: s.heat as "breakout" | "boiling" | "simmering" | "cooling",
          price: Number(s.price),
          distancePct: Number(s.distancePct),
        })),
        strategyWinRate: aggregates?.winRate,
        strategyAvgReturn: aggregates?.avgReturn,
        weekOf,
        unsubscribeToken: unsubToken,
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/weekly-report] Failed to send to ${user.email}: ${e.message}`)
    }
  }

  return NextResponse.json({ ok: true, sent, errors, newSignals, totalActive: allActiveSignals.length })
}

export const maxDuration = 300
