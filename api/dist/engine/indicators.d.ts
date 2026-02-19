import type { OHLCVBar } from "../providers/types.js";
/**
 * Simple Moving Average over `period` days using close prices.
 * Returns NaN if insufficient data.
 */
export declare function sma(bars: OHLCVBar[], period: number): number;
/**
 * Exponential Moving Average over `period` days using close prices.
 * Seeded with SMA of the first `period` bars, then applies EMA formula.
 * Returns NaN if insufficient data.
 *
 * NOTE: Prefer using the pre-computed `bar.ema200` from daily_bars
 * instead of calling this on-the-fly.
 */
export declare function ema(bars: OHLCVBar[], period: number): number;
/**
 * Get the stored EMA200 value from the most recent bar.
 * Falls back to computing EMA on-the-fly if no stored value.
 */
export declare function currentEma200(bars: OHLCVBar[]): number;
/**
 * All-Time High from split-adjusted high prices.
 */
export declare function allTimeHigh(bars: OHLCVBar[]): number;
/**
 * Average volume over the last N trading days.
 */
export declare function avgVolume(bars: OHLCVBar[], period?: number): number;
/**
 * Check if there's been a "reset" — at least one daily low
 * below EMA200 anywhere in the bar history.
 *
 * Uses per-bar stored EMA200 values for accurate comparison.
 * The reset can happen before or after the overall ATH — what matters
 * is that the stock dipped below EMA200 at some point, then reclaimed it.
 */
export declare function hasReset(bars: OHLCVBar[]): boolean;
/**
 * Find the date when ATH was reached.
 */
export declare function athDate(bars: OHLCVBar[]): string;
/**
 * Pre-reset ATH — the all-time high from BEFORE the most recent EMA200 break.
 *
 * Uses per-bar stored EMA200 for accurate reset detection.
 * Walks backwards to find the most recent bar where low < its own EMA200,
 * then returns the ATH from all bars up to that point.
 */
export declare function preResetATH(bars: OHLCVBar[]): number;
/**
 * Distance to breakout in percentage.
 * Returns how far the current price is from ATH.
 * Positive = below ATH, Negative = above ATH.
 */
export declare function distanceToBreakout(currentPrice: number, ath: number): number;
//# sourceMappingURL=indicators.d.ts.map