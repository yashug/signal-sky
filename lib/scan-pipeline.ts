/**
 * In-process signal scan pipeline.
 * Shared by /api/admin/scan/run and /api/cron/*-eod routes.
 */

import { prisma } from "@/lib/prisma"

export const INDIA_UNIVERSES = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100", "niftybank",
]
export const US_UNIVERSES = ["sp100", "nasdaq100"]

type Heat = "breakout" | "boiling" | "simmering" | "cooling"

function computeHeat(close: number, ath: number): Heat {
  if (ath <= 0) return "cooling"
  const dist = ((ath - close) / ath) * 100
  if (dist <= 0) return "breakout"
  if (dist <= 2) return "boiling"
  if (dist <= 5) return "simmering"
  return "cooling"
}

type BarRow = {
  symbol: string
  close: string
  ema200: string | null
  volume: string
  ath: string
  ath_date: string | null
  avg_vol: string | null
}

export async function runScanForMarket(market: "india" | "us") {
  const universes = market === "india" ? INDIA_UNIVERSES : US_UNIVERSES
  const exchange = market === "india" ? "NSE" : "US"

  const memberRows = await prisma.universeMember.findMany({
    where: { universe: { in: universes } },
    select: { symbol: true, universe: true },
  })

  const symbolToDb = new Map<string, string>()
  for (const m of memberRows) {
    symbolToDb.set(m.symbol, m.symbol.replace(/\.NS$/, ""))
  }
  const uniqueDbSymbols = [...new Set(symbolToDb.values())]

  if (uniqueDbSymbols.length === 0) {
    return { exchange, total: 0, signals: 0 }
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
    -- Detect the day price first crossed FROM above EMA200 TO below EMA200
    -- (the start of the most recent "reset" period)
    bar_states AS (
      SELECT
        symbol, date,
        (close::numeric >= ema200::numeric) AS above_ema,
        LAG(close::numeric >= ema200::numeric) OVER (PARTITION BY symbol ORDER BY date) AS prev_above_ema
      FROM daily_bars
      WHERE exchange = $1 AND symbol = ANY($2::text[]) AND ema200 IS NOT NULL
    ),
    break_start AS (
      SELECT DISTINCT ON (symbol)
        symbol, date AS break_start_date
      FROM bar_states
      WHERE NOT above_ema AND prev_above_ema
      ORDER BY symbol, date DESC
    ),
    -- Pre-set ATH = max high from before the most recent reset
    ath_before_break AS (
      SELECT db.symbol, MAX(db.high) AS ath
      FROM daily_bars db
      JOIN break_start bs ON bs.symbol = db.symbol AND db.date < bs.break_start_date
      WHERE db.exchange = $1
      GROUP BY db.symbol
    ),
    ath_data AS (
      SELECT DISTINCT ON (a.symbol)
        a.symbol, a.ath, db.date AS ath_date
      FROM ath_before_break a
      JOIN daily_bars db ON db.symbol = a.symbol AND db.exchange = $1
        AND db.high = a.ath
      JOIN break_start bs ON bs.symbol = a.symbol AND db.date < bs.break_start_date
      ORDER BY a.symbol, db.date DESC
    ),
    vol20 AS (
      SELECT db.symbol, AVG(v.volume::numeric) AS avg_vol
      FROM (SELECT DISTINCT symbol FROM daily_bars WHERE exchange = $1 AND symbol = ANY($2::text[])) db
      CROSS JOIN LATERAL (
        SELECT volume FROM daily_bars
        WHERE symbol = db.symbol AND exchange = $1
        ORDER BY date DESC LIMIT 20
      ) v
      GROUP BY db.symbol
    )
    SELECT
      l.symbol,
      l.close::float AS close,
      l.ema200::float AS ema200,
      l.volume::bigint AS volume,
      a.ath::float AS ath,
      a.ath_date::text AS ath_date,
      v.avg_vol::float AS avg_vol
    FROM latest l
    JOIN ath_data a ON a.symbol = l.symbol
    LEFT JOIN vol20 v ON v.symbol = l.symbol
    WHERE l.ema200 IS NOT NULL
    `,
    exchange,
    uniqueDbSymbols
  )) as BarRow[]

  const dbToMember = new Map<string, string>()
  for (const [member, db] of symbolToDb.entries()) {
    if (!dbToMember.has(db)) dbToMember.set(db, member)
  }

  await prisma.signal.updateMany({
    where: { exchange, isActive: true },
    data: { isActive: false },
  })

  const signalDate = new Date(new Date().toISOString().split("T")[0])
  const signalsToCreate: any[] = []

  for (const row of rows) {
    const close = Number(row.close)
    const ema200 = Number(row.ema200)
    const ath = Number(row.ath)
    const volume = Number(row.volume)
    const avgVol = row.avg_vol != null ? Number(row.avg_vol) : null

    if (close <= ema200 || ath <= 0) continue

    const distancePct = ((ath - close) / ath) * 100

    const memberSymbol = dbToMember.get(row.symbol) ?? row.symbol
    const heat = computeHeat(close, ath)
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
      details: row.ath_date ? { preSetATHDate: row.ath_date.split("T")[0] } : {},
    })
  }

  let createdSignals: Array<{ id: string; symbol: string; exchange: string; heat: string; price: number; ath: number; ema200: number; distancePct: number }> = []
  if (signalsToCreate.length > 0) {
    await prisma.signal.createMany({ data: signalsToCreate })
    // Fetch newly created signals so callers can dispatch alerts with IDs
    const freshSignals = await prisma.signal.findMany({
      where: { exchange, isActive: true, signalDate },
      select: { id: true, symbol: true, exchange: true, heat: true, price: true, ath: true, ema200: true, distancePct: true },
    })
    createdSignals = freshSignals.map((s) => ({
      id: s.id,
      symbol: s.symbol,
      exchange: s.exchange,
      heat: s.heat as string,
      price: Number(s.price),
      ath: Number(s.ath),
      ema200: Number(s.ema200),
      distancePct: Number(s.distancePct),
    }))
  }

  // Update MarketHealth per universe
  const universeDbSymbols = new Map<string, Set<string>>()
  for (const m of memberRows) {
    if (!universeDbSymbols.has(m.universe)) universeDbSymbols.set(m.universe, new Set())
    universeDbSymbols.get(m.universe)!.add(m.symbol.replace(/\.NS$/, ""))
  }
  const rowMap = new Map(rows.map((r) => [r.symbol, r]))

  for (const universe of universes) {
    const dbSyms = universeDbSymbols.get(universe) ?? new Set()
    const total = dbSyms.size
    if (total === 0) continue

    let aboveEma200 = 0
    for (const db of dbSyms) {
      const r = rowMap.get(db)
      if (r && Number(r.close) > Number(r.ema200)) aboveEma200++
    }
    const pctAbove = total > 0 ? (aboveEma200 / total) * 100 : 0

    await prisma.marketHealth.upsert({
      where: { universe_date: { universe, date: signalDate } },
      update: { totalStocks: total, aboveEma200, pctAbove },
      create: { universe, date: signalDate, totalStocks: total, aboveEma200, pctAbove },
    })
  }

  return { exchange, total: uniqueDbSymbols.length, signals: signalsToCreate.length, createdSignals }
}
