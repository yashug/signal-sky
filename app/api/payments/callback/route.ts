import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getOrderStatus } from "@/lib/phonepe"
import { LIFETIME_DEAL } from "@/lib/plans"

/**
 * GET /api/payments/callback?orderId=...
 * PhonePe redirects the user here after payment.
 * Verifies payment status and activates the subscription.
 */
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  if (!orderId) {
    return NextResponse.redirect(`${appUrl}/pricing?error=missing_order`)
  }

  try {
    // Check payment status with PhonePe
    const status = await getOrderStatus(orderId)

    if (status.state !== "COMPLETED") {
      console.log(`[payments/callback] Order ${orderId} state: ${status.state}`)
      return NextResponse.redirect(`${appUrl}/pricing?error=payment_failed`)
    }

    // Find the subscription record we created during checkout
    const subscription = await prisma.subscription.findFirst({
      where: { paymentOrderId: orderId },
      include: { user: true },
    })

    if (!subscription) {
      console.error(`[payments/callback] No subscription found for order ${orderId}`)
      return NextResponse.redirect(`${appUrl}/pricing?error=order_not_found`)
    }

    const isLifetime = subscription.billingInterval === "lifetime"
    const now = new Date()

    // Activate the subscription
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "active",
        currentPeriodStart: now,
        currentPeriodEnd: isLifetime
          ? new Date("2099-12-31")
          : subscription.billingInterval === "yearly"
            ? new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
            : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      },
    })

    // Upgrade user to PRO
    await prisma.user.update({
      where: { id: subscription.userId },
      data: { tier: "PRO" },
    })

    // Increment lifetime deal counter if applicable
    if (isLifetime) {
      try {
        await prisma.lifetimeDeal.updateMany({
          where: { sold: { lt: LIFETIME_DEAL.cap } },
          data: { sold: { increment: 1 } },
        })
      } catch {
        // Non-critical
      }
    }

    console.log(`[payments/callback] Activated ${subscription.billingInterval} subscription for user ${subscription.userId}`)
    return NextResponse.redirect(`${appUrl}/scanner?payment=success`)
  } catch (e: any) {
    console.error("[payments/callback] Error:", e.message)
    return NextResponse.redirect(`${appUrl}/pricing?error=verification_failed`)
  }
}
