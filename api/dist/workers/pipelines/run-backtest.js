/**
 * Backtest Pipeline — runs the backtest engine on all universe stocks
 * and persists results to the backtests + backtest_trades tables.
 */
import { getPrisma } from "../../db/prisma.js";
import { runBacktest } from "../../engine/backtest.js";
function getExchange(symbol) {
    if (symbol.endsWith(".NS"))
        return "NSE";
    return "US";
}
function resolveDbSymbol(symbol) {
    if (symbol.endsWith(".NS")) {
        return { dbSymbol: symbol.replace(/\.NS$/, ""), exchange: "NSE" };
    }
    return { dbSymbol: symbol, exchange: "US" };
}
async function backtestSymbol(symbol, prisma) {
    try {
        const { dbSymbol, exchange } = resolveDbSymbol(symbol);
        // Load ALL daily bars for this symbol
        const dbBars = await prisma.dailyBar.findMany({
            where: { symbol: dbSymbol, exchange },
            orderBy: { date: "asc" },
        });
        if (dbBars.length < 200) {
            return { ok: false, trades: 0, error: `${symbol}: insufficient bars (${dbBars.length})` };
        }
        // Convert to OHLCVBar format
        const bars = dbBars.map((b) => ({
            symbol,
            exchange,
            date: b.date.toISOString().split("T")[0],
            open: Number(b.open),
            high: Number(b.high),
            low: Number(b.low),
            close: Number(b.close),
            volume: Number(b.volume),
            ema200: b.ema200 != null ? Number(b.ema200) : null,
        }));
        // Run backtest
        const result = runBacktest(bars);
        if (result.trades.length === 0) {
            return { ok: true, trades: 0 };
        }
        const ex = getExchange(symbol);
        // Delete old backtest + cascading trades
        await prisma.backtest.deleteMany({
            where: { symbol, strategyName: "Reset & Reclaim" },
        });
        // Create backtest row
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
                trades: result.trades,
                summary: result.summary,
            },
        });
        // Persist individual trades to backtest_trades table
        if (result.trades.length > 0) {
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
            });
        }
        const emoji = result.summary.winRate >= 60 ? "🟢" : result.summary.winRate >= 45 ? "🟡" : "🔴";
        console.log(`  ${emoji} ${symbol.padEnd(18)} ${result.summary.totalTrades} trades, ${result.summary.winRate}% win, avg ${result.summary.avgReturnPct}%`);
        return { ok: true, trades: result.summary.totalTrades };
    }
    catch (e) {
        return { ok: false, trades: 0, error: `${symbol}: ${e.message?.slice(0, 100)}` };
    }
}
export async function runBacktestPipeline(market) {
    const prisma = getPrisma();
    const members = await prisma.universeMember.findMany();
    const marketMembers = members.filter((m) => market === "IN" ? m.symbol.endsWith(".NS") : !m.symbol.endsWith(".NS"));
    const allSymbols = [...new Set(marketMembers.map((m) => m.symbol))];
    console.log(`[Backtest] Processing ${allSymbols.length} ${market} symbols...`);
    let backtestsPersisted = 0;
    const errors = [];
    const BATCH_SIZE = 20;
    for (let i = 0; i < allSymbols.length; i += BATCH_SIZE) {
        const batch = allSymbols.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(batch.map((symbol) => backtestSymbol(symbol, prisma)));
        for (const r of batchResults) {
            if (r.ok && r.trades > 0)
                backtestsPersisted++;
            if (r.error)
                errors.push(r.error);
        }
    }
    console.log(`[Backtest] ${market}: ${backtestsPersisted} backtests persisted`);
    return {
        backtestsPersisted,
        symbolsProcessed: allSymbols.length,
        errors,
    };
}
//# sourceMappingURL=run-backtest.js.map