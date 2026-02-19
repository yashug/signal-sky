import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getKiteDailyCandles } from "@/lib/market-data/kite"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars, getLastBarDate, updateMovingAverages } from "@/lib/market-data/store"

const INDIA_UNIVERSES = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100",
  "niftybank",
]

const US_UNIVERSES = ["sp100"]

/**
 * POST /api/admin/sync/all
 * Sync today's data across ALL Indian and US universes.
 * Deduplicates symbols across overlapping universes before fetching.
 */
export async function POST() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const to = new Date()
  const results = {
    india: { symbolsProcessed: 0, inserted: 0, skipped: 0, errors: [] as string[] },
    us: { symbolsProcessed: 0, inserted: 0, skipped: 0, errors: [] as string[] },
  }

  try {
    // ── India: collect unique symbols across all Indian universes ──
    const indiaMembers = await prisma.universeMember.findMany({
      where: { universe: { in: INDIA_UNIVERSES } },
      select: { symbol: true },
    })
    const indiaSymbols = [...new Set(indiaMembers.map((m) => m.symbol.replace(/\.NS$/, "")))]

    const instruments = await prisma.kiteInstrument.findMany({
      where: { tradingsymbol: { in: indiaSymbols }, exchange: "NSE" },
      select: { instrumentToken: true, tradingsymbol: true },
    })
    const tokenMap = new Map(instruments.map((i) => [i.tradingsymbol, i.instrumentToken]))

    for (const symbol of indiaSymbols) {
      const token = tokenMap.get(symbol)
      if (!token) continue

      try {
        const lastDate = await getLastBarDate(symbol, "NSE")
        const from = lastDate
          ? new Date(lastDate.getTime() + 86_400_000)
          : new Date(Date.now() - 30 * 86_400_000)

        if (from >= to) {
          results.india.symbolsProcessed++
          continue
        }

        const candles = await getKiteDailyCandles(token, from, to)
        if (candles.length > 0) {
          const r = await upsertDailyBars({ symbol, exchange: "NSE", candles, source: "kite" })
          results.india.inserted += r.inserted
          results.india.skipped += r.skipped
          if (r.inserted > 0) {
            await updateMovingAverages(symbol, "NSE")
          }
        }
        results.india.symbolsProcessed++

        await new Promise((r) => setTimeout(r, 350))
      } catch (e: any) {
        results.india.errors.push(`${symbol}: ${e.message?.slice(0, 80)}`)
      }
    }

    // ── US: collect unique symbols across all US universes ──
    const usMembers = await prisma.universeMember.findMany({
      where: { universe: { in: US_UNIVERSES } },
      select: { symbol: true },
    })
    const usSymbols = [...new Set(usMembers.map((m) => m.symbol))]

    for (const symbol of usSymbols) {
      try {
        const lastDate = await getLastBarDate(symbol, "US")
        const from = lastDate
          ? new Date(lastDate.getTime() + 86_400_000)
          : new Date(Date.now() - 30 * 86_400_000)

        if (from >= to) {
          results.us.symbolsProcessed++
          continue
        }

        const candles = await getYahooDailyCandles(symbol, from, to)
        if (candles.length > 0) {
          const r = await upsertDailyBars({ symbol, exchange: "US", candles, source: "yahoo" })
          results.us.inserted += r.inserted
          results.us.skipped += r.skipped
          if (r.inserted > 0) {
            await updateMovingAverages(symbol, "US")
          }
        }
        results.us.symbolsProcessed++

        await new Promise((r) => setTimeout(r, 200))
      } catch (e: any) {
        results.us.errors.push(`${symbol}: ${e.message?.slice(0, 80)}`)
      }
    }

    return NextResponse.json({
      success: true,
      india: {
        uniqueSymbols: indiaSymbols.length,
        matched: indiaSymbols.filter((s) => tokenMap.has(s)).length,
        ...results.india,
        errors: results.india.errors.slice(0, 10),
      },
      us: {
        uniqueSymbols: usSymbols.length,
        ...results.us,
        errors: results.us.errors.slice(0, 10),
      },
    })
  } catch (e: any) {
    console.error("[sync/all] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
