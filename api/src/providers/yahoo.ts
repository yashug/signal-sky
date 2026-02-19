import yahooFinance from "yahoo-finance2"
import type { DataProvider, OHLCVBar, Quote } from "./types.js"

// Yahoo Finance uses hyphens for share classes (BRK-B), while DB stores dots (BRK.B)
function toYahooSymbol(symbol: string): string {
  if (symbol.endsWith(".NS")) return symbol
  return symbol.replace(/\.([A-Z])$/, "-$1")
}

export class YahooFinanceProvider implements DataProvider {
  name = "yahoo-finance"

  async fetchBars(symbol: string, from: string, to: string): Promise<OHLCVBar[]> {
    const yahooSymbol = toYahooSymbol(symbol)
    const result: any[] = await yahooFinance.historical(yahooSymbol, {
      period1: from,
      period2: to,
      interval: "1d",
    })

    const exchange = symbol.endsWith(".NS") ? "NSE" : "US"

    return result.map((bar: any) => ({
      symbol,
      exchange,
      date: bar.date.toISOString().split("T")[0],
      open: bar.open,
      high: bar.high,
      low: bar.low,
      close: bar.close,
      volume: bar.volume,
      adjustmentFactor: bar.adjClose ? bar.adjClose / bar.close : undefined,
    }))
  }

  async fetchQuote(symbol: string): Promise<Quote | null> {
    const yahooSymbol = toYahooSymbol(symbol)
    const result: any = await yahooFinance.quote(yahooSymbol)
    if (!result) return null

    const exchange = symbol.endsWith(".NS") ? "NSE" : "US"

    return {
      symbol,
      exchange,
      price: result.regularMarketPrice ?? 0,
      change: result.regularMarketChange ?? 0,
      changePercent: result.regularMarketChangePercent ?? 0,
      volume: result.regularMarketVolume ?? 0,
      timestamp: new Date().toISOString(),
    }
  }

  async searchSymbols(query: string) {
    const result: any = await yahooFinance.search(query)
    return (result.quotes || [])
      .filter((q: any) => q.quoteType === "EQUITY")
      .map((q: any) => ({
        symbol: q.symbol,
        name: q.shortname || q.longname || q.symbol,
        exchange: q.exchange || "UNKNOWN",
      }))
  }
}
