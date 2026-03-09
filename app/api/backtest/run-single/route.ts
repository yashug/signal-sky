import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { runBacktest } from "@/lib/backtest-engine"

/**
 * POST /api/backtest/run-single
 * Runs backtest for a single symbol on-demand and persists results.
 * Body: { symbol: string }
 * Returns the backtest detail (same shape as GET /backtests/:symbol from the API).
 */
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const symbol: string | undefined = body.symbol
  if (!symbol) {
    return NextResponse.json({ error: "symbol is required" }, { status: 400 })
  }

  try {
    // Resolve DB symbol format (NSE bars stored without .NS suffix)
    const isNSE = symbol.endsWith(".NS")
    const dbSymbol = isNSE ? symbol.replace(/\.NS$/, "") : symbol
    const exchange = isNSE ? "NSE" : "US"

    // Load daily bars
    const dbBars = await prisma.dailyBar.findMany({
      where: { symbol: dbSymbol, exchange },
      orderBy: { date: "asc" },
    })

    if (dbBars.length < 200) {
      return NextResponse.json(
        { error: `Insufficient data for ${symbol} (${dbBars.length} bars, need 200+)` },
        { status: 422 }
      )
    }

    // Convert to engine format
    const bars = dbBars.map((b: any) => ({
      date: b.date.toISOString().split("T")[0],
      open: Number(b.open),
      high: Number(b.high),
      low: Number(b.low),
      close: Number(b.close),
      volume: Number(b.volume),
      ema200: b.ema200 != null ? Number(b.ema200) : null,
    }))

    // Run backtest
    const result = runBacktest(bars)

    if (result.trades.length === 0) {
      return NextResponse.json({ error: "No trades generated" }, { status: 422 })
    }

    // Delete old backtest for this symbol
    await prisma.backtest.deleteMany({
      where: { symbol, strategyName: "Reset & Reclaim" },
    })

    // Persist new backtest
    const backtest = await prisma.backtest.create({
      data: {
        symbol,
        exchange,
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

    // Persist individual trades (non-critical — trades already stored as JSON in backtest record)
    if (result.trades.length > 0) {
      try {
        await prisma.backtestTrade.createMany({
          data: result.trades.map((t) => ({
            backtestId: backtest.id,
            symbol,
            exchange,
            entryDate: new Date(t.entryDate),
            entryPrice: t.entryPrice,
            exitDate: t.exitDate ? new Date(t.exitDate) : null,
            exitPrice: t.exitPrice,
            pnlPercent: t.pnlPercent,
            daysHeld: t.daysHeld,
            preSetATHAtEntry: t.preSetATHAtEntry,
          })),
        })
      } catch (tradeErr: any) {
        console.warn("[backtest/run-single] Failed to persist individual trades:", tradeErr.message)
      }
    }

    // Get stock name
    const member = await prisma.universeMember.findFirst({
      where: { symbol },
      select: { name: true },
    })

    // Return same shape as the backtests API detail endpoint
    const s = result.summary
    return NextResponse.json({
      id: backtest.id,
      symbol,
      exchange,
      name: member?.name ?? symbol.replace(".NS", ""),
      totalTrades: s.totalTrades,
      winRate: s.winRate,
      avgReturn: s.avgReturnPct,
      maxDrawdown: s.maxDrawdownPct,
      profitFactor: s.profitFactor,
      sharpeRatio: s.sharpeRatio,
      fromDate: result.fromDate,
      toDate: result.toDate,
      computedAt: new Date().toISOString(),
      trades: result.trades.map((t) => ({
        entryDate: t.entryDate,
        entryPrice: t.entryPrice,
        exitDate: t.exitDate,
        exitPrice: t.exitPrice,
        pnlPercent: t.pnlPercent,
        daysHeld: t.daysHeld,
        preSetATHAtEntry: t.preSetATHAtEntry,
      })),
      summary: {
        totalTrades: s.totalTrades,
        winners: s.winners,
        losers: s.losers,
        winRate: s.winRate,
        avgReturn: s.avgReturnPct,
        avgWin: s.avgWin,
        avgLoss: s.avgLoss,
        maxDrawdown: s.maxDrawdownPct,
        profitFactor: s.profitFactor,
        sharpeRatio: s.sharpeRatio,
        avgHoldingDays: s.avgHoldingDays,
        bestTrade: s.bestTrade,
        worstTrade: s.worstTrade,
      },
    })
  } catch (e: any) {
    console.error("[backtest/run-single] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
