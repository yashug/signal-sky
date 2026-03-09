import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars, updateMovingAverages } from "@/lib/market-data/store"

/**
 * POST /api/admin/sync/india/backfill
 * Smart backfill India (NSE) daily bars using Yahoo Finance.
 * Checks existing data per symbol and only fetches missing date ranges.
 * Body: { universe?: string, years?: number }
 *
 * Symbol convention:
 *   - Yahoo Finance fetch  → uses full symbol WITH .NS suffix (e.g. "RELIANCE.NS")
 *   - DB storage / queries → uses symbol WITHOUT .NS suffix (e.g. "RELIANCE")
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const universe = body.universe ?? "nifty50"
  const years = Math.min(body.years ?? 10, 20) // Cap at 20 years

  try {
    // Get universe members (symbols stored with .NS suffix in universeMember)
    const members = await prisma.universeMember.findMany({
      where: { universe },
      select: { symbol: true },
    })

    if (members.length === 0) {
      return NextResponse.json({ error: `No members found for universe: ${universe}` }, { status: 404 })
    }

    // Yahoo symbols keep .NS; DB symbols drop .NS
    const yahooSymbols = members.map((m) => m.symbol)
    const dbSymbols = yahooSymbols.map((s) => s.replace(/\.NS$/, ""))

    const today = new Date()

    // Check existing data coverage per DB symbol
    const barStats = await prisma.dailyBar.groupBy({
      by: ["symbol"],
      where: {
        symbol: { in: dbSymbols },
        exchange: "NSE",
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

    for (let i = 0; i < yahooSymbols.length; i++) {
      const yahooSymbol = yahooSymbols[i]
      const dbSymbol = dbSymbols[i]
      const stats = statsMap.get(dbSymbol)

      // Determine what ranges we need to fetch
      const fetchRanges: Array<{ from: Date; to: Date }> = []

      if (!stats) {
        // No data at all — fetch `years` back from today
        const backfillFrom = new Date()
        backfillFrom.setFullYear(backfillFrom.getFullYear() - years)
        fetchRanges.push({ from: backfillFrom, to: today })
      } else {
        // Extend backward: go `years` before the existing oldest date
        const oneMonthBuffer = 30 * 86_400_000
        if (stats.firstDate) {
          const extendFrom = new Date(stats.firstDate)
          extendFrom.setFullYear(extendFrom.getFullYear() - years)
          if (stats.firstDate.getTime() > extendFrom.getTime() + oneMonthBuffer) {
            const gapEnd = new Date(stats.firstDate.getTime() - 86_400_000)
            fetchRanges.push({ from: extendFrom, to: gapEnd })
          }
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
      let symbolInserted = 0
      for (const range of fetchRanges) {
        try {
          const candles = await getYahooDailyCandles(yahooSymbol, range.from, range.to)
          if (candles.length > 0) {
            const result = await upsertDailyBars({
              symbol: dbSymbol,  // store WITHOUT .NS
              exchange: "NSE",
              candles,
              source: "yahoo",
            })
            totalInserted += result.inserted
            totalSkipped += result.skipped
            symbolInserted += result.inserted
          }
        } catch (e: any) {
          errors.push(`${dbSymbol}: ${e.message?.slice(0, 100)}`)
        }

        // Rate limit
        await new Promise((r) => setTimeout(r, 200))
      }

      // Compute SMA200 + EMA200 after all ranges for this symbol
      if (symbolInserted > 0) {
        try {
          await updateMovingAverages(dbSymbol, "NSE")
        } catch (e: any) {
          errors.push(`${dbSymbol} (MA): ${e.message?.slice(0, 80)}`)
        }
      }
    }

    return NextResponse.json({
      success: true,
      universe,
      years,
      symbolsInUniverse: members.length,
      symbolsAlreadyComplete,
      symbolsFetched: yahooSymbols.length - symbolsAlreadyComplete,
      totalInserted,
      totalSkipped,
      errors: errors.slice(0, 20),
    })
  } catch (e: any) {
    console.error("[sync/india/backfill] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
