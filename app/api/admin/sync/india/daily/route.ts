import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars, getLastBarDate, updateMovingAverages } from "@/lib/market-data/store"

/**
 * POST /api/admin/sync/india/daily
 * Incremental daily sync for India (NSE) — fetches missing bars since last stored date.
 * Uses Yahoo Finance for .NS symbols.
 * Body: { universe?: string }
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

  try {
    const members = await prisma.universeMember.findMany({
      where: { universe },
      select: { symbol: true },
    })

    const to = new Date()
    let totalInserted = 0
    let totalSkipped = 0
    const errors: string[] = []

    for (const member of members) {
      const yahooSymbol = member.symbol                    // "RELIANCE.NS" — for Yahoo fetch
      const dbSymbol = member.symbol.replace(/\.NS$/, "") // "RELIANCE"    — for DB ops

      try {
        const lastDate = await getLastBarDate(dbSymbol, "NSE")
        // Start from day after last bar, or 30 days ago if no data
        const from = lastDate
          ? new Date(lastDate.getTime() + 86_400_000) // +1 day
          : new Date(Date.now() - 30 * 86_400_000)

        if (from >= to) continue // Already up to date

        const candles = await getYahooDailyCandles(yahooSymbol, from, to)
        const result = await upsertDailyBars({ symbol: dbSymbol, exchange: "NSE", candles, source: "yahoo" })
        totalInserted += result.inserted
        totalSkipped += result.skipped

        if (result.inserted > 0) {
          await updateMovingAverages(dbSymbol, "NSE")
        }

        // Rate limit
        await new Promise((r) => setTimeout(r, 200))
      } catch (e: any) {
        errors.push(`${dbSymbol}: ${e.message?.slice(0, 100)}`)
      }
    }

    return NextResponse.json({
      success: true,
      universe,
      symbolsProcessed: members.length,
      totalInserted,
      totalSkipped,
      errors: errors.slice(0, 20),
    })
  } catch (e: any) {
    console.error("[sync/india/daily] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
