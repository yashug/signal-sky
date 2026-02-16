import type { DailyCandle } from "./types"

/** Parse YYYY-MM-DD string to UTC midnight Date */
export function parseUTCDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

/** Ensure a Date is at UTC midnight (strips time component) */
export function toUTCMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

/**
 * Convert an IST date (from Kite Connect) to UTC midnight of the IST trading date.
 * Kite returns "2026-02-13T00:00:00+0530" → JS parses to 2026-02-12T18:30:00Z.
 * We add 5:30 back to recover the IST calendar date (Feb 13), then store as UTC midnight.
 */
export function istToTradingDate(date: Date): Date {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
  const istTime = new Date(date.getTime() + IST_OFFSET_MS)
  return new Date(Date.UTC(istTime.getUTCFullYear(), istTime.getUTCMonth(), istTime.getUTCDate()))
}

/** Coerce to finite number, returns null if invalid */
export function toFiniteNumber(val: unknown): number | null {
  const n = Number(val)
  return Number.isFinite(n) ? n : null
}

/** Validate a candle has all required finite fields and volume >= 0 */
export function isValidCandle(c: DailyCandle): boolean {
  return (
    c.date instanceof Date &&
    !isNaN(c.date.getTime()) &&
    Number.isFinite(c.open) &&
    Number.isFinite(c.high) &&
    Number.isFinite(c.low) &&
    Number.isFinite(c.close) &&
    Number.isFinite(c.volume) &&
    c.volume >= 0
  )
}

/** Convert DailyCandle[] to Prisma createMany payload for DailyBar */
export function candlesToPrismaPayload(
  candles: DailyCandle[],
  opts: { symbol: string; exchange: string; source: string },
) {
  return candles.filter(isValidCandle).map((c) => ({
    symbol: opts.symbol,
    exchange: opts.exchange,
    date: toUTCMidnight(c.date),
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
    volume: BigInt(Math.round(c.volume)),
    adjFactor: c.adjFactor ?? 1.0,
    source: opts.source,
  }))
}
