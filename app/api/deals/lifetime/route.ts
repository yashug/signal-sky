import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { LIFETIME_DEAL } from "@/lib/plans"

/**
 * GET /api/deals/lifetime
 * Public endpoint — returns server-authoritative lifetime deal availability.
 */
export async function GET() {
  try {
    // Try to find existing row
    let deal = await prisma.lifetimeDeal.findFirst()

    // Create singleton if it doesn't exist
    if (!deal) {
      deal = await prisma.lifetimeDeal.create({
        data: { cap: LIFETIME_DEAL.cap, sold: 0 },
      })
    }

    return NextResponse.json({
      cap: deal.cap,
      sold: deal.sold,
      remaining: Math.max(0, deal.cap - deal.sold),
      available: deal.sold < deal.cap,
    })
  } catch (e: any) {
    console.error("[deals/lifetime] Error:", e.message)
    // Fallback response when DB is unavailable
    return NextResponse.json({
      cap: LIFETIME_DEAL.cap,
      sold: 0,
      remaining: LIFETIME_DEAL.cap,
      available: true,
    })
  }
}
