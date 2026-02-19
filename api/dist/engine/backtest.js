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
function tradingDaysBetween(a, b) {
    const msPerDay = 86400000;
    return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}
/**
 * Run a backtest on a series of daily bars for one stock.
 * Bars must be sorted chronologically (oldest first).
 * Bars with null/undefined ema200 are skipped.
 */
export function runBacktest(bars) {
    const trades = [];
    // Filter to bars that have ema200
    const validBars = bars.filter((b) => b.ema200 != null);
    if (validBars.length === 0) {
        return { trades: [], summary: emptySummary(), fromDate: "", toDate: "" };
    }
    // Running max high over all bars seen so far (used to compute preSetATH)
    let runningMaxHigh = 0;
    // Track max high of all bars with valid ema200 seen before break index
    // But we also need highs from bars WITHOUT ema200 for the ATH calculation
    // Use ALL bars (including those without ema200) for max high tracking
    let allBarsMaxHigh = 0;
    let allBarsIdx = 0; // pointer into original bars array
    let state = "seeking_break";
    let preSetATH = 0;
    let entryDate = "";
    let entryPrice = 0;
    let entryATH = 0;
    // For preSetATH: track max(high) over ALL bars (including no-ema200) before the break
    // We'll use the full bars array and track a running max
    const maxHighUpTo = new Array(bars.length);
    let runMax = 0;
    for (let i = 0; i < bars.length; i++) {
        maxHighUpTo[i] = runMax;
        runMax = Math.max(runMax, bars[i].high);
    }
    // Map validBars back to original indices for maxHighUpTo lookup
    const validBarOrigIdx = [];
    let vi = 0;
    for (let i = 0; i < bars.length; i++) {
        if (bars[i].ema200 != null) {
            validBarOrigIdx.push(i);
        }
    }
    for (let i = 0; i < validBars.length; i++) {
        const bar = validBars[i];
        const ema = bar.ema200;
        const origIdx = validBarOrigIdx[i];
        if (state === "seeking_break") {
            if (bar.close < ema) {
                // Found a break. Pre-set ATH = max(high) of all bars strictly before this bar.
                preSetATH = maxHighUpTo[origIdx];
                if (preSetATH <= 0) {
                    // First bar is the break → pre-set ATH from empty set, skip
                    continue;
                }
                state = "seeking_entry";
            }
        }
        else if (state === "seeking_entry") {
            if (bar.close < ema) {
                // Another break day — update preSetATH to max(high) before THIS day
                preSetATH = maxHighUpTo[origIdx];
                if (preSetATH <= 0)
                    continue;
                // Stay in seeking_entry
            }
            else if (bar.close > preSetATH && bar.close > ema) {
                // Entry! Close is strictly above preSetATH and above ema200
                entryDate = bar.date;
                entryPrice = bar.close;
                entryATH = preSetATH;
                state = "in_position";
            }
        }
        else if (state === "in_position") {
            if (bar.close < ema) {
                // Exit! Close is below ema200
                const pnl = ((bar.close - entryPrice) / entryPrice) * 100;
                trades.push({
                    entryDate,
                    entryPrice,
                    exitDate: bar.date,
                    exitPrice: bar.close,
                    pnlPercent: Math.round(pnl * 100) / 100,
                    daysHeld: tradingDaysBetween(entryDate, bar.date),
                    preSetATHAtEntry: entryATH,
                });
                // Exit day becomes the next break.
                // Pre-set ATH for next cycle = max(high) over all bars strictly before this exit day.
                preSetATH = maxHighUpTo[origIdx];
                if (preSetATH <= 0) {
                    state = "seeking_break";
                }
                else {
                    state = "seeking_entry";
                }
            }
        }
    }
    // If still in position at end of data, record as open trade (no exit)
    if (state === "in_position" && validBars.length > 0) {
        const lastBar = validBars[validBars.length - 1];
        const pnl = ((lastBar.close - entryPrice) / entryPrice) * 100;
        trades.push({
            entryDate,
            entryPrice,
            exitDate: null,
            exitPrice: null,
            pnlPercent: Math.round(pnl * 100) / 100,
            daysHeld: tradingDaysBetween(entryDate, lastBar.date),
            preSetATHAtEntry: entryATH,
        });
    }
    const summary = computeSummary(trades);
    const fromDate = bars[0].date;
    const toDate = bars[bars.length - 1].date;
    return { trades, summary, fromDate, toDate };
}
function emptySummary() {
    return {
        totalTrades: 0,
        winners: 0,
        losers: 0,
        winRate: 0,
        avgReturnPct: 0,
        avgWin: 0,
        avgLoss: 0,
        maxDrawdownPct: 0,
        profitFactor: 0,
        sharpeRatio: 0,
        avgHoldingDays: 0,
        bestTrade: 0,
        worstTrade: 0,
    };
}
function computeSummary(trades) {
    // Only count closed trades (those with an exit) for stats
    const closed = trades.filter((t) => t.exitDate != null && t.pnlPercent != null);
    if (closed.length === 0)
        return { ...emptySummary(), totalTrades: trades.length };
    const returns = closed.map((t) => t.pnlPercent);
    const winners = returns.filter((r) => r > 0);
    const losers = returns.filter((r) => r <= 0);
    const avgReturn = returns.reduce((a, b) => a + b, 0) / closed.length;
    const avgWin = winners.length > 0 ? winners.reduce((a, b) => a + b, 0) / winners.length : 0;
    const avgLoss = losers.length > 0 ? Math.abs(losers.reduce((a, b) => a + b, 0) / losers.length) : 0;
    const grossProfit = winners.reduce((a, b) => a + b, 0);
    const grossLoss = Math.abs(losers.reduce((a, b) => a + b, 0));
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 999 : 0;
    // Max drawdown: track cumulative returns, find largest peak-to-trough
    let peak = 0;
    let cumulative = 0;
    let maxDD = 0;
    for (const r of returns) {
        cumulative += r;
        if (cumulative > peak)
            peak = cumulative;
        const dd = peak - cumulative;
        if (dd > maxDD)
            maxDD = dd;
    }
    // Sharpe ratio
    const variance = returns.length > 1
        ? returns.reduce((sum, r) => sum + (r - avgReturn) ** 2, 0) / (returns.length - 1)
        : 0;
    const stdDev = Math.sqrt(variance);
    const sharpe = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252 / (closed.length || 1)) : 0;
    const totalHoldingDays = closed.reduce((sum, t) => sum + t.daysHeld, 0);
    return {
        totalTrades: trades.length,
        winners: winners.length,
        losers: losers.length,
        winRate: Math.round((winners.length / closed.length) * 10000) / 100,
        avgReturnPct: Math.round(avgReturn * 100) / 100,
        avgWin: Math.round(avgWin * 100) / 100,
        avgLoss: Math.round(avgLoss * 100) / 100,
        maxDrawdownPct: Math.round(maxDD * 100) / 100,
        profitFactor: Math.round(profitFactor * 100) / 100,
        sharpeRatio: Math.round(sharpe * 100) / 100,
        avgHoldingDays: Math.round(totalHoldingDays / closed.length),
        bestTrade: Math.round(Math.max(...returns) * 100) / 100,
        worstTrade: Math.round(Math.min(...returns) * 100) / 100,
    };
}
//# sourceMappingURL=backtest.js.map