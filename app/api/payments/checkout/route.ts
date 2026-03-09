import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createPayment } from "@/lib/phonepe"
import { PRO_PLAN, type BillingInterval } from "@/lib/plans"

/**
 * POST /api/payments/checkout
 * Creates a PhonePe payment order and returns the redirect URL.
 * Body: { interval: "monthly" | "yearly" | "lifetime" }
 */
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const interval: BillingInterval = body.interval ?? "yearly"

  const price = PRO_PLAN.price[interval]
  if (!price) {
    return NextResponse.json({ error: "Invalid interval" }, { status: 400 })
  }

  const amountPaisa = price * 100 // PhonePe expects amount in paisa

  // Generate unique order ID
  const orderId = `SS_${session.user.id.slice(0, 8)}_${interval}_${Date.now()}`

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const redirectUrl = `${origin}/api/payments/callback?orderId=${encodeURIComponent(orderId)}`

  try {
    const result = await createPayment({
      orderId,
      amountPaisa,
      redirectUrl,
      metaInfo: {
        udf1: session.user.id,
        udf2: interval,
        udf3: session.user.email,
      },
    })

    // Store pending order info for webhook/callback verification
    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        paymentOrderId: orderId,
        billingInterval: interval,
        status: "pending",
        paymentProvider: "phonepe",
      },
      create: {
        userId: session.user.id,
        paymentOrderId: orderId,
        billingInterval: interval,
        status: "pending",
        paymentProvider: "phonepe",
      },
    })

    return NextResponse.json({ redirectUrl: result.redirectUrl })
  } catch (e: any) {
    console.error("[payments/checkout] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
