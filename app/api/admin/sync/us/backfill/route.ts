import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars } from "@/lib/market-data/store"

/**
 * POST /api/admin/sync/us/backfill
 * Smart backfill US daily bars using Yahoo Finance.
 * Checks existing data per symbol and only fetches missing date ranges.
 * Body: { symbols?: string[], universe?: string, years?: number }
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const years = Math.min(body.years ?? 10, 15)

  let symbols: string[] = body.symbols ?? []

  // If no explicit symbols, use universe members
  if (symbols.length === 0) {
    const universe = body.universe ?? "sp100"
    const members = await prisma.universeMember.findMany({
      where: { universe },
      select: { symbol: true },
    })
    symbols = members.map((m) => m.symbol)
  }

  if (symbols.length === 0) {
    return NextResponse.json({ error: "No symbols to backfill" }, { status: 400 })
  }

  const today = new Date()
  const backfillFrom = new Date()
  backfillFrom.setFullYear(backfillFrom.getFullYear() - years)

  try {
    // Check existing data coverage per symbol
    const barStats = await prisma.dailyBar.groupBy({
      by: ["symbol"],
      where: {
        symbol: { in: symbols },
        exchange: "US",
      },
      _min: { date: true },
      _max: { date: true },
      _count: { id: true },
    })
    const statsMap = new Map(
      barStats.map((s) => [s.symbol, { firstDate: s._min.date, lastDate: s._max.date, count: s._count.id }])
    )

    let totalInserted = 0
    let totalSkipped = 0
    let symbolsAlreadyComplete = 0
    const errors: string[] = []

    for (const symbol of symbols) {
      const stats = statsMap.get(symbol)

      // Determine what ranges we need to fetch
      const fetchRanges: Array<{ from: Date; to: Date }> = []

      if (!stats) {
        // No data at all — fetch full range
        fetchRanges.push({ from: backfillFrom, to: today })
      } else {
        // Check if we need older data (gap at the start)
        const oneMonthBuffer = 30 * 86_400_000
        if (stats.firstDate && stats.firstDate.getTime() > backfillFrom.getTime() + oneMonthBuffer) {
          const gapEnd = new Date(stats.firstDate.getTime() - 86_400_000)
          fetchRanges.push({ from: backfillFrom, to: gapEnd })
        }

        // Check if we need newer data (gap at the end)
        const fiveDayBuffer = 5 * 86_400_000
        if (stats.lastDate && today.getTime() - stats.lastDate.getTime() > fiveDayBuffer) {
          const gapStart = new Date(stats.lastDate.getTime() + 86_400_000)
          fetchRanges.push({ from: gapStart, to: today })
        }

        if (fetchRanges.length === 0) {
          symbolsAlreadyComplete++
          continue
        }
      }

      // Fetch each missing range
      for (const range of fetchRanges) {
        try {
          const candles = await getYahooDailyCandles(symbol, range.from, range.to)
          if (candles.length > 0) {
            const result = await upsertDailyBars({
              symbol,
              exchange: "US",
              candles,
              source: "yahoo",
            })
            totalInserted += result.inserted
            totalSkipped += result.skipped
          }
        } catch (e: any) {
          errors.push(`${symbol}: ${e.message?.slice(0, 100)}`)
        }

        // Rate limit: ~5 req/sec
        await new Promise((r) => setTimeout(r, 200))
      }
    }

    return NextResponse.json({
      success: true,
      symbolsRequested: symbols.length,
      symbolsAlreadyComplete,
      symbolsFetched: symbols.length - symbolsAlreadyComplete,
      totalInserted,
      totalSkipped,
      errors: errors.slice(0, 20),
    })
  } catch (e: any) {
    console.error("[sync/us/backfill] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
