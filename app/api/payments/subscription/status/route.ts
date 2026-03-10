import { NextRequest, NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/payments/subscription/status
 * Returns the current user's subscription details for the settings page.
 */
export async function GET(req: NextRequest) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.userId },
      select: {
        billingInterval: true,
        status: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
        paymentSubscriptionId: true,
      },
    })

    if (!subscription) {
      return NextResponse.json({ subscription: null })
    }

    return NextResponse.json({
      subscription: {
        billingInterval: subscription.billingInterval,
        status: subscription.status,
        currentPeriodStart: subscription.currentPeriodStart?.toISOString() ?? null,
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        isAutopay: subscription.billingInterval !== "lifetime" && !!subscription.paymentSubscriptionId,
      },
    })
  } catch (e: any) {
    console.error("[subscription/status] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
