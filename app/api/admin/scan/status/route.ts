import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/admin/scan/status
 * Returns the latest scan status: last scan time, active signals, market health.
 */
export async function GET() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Last signal created = last scan time
    const lastSignal = await prisma.signal.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true, signalDate: true },
    })

    // Active signal counts by heat
    const activeSignals = await prisma.signal.groupBy({
      by: ["heat"],
      where: { isActive: true },
      _count: true,
    })

    const heatCounts: Record<string, number> = {}
    let totalActive = 0
    for (const row of activeSignals) {
      heatCounts[row.heat] = row._count
      totalActive += row._count
    }

    // Latest market health
    const latestHealth = await prisma.marketHealth.findMany({
      orderBy: { date: "desc" },
      take: 10,
      distinct: ["universe"],
      select: { universe: true, date: true, totalStocks: true, aboveEma200: true, pctAbove: true },
    })

    // Total daily bars
    const barCount = await prisma.dailyBar.count()

    // Total indicators
    const indicatorCount = await prisma.indicator.count()

    return NextResponse.json({
      lastScanTime: lastSignal?.createdAt ?? null,
      lastScanDate: lastSignal?.signalDate ?? null,
      activeSignals: totalActive,
      heatBreakdown: heatCounts,
      marketHealth: latestHealth,
      totalBars: barCount,
      totalIndicators: indicatorCount,
    })
  } catch (e: any) {
    console.error("[scan/status] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
