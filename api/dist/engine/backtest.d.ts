/**
 * Backtest Engine — Pre-set ATH + EMA200 Reset Strategy
 *
 * Algorithm (forward-pass, O(n)):
 * 1. Walk forward from earliest to latest bar (date ASC).
 * 2. Break = first day where close < ema200.
 *    Pre-set ATH = max(high) over all bars strictly before this break day.
 * 3. Entry = first day after break where close > preSetATH AND close > ema200.
 * 4. Exit = first day after entry where close < ema200.
 * 5. Exit day becomes the next break. Pre-set ATH for next cycle = max(high)
 *    over all bars strictly before this exit day. Repeat.
 * 6. Entry must be strictly above pre-set ATH (close > preSetATH).
 */
import type { OHLCVBar } from "../providers/types.js";
export type BacktestTradeResult = {
    entryDate: string;
    entryPrice: number;
    exitDate: string | null;
    exitPrice: number | null;
    pnlPercent: number | null;
    daysHeld: number;
    preSetATHAtEntry: number;
};
export type BacktestSummary = {
    totalTrades: number;
    winners: number;
    losers: number;
    winRate: number;
    avgReturnPct: number;
    avgWin: number;
    avgLoss: number;
    maxDrawdownPct: number;
    profitFactor: number;
    sharpeRatio: number;
    avgHoldingDays: number;
    bestTrade: number;
    worstTrade: number;
};
export type BacktestResult = {
    trades: BacktestTradeResult[];
    summary: BacktestSummary;
    fromDate: string;
    toDate: string;
};
/**
 * Run a backtest on a series of daily bars for one stock.
 * Bars must be sorted chronologically (oldest first).
 * Bars with null/undefined ema200 are skipped.
 */
export declare function runBacktest(bars: OHLCVBar[]): BacktestResult;
//# sourceMappingURL=backtest.d.ts.map