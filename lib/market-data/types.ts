export type Exchange = "NSE" | "NASDAQ" | "NYSE" | "AMEX" | "US"

export type DailyCandle = {
  date: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjFactor?: number
}

export type DailyCandleRequest = {
  symbol: string
  exchange: Exchange
  from: Date
  to: Date
}
