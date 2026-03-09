export const runtime = 'nodejs'
import { NextRequest, NextResponse } from "next/server"
import { getSignalChart } from "@/lib/data/signals"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const chart = await getSignalChart(id)
  return NextResponse.json(chart)
}
