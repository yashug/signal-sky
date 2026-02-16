/**
 * Zerodha Kite Connect adapter for India (NSE) market data.
 * Uses the official kiteconnect JS SDK.
 *
 * Auth: Reads access token from DB (kite_tokens table) first,
 * then falls back to KITE_ACCESS_TOKEN env var.
 * Token is refreshed via the admin OAuth flow at /api/admin/kite/login.
 */

import { KiteConnect } from "kiteconnect"
import { prisma } from "@/lib/prisma"
import type { DailyCandle } from "./types"
import { istToTradingDate } from "./normalize"

let _kite: InstanceType<typeof KiteConnect> | null = null

async function getKite(): Promise<InstanceType<typeof KiteConnect>> {
  const apiKey = process.env.KITE_API_KEY
  if (!apiKey) {
    throw new Error("KITE_API_KEY must be set")
  }

  // Try DB token first, then fall back to env
  let accessToken: string | null = null
  try {
    const row = await prisma.kiteToken.findUnique({ where: { id: 1 } })
    if (row?.accessToken) {
      accessToken = row.accessToken
    }
  } catch {
    // DB not available or table doesn't exist yet — fall through
  }

  if (!accessToken) {
    accessToken = process.env.KITE_ACCESS_TOKEN ?? null
  }

  if (!accessToken) {
    throw new Error(
      "No Kite access token found. Connect via Admin → Data Sources or set KITE_ACCESS_TOKEN in env.",
    )
  }

  if (!_kite) {
    _kite = new KiteConnect({ api_key: apiKey })
  }
  _kite.setAccessToken(accessToken)
  return _kite
}

// ─── Instrument Master ──────────────────────────────────────────────

export type KiteInstrumentRow = {
  instrumentToken: number
  exchangeToken: number
  tradingsymbol: string
  name: string
  exchange: string
  segment: string
  instrumentType: string
  lotSize: number
}

/**
 * Download Kite instruments list and return NSE equity instruments.
 * Should be called once daily (around 8:30 AM IST).
 */
export async function getKiteInstrumentMaster(): Promise<KiteInstrumentRow[]> {
  const kite = await getKite()
  const allInstruments: any[] = await kite.getInstruments("NSE")

  const instruments: KiteInstrumentRow[] = []
  for (const row of allInstruments) {
    if (row.instrument_type !== "EQ") continue
    // Skip index entries (e.g. "NIFTY 50")
    if (row.segment === "INDICES") continue

    const symbol = row.tradingsymbol?.trim() ?? ""
    const name = row.name?.trim() ?? ""

    // Must have a valid symbol and company name
    if (!symbol || !name) continue
    // Skip bonds, SDLs, G-Secs, T-Bills, debentures, loans
    // These have names like "SDL WB 6.77% 2040", "GOI LOAN 10.18% 2026", "GOI TBILL 364D..."
    if (/\b(SDL|GOI|TBILL|T-BILL|LOAN|DEBENTURE|NCD|BOND)\b/i.test(name)) continue
    if (/%/.test(name)) continue // Bond names contain interest rates like "6.77%"

    instruments.push({
      instrumentToken: Number(row.instrument_token),
      exchangeToken: Number(row.exchange_token ?? 0),
      tradingsymbol: symbol,
      name,
      exchange: "NSE",
      segment: row.segment ?? "NSE",
      instrumentType: row.instrument_type,
      lotSize: Number(row.lot_size ?? 1),
    })
  }

  return instruments
}

// ─── Historical Candles ─────────────────────────────────────────────

function formatKiteDate(d: Date): string {
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(d.getUTCDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

const MAX_KITE_DAYS = 1900 // Kite limit is 2000 days per request; use 1900 for safety

/**
 * Fetch daily candles for a single instrument from Kite historical API.
 * Automatically chunks requests if the date range exceeds Kite's 2000-day limit.
 */
export async function getKiteDailyCandles(
  instrumentToken: number,
  from: Date,
  to: Date,
): Promise<DailyCandle[]> {
  const kite = await getKite()
  const totalDays = Math.ceil((to.getTime() - from.getTime()) / 86_400_000)

  // If within limit, single request
  if (totalDays <= MAX_KITE_DAYS) {
    const data: any[] = await kite.getHistoricalData(
      instrumentToken,
      "day",
      formatKiteDate(from),
      formatKiteDate(to),
    )
    return data.map(parseKiteCandle)
  }

  // Split into chunks of MAX_KITE_DAYS
  const allCandles: DailyCandle[] = []
  let chunkFrom = new Date(from)

  while (chunkFrom < to) {
    const chunkTo = new Date(
      Math.min(chunkFrom.getTime() + MAX_KITE_DAYS * 86_400_000, to.getTime())
    )

    const data: any[] = await kite.getHistoricalData(
      instrumentToken,
      "day",
      formatKiteDate(chunkFrom),
      formatKiteDate(chunkTo),
    )
    allCandles.push(...data.map(parseKiteCandle))

    // Move to next chunk (day after chunkTo)
    chunkFrom = new Date(chunkTo.getTime() + 86_400_000)

    // Rate limit between chunks
    if (chunkFrom < to) {
      await new Promise((r) => setTimeout(r, 350))
    }
  }

  return allCandles
}

function parseKiteCandle(row: any): DailyCandle {
  return {
    date: istToTradingDate(new Date(row.date)),
    open: row.open,
    high: row.high,
    low: row.low,
    close: row.close,
    volume: row.volume,
  }
}

// ─── Batch helper ───────────────────────────────────────────────────

/** Rate-limit friendly sequential fetch with configurable delay */
export async function batchFetchKiteCandles(
  items: Array<{ instrumentToken: number; symbol: string }>,
  from: Date,
  to: Date,
  opts: { delayMs?: number; onProgress?: (symbol: string, i: number, total: number) => void } = {},
): Promise<Map<string, DailyCandle[]>> {
  const results = new Map<string, DailyCandle[]>()
  const delayMs = opts.delayMs ?? 350 // Kite rate limit ~3 req/sec

  for (let i = 0; i < items.length; i++) {
    const { instrumentToken, symbol } = items[i]
    opts.onProgress?.(symbol, i + 1, items.length)

    try {
      const candles = await getKiteDailyCandles(instrumentToken, from, to)
      results.set(symbol, candles)
    } catch (e: any) {
      console.error(`[kite] Failed to fetch ${symbol} (token ${instrumentToken}):`, e.message)
      results.set(symbol, [])
    }

    // Rate limit delay (skip after last item)
    if (i < items.length - 1 && delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }

  return results
}
