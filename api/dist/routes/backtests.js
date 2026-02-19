import { z } from "zod";
import { getPrisma } from "../db/prisma.js";
import { resolveUniverseTags } from "../config/universes.js";
const VALID_UNIVERSES = [
    "all", "nifty50", "niftynext50", "nifty100", "nifty200",
    "niftymidcap50", "niftymidcap100",
    "niftysmallcap50", "niftysmallcap100",
    "niftybank",
    "sp100", "nasdaq100",
];
const VALID_SORT = ["winRate", "totalTrades", "avgReturn", "profitFactor", "maxDrawdown", "sharpeRatio"];
const querySchema = z.object({
    universe: z.enum(VALID_UNIVERSES).optional().default("all"),
    sortBy: z.enum(VALID_SORT).optional().default("winRate"),
    order: z.enum(["asc", "desc"]).optional().default("desc"),
    limit: z.coerce.number().min(1).max(500).optional().default(100),
    offset: z.coerce.number().min(0).optional().default(0),
});
const sortColumnMap = {
    winRate: "b.win_rate",
    totalTrades: "b.total_trades",
    avgReturn: "b.avg_return",
    profitFactor: "b.profit_factor",
    maxDrawdown: "b.max_drawdown",
    sharpeRatio: "b.sharpe_ratio",
};
function universeWhereSQL(universe) {
    if (universe === "all")
        return "";
    const tags = resolveUniverseTags(universe);
    const tagList = tags.map((t) => `'${t}'`).join(", ");
    return `AND b.symbol IN (SELECT symbol FROM universe_members WHERE universe IN (${tagList}))`;
}
export async function backtestsRoutes(app) {
    // GET /backtests — summary list
    app.get("/backtests", async (request) => {
        const query = querySchema.parse(request.query);
        const prisma = getPrisma();
        const univSQL = universeWhereSQL(query.universe);
        const sortCol = sortColumnMap[query.sortBy] ?? "b.win_rate";
        const orderDir = query.order === "asc" ? "ASC" : "DESC";
        const [backtests, countResult] = await Promise.all([
            prisma.$queryRawUnsafe(`
        SELECT b.id, b.symbol, b.exchange,
          b.total_trades, b.win_rate, b.avg_return,
          b.max_drawdown, b.profit_factor, b.sharpe_ratio,
          b.from_date, b.to_date, b.computed_at,
          (SELECT um.name FROM universe_members um WHERE um.symbol = b.symbol LIMIT 1) as member_name
        FROM backtests b
        WHERE 1=1
        ${univSQL}
        ORDER BY ${sortCol} ${orderDir}
        LIMIT ${query.limit} OFFSET ${query.offset}
      `),
            prisma.$queryRawUnsafe(`
        SELECT COUNT(*)::int as count
        FROM backtests b
        WHERE 1=1
        ${univSQL}
      `),
        ]);
        const total = countResult[0]?.count ?? 0;
        const serialized = backtests.map((b) => ({
            id: b.id,
            symbol: b.symbol,
            exchange: b.exchange,
            name: b.member_name ?? b.symbol.replace(".NS", ""),
            totalTrades: Number(b.total_trades),
            winRate: Number(b.win_rate),
            avgReturn: Number(b.avg_return),
            maxDrawdown: Number(b.max_drawdown),
            profitFactor: Number(b.profit_factor),
            sharpeRatio: b.sharpe_ratio ? Number(b.sharpe_ratio) : null,
            fromDate: b.from_date,
            toDate: b.to_date,
            computedAt: b.computed_at,
        }));
        return {
            backtests: serialized,
            total,
            filters: { universe: query.universe, sortBy: query.sortBy, order: query.order },
            pagination: { limit: query.limit, offset: query.offset },
        };
    });
    // GET /backtests/:symbol — full detail with trades from backtest_trades table
    app.get("/backtests/:symbol", async (request) => {
        const { symbol } = request.params;
        const prisma = getPrisma();
        const backtest = await prisma.backtest.findFirst({
            where: { symbol, strategyName: "Reset & Reclaim" },
            orderBy: { computedAt: "desc" },
        });
        if (!backtest) {
            return { error: "Backtest not found" };
        }
        // Get stock name
        const member = await prisma.universeMember.findFirst({
            where: { symbol },
            select: { name: true },
        });
        // Get trades from backtest_trades table
        const trades = await prisma.backtestTrade.findMany({
            where: { backtestId: backtest.id },
            orderBy: { entryDate: "asc" },
        });
        const serializedTrades = trades.map((t) => ({
            entryDate: t.entryDate.toISOString().split("T")[0],
            entryPrice: Number(t.entryPrice),
            exitDate: t.exitDate ? t.exitDate.toISOString().split("T")[0] : null,
            exitPrice: t.exitPrice ? Number(t.exitPrice) : null,
            pnlPercent: t.pnlPercent ? Number(t.pnlPercent) : null,
            daysHeld: t.daysHeld,
            preSetATHAtEntry: Number(t.preSetATHAtEntry),
        }));
        return {
            id: backtest.id,
            symbol: backtest.symbol,
            exchange: backtest.exchange,
            name: member?.name ?? backtest.symbol.replace(".NS", ""),
            totalTrades: backtest.totalTrades,
            winRate: Number(backtest.winRate),
            avgReturn: Number(backtest.avgReturn),
            maxDrawdown: Number(backtest.maxDrawdown),
            profitFactor: Number(backtest.profitFactor),
            sharpeRatio: backtest.sharpeRatio ? Number(backtest.sharpeRatio) : null,
            fromDate: backtest.fromDate,
            toDate: backtest.toDate,
            computedAt: backtest.computedAt,
            trades: serializedTrades,
            summary: (() => {
                const s = backtest.summary;
                return {
                    totalTrades: s.totalTrades,
                    winners: s.winners,
                    losers: s.losers,
                    winRate: s.winRate,
                    avgReturn: s.avgReturnPct ?? s.avgReturn,
                    avgWin: s.avgWin,
                    avgLoss: s.avgLoss,
                    maxDrawdown: s.maxDrawdownPct ?? s.maxDrawdown,
                    profitFactor: s.profitFactor,
                    sharpeRatio: s.sharpeRatio,
                    avgHoldingDays: s.avgHoldingDays,
                    bestTrade: s.bestTrade,
                    worstTrade: s.worstTrade,
                };
            })(),
        };
    });
}
//# sourceMappingURL=backtests.js.map