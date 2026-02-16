/**
 * Reusable scan pipeline — runs the strategy scanner against DB data
 * and persists signals, indicators, and market health.
 *
 * Used by both the CLI scanner and the cron pipeline.
 */

import { DatabaseProvider } from "../../providers/database.js"
import { ScanService, type ScanResult } from "../../services/scan.js"
import { getPrisma } from "../../db/prisma.js"
import { currentEma200, allTimeHigh, avgVolume, athDate as getAthDate } from "../../engine/indicators.js"
import { UNIVERSE_GROUPS, type UniverseGroupKey } from "../../config/universes.js"
import type { DataProvider } from "../../providers/types.js"

export interface ScanPipelineResult {
  signalsPersisted: number
  indicatorsUpserted: number
  symbolsScanned: number
  errors: string[]
}

function getExchange(symbol: string): string {
  if (symbol.endsWith(".NS")) return "NSE"
  return "NASDAQ"
}

/**
 * Persist a single scan result (indicator + signal).
 */
async function persistResult(
  result: ScanResult,
  todayDate: Date,
  universes: string[],
  prisma: ReturnType<typeof getPrisma>,
): Promise<{ indicatorOk: boolean; signalOk: boolean; aboveEma: boolean; error?: string }> {
  if (result.error || !result.bars || !result.quote) {
    return { indicatorOk: false, signalOk: false, aboveEma: false, error: result.error }
  }

  const exchange = getExchange(result.symbol)

  // Compute indicator values from stored data
  const ema200Val = currentEma200(result.bars)
  const athVal = allTimeHigh(result.bars)
  const athDateVal = getAthDate(result.bars)
  const avgVol20 = avgVolume(result.bars, 20)
  const isAboveEma200 = result.quote.price > ema200Val

  let indicatorOk = false
  let signalOk = false

  // Upsert indicator
  try {
    await prisma.indicator.upsert({
      where: { symbol_exchange_date: { symbol: result.symbol, exchange, date: todayDate } },
      create: {
        symbol: result.symbol,
        exchange,
        date: todayDate,
        ema200: isNaN(ema200Val) ? null : ema200Val,
        ath: isNaN(athVal) ? null : athVal,
        athDate: athDateVal ? new Date(athDateVal) : null,
        avgVol20: BigInt(Math.round(avgVol20)),
        aboveEma200: isAboveEma200,
      },
      update: {
        ema200: isNaN(ema200Val) ? null : ema200Val,
        ath: isNaN(athVal) ? null : athVal,
        athDate: athDateVal ? new Date(athDateVal) : null,
        avgVol20: BigInt(Math.round(avgVol20)),
        aboveEma200: isAboveEma200,
      },
    })
    indicatorOk = true
  } catch {
    // Non-fatal
  }

  // Persist signal
  if (result.signal) {
    const sig = result.signal
    try {
      await prisma.signal.deleteMany({ where: { symbol: result.symbol } })
      await prisma.signal.create({
        data: {
          symbol: sig.symbol,
          exchange: sig.exchange,
          strategyName: sig.strategyName,
          heat: sig.heat as any,
          price: sig.price,
          ath: sig.ath,
          ema200: sig.ema200,
          distancePct: sig.distanceToBreakout,
          volumeSurge: sig.volumeSurge,
          volumeToday: BigInt(Math.round(sig.volumeToday)),
          volumeAvg20: BigInt(Math.round(sig.volumeAvg20)),
          signalDate: todayDate,
          details: sig.details ?? {},
          isActive: true,
        },
      })
      signalOk = true

      const heat = sig.heat === "breakout" ? "🟢" : sig.heat === "boiling" ? "🔴" : sig.heat === "simmering" ? "🟡" : "🔵"
      console.log(
        `  ${heat} ${sig.symbol.padEnd(18)} ${sig.heat.padEnd(10)} dist: ${sig.distanceToBreakout.toFixed(1)}%  vol: ${sig.volumeSurge.toFixed(1)}x`,
      )
    } catch (e: any) {
      return { indicatorOk, signalOk: false, aboveEma: isAboveEma200, error: `[Signal] ${result.symbol}: ${e.message?.slice(0, 80)}` }
    }
  }

  return { indicatorOk, signalOk, aboveEma: isAboveEma200 }
}

/**
 * Run the strategy scan for a given market.
 * @param market "IN" for Indian stocks, "US" for US stocks
 * @param provider Optional custom DataProvider (defaults to DatabaseProvider)
 */
