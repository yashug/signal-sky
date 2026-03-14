import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getOrderStatus } from "@/lib/phonepe"
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
 * GET /api/payments/callback?orderId=...
 * PhonePe redirects the user here after payment (one-time or subscription setup).
 * Verifies payment status and activates the subscription.
 */
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  if (!orderId) {
    return NextResponse.redirect(`${appUrl}/pricing?error=missing_order`)
  }

  try {
    // Verify the setup/payment order with PhonePe
    const status = await getOrderStatus(orderId)

    if (status.state !== "COMPLETED") {
      console.log(`[payments/callback] Order ${orderId} state: ${status.state}`)
      return NextResponse.redirect(`${appUrl}/pricing?error=payment_failed`)
    }

    // Find the subscription record
    const subscription = await prisma.subscription.findFirst({
      where: { paymentOrderId: orderId },
      include: { user: true },
    })

    if (!subscription) {
      console.error(`[payments/callback] No subscription found for order ${orderId}`)
      return NextResponse.redirect(`${appUrl}/pricing?error=order_not_found`)
    }

    // Already activated (e.g., by webhook arriving first)
    if (subscription.status === "active") {
      return NextResponse.redirect(`${appUrl}/scanner?payment=success`)
    }

    const isLifetime = subscription.billingInterval === "lifetime"
    const now = new Date()

    // If user had a future period end (cancelled and resubscribed), extend from there
    const base = !isLifetime && subscription.currentPeriodEnd && subscription.currentPeriodEnd > now
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

    // Apply referral credit to referrer (non-blocking)
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
      const planName = isLifetime ? "Lifetime Plan" : subscription.billingInterval === "yearly" ? "Pro — Yearly" : "Pro — Monthly"
      const amount = isLifetime ? PRO_PLAN.price.lifetime : subscription.billingInterval === "yearly" ? PRO_PLAN.price.yearly : PRO_PLAN.price.monthly
      import("@/lib/email/send").then(({ sendInvoice }) =>
        sendInvoice({
          to: subscription.user.email!,
          userName: subscription.user.name ?? undefined,
          planName,
          amount,
          transactionId: orderId,
        })
      ).catch((e) => console.error("[payments/callback] Invoice email error:", e.message))
    }

    // For autopay subscriptions, verify mandate was registered with PhonePe
    if (!isLifetime && subscription.paymentSubscriptionId) {
      try {
        const { getSubscriptionStatus } = await import("@/lib/phonepe")
        const subStatus = await getSubscriptionStatus(subscription.paymentSubscriptionId)
        console.log(`[payments/callback] PhonePe mandate status for ${subscription.paymentSubscriptionId}:`, JSON.stringify(subStatus))
      } catch (e: any) {
        console.warn(`[payments/callback] Could not fetch mandate status: ${e.message}`)
      }
    }

    return NextResponse.redirect(`${appUrl}/scanner?payment=success`)
  } catch (e: any) {
    console.error("[payments/callback] Error:", e.message)
    return NextResponse.redirect(`${appUrl}/pricing?error=verification_failed`)
  }
}
