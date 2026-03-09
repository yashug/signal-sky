import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

const INDIA_UNIVERSES = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100", "niftybank",
]
const US_UNIVERSES = ["sp100", "nasdaq100"]

type Heat = "breakout" | "boiling" | "simmering" | "cooling"

function computeHeat(close: number, ath: number): Heat {
  if (ath <= 0) return "cooling"
  const dist = (ath - close) / ath * 100
  if (dist <= 0) return "breakout"
  if (dist <= 2) return "boiling"
  if (dist <= 5) return "simmering"
  return "cooling"
}

/**
 * Run the signal scan for a single market in-process.
 * Uses batch SQL queries instead of per-symbol round trips.
 */
async function runScanForMarket(market: "india" | "us") {
  const universes = market === "india" ? INDIA_UNIVERSES : US_UNIVERSES
  const exchange = market === "india" ? "NSE" : "US"

  // Get all unique symbols for this market (with .NS suffix for NSE)
  const memberRows = await prisma.universeMember.findMany({
    where: { universe: { in: universes } },
    select: { symbol: true, universe: true },
  })
  const allMembers = memberRows // may have duplicates across universes

  // Unique db symbols (strip .NS for DB queries)
  const symbolToDb = new Map<string, string>() // memberSymbol → dbSymbol
  for (const m of allMembers) {
    const db = m.symbol.replace(/\.NS$/, "")
    symbolToDb.set(m.symbol, db)
  }
  const uniqueDbSymbols = [...new Set(symbolToDb.values())]

  if (uniqueDbSymbols.length === 0) {
    return { exchange, total: 0, signals: 0 }
  }

  // Single batch query: latest bar + ATH + avg_vol_20 per symbol
  type BarRow = {
    symbol: string
    close: string
    ema200: string | null
    volume: string
    ath: string
    avg_vol: string | null
  }

  const rows = (await prisma.$queryRawUnsafe(
    `
    WITH
    latest AS (
      SELECT DISTINCT ON (symbol)
        symbol, close, ema200, volume
      FROM daily_bars
      WHERE exchange = $1 AND symbol = ANY($2::text[])
      ORDER BY symbol, date DESC
    ),
    ath_data AS (
      SELECT symbol, MAX(high) AS ath
      FROM daily_bars
      WHERE exchange = $1 AND symbol = ANY($2::text[])
      GROUP BY symbol
    ),
    vol20 AS (
      SELECT db.symbol, AVG(v.volume::numeric) AS avg_vol
      FROM (SELECT DISTINCT symbol FROM daily_bars WHERE exchange = $1 AND symbol = ANY($2::text[])) db
      CROSS JOIN LATERAL (
        SELECT volume
        FROM daily_bars
        WHERE symbol = db.symbol AND exchange = $1
        ORDER BY date DESC
        LIMIT 20
      ) v
      GROUP BY db.symbol
    )
    SELECT
      l.symbol,
      l.close::float AS close,
      l.ema200::float AS ema200,
      l.volume::bigint AS volume,
      a.ath::float AS ath,
      v.avg_vol::float AS avg_vol
    FROM latest l
    JOIN ath_data a ON a.symbol = l.symbol
    LEFT JOIN vol20 v ON v.symbol = l.symbol
    WHERE l.ema200 IS NOT NULL
    `,
    exchange,
    uniqueDbSymbols
  )) as BarRow[]

  // Build reverse map: dbSymbol → memberSymbol (first occurrence)
  const dbToMember = new Map<string, string>()
  for (const [member, db] of symbolToDb.entries()) {
    if (!dbToMember.has(db)) dbToMember.set(db, member)
  }

  // Deactivate all existing signals for this exchange
  await prisma.signal.updateMany({
    where: { exchange, isActive: true },
    data: { isActive: false },
  })

  const signalDate = new Date(new Date().toISOString().split("T")[0]) // date only
  const signalsToCreate: any[] = []

  for (const row of rows) {
    const close = Number(row.close)
    const ema200 = Number(row.ema200)
    const ath = Number(row.ath)
    const volume = Number(row.volume)
    const avgVol = row.avg_vol != null ? Number(row.avg_vol) : null

    // Only emit signal for stocks above EMA200
    if (close <= ema200 || ath <= 0) continue

    const memberSymbol = dbToMember.get(row.symbol) ?? row.symbol
    const heat = computeHeat(close, ath)
    const distancePct = (ath - close) / ath * 100
    const volSurge = avgVol && avgVol > 0 ? volume / avgVol : null

    signalsToCreate.push({
      symbol: memberSymbol,
      exchange,
      strategyName: "Reset & Reclaim",
      heat,
      price: close,
      ath,
      ema200,
      distancePct,
      volumeSurge: volSurge,
      volumeToday: BigInt(Math.round(volume)),
      volumeAvg20: avgVol ? BigInt(Math.round(avgVol)) : null,
      signalDate,
      isActive: true,
      details: {},
    })
  }

  if (signalsToCreate.length > 0) {
    await prisma.signal.createMany({ data: signalsToCreate })
  }

  // Update MarketHealth for each universe
  // Build universe → dbSymbols mapping
  const universeDbSymbols = new Map<string, Set<string>>()
  for (const m of allMembers) {
    if (!universeDbSymbols.has(m.universe)) universeDbSymbols.set(m.universe, new Set())
    universeDbSymbols.get(m.universe)!.add(m.symbol.replace(/\.NS$/, ""))
  }

  // Build a map of dbSymbol → row for quick lookup
  const rowMap = new Map(rows.map((r) => [r.symbol, r]))

  for (const universe of universes) {
    const dbSyms = universeDbSymbols.get(universe) ?? new Set()
    const total = dbSyms.size
    if (total === 0) continue

    let aboveEma200 = 0
    for (const db of dbSyms) {
      const r = rowMap.get(db)
      if (r && Number(r.ema200) != null && Number(r.close) > Number(r.ema200)) {
        aboveEma200++
      }
    }
    const pctAbove = total > 0 ? (aboveEma200 / total) * 100 : 0

    await prisma.marketHealth.upsert({
      where: { universe_date: { universe, date: signalDate } },
      update: { totalStocks: total, aboveEma200, pctAbove },
      create: { universe, date: signalDate, totalStocks: total, aboveEma200, pctAbove },
    })
  }

  return { exchange, total: uniqueDbSymbols.length, signals: signalsToCreate.length }
}

