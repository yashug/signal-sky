import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { verifyWebhookSignature } from "@/lib/razorpay"
import { LIFETIME_DEAL, PRO_PLAN } from "@/lib/plans"

/**
 * POST /api/payments/webhook
 * Razorpay server-to-server webhook for subscription and payment events.
 *
 * Events handled:
 *   subscription.activated    → activate, send invoice
 *   subscription.charged      → extend billing period
 *   subscription.halted       → log warning (failed charge, user retains access)
 *   subscription.cancelled    → set cancelAtPeriodEnd=true
 *   subscription.completed    → set cancelAtPeriodEnd=true (all cycles done)
 *   payment.captured          → if lifetime order → activate
 *   payment.failed            → if pending subscription → set status=failed
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get("x-razorpay-signature") ?? ""

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const eventName: string = event.event ?? ""
  console.log(`[payments/webhook] Event: ${eventName}`)

  try {
    if (eventName === "subscription.activated") {
      await handleSubscriptionActivated(event)
    } else if (eventName === "subscription.charged") {
      await handleSubscriptionCharged(event)
    } else if (eventName === "subscription.halted") {
      const subId = event.payload?.subscription?.entity?.id
      console.warn(`[payments/webhook] Subscription halted: ${subId}`)
    } else if (eventName === "subscription.cancelled" || eventName === "subscription.completed") {
      await handleSubscriptionCancelled(event)
    } else if (eventName === "payment.captured") {
      await handlePaymentCaptured(event)
    } else if (eventName === "payment.failed") {
      await handlePaymentFailed(event)
    }

    return NextResponse.json({ status: "ok" })
  } catch (e: any) {
    console.error("[payments/webhook] Error:", e.message)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

// ── Helpers ────────────────────────────────────────────────────

async function handleSubscriptionActivated(event: any) {
  const sub = event.payload?.subscription?.entity
  if (!sub?.id) return

  const subscription = await prisma.subscription.findFirst({
    where: { paymentSubscriptionId: sub.id },
    include: { user: { select: { email: true, name: true } } },
  })
  if (!subscription || subscription.status === "active") return

  const now = new Date()
  await activateSubscription(subscription.id, subscription.userId, subscription.billingInterval, now, subscription.currentPeriodEnd)

  // Send invoice email (non-blocking)
  if (subscription.user.email) {
    const planName = subscription.billingInterval === "yearly" ? "Pro — Yearly" : "Pro — Monthly"
    const amount = subscription.billingInterval === "yearly" ? PRO_PLAN.price.yearly : PRO_PLAN.price.monthly
    const paymentId = event.payload?.payment?.entity?.id ?? sub.id
    import("@/lib/email/send")
      .then(({ sendInvoice }) =>
        sendInvoice({ to: subscription.user.email!, userName: subscription.user.name ?? undefined, planName, amount, transactionId: paymentId })
      )
      .catch((e) => console.error("[payments/webhook] Invoice email error:", e.message))
  }

  console.log(`[payments/webhook] Subscription activated for user ${subscription.userId}`)
}

async function handleSubscriptionCharged(event: any) {
  const sub = event.payload?.subscription?.entity
  if (!sub?.id) return

  const subscription = await prisma.subscription.findFirst({
    where: { paymentSubscriptionId: sub.id },
  })
  if (!subscription) return

  const now = new Date()
  const base = subscription.currentPeriodEnd && subscription.currentPeriodEnd > now
    ? subscription.currentPeriodEnd
    : now

  const newPeriodEnd =
    subscription.billingInterval === "yearly"
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

  await prisma.user.update({
    where: { id: subscription.userId },
    data: { tier: "PRO" },
  })

  console.log(`[payments/webhook] Recurring charge succeeded, extended to ${newPeriodEnd.toISOString()}`)
}

async function handleSubscriptionCancelled(event: any) {
  const sub = event.payload?.subscription?.entity
  if (!sub?.id) return

  await prisma.subscription.updateMany({
    where: { paymentSubscriptionId: sub.id },
    data: { cancelAtPeriodEnd: true },
  })

  console.log(`[payments/webhook] Subscription ${sub.id} ${event.event}`)
}

async function handlePaymentCaptured(event: any) {
  const payment = event.payload?.payment?.entity
  if (!payment) return

  // Only handle lifetime one-time payments
  if (payment.notes?.plan_type !== "lifetime") return

  const subscription = await prisma.subscription.findFirst({
    where: { paymentOrderId: payment.order_id },
    include: { user: { select: { email: true, name: true } } },
  })
  if (!subscription || subscription.status === "active") return

  const now = new Date()
  await activateSubscription(subscription.id, subscription.userId, "lifetime", now, null)

  await incrementLifetimeDeal()
  revalidateTag("lifetime-deals", {})

  // Send invoice email (non-blocking)
  if (subscription.user.email) {
    import("@/lib/email/send")
      .then(({ sendInvoice }) =>
        sendInvoice({
          to: subscription.user.email!,
          userName: subscription.user.name ?? undefined,
          planName: "Lifetime Plan",
          amount: PRO_PLAN.price.lifetime,
          transactionId: payment.id,
        })
      )
      .catch((e) => console.error("[payments/webhook] Invoice email error:", e.message))
  }

  console.log(`[payments/webhook] Lifetime payment captured for user ${subscription.userId}`)
}

async function handlePaymentFailed(event: any) {
  const payment = event.payload?.payment?.entity
  if (!payment?.order_id) return

  await prisma.subscription.updateMany({
    where: { paymentOrderId: payment.order_id, status: "pending" },
    data: { status: "failed" },
  })
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
    const base = existingPeriodEnd && existingPeriodEnd > now ? existingPeriodEnd : now
    const periodEnd =
      billingInterval === "yearly"
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

  // Credit referrer on first subscription (non-blocking)
  applyReferralCredit(userId).catch(() => {})
}

async function applyReferralCredit(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { referredBy: true },
  })
  if (!user?.referredBy) return

  const referrer = await prisma.user.findFirst({
    where: { referralCode: user.referredBy },
    select: { id: true, subscription: { select: { id: true, currentPeriodEnd: true, billingInterval: true, status: true } } },
  })

  await prisma.user.update({ where: { id: userId }, data: { referredBy: null } })

  if (!referrer?.subscription || referrer.subscription.status !== "active") return
  if (referrer.subscription.billingInterval === "lifetime") return

  const base = referrer.subscription.currentPeriodEnd ?? new Date()
  const newEnd = new Date(Math.max(base.getTime(), Date.now()) + 30 * 24 * 60 * 60 * 1000)

  await prisma.subscription.update({
    where: { id: referrer.subscription.id },
    data: { currentPeriodEnd: newEnd },
  })

  console.log(`[referral] credited 30 days to referrer ${referrer.id} → new end ${newEnd.toISOString()}`)
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
