import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { LIFETIME_DEAL } from "@/lib/plans"

/**
 * POST /api/payments/webhook
 * PhonePe server-to-server webhook for both one-time and autopay events.
 *
 * One-time events:
 *   checkout.order.completed / checkout.order.failed
 *
 * Autopay events:
 *   subscription.setup.order.completed    → mandate activated, first payment done
 *   subscription.setup.order.failed       → mandate setup failed
 *   subscription.redemption.order.completed → recurring charge succeeded, extend period
 *   subscription.redemption.order.failed  → recurring charge failed
 *   subscription.cancelled                → user/merchant cancelled mandate
 *   subscription.revoked                  → bank/UPI revoked mandate
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // PhonePe uses "event" field (not deprecated "type")
    const event: string = body.event ?? body.type ?? ""
    const payload = body.payload ?? body

    console.log(`[payments/webhook] Event: ${event}`, JSON.stringify(payload).slice(0, 300))

    // ── One-time checkout ──────────────────────────────────────
    if (event === "checkout.order.completed") {
      await handleOrderCompleted(payload)
    }

    if (event === "checkout.order.failed") {
      await handleOrderFailed(payload)
    }

    // ── Subscription setup ─────────────────────────────────────
    if (event === "subscription.setup.order.completed") {
      await handleSubscriptionSetupCompleted(payload)
    }

    if (event === "subscription.setup.order.failed") {
      const merchantOrderId = payload.merchantOrderId ?? payload.orderId
      if (merchantOrderId) {
        await prisma.subscription.updateMany({
          where: { paymentOrderId: merchantOrderId, status: "pending" },
          data: { status: "failed" },
        })
      }
    }

    // ── Recurring redemption ───────────────────────────────────
    if (event === "subscription.redemption.order.completed") {
      await handleRedemptionCompleted(payload)
    }

    if (event === "subscription.redemption.order.failed") {
      // Log failure; user still has access until period end
      const merchantSubscriptionId = payload.merchantSubscriptionId
      console.warn(`[payments/webhook] Redemption failed for subscription ${merchantSubscriptionId}`)
      // Could send email, flag for retry, etc.
    }

    // ── Mandate cancelled / revoked ────────────────────────────
    if (event === "subscription.cancelled" || event === "subscription.revoked") {
      const merchantSubscriptionId = payload.merchantSubscriptionId
      if (merchantSubscriptionId) {
        await prisma.subscription.updateMany({
          where: { paymentSubscriptionId: merchantSubscriptionId },
          data: { status: "cancelled", cancelAtPeriodEnd: true },
        })
        console.log(`[payments/webhook] Subscription ${merchantSubscriptionId} ${event}`)
      }
    }

    return NextResponse.json({ status: "ok" })
  } catch (e: any) {
    console.error("[payments/webhook] Error:", e.message)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

// ── Helpers ────────────────────────────────────────────────────

async function handleOrderCompleted(payload: any) {
  const merchantOrderId = payload.merchantOrderId ?? payload.orderId
  if (!merchantOrderId) return

  const subscription = await prisma.subscription.findFirst({
    where: { paymentOrderId: merchantOrderId },
  })
  if (!subscription || subscription.status === "active") return

  const isLifetime = subscription.billingInterval === "lifetime"
  const now = new Date()

  await activateSubscription(subscription.id, subscription.userId, subscription.billingInterval, now, subscription.currentPeriodEnd)

  if (isLifetime) {
    await incrementLifetimeDeal()
    revalidateTag("lifetime-deals", {})
  }

  console.log(`[payments/webhook] One-time order activated for user ${subscription.userId}`)
}

async function handleOrderFailed(payload: any) {
  const merchantOrderId = payload.merchantOrderId ?? payload.orderId
  if (!merchantOrderId) return
  await prisma.subscription.updateMany({
    where: { paymentOrderId: merchantOrderId },
    data: { status: "failed" },
  })
}

async function handleSubscriptionSetupCompleted(payload: any) {
  const merchantOrderId = payload.merchantOrderId ?? payload.orderId
  if (!merchantOrderId) return

  const subscription = await prisma.subscription.findFirst({
    where: { paymentOrderId: merchantOrderId },
  })
  if (!subscription || subscription.status === "active") return

  const now = new Date()
  await activateSubscription(subscription.id, subscription.userId, subscription.billingInterval, now, subscription.currentPeriodEnd)
  console.log(`[payments/webhook] Autopay setup completed for user ${subscription.userId} (${subscription.billingInterval})`)
}

async function handleRedemptionCompleted(payload: any) {
  // Redemption uses merchantSubscriptionId (not merchantOrderId) to link back
  const merchantSubscriptionId = payload.merchantSubscriptionId
  if (!merchantSubscriptionId) return

  const subscription = await prisma.subscription.findFirst({
    where: { paymentSubscriptionId: merchantSubscriptionId },
  })
  if (!subscription) return

  // Extend the billing period
  const now = new Date()
  const base = subscription.currentPeriodEnd && subscription.currentPeriodEnd > now
    ? subscription.currentPeriodEnd
    : now

  const newPeriodEnd = subscription.billingInterval === "yearly"
    ? new Date(base.getTime() + 365 * 24 * 60 * 60 * 1000)
    : new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000)

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "active",
      currentPeriodStart: now,
      currentPeriodEnd: newPeriodEnd,
      cancelAtPeriodEnd: false,
    },
  })

  // Ensure user is still PRO (in case they were downgraded)
  await prisma.user.update({
    where: { id: subscription.userId },
    data: { tier: "PRO" },
  })

  console.log(`[payments/webhook] Recurring charge succeeded, extended to ${newPeriodEnd.toISOString()}`)
}

async function activateSubscription(
  subscriptionId: string,
  userId: string,
  billingInterval: string,
  now: Date,
  existingPeriodEnd?: Date | null
) {
  if (billingInterval === "lifetime") {
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: "active",
        currentPeriodStart: now,
        currentPeriodEnd: new Date("2099-12-31"),
        cancelAtPeriodEnd: false,
      },
    })
  } else {
    // If user still has time left from a previous period (cancelled and resubscribed),
    // extend from the existing period end rather than from today.
    const base = existingPeriodEnd && existingPeriodEnd > now ? existingPeriodEnd : now
    const periodEnd = billingInterval === "yearly"
      ? new Date(base.getTime() + 365 * 24 * 60 * 60 * 1000)
      : new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000)

    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: "active",
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      },
    })
  }

  await prisma.user.update({
    where: { id: userId },
    data: { tier: "PRO" },
  })
}

async function incrementLifetimeDeal() {
  try {
    await prisma.lifetimeDeal.updateMany({
      where: { sold: { lt: LIFETIME_DEAL.cap } },
      data: { sold: { increment: 1 } },
    })
  } catch {
    // Non-critical
  }
}
