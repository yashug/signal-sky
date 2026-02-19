import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { LIFETIME_DEAL } from "@/lib/plans"

/**
 * POST /api/payments/webhook
 * PhonePe server-to-server webhook callback.
 * Handles checkout.order.completed and checkout.order.failed events.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const event = body.type ?? body.event
    const payload = body.payload ?? body

    console.log(`[payments/webhook] Event: ${event}`, JSON.stringify(payload).slice(0, 200))

    if (event === "checkout.order.completed") {
      const merchantOrderId = payload.merchantOrderId ?? payload.orderId
      if (!merchantOrderId) {
        console.error("[payments/webhook] Missing merchantOrderId")
        return NextResponse.json({ status: "error" }, { status: 400 })
      }

      // Find subscription by order ID
      const subscription = await prisma.subscription.findFirst({
        where: { paymentOrderId: merchantOrderId },
      })

      if (!subscription) {
        console.error(`[payments/webhook] No subscription for order ${merchantOrderId}`)
        return NextResponse.json({ status: "not_found" }, { status: 404 })
      }

      if (subscription.status === "active") {
        // Already activated (e.g., by callback redirect)
        return NextResponse.json({ status: "already_active" })
      }

      const isLifetime = subscription.billingInterval === "lifetime"
      const now = new Date()

      // Activate subscription
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

      // Upgrade user
      await prisma.user.update({
        where: { id: subscription.userId },
        data: { tier: "PRO" },
      })

      // Lifetime deal counter
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

      console.log(`[payments/webhook] Activated subscription for user ${subscription.userId}`)
    }

    if (event === "checkout.order.failed") {
      const merchantOrderId = payload.merchantOrderId ?? payload.orderId
      console.log(`[payments/webhook] Payment failed for order ${merchantOrderId}`)

      if (merchantOrderId) {
        await prisma.subscription.updateMany({
          where: { paymentOrderId: merchantOrderId },
          data: { status: "failed" },
        })
      }
    }

    return NextResponse.json({ status: "ok" })
  } catch (e: any) {
    console.error("[payments/webhook] Error:", e.message)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}
