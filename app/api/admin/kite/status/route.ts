import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/admin/kite/status
 * Returns current Kite connection status (last login time, user ID, etc.)
 */
export async function GET() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const token = await prisma.kiteToken.findUnique({ where: { id: 1 } })

    if (!token) {
      return NextResponse.json({ connected: false })
    }

    // Token is considered stale if login was more than 24 hours ago
    // (Kite tokens expire at ~6 AM IST next day)
    const loginAge = Date.now() - token.loginTime.getTime()
    const isStale = loginAge > 24 * 60 * 60 * 1000

    return NextResponse.json({
      connected: true,
      stale: isStale,
      userId: token.userId,
      loginTime: token.loginTime.toISOString(),
      updatedAt: token.updatedAt.toISOString(),
    })
  } catch {
    return NextResponse.json({ connected: false })
  }
}
