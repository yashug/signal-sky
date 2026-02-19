/**
 * Yahoo Finance adapter for US market data.
 * Uses yahoo-finance2 for daily OHLCV candles.
 */

import YahooFinance from "yahoo-finance2"
import type { DailyCandle } from "./types"
import { toUTCMidnight } from "./normalize"

// yahoo-finance2 v3 requires instantiation
const yf = new (YahooFinance as any)()

// Yahoo uses hyphens for share classes (BRK-B), DB stores dots (BRK.B)
function toYahooSymbol(symbol: string): string {
  if (symbol.endsWith(".NS")) return symbol
  return symbol.replace(/\.([A-Z])$/, "-$1")
}

/**
 * Fetch daily candles for a US stock symbol from Yahoo Finance.
 *
 * @param symbol - Ticker symbol (e.g. "AAPL", "NVDA")
 * @param from - start date
 * @param to - end date
 * @returns Array of DailyCandle with adjFactor computed from adjClose/close
 */
export async function getYahooDailyCandles(
  symbol: string,
  from: Date,
  to: Date,
): Promise<DailyCandle[]> {
  const result = await yf.chart(toYahooSymbol(symbol), {
    period1: from,
    period2: to,
    interval: "1d",
  })

  if (!result?.quotes?.length) {
    return []
  }

  const candles: DailyCandle[] = []
  for (const q of result.quotes as any[]) {
    if (!q.date || q.open == null || q.high == null || q.low == null || q.close == null) {
      continue
    }

    const adjFactor =
      q.adjclose != null && q.close > 0
        ? q.adjclose / q.close
        : 1.0

    candles.push({
      date: toUTCMidnight(q.date),
      open: q.open,
      high: q.high,
      low: q.low,
      close: q.close,
      volume: q.volume ?? 0,
      adjFactor: Math.round(adjFactor * 1_000_000) / 1_000_000,
    })
  }

  return candles
}

/** Batch fetch Yahoo candles for multiple symbols sequentially */
export async function batchFetchYahooCandles(
  symbols: string[],
  from: Date,
  to: Date,
  opts: { delayMs?: number; onProgress?: (symbol: string, i: number, total: number) => void } = {},
): Promise<Map<string, DailyCandle[]>> {
  const results = new Map<string, DailyCandle[]>()
  const delayMs = opts.delayMs ?? 200

  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i]
    opts.onProgress?.(symbol, i + 1, symbols.length)

    try {
      const candles = await getYahooDailyCandles(symbol, from, to)
      results.set(symbol, candles)
    } catch (e: any) {
      console.error(`[yahoo] Failed to fetch ${symbol}:`, e.message)
      results.set(symbol, [])
    }

    if (i < symbols.length - 1 && delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }

  return results
}