/**
 * POST /api/admin/scan/run
 * Runs the strategy scan pipeline in-process using existing DB bars.
 * Body: { market?: "india" | "us" | "all" }
 *
 * Replaces the old exec() call to the deleted Fastify cron-pipeline.ts worker.
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const marketRaw = body.market
  const market: "india" | "us" | "all" =
    marketRaw === "us" ? "us" : marketRaw === "all" ? "all" : "india"

  try {
    const results: Awaited<ReturnType<typeof runScanForMarket>>[] = []

    if (market === "all") {
      const [indiaResult, usResult] = await Promise.all([
        runScanForMarket("india"),
        runScanForMarket("us"),
      ])
      results.push(indiaResult, usResult)
    } else {
      results.push(await runScanForMarket(market))
    }

    const totalSignals = results.reduce((sum, r) => sum + r.signals, 0)
    const totalSymbols = results.reduce((sum, r) => sum + r.total, 0)

    try {
      revalidateTag("signals", { expire: 0 })
      revalidateTag("market-health", { expire: 0 })
    } catch (e: any) {
      console.error("[scan/run] revalidation failed:", e.message)
    }

    const marketLabel = market === "all" ? "India + US" : market.toUpperCase()
    console.log(`[scan/run] ${marketLabel}: ${totalSignals} signals from ${totalSymbols} symbols`)

    return NextResponse.json({
      success: true,
      message: `${marketLabel} scan complete — ${totalSignals} active signals from ${totalSymbols} symbols.`,
      market,
      signals: totalSignals,
      symbolsScanned: totalSymbols,
      results,
    })
  } catch (e: any) {
    console.error("[scan/run] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
