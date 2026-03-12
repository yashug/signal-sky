import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendDigest } from "@/lib/email/send"
import { randomUUID } from "crypto"

/**
 * GET /api/cron/digest
 * Sends daily/weekly signal digest to users who have email digest enabled.
 * Schedule: 0 1 * * * (1:30 AM UTC = 7 AM IST)
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date()
  const isWeekend = today.getDay() === 0 // Sunday

  // Get active signals from today (or last available)
  const signals = await prisma.signal.findMany({
    where: { isActive: true },
    select: {
      symbol: true,
      exchange: true,
      heat: true,
      price: true,
      distancePct: true,
    },
    orderBy: { distancePct: "asc" },
    take: 50,
  })

  // Get users who have digest enabled
  // Daily: send every day
  // Weekly: send only on Sunday
  const digestValues = isWeekend ? ["daily", "weekly"] : ["daily"]
  const users = await prisma.user.findMany({
    where: {
      email: { not: null },
      emailDigest: { in: digestValues },
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
      emailDigest: true,
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
      await sendDigest({
        to: user.email,
        userName: user.name ?? undefined,
        cadence: user.emailDigest === "weekly" ? "weekly" : "daily",
        signals: signals.map((s) => ({
          symbol: s.symbol,
          exchange: s.exchange as "NSE" | "US",
          heat: s.heat as "breakout" | "boiling" | "simmering" | "cooling",
          price: Number(s.price),
          distancePct: Number(s.distancePct),
        })),
        unsubscribeToken: unsubToken,
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/digest] Failed to send to ${user.email}: ${e.message}`)
    }
  }

  return NextResponse.json({ ok: true, sent, errors, signals: signals.length })
}

export const maxDuration = 300
