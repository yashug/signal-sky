import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTrialReminder } from "@/lib/email/send"
import { randomUUID } from "crypto"

/**
 * GET /api/cron/trial-reminder
 * Sends a trial expiry reminder email to users whose trial ends in ~2 days.
 * Schedule: 0 2 * * * (2:00 AM UTC = 7:30 AM IST)
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Find users whose trial ends in 2–3 days (window to avoid duplicate sends)
  const now = new Date()
  const windowStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
  const windowEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

  const users = await prisma.user.findMany({
    where: {
      tier: "FREE",
      trialEndsAt: {
        gte: windowStart,
        lt: windowEnd,
      },
      email: { not: null },
      emailMarketing: true,
    },
    select: {
      id: true,
      email: true,
      name: true,
      trialEndsAt: true,
      emailUnsubscribeToken: true,
    },
  })

  let sent = 0
  let errors = 0

  for (const user of users) {
    if (!user.email || !user.trialEndsAt) continue

    // Check if we already sent a trial reminder to this user (AlertHistory)
    const alreadySent = await prisma.alertHistory.findFirst({
      where: {
        userId: user.id,
        channel: "trial-reminder",
        status: "sent",
      },
    })
    if (alreadySent) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    const daysLeft = Math.max(1, Math.ceil((new Date(user.trialEndsAt).getTime() - now.getTime()) / (24 * 60 * 60 * 1000)))

    try {
      await sendTrialReminder({
        to: user.email,
        userName: user.name ?? undefined,
        daysLeft,
        unsubscribeToken: unsubToken,
      })

      // Log so we don't re-send
      await prisma.alertHistory.create({
        data: {
          userId: user.id,
          channel: "trial-reminder",
          status: "sent",
          sentAt: new Date(),
        },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[cron/trial-reminder] Failed to send to ${user.email}: ${e.message}`)
    }
  }

  return NextResponse.json({ ok: true, sent, errors })
}

export const maxDuration = 60
