import { NextRequest, NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cancelSubscription } from "@/lib/razorpay"

/**
 * POST /api/payments/subscription/cancel
 * Cancels the user's active autopay mandate on PhonePe and marks it to cancel at period end.
 * The user retains access until currentPeriodEnd.
 */
export async function POST(req: NextRequest) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.userId },
    })

    if (!subscription || subscription.status !== "active") {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 })
    }

    if (subscription.billingInterval === "lifetime") {
      return NextResponse.json({ error: "Lifetime subscriptions cannot be cancelled" }, { status: 400 })
    }

    if (subscription.cancelAtPeriodEnd) {
      return NextResponse.json({ error: "Subscription is already set to cancel" }, { status: 400 })
    }

    // Cancel the Razorpay subscription so no future charges occur
    if (subscription.paymentSubscriptionId) {
      try {
        await cancelSubscription(subscription.paymentSubscriptionId)
      } catch (e: any) {
        // Log but continue — still mark as cancelled in our DB
        console.warn("[subscription/cancel] Razorpay cancel failed:", e.message)
      }
    }

    // Mark to cancel at period end (user keeps access until then)
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true },
    })

    console.log(`[subscription/cancel] User ${session.userId} cancelled, access until ${subscription.currentPeriodEnd}`)

    return NextResponse.json({
      success: true,
      accessUntil: subscription.currentPeriodEnd,
    })
  } catch (e: any) {
    console.error("[subscription/cancel] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
