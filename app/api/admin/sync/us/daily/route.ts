import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars, getLastBarDate } from "@/lib/market-data/store"

/**
 * POST /api/admin/sync/us/daily
 * Incremental daily sync for US — fetches missing bars since last stored date.
 * Body: { symbols?: string[], universe?: string }
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  let symbols: string[] = body.symbols ?? []

  if (symbols.length === 0) {
    const universe = body.universe ?? "sp100"
    const members = await prisma.universeMember.findMany({
      where: { universe },
      select: { symbol: true },
    })
    symbols = members.map((m) => m.symbol)
  }

  if (symbols.length === 0) {
    return NextResponse.json({ error: "No symbols to sync" }, { status: 400 })
  }

  const to = new Date()
  let totalInserted = 0
  let totalSkipped = 0
  const errors: string[] = []

  for (const symbol of symbols) {
    try {
      const lastDate = await getLastBarDate(symbol, "US")
      const from = lastDate
        ? new Date(lastDate.getTime() + 86_400_000)
        : new Date(Date.now() - 30 * 86_400_000)

      if (from >= to) continue

      const candles = await getYahooDailyCandles(symbol, from, to)
      const result = await upsertDailyBars({ symbol, exchange: "US", candles, source: "yahoo" })
      totalInserted += result.inserted
      totalSkipped += result.skipped

      await new Promise((r) => setTimeout(r, 200))
    } catch (e: any) {
      errors.push(`${symbol}: ${e.message?.slice(0, 100)}`)
    }
  }

  return NextResponse.json({
    success: true,
    symbolsProcessed: symbols.length,
    totalInserted,
    totalSkipped,
    errors: errors.slice(0, 20),
  })
}
