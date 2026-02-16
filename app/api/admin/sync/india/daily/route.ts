import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getKiteDailyCandles } from "@/lib/market-data/kite"
import { upsertDailyBars, getLastBarDate } from "@/lib/market-data/store"

/**
 * POST /api/admin/sync/india/daily
 * Incremental daily sync for India (NSE) — fetches missing bars since last stored date.
 * Body: { universe?: string }
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

    const symbols = members.map((m) => m.symbol.replace(/\.NS$/, ""))
    const instruments = await prisma.kiteInstrument.findMany({
      where: { tradingsymbol: { in: symbols }, exchange: "NSE" },
      select: { instrumentToken: true, tradingsymbol: true },
    })
    const tokenMap = new Map(instruments.map((i) => [i.tradingsymbol, i.instrumentToken]))

    const to = new Date()
    let totalInserted = 0
    let totalSkipped = 0
    const errors: string[] = []

    for (const symbol of symbols) {
      const token = tokenMap.get(symbol)
      if (!token) continue

      try {
        const lastDate = await getLastBarDate(symbol, "NSE")
        // Start from day after last bar, or 30 days ago if no data
        const from = lastDate
          ? new Date(lastDate.getTime() + 86_400_000) // +1 day
          : new Date(Date.now() - 30 * 86_400_000)

        if (from >= to) continue // Already up to date

        const candles = await getKiteDailyCandles(token, from, to)
        const result = await upsertDailyBars({ symbol, exchange: "NSE", candles, source: "kite" })
        totalInserted += result.inserted
        totalSkipped += result.skipped

        // Rate limit
        await new Promise((r) => setTimeout(r, 350))
      } catch (e: any) {
        errors.push(`${symbol}: ${e.message?.slice(0, 100)}`)
      }
    }

    return NextResponse.json({
      success: true,
      universe,
      symbolsProcessed: symbols.filter((s) => tokenMap.has(s)).length,
      totalInserted,
      totalSkipped,
      errors: errors.slice(0, 20),
    })
  } catch (e: any) {
    console.error("[sync/india/daily] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
