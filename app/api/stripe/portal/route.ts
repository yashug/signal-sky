import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"

export async function POST() {
  const session = await getSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Find the Stripe customer by email
  const customers = await getStripe().customers.list({
    email: session.user.email,
    limit: 1,
  })

  if (customers.data.length === 0) {
    return NextResponse.json({ error: "No billing account found" }, { status: 404 })
  }

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: customers.data[0].id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  })

  return NextResponse.json({ url: portalSession.url })
}
