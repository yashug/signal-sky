// ─── Shared API Types ───────────────────────────────────────────────

export type HeatStatus = "breakout" | "boiling" | "simmering" | "cooling"

export type ApiSignal = {
  id: string
  symbol: string
  exchange: string
  name: string
  strategyName: string
  heat: HeatStatus
  price: number
  ath: number
  ema200: number
  distancePct: number
  volumeSurge: number | null
  volumeToday: number | null
  volumeAvg20: number | null
  signalDate: string
  isActive: boolean
  details: Record<string, any>
  createdAt: string
}

export type ApiSignalsResponse = {
  signals: ApiSignal[]
  total: number
  heatCounts: {
    all: number
    breakout: number
    boiling: number
    simmering: number
    cooling: number
  }
  filters: {
    universe: string
    heat: string
  }
  pagination: {
    limit: number
    offset: number
  }
}

export type ApiMarketHealth = {
  universe: string
  label: string
  date: string
  totalStocks: number
  aboveEma200: number
  percentAbove: number
  trafficLight: "green" | "amber" | "red"
}

export type ApiMarketHealthResponse = {
  markets: ApiMarketHealth[]
}

export type ApiMarketHealthHistoryPoint = {
  date: string
  [universe: string]: string | number | null
}

export type ApiMarketHealthHistoryResponse = {
  history: ApiMarketHealthHistoryPoint[]
}

export type ApiSignalChart = {
  priceHistory: number[]
  ema200History: (number | null)[]
  dates: string[]
  ath: number | null
}

export type ApiSymbolResult = {
  symbol: string
  name: string
  sector: string | null
  universe: string
  exchange: string
}

export type ApiBacktestSummaryRow = {
  id: string
  symbol: string
  exchange: string
  name: string
  totalTrades: number
  winRate: number
  avgReturn: number
  maxDrawdown: number
  profitFactor: number
  sharpeRatio: number | null
  fromDate: string
  toDate: string
  computedAt: string
}

export type ApiBacktestTrade = {
  entryDate: string
  entryPrice: number
  exitDate: string | null
  exitPrice: number | null
  pnlPercent: number | null
  daysHeld: number
  preSetATHAtEntry: number
}

export type ApiBacktestDetailSummary = {
  totalTrades: number
  winners: number
  losers: number
  winRate: number
  avgReturn: number
  avgWin: number
  avgLoss: number
  maxDrawdown: number
  profitFactor: number
  sharpeRatio: number
  avgHoldingDays: number
  bestTrade: number
  worstTrade: number
}

export type ApiBacktestDetail = ApiBacktestSummaryRow & {
  trades: ApiBacktestTrade[]
  summary: ApiBacktestDetailSummary
}

export type ApiBacktestsResponse = {
  backtests: ApiBacktestSummaryRow[]
  total: number
  filters: {
    universe: string
    sortBy: string
    order: string
  }
  pagination: {
    limit: number
    offset: number
  }
}
