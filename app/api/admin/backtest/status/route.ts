import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { getJob } from "@/lib/backtest-job"

/**
 * GET /api/admin/backtest/status?market=india
 * Returns current status of a backtest job.
 */
export async function GET(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const market = req.nextUrl.searchParams.get("market") ?? "india"
  return NextResponse.json(getJob(market))
}
