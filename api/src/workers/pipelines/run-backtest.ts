/**
 * Backtest Pipeline — runs the backtest engine on all universe stocks
 * and persists results to the backtests + backtest_trades tables.
 *
 * Smart mode: only re-runs a symbol when its bar data has changed.
 * If the existing backtest already covers fromDate→toDate equal to the
 * first→last bar in daily_bars, it is skipped (nothing new to process).
 *
 * This handles both cases automatically:
 *   - New bars added by daily sync  → toDate is ahead  → re-run
 *   - Older bars added by backfill  → fromDate is earlier → re-run
 *   - No change                     → skip
 */

import { getPrisma } from "../../db/prisma.js"
import { runBacktest } from "../../engine/backtest.js"
import type { OHLCVBar } from "../../providers/types.js"

export interface BacktestPipelineResult {
  backtestsPersisted: number
  symbolsProcessed: number
  symbolsSkipped: number
  errors: string[]
}

function getExchange(symbol: string): string {
  if (symbol.endsWith(".NS")) return "NSE"
  return "US"
}

function resolveDbSymbol(symbol: string): { dbSymbol: string; exchange: string } {
  if (symbol.endsWith(".NS")) {
    return { dbSymbol: symbol.replace(/\.NS$/, ""), exchange: "NSE" }
  }
  return { dbSymbol: symbol, exchange: "US" }
}

async function backtestSymbol(
  symbol: string,
  prisma: ReturnType<typeof getPrisma>,
): Promise<{ ok: boolean; trades: number; skipped?: boolean; error?: string }> {
  try {
    const { dbSymbol, exchange } = resolveDbSymbol(symbol)

    // Check bar count and date range without loading all bars first
    const barStats = await prisma.dailyBar.aggregate({
      where: { symbol: dbSymbol, exchange },
      _count: { id: true },
      _min: { date: true },
      _max: { date: true },
    })

    const barCount = barStats._count.id
    if (barCount < 200) {
      return { ok: false, trades: 0, error: `${symbol}: insufficient bars (${barCount})` }
    }

    const firstBarDate = barStats._min.date!.toISOString().split("T")[0]
    const lastBarDate = barStats._max.date!.toISOString().split("T")[0]

    // Check if existing backtest already covers this exact date range
    const existingBacktest = await prisma.backtest.findFirst({
      where: { symbol, strategyName: "Reset & Reclaim" },
      select: { fromDate: true, toDate: true },
    })

    if (existingBacktest) {
      const existingFrom = existingBacktest.fromDate.toISOString().split("T")[0]
      const existingTo = existingBacktest.toDate.toISOString().split("T")[0]

      if (existingFrom === firstBarDate && existingTo === lastBarDate) {
        // Bar range unchanged — nothing to process
        return { ok: true, trades: 0, skipped: true }
      }
    }

    // Bar range changed (new bars at start or end) — load all bars and re-run
    const dbBars = await prisma.dailyBar.findMany({
      where: { symbol: dbSymbol, exchange },
      orderBy: { date: "asc" },
    })

    // Convert to OHLCVBar format
    const bars: OHLCVBar[] = dbBars.map((b) => ({
      symbol,
      exchange,
      date: b.date.toISOString().split("T")[0],
      open: Number(b.open),
      high: Number(b.high),
      low: Number(b.low),
      close: Number(b.close),
      volume: Number(b.volume),
      ema200: b.ema200 != null ? Number(b.ema200) : null,
    }))

    // Run full backtest (stateful algorithm must use all bars)
    const result = runBacktest(bars)

    if (result.trades.length === 0) {
      // Delete any stale record and return — no trades found
      await prisma.backtest.deleteMany({
        where: { symbol, strategyName: "Reset & Reclaim" },
      })
      return { ok: true, trades: 0 }
    }

    const ex = getExchange(symbol)

    // Delete old backtest + cascading trades, then insert fresh
    await prisma.backtest.deleteMany({
      where: { symbol, strategyName: "Reset & Reclaim" },
    })

    const backtest = await prisma.backtest.create({
      data: {
        symbol,
        exchange: ex,
        strategyName: "Reset & Reclaim",
        parametersHash: "v2-ath-ema200",
        fromDate: new Date(result.fromDate),
        toDate: new Date(result.toDate),
        totalTrades: result.summary.totalTrades,
        winRate: result.summary.winRate,
        avgReturn: result.summary.avgReturnPct,
        maxDrawdown: result.summary.maxDrawdownPct,
        profitFactor: result.summary.profitFactor,
        sharpeRatio: result.summary.sharpeRatio,
        trades: result.trades as any,
        summary: result.summary as any,
      },
    })

    await prisma.backtestTrade.createMany({
      data: result.trades.map((t) => ({
        backtestId: backtest.id,
        symbol,
        exchange: ex,
        entryDate: new Date(t.entryDate),
        entryPrice: t.entryPrice,
        exitDate: t.exitDate ? new Date(t.exitDate) : null,
        exitPrice: t.exitPrice,
        pnlPercent: t.pnlPercent,
        daysHeld: t.daysHeld,
        preSetATHAtEntry: t.preSetATHAtEntry,
      })),
    })

    const emoji =
      result.summary.winRate >= 60 ? "🟢" : result.summary.winRate >= 45 ? "🟡" : "🔴"
    console.log(
      `  ${emoji} ${symbol.padEnd(18)} ${result.summary.totalTrades} trades  ${result.summary.winRate}% win  avg ${result.summary.avgReturnPct}%  [${firstBarDate} → ${lastBarDate}]`,
    )

    return { ok: true, trades: result.summary.totalTrades }
  } catch (e: any) {
    return { ok: false, trades: 0, error: `${symbol}: ${e.message?.slice(0, 100)}` }
  }
}

export async function runBacktestPipeline(
  market: "IN" | "US",
): Promise<BacktestPipelineResult> {
  const prisma = getPrisma()

  const members = await prisma.universeMember.findMany()
  const marketMembers = members.filter((m) =>
    market === "IN" ? m.symbol.endsWith(".NS") : !m.symbol.endsWith(".NS"),
  )

  const allSymbols = [...new Set(marketMembers.map((m) => m.symbol))]
  console.log(`[Backtest] Processing ${allSymbols.length} ${market} symbols...`)

  let backtestsPersisted = 0
  let symbolsSkipped = 0
  const errors: string[] = []

  const BATCH_SIZE = 20
  for (let i = 0; i < allSymbols.length; i += BATCH_SIZE) {
    const batch = allSymbols.slice(i, i + BATCH_SIZE)
    const batchResults = await Promise.all(
      batch.map((symbol) => backtestSymbol(symbol, prisma)),
    )

    for (const r of batchResults) {
      if (r.skipped) {
        symbolsSkipped++
      } else if (r.ok && r.trades > 0) {
        backtestsPersisted++
      }
      if (r.error) errors.push(r.error)
    }
  }

  console.log(
    `[Backtest] ${market}: ${backtestsPersisted} updated, ${symbolsSkipped} skipped (already up to date)`,
  )

  return {
    backtestsPersisted,
    symbolsProcessed: allSymbols.length,
    symbolsSkipped,
    errors,
  }
}
