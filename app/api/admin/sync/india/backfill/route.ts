import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getKiteDailyCandles } from "@/lib/market-data/kite"
import { upsertDailyBars, getLastBarDate } from "@/lib/market-data/store"

/**
 * POST /api/admin/sync/india/backfill
 * Smart backfill India (NSE) daily bars using Kite Connect.
 * Checks existing data per symbol and only fetches missing date ranges.
 * Body: { universe?: string, years?: number }
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const universe = body.universe ?? "nifty50"
  const years = Math.min(body.years ?? 10, 15) // Cap at 15 years

  try {
    // Get universe members
    const members = await prisma.universeMember.findMany({
      where: { universe },
      select: { symbol: true },
    })

    if (members.length === 0) {
      return NextResponse.json({ error: `No members found for universe: ${universe}` }, { status: 404 })
    }

    // Resolve instrument tokens for each symbol
    const symbols = members.map((m) => m.symbol.replace(/\.NS$/, ""))
    const instruments = await prisma.kiteInstrument.findMany({
      where: { tradingsymbol: { in: symbols }, exchange: "NSE" },
      select: { instrumentToken: true, tradingsymbol: true },
    })

    const tokenMap = new Map(instruments.map((i) => [i.tradingsymbol, i.instrumentToken]))
    const matched = symbols.filter((s) => tokenMap.has(s))
    const unmatched = symbols.filter((s) => !tokenMap.has(s))

    const today = new Date()
    const backfillFrom = new Date()
    backfillFrom.setFullYear(backfillFrom.getFullYear() - years)

    // Check existing data coverage per symbol
    const barStats = await prisma.dailyBar.groupBy({
      by: ["symbol"],
      where: {
        symbol: { in: matched },
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

    for (const symbol of matched) {
      const token = tokenMap.get(symbol)!
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
          // Need to fetch from backfillFrom to firstDate
          const gapEnd = new Date(stats.firstDate.getTime() - 86_400_000)
          fetchRanges.push({ from: backfillFrom, to: gapEnd })
        }

        // Check if we need newer data (gap at the end)
        const fiveDayBuffer = 5 * 86_400_000
        if (stats.lastDate && today.getTime() - stats.lastDate.getTime() > fiveDayBuffer) {
          // Need to fetch from lastDate+1 to today
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
          const candles = await getKiteDailyCandles(token, range.from, range.to)
          if (candles.length > 0) {
            const result = await upsertDailyBars({
              symbol,
              exchange: "NSE",
              candles,
              source: "kite",
            })
            totalInserted += result.inserted
            totalSkipped += result.skipped
          }
        } catch (e: any) {
          errors.push(`${symbol}: ${e.message?.slice(0, 100)}`)
        }

        // Rate limit: ~3 req/sec
        await new Promise((r) => setTimeout(r, 350))
      }
    }

    return NextResponse.json({
      success: true,
      universe,
      years,
      symbolsInUniverse: members.length,
      symbolsMatched: matched.length,
      symbolsUnmatched: unmatched,
      symbolsAlreadyComplete,
      symbolsFetched: matched.length - symbolsAlreadyComplete,
      totalInserted,
      totalSkipped,
      errors: errors.slice(0, 20),
    })
  } catch (e: any) {
    console.error("[sync/india/backfill] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
