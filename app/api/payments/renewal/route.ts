import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { notifyRedemption } from "@/lib/phonepe"
import { PRO_PLAN } from "@/lib/plans"

/**
 * POST /api/payments/renewal
 * Admin / cron endpoint — triggers recurring charge notifications for subscriptions
 * that are due (currentPeriodEnd within the next 24 hours or already past).
 *
 * PhonePe's autoDebit:true handles the actual debit after notification.
 * The webhook subscription.redemption.order.completed extends the period.
 *
 * Trigger daily via Vercel cron or external scheduler.
 */
export async function POST(req: NextRequest) {
  // Allow either admin auth or a shared cron secret
  const cronSecret = req.headers.get("x-cron-secret")
  const validCronSecret = process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET

  if (!validCronSecret) {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  const now = new Date()
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000)

  try {
    // Find active recurring subscriptions due within 24 hours
    const dueSubscriptions = await prisma.subscription.findMany({
      where: {
        status: "active",
        billingInterval: { in: ["monthly", "yearly"] },
        cancelAtPeriodEnd: false,
        paymentSubscriptionId: { not: null },
        currentPeriodEnd: { lte: in24h },
      },
    })

    const results: { userId: string; result: string }[] = []

    for (const sub of dueSubscriptions) {
      try {
        const amountPaisa = PRO_PLAN.price[sub.billingInterval as "monthly" | "yearly"] * 100
        const renewalOrderId = `SS_REN_${sub.userId.slice(0, 8)}_${Date.now()}`

        await notifyRedemption({
          merchantOrderId: renewalOrderId,
          merchantSubscriptionId: sub.paymentSubscriptionId!,
          amountPaisa,
        })

        results.push({ userId: sub.userId, result: "notified" })
        console.log(`[renewal] Notified redemption for user ${sub.userId}`)
      } catch (e: any) {
        results.push({ userId: sub.userId, result: `error: ${e.message}` })
        console.error(`[renewal] Failed for user ${sub.userId}:`, e.message)
      }
    }

    return NextResponse.json({
      success: true,
      processed: dueSubscriptions.length,
      results,
    })
  } catch (e: any) {
    console.error("[renewal] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
