import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifySignature } from "@/lib/razorpay"
import { LIFETIME_DEAL, PRO_PLAN } from "@/lib/plans"

async function applyReferralCredit(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { referredBy: true } })
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
  await prisma.subscription.update({ where: { id: referrer.subscription.id }, data: { currentPeriodEnd: newEnd } })
}

/**
 * POST /api/payments/callback
 * Called by the frontend after Razorpay modal succeeds.
 * Verifies HMAC signature and activates the subscription.
 *
 * Body (subscription):  { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, interval }
 * Body (order/lifetime): { razorpay_payment_id, razorpay_order_id, razorpay_signature, interval }
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))

  const {
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_order_id,
    razorpay_signature,
    interval,
  } = body

  if (!razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
  }

  // Verify HMAC signature
  let signaturePayload: string
  if (razorpay_subscription_id) {
    signaturePayload = `${razorpay_payment_id}|${razorpay_subscription_id}`
  } else if (razorpay_order_id) {
    signaturePayload = `${razorpay_order_id}|${razorpay_payment_id}`
  } else {
    return NextResponse.json({ error: "Missing subscription or order id" }, { status: 400 })
  }

  if (!verifySignature(signaturePayload, razorpay_signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    // Find the subscription record
    const subscription = await prisma.subscription.findFirst({
      where: razorpay_subscription_id
        ? { paymentSubscriptionId: razorpay_subscription_id }
        : { paymentOrderId: razorpay_order_id },
      include: { user: true },
    })

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Already activated (e.g., by webhook arriving first)
    if (subscription.status === "active") {
      return NextResponse.json({ success: true, alreadyActive: true })
    }

    const isLifetime = subscription.billingInterval === "lifetime"
    const now = new Date()

    // If user still has time from a previous period, extend from there
    const base =
      !isLifetime && subscription.currentPeriodEnd && subscription.currentPeriodEnd > now
        ? subscription.currentPeriodEnd
        : now

    const periodEnd = isLifetime
      ? new Date("2099-12-31")
      : subscription.billingInterval === "yearly"
      ? new Date(base.getTime() + 365 * 24 * 60 * 60 * 1000)
      : new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000)

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "active",
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      },
    })

    await prisma.user.update({
      where: { id: subscription.userId },
      data: { tier: "PRO" },
    })

    // Apply referral credit (non-blocking)
    applyReferralCredit(subscription.userId).catch(() => {})

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

    console.log(`[payments/callback] Activated ${subscription.billingInterval} for user ${subscription.userId}`)

    // Send invoice email (non-blocking)
    if (subscription.user.email) {
      const planName = isLifetime
        ? "Lifetime Plan"
        : subscription.billingInterval === "yearly"
        ? "Pro — Yearly"
        : "Pro — Monthly"
      const amount = isLifetime
        ? PRO_PLAN.price.lifetime
        : subscription.billingInterval === "yearly"
        ? PRO_PLAN.price.yearly
        : PRO_PLAN.price.monthly
      import("@/lib/email/send")
        .then(({ sendInvoice }) =>
          sendInvoice({
            to: subscription.user.email!,
            userName: subscription.user.name ?? undefined,
            planName,
            amount,
            transactionId: razorpay_payment_id,
          })
        )
        .catch((e) => console.error("[payments/callback] Invoice email error:", e.message))
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error("[payments/callback] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
