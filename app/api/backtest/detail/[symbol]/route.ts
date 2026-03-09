export const runtime = 'nodejs'
import { NextRequest, NextResponse } from "next/server"
import { getBacktestDetail } from "@/lib/data/backtests"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params
  const decoded = decodeURIComponent(symbol)

  const detail = await getBacktestDetail(decoded)
  if (!detail) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(detail)
}
