import { getPrisma } from "../db/prisma.js"
import type { DataProvider, OHLCVBar, Quote } from "./types.js"

/**
 * DatabaseProvider — reads historical bars from the `daily_bars` table
 * (populated by Yahoo Finance or CSV upload) instead of fetching from
 * an external API.
 *
 * Quote is synthesized from the most recent bar (EOD scanning).
 */
export class DatabaseProvider implements DataProvider {
  name = "database"

  /**
   * Normalize symbol for DB lookup.
   * Universe members store "BHARTIARTL.NS", DB stores "BHARTIARTL" with exchange "NSE".
   */
  private resolveSymbol(symbol: string): { dbSymbol: string; exchange: string } {
    if (symbol.endsWith(".NS")) {
      return { dbSymbol: symbol.replace(/\.NS$/, ""), exchange: "NSE" }
    }
    // US symbols — stored as-is with exchange "US" or "NASDAQ"
    return { dbSymbol: symbol, exchange: "US" }
  }

  async fetchBars(symbol: string, from: string, to: string): Promise<OHLCVBar[]> {
    const prisma = getPrisma()
    const { dbSymbol, exchange } = this.resolveSymbol(symbol)

    const bars = await prisma.dailyBar.findMany({
      where: {
        symbol: dbSymbol,
        exchange,
        date: {
          gte: new Date(from),
          lte: new Date(to),
        },
      },
      orderBy: { date: "asc" },
    })

    return bars.map((b) => ({
      symbol,
      exchange,
      date: b.date.toISOString().split("T")[0],
      open: Number(b.open),
      high: Number(b.high),
      low: Number(b.low),
      close: Number(b.close),
      volume: Number(b.volume),
      adjustmentFactor: Number(b.adjFactor),
      ema200: b.ema200 != null ? Number(b.ema200) : null,
    }))
  }

  async fetchQuote(symbol: string): Promise<Quote | null> {
    const prisma = getPrisma()
    const { dbSymbol, exchange } = this.resolveSymbol(symbol)

    // Get the two most recent bars to compute change
    const recentBars = await prisma.dailyBar.findMany({
      where: { symbol: dbSymbol, exchange },
      orderBy: { date: "desc" },
      take: 2,
    })

    if (recentBars.length === 0) return null

    const latest = recentBars[0]
    const previous = recentBars.length > 1 ? recentBars[1] : null

    const price = Number(latest.close)
    const prevClose = previous ? Number(previous.close) : price
    const change = price - prevClose
    const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0

    return {
      symbol,
      exchange,
      price,
      change,
      changePercent,
      volume: Number(latest.volume),
      timestamp: latest.date.toISOString(),
    }
  }
}
