/**
 * Backtest Engine — Pre-set ATH + EMA200 Reset Strategy
 * Shared copy for Next.js API routes (mirrors api/src/engine/backtest.ts)
 */

export type BacktestTradeResult = {
  entryDate: string
  entryPrice: number
  exitDate: string | null
  exitPrice: number | null
  pnlPercent: number | null
  daysHeld: number
  preSetATHAtEntry: number
}

export type BacktestSummary = {
  totalTrades: number
  winners: number
  losers: number
  winRate: number
  avgReturnPct: number
  avgWin: number
  avgLoss: number
  maxDrawdownPct: number
  profitFactor: number
  sharpeRatio: number
  avgHoldingDays: number
  bestTrade: number
  worstTrade: number
}

export type BacktestResult = {
  trades: BacktestTradeResult[]
  summary: BacktestSummary
  fromDate: string
  toDate: string
}

type Bar = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  ema200: number | null
}

function tradingDaysBetween(a: string, b: string): number {
  const msPerDay = 86400000
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay)
}

export function runBacktest(bars: Bar[]): BacktestResult {
  const trades: BacktestTradeResult[] = []
  const validBars = bars.filter((b) => b.ema200 != null)
  if (validBars.length === 0) {
    return { trades: [], summary: emptySummary(), fromDate: "", toDate: "" }
  }

  type State = "seeking_break" | "seeking_entry" | "in_position"
  let state: State = "seeking_break"
  let preSetATH = 0
  let entryDate = ""
  let entryPrice = 0
  let entryATH = 0

  const maxHighUpTo: number[] = new Array(bars.length)
  let runMax = 0
  for (let i = 0; i < bars.length; i++) {
    maxHighUpTo[i] = runMax
    runMax = Math.max(runMax, bars[i].high)
  }

  const validBarOrigIdx: number[] = []
  for (let i = 0; i < bars.length; i++) {
    if (bars[i].ema200 != null) {
      validBarOrigIdx.push(i)
    }
  }

  for (let i = 0; i < validBars.length; i++) {
    const bar = validBars[i]
    const ema = bar.ema200!
    const origIdx = validBarOrigIdx[i]

    if (state === "seeking_break") {
      if (bar.close < ema) {
        preSetATH = maxHighUpTo[origIdx]
        if (preSetATH <= 0) continue
        state = "seeking_entry"
      }
    } else if (state === "seeking_entry") {
      if (bar.close < ema) {
        preSetATH = maxHighUpTo[origIdx]
        if (preSetATH <= 0) continue
      } else if (bar.close > preSetATH && bar.close > ema) {
        entryDate = bar.date
        entryPrice = bar.close
        entryATH = preSetATH
        state = "in_position"
      }
    } else if (state === "in_position") {
      if (bar.close < ema) {
        const pnl = ((bar.close - entryPrice) / entryPrice) * 100
        trades.push({
          entryDate,
          entryPrice,
          exitDate: bar.date,
          exitPrice: bar.close,
          pnlPercent: Math.round(pnl * 100) / 100,
          daysHeld: tradingDaysBetween(entryDate, bar.date),
          preSetATHAtEntry: entryATH,
        })
        preSetATH = maxHighUpTo[origIdx]
        if (preSetATH <= 0) {
          state = "seeking_break"
        } else {
          state = "seeking_entry"
        }
      }
    }
  }

  if (state === "in_position" && validBars.length > 0) {
    const lastBar = validBars[validBars.length - 1]
    const pnl = ((lastBar.close - entryPrice) / entryPrice) * 100
    trades.push({
      entryDate,
      entryPrice,
      exitDate: null,
      exitPrice: null,
      pnlPercent: Math.round(pnl * 100) / 100,
      daysHeld: tradingDaysBetween(entryDate, lastBar.date),
      preSetATHAtEntry: entryATH,
    })
  }

  const summary = computeSummary(trades)
  const fromDate = bars[0].date
  const toDate = bars[bars.length - 1].date
  return { trades, summary, fromDate, toDate }
}

function emptySummary(): BacktestSummary {
  return {
    totalTrades: 0, winners: 0, losers: 0, winRate: 0,
    avgReturnPct: 0, avgWin: 0, avgLoss: 0, maxDrawdownPct: 0,
    profitFactor: 0, sharpeRatio: 0, avgHoldingDays: 0,
    bestTrade: 0, worstTrade: 0,
  }
}

function computeSummary(trades: BacktestTradeResult[]): BacktestSummary {
  const closed = trades.filter((t) => t.exitDate != null && t.pnlPercent != null)
  if (closed.length === 0) return { ...emptySummary(), totalTrades: trades.length }

  const returns = closed.map((t) => t.pnlPercent!)
  const winners = returns.filter((r) => r > 0)
  const losers = returns.filter((r) => r <= 0)

  const avgReturn = returns.reduce((a, b) => a + b, 0) / closed.length
  const avgWin = winners.length > 0 ? winners.reduce((a, b) => a + b, 0) / winners.length : 0
  const avgLoss = losers.length > 0 ? Math.abs(losers.reduce((a, b) => a + b, 0) / losers.length) : 0

  const grossProfit = winners.reduce((a, b) => a + b, 0)
  const grossLoss = Math.abs(losers.reduce((a, b) => a + b, 0))
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 999 : 0

  let peak = 0, cumulative = 0, maxDD = 0
  for (const r of returns) {
    cumulative += r
    if (cumulative > peak) peak = cumulative
    const dd = peak - cumulative
    if (dd > maxDD) maxDD = dd
  }

  const variance = returns.length > 1
    ? returns.reduce((sum, r) => sum + (r - avgReturn) ** 2, 0) / (returns.length - 1)
    : 0
  const stdDev = Math.sqrt(variance)
  const sharpe = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252 / (closed.length || 1)) : 0

  const totalHoldingDays = closed.reduce((sum, t) => sum + t.daysHeld, 0)

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
  }
}
