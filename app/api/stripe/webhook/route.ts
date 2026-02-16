import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const interval = session.metadata?.interval ?? "monthly"

      if (!userId) break

      if (interval === "lifetime") {
        // One-time payment: grant Pro forever
        await prisma.user.update({
          where: { id: userId },
          data: { tier: "PRO" },
        })
        await prisma.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string | null,
            billingInterval: "lifetime",
            status: "active",
          },
          update: {
            stripeCustomerId: session.customer as string | null,
            billingInterval: "lifetime",
            status: "active",
            cancelAtPeriodEnd: false,
          },
        })
        // Increment lifetime deal counter
        await prisma.lifetimeDeal.update({
          where: { id: 1 },
          data: { sold: { increment: 1 } },
        }).catch(() => {
          // Row might not exist yet
        })
        console.log("[stripe] lifetime deal activated for user:", userId)
      } else {
        // Subscription: will be handled by subscription.updated event
        await prisma.user.update({
          where: { id: userId },
          data: { tier: "PRO" },
        })
        console.log("[stripe] checkout completed:", session.id, "interval:", interval)
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.userId
      if (!userId) break

      const isActive = subscription.status === "active" || subscription.status === "trialing"

      await prisma.user.update({
        where: { id: userId },
        data: { tier: isActive ? "PRO" : "FREE" },
      })

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price?.id,
          billingInterval: subscription.metadata?.interval ?? "monthly",
          status: subscription.status,
          currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
        update: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price?.id,
          status: subscription.status,
          currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      })

      console.log("[stripe] subscription updated:", subscription.id, subscription.status)
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.userId
      if (!userId) break

      // Check if user has a lifetime deal — don't downgrade them
      const existing = await prisma.subscription.findUnique({ where: { userId } })
      if (existing?.billingInterval === "lifetime") {
        console.log("[stripe] skipping downgrade for lifetime user:", userId)
        break
      }

      await prisma.user.update({
        where: { id: userId },
        data: { tier: "FREE" },
      })

      await prisma.subscription.update({
        where: { userId },
        data: { status: "canceled" },
      }).catch(() => {})

      console.log("[stripe] subscription deleted, downgraded user:", userId)
      break
    }

    default:
      break
  }

  return NextResponse.json({ received: true })
}