export async function runScanPipeline(
  market: "IN" | "US",
  provider?: DataProvider,
): Promise<ScanPipelineResult> {
  const prisma = getPrisma()
  const dataProvider = provider ?? new DatabaseProvider()
  const scanner = new ScanService(dataProvider)

  // Fetch symbols for this market
  const members = await prisma.universeMember.findMany()
  const marketMembers = members.filter((m) =>
    market === "IN" ? m.symbol.endsWith(".NS") : !m.symbol.endsWith(".NS"),
  )

  if (marketMembers.length === 0) {
    return { signalsPersisted: 0, indicatorsUpserted: 0, symbolsScanned: 0, errors: ["No universe members found"] }
  }

  // Deduplicate symbols
  const allSymbols = [...new Set(marketMembers.map((m) => m.symbol))]
  console.log(`[Scan] Scanning ${allSymbols.length} ${market} symbols...`)

  // Build symbol → universes map (a symbol can appear in multiple universes)
  const symbolUniverses: Record<string, string[]> = {}
  for (const m of marketMembers) {
    if (!symbolUniverses[m.symbol]) symbolUniverses[m.symbol] = []
    if (!symbolUniverses[m.symbol].includes(m.universe)) {
      symbolUniverses[m.symbol].push(m.universe)
    }
  }

  // Step 1: Scan all symbols (parallel batches of 20)
  const t0 = Date.now()
  const results = await scanner.scanUniverse(allSymbols, 20)
  console.log(`[Scan] Strategy evaluation done in ${((Date.now() - t0) / 1000).toFixed(1)}s`)

  // Step 2: Delete old signals for symbols that no longer have a signal
  const symbolsWithSignal = new Set(results.filter((r) => r.signal).map((r) => r.symbol))
  const symbolsWithoutSignal = allSymbols.filter((s) => !symbolsWithSignal.has(s))
  if (symbolsWithoutSignal.length > 0) {
    try {
      await prisma.signal.deleteMany({ where: { symbol: { in: symbolsWithoutSignal } } })
    } catch {
      // Non-fatal
    }
  }

  // Step 3: Persist indicators and signals (parallel batches of 10)
  const today = new Date().toISOString().split("T")[0]
  const todayDate = new Date(today)
  let signalsPersisted = 0
  let indicatorsUpserted = 0
  const errors: string[] = []

  // Track above-EMA200 counts per universe for market health
  const healthCounts: Record<string, { above: number; total: number }> = {}

  const PERSIST_BATCH = 10
  for (let i = 0; i < results.length; i += PERSIST_BATCH) {
    const batch = results.slice(i, i + PERSIST_BATCH)
    const batchResults = await Promise.all(
      batch.map((r) => persistResult(r, todayDate, symbolUniverses[r.symbol] ?? [], prisma)),
    )

    for (let j = 0; j < batch.length; j++) {
      const result = batch[j]
      const pr = batchResults[j]

      if (pr.indicatorOk) indicatorsUpserted++
      if (pr.signalOk) signalsPersisted++
      if (pr.error) errors.push(pr.error)

      // Count for market health across all universes this symbol belongs to
      const univs = symbolUniverses[result.symbol] ?? []
      for (const univ of univs) {
        if (!healthCounts[univ]) healthCounts[univ] = { above: 0, total: 0 }
        healthCounts[univ].total++
        if (pr.aboveEma) healthCounts[univ].above++
      }
    }
  }

  console.log(`[Scan] Persisted ${signalsPersisted} signals, ${indicatorsUpserted} indicators`)

  // Step 4: Persist Market Health
  for (const [universe, counts] of Object.entries(healthCounts)) {
    if (counts.total === 0) continue
    const pctAbove = (counts.above / counts.total) * 100
    try {
      await prisma.marketHealth.upsert({
        where: { universe_date: { universe, date: todayDate } },
        create: { universe, date: todayDate, totalStocks: counts.total, aboveEma200: counts.above, pctAbove },
        update: { totalStocks: counts.total, aboveEma200: counts.above, pctAbove },
      })
    } catch {
      // Non-fatal
    }
  }

  // Composite indices
  const compositeKeys: UniverseGroupKey[] = ["nifty100", "nifty200", "niftymidcap100", "niftysmallcap100"]
  for (const key of compositeKeys) {
    const group = UNIVERSE_GROUPS[key]
    let above = 0, total = 0
    for (const tag of group.tags) {
      const c = healthCounts[tag]
      if (c) { above += c.above; total += c.total }
    }
    if (total === 0) continue
    const pctAbove = (above / total) * 100
    try {
      await prisma.marketHealth.upsert({
        where: { universe_date: { universe: key, date: todayDate } },
        create: { universe: key, date: todayDate, totalStocks: total, aboveEma200: above, pctAbove },
        update: { totalStocks: total, aboveEma200: above, pctAbove },
      })
    } catch {
      // Non-fatal
    }
  }

  return { signalsPersisted, indicatorsUpserted, symbolsScanned: allSymbols.length, errors }
}
