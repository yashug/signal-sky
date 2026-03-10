import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createPayment, createSubscription, cancelSubscription } from "@/lib/phonepe"
import { PRO_PLAN, type BillingInterval } from "@/lib/plans"

/**
 * POST /api/payments/checkout
 * - monthly / yearly  → PhonePe UPI Autopay subscription setup
 * - lifetime          → one-time PhonePe checkout
 * Body: { interval: "monthly" | "yearly" | "lifetime" }
 */
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id

  const body = await req.json().catch(() => ({}))
  const interval: BillingInterval = body.interval ?? "yearly"

  const price = PRO_PLAN.price[interval]
  if (!price) {
    return NextResponse.json({ error: "Invalid interval" }, { status: 400 })
  }

  const amountPaisa = price * 100
  const ts = Date.now()
  const userShort = userId.slice(0, 8)
  const orderId = `SS_${userShort}_${interval}_${ts}`

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const redirectUrl = `${origin}/api/payments/callback?orderId=${encodeURIComponent(orderId)}`

  try {
    // If user already has an active subscription with a different interval,
    // cancel the old PhonePe mandate before creating a new one
    const existing = await prisma.subscription.findUnique({
      where: { userId: userId },
    })
    if (existing?.paymentSubscriptionId && existing.status === "active" && existing.billingInterval !== "lifetime") {
      try {
        await cancelSubscription(existing.paymentSubscriptionId)
      } catch (e: any) {
        console.warn("[checkout] Could not cancel old subscription:", e.message)
      }
    }

    let redirectResult: { orderId: string; redirectUrl: string }

    if (interval === "lifetime") {
      // One-time payment — no autopay
      redirectResult = await createPayment({
        orderId,
        amountPaisa,
        redirectUrl,
        metaInfo: {
          udf1: userId,
          udf2: interval,
        },
      })

      await prisma.subscription.upsert({
        where: { userId: userId },
        update: {
          paymentOrderId: orderId,
          paymentSubscriptionId: null,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "phonepe",
          cancelAtPeriodEnd: false,
        },
        create: {
          userId: userId,
          paymentOrderId: orderId,
          paymentSubscriptionId: null,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "phonepe",
        },
      })
    } else {
      // Recurring autopay — UPI mandate setup
      const merchantSubscriptionId = `SS_SUB_${userShort}_${ts}`
      const frequency = interval === "monthly" ? "MONTHLY" : "YEARLY"

      redirectResult = await createSubscription({
        merchantOrderId: orderId,
        merchantSubscriptionId,
        amountPaisa,
        frequency,
        redirectUrl,
        metaInfo: {
          udf1: userId,
          udf2: interval,
        },
      })

      await prisma.subscription.upsert({
        where: { userId: userId },
        update: {
          paymentOrderId: orderId,
          paymentSubscriptionId: merchantSubscriptionId,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "phonepe",
          cancelAtPeriodEnd: false,
        },
        create: {
          userId: userId,
          paymentOrderId: orderId,
          paymentSubscriptionId: merchantSubscriptionId,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "phonepe",
        },
      })
    }

    return NextResponse.json({ redirectUrl: redirectResult.redirectUrl })
  } catch (e: any) {
    console.error("[payments/checkout] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
