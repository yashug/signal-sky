import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getStripe, PLANS } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const interval: string = body.interval ?? "yearly"

  const priceId = PLANS.pro.priceId[interval as keyof typeof PLANS.pro.priceId]
  if (!priceId) {
    return NextResponse.json({ error: "Stripe price not configured for this interval" }, { status: 500 })
  }

  const isLifetime = interval === "lifetime"

  const checkoutSession = await getStripe().checkout.sessions.create({
    mode: isLifetime ? "payment" : "subscription",
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?billing=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId: session.user.id ?? "",
      interval,
    },
    ...(isLifetime ? {} : {
      subscription_data: {
        metadata: {
          userId: session.user.id ?? "",
          interval,
        },
      },
    }),
  })

  return NextResponse.json({ url: checkoutSession.url })
}
