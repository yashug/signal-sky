// ─── Backtest Utilities ──────────────────────────────────────────
// Synthetic backtest generation — kept until a real backtest engine is built

export type BacktestTrade = {
  entryDate: string
  entryPrice: number
  exitDate: string
  exitPrice: number
  pnlPercent: number
  exitReason: "target" | "stop" | "signal_exit"
}

export type BacktestResult = {
  symbol: string
  strategyName: string
  fromDate: string
  toDate: string
  totalTrades: number
  winners: number
  losers: number
  winRate: number
  avgReturn: number
  maxDrawdown: number
  profitFactor: number
  sharpeRatio: number
  trades: BacktestTrade[]
}

export type BacktestSignalInput = {
  symbol: string
  exchange: string
  strategyName: string
  price: number
}

export function generateBacktest(signal: BacktestSignalInput): BacktestResult {
  const totalTrades = 8 + Math.floor(Math.random() * 12)
  const winRate = 55 + Math.random() * 25
  const winners = Math.round(totalTrades * winRate / 100)
  const losers = totalTrades - winners

  const trades: BacktestTrade[] = []
  const baseDate = new Date(2024, 0, 15)
  for (let i = 0; i < totalTrades; i++) {
    const entryDate = new Date(baseDate)
    entryDate.setDate(entryDate.getDate() + i * 25 + Math.floor(Math.random() * 10))
    const exitDate = new Date(entryDate)
    exitDate.setDate(exitDate.getDate() + 5 + Math.floor(Math.random() * 30))
    const isWin = i < winners
    const pnlPercent = isWin
      ? 3 + Math.random() * 15
      : -(2 + Math.random() * 8)
    const entryPrice = signal.price * (0.7 + Math.random() * 0.25)
    trades.push({
      entryDate: entryDate.toISOString().split("T")[0],
      entryPrice: Math.round(entryPrice * 100) / 100,
      exitDate: exitDate.toISOString().split("T")[0],
      exitPrice: Math.round(entryPrice * (1 + pnlPercent / 100) * 100) / 100,
      pnlPercent: Math.round(pnlPercent * 100) / 100,
      exitReason: isWin ? "target" : "stop",
    })
  }

  const avgWin = trades.filter(t => t.pnlPercent > 0).reduce((a, t) => a + t.pnlPercent, 0) / (winners || 1)
  const avgLoss = Math.abs(trades.filter(t => t.pnlPercent < 0).reduce((a, t) => a + t.pnlPercent, 0) / (losers || 1))

  return {
    symbol: signal.symbol,
    strategyName: signal.strategyName,
    fromDate: "2024-01-01",
    toDate: "2026-02-06",
    totalTrades,
    winners,
    losers,
    winRate: Math.round(winRate * 10) / 10,
    avgReturn: Math.round(((avgWin * winners - avgLoss * losers) / totalTrades) * 100) / 100,
    maxDrawdown: Math.round((8 + Math.random() * 15) * 100) / 100,
    profitFactor: Math.round((avgWin * winners / (avgLoss * losers || 1)) * 100) / 100,
    sharpeRatio: Math.round((0.8 + Math.random() * 1.8) * 100) / 100,
    trades: trades.sort((a, b) => b.entryDate.localeCompare(a.entryDate)),
  }
}
