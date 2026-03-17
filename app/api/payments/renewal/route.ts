import { NextResponse } from "next/server"

/**
 * POST /api/payments/renewal
 * No-op — Razorpay handles recurring subscription charges automatically.
 * This cron is no longer needed.
 */
export async function POST() {
  return NextResponse.json({ success: true, message: "Razorpay handles recurring automatically" })
}
