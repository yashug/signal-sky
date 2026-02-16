import type { OHLCVBar } from "../providers/types.js"

/**
 * Simple Moving Average over `period` days using close prices.
 * Returns NaN if insufficient data.
 */
export function sma(bars: OHLCVBar[], period: number): number {
  if (bars.length < period) return NaN
  const recent = bars.slice(-period)
  const sum = recent.reduce((acc, b) => acc + b.close, 0)
  return sum / period
}

/**
 * Exponential Moving Average over `period` days using close prices.
 * Seeded with SMA of the first `period` bars, then applies EMA formula.
 * Returns NaN if insufficient data.
 *
 * NOTE: Prefer using the pre-computed `bar.ema200` from daily_bars
 * instead of calling this on-the-fly.
 */
export function ema(bars: OHLCVBar[], period: number): number {
  if (bars.length < period) return NaN

  const multiplier = 2 / (period + 1)

  // Seed: SMA of first `period` bars
  let emaValue = 0
  for (let i = 0; i < period; i++) {
    emaValue += bars[i].close
  }
  emaValue /= period

  // Apply EMA formula for remaining bars
  for (let i = period; i < bars.length; i++) {
    emaValue = bars[i].close * multiplier + emaValue * (1 - multiplier)
  }

  return emaValue
}

/**
 * Get the stored EMA200 value from the most recent bar.
 * Falls back to computing EMA on-the-fly if no stored value.
 */
export function currentEma200(bars: OHLCVBar[]): number {
  if (bars.length === 0) return NaN
  const last = bars[bars.length - 1]
  if (last.ema200 != null) return last.ema200
  // Fallback: compute on-the-fly
  return ema(bars, 200)
}

/**
 * All-Time High from split-adjusted high prices.
 */
export function allTimeHigh(bars: OHLCVBar[]): number {
  if (bars.length === 0) return NaN
  return Math.max(...bars.map((b) => {
    const adj = b.adjustmentFactor ?? 1
    return b.high * adj
  }))
}

/**
 * Average volume over the last N trading days.
 */
export function avgVolume(bars: OHLCVBar[], period: number = 20): number {
  if (bars.length === 0) return 0
  const recent = bars.slice(-period)
  return recent.reduce((acc, b) => acc + b.volume, 0) / recent.length
}

/**
 * Check if there's been a "reset" — at least one daily low
 * below EMA200 anywhere in the bar history.
 *
 * Uses per-bar stored EMA200 values for accurate comparison.
 * The reset can happen before or after the overall ATH — what matters
 * is that the stock dipped below EMA200 at some point, then reclaimed it.
 */
export function hasReset(bars: OHLCVBar[]): boolean {
  return bars.some((b) => {
    const ema = b.ema200
    if (ema == null) return false
    return b.low < ema
  })
}

/**
 * Find the date when ATH was reached.
 */
export function athDate(bars: OHLCVBar[]): string {
  if (bars.length === 0) return ""
  let maxPrice = -Infinity
  let maxDate = ""
  for (const bar of bars) {
    const adj = bar.adjustmentFactor ?? 1
    const adjustedHigh = bar.high * adj
    if (adjustedHigh > maxPrice) {
      maxPrice = adjustedHigh
      maxDate = bar.date
    }
  }
  return maxDate
}

/**
 * Pre-reset ATH — the all-time high from BEFORE the most recent EMA200 break.
 *
 * Uses per-bar stored EMA200 for accurate reset detection.
 * Walks backwards to find the most recent bar where low < its own EMA200,
 * then returns the ATH from all bars up to that point.
 */
export function preResetATH(bars: OHLCVBar[]): number {
  if (bars.length === 0) return NaN

  // Walk backwards to find the most recent bar where low < its own EMA200
  let resetIdx = -1
  for (let i = bars.length - 1; i >= 0; i--) {
    const ema = bars[i].ema200
    if (ema != null && bars[i].low < ema) {
      resetIdx = i
      break
    }
  }

  if (resetIdx <= 0) return allTimeHigh(bars) // No reset found, use overall ATH

  // ATH from all bars up to and including the reset point
  const preBars = bars.slice(0, resetIdx + 1)
  return allTimeHigh(preBars)
}

/**
 * Distance to breakout in percentage.
 * Returns how far the current price is from ATH.
 * Positive = below ATH, Negative = above ATH.
 */
export function distanceToBreakout(currentPrice: number, ath: number): number {
  if (ath <= 0) return Infinity
  return ((ath - currentPrice) / currentPrice) * 100
}
