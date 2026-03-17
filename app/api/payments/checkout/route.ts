import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createOrder, createSubscription } from "@/lib/razorpay"
import { PRO_PLAN, type BillingInterval } from "@/lib/plans"

const PLAN_IDS = {
  monthly: process.env.RAZORPAY_PLAN_ID_MONTHLY!,
  yearly: process.env.RAZORPAY_PLAN_ID_YEARLY!,
}

const TOTAL_COUNT = { monthly: 120, yearly: 50 }

/**
 * POST /api/payments/checkout
 * - monthly / yearly  → Razorpay recurring subscription
 * - lifetime          → one-time Razorpay order
 * Body: { interval: "monthly" | "yearly" | "lifetime" }
 * Returns: { keyId, subscriptionId } or { keyId, orderId, amount }
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

  const ts = Date.now()
  const userShort = userId.slice(0, 8)
  const receipt = `SS_${userShort}_${interval}_${ts}`

  try {
    if (interval === "lifetime") {
      const order = await createOrder(price, receipt, {
        user_id: userId,
        plan_type: "lifetime",
      })

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          paymentOrderId: order.id,
          paymentSubscriptionId: null,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "razorpay",
          cancelAtPeriodEnd: false,
        },
        create: {
          userId,
          paymentOrderId: order.id,
          paymentSubscriptionId: null,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "razorpay",
        },
      })

      return NextResponse.json({
        keyId: process.env.RAZORPAY_KEY_ID,
        orderId: order.id,
        amount: order.amount,
      })
    } else {
      // Recurring autopay
      const planId = PLAN_IDS[interval]
      if (!planId) {
        return NextResponse.json({ error: "Plan not configured" }, { status: 500 })
      }

      const sub = await createSubscription(planId, TOTAL_COUNT[interval], {
        user_id: userId,
        plan_type: interval,
      })

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          paymentOrderId: receipt,
          paymentSubscriptionId: sub.id,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "razorpay",
          cancelAtPeriodEnd: false,
        },
        create: {
          userId,
          paymentOrderId: receipt,
          paymentSubscriptionId: sub.id,
          billingInterval: interval,
          status: "pending",
          paymentProvider: "razorpay",
        },
      })

      return NextResponse.json({
        keyId: process.env.RAZORPAY_KEY_ID,
        subscriptionId: sub.id,
      })
    }
  } catch (e: any) {
    console.error("[payments/checkout] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
