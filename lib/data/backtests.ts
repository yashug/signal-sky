import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { universeWhereSQL } from "./universes"
import type {
  ApiBacktestsResponse,
  ApiBacktestDetail,
  ApiBacktestSummaryRow,
} from "@/lib/api"

export const getBacktests = unstable_cache(
  async (universe: string): Promise<ApiBacktestsResponse> => {
    const univSQL = universeWhereSQL("b", universe)

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
        ORDER BY b.win_rate DESC
        LIMIT 500
      `) as Promise<any[]>,
      prisma.$queryRawUnsafe(`
        SELECT COUNT(*)::int as count
        FROM backtests b
        WHERE 1=1
        ${univSQL}
      `) as Promise<[{ count: number }]>,
    ])

    const serialized: ApiBacktestSummaryRow[] = backtests.map((b: any) => ({
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
      fromDate: String(b.from_date),
      toDate: String(b.to_date),
      computedAt: String(b.computed_at),
    }))

    return {
      backtests: serialized,
      total: countResult[0]?.count ?? 0,
      filters: { universe, sortBy: "winRate", order: "desc" },
      pagination: { limit: 500, offset: 0 },
    }
  },
  ["backtests"],
  { tags: ["backtests"], revalidate: 604800 }
)

export type BacktestAggregates = {
  winRate: number
  avgReturn: number
  maxDrawdown: number
  sharpeRatio: number | null
  symbolCount: number
}

export const getBacktestAggregates = unstable_cache(
  async (): Promise<BacktestAggregates | null> => {
    const row = await prisma.$queryRawUnsafe(`
      SELECT
        COUNT(*)::int AS symbol_count,
        AVG(win_rate)::double precision AS win_rate,
        AVG(avg_return)::double precision AS avg_return,
        AVG(max_drawdown)::double precision AS max_drawdown,
        AVG(sharpe_ratio)::double precision AS sharpe_ratio
      FROM (
        SELECT DISTINCT ON (symbol) symbol, win_rate, avg_return, max_drawdown, sharpe_ratio
        FROM backtests
        ORDER BY symbol, computed_at DESC
      ) latest
    `) as unknown as [{ symbol_count: number; win_rate: number; avg_return: number; max_drawdown: number; sharpe_ratio: number | null }]

    const r = row[0]
    if (!r || r.symbol_count === 0) return null

    return {
      symbolCount: r.symbol_count,
      winRate: Number(r.win_rate),
      avgReturn: Number(r.avg_return),
      maxDrawdown: Number(r.max_drawdown),
      sharpeRatio: r.sharpe_ratio != null ? Number(r.sharpe_ratio) : null,
    }
  },
  ["backtest-aggregates"],
  { tags: ["backtests"], revalidate: 604800 }
)

export type BacktestStatEntry = {
  winRate: number
  totalTrades: number
}

export const getBacktestStatsMap = unstable_cache(
  async (): Promise<Record<string, BacktestStatEntry>> => {
    const rows = (await prisma.$queryRaw`
      SELECT DISTINCT ON (symbol) symbol, win_rate::double precision as win_rate, total_trades::int as total_trades
      FROM backtests
      ORDER BY symbol, computed_at DESC
    `) as { symbol: string; win_rate: number; total_trades: number }[]

    const map: Record<string, BacktestStatEntry> = {}
    for (const r of rows) {
      map[r.symbol] = {
        winRate: Number(r.win_rate),
        totalTrades: Number(r.total_trades),
      }
    }
    return map
  },
  ["backtest-stats-map"],
  { tags: ["backtests"], revalidate: 604800 }
)

export const getBacktestDetail = unstable_cache(
  async (symbol: string): Promise<ApiBacktestDetail | null> => {
    const backtest = await prisma.backtest.findFirst({
      where: { symbol, strategyName: "Reset & Reclaim" },
      orderBy: { computedAt: "desc" },
    })

    if (!backtest) return null

    const [member, trades] = await Promise.all([
      prisma.universeMember.findFirst({
        where: { symbol },
        select: { name: true },
      }),
      prisma.backtestTrade.findMany({
        where: { backtestId: backtest.id },
        orderBy: { entryDate: "asc" },
      }),
    ])

    const serializedTrades = trades.map((t) => ({
      entryDate: t.entryDate.toISOString().split("T")[0],
      entryPrice: Number(t.entryPrice),
      exitDate: t.exitDate ? t.exitDate.toISOString().split("T")[0] : null,
      exitPrice: t.exitPrice ? Number(t.exitPrice) : null,
      pnlPercent: t.pnlPercent ? Number(t.pnlPercent) : null,
      daysHeld: t.daysHeld,
      preSetATHAtEntry: Number(t.preSetATHAtEntry),
    }))

    const s = backtest.summary as Record<string, any>

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
      fromDate: String(backtest.fromDate),
      toDate: String(backtest.toDate),
      computedAt: String(backtest.computedAt),
      trades: serializedTrades,
      summary: {
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
      },
    }
  },
  ["backtest-detail"],
  { tags: ["backtests"], revalidate: 604800 }
)
