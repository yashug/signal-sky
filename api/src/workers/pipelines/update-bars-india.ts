/**
 * India bar update pipeline — fetches today's bars from Kite Connect
 * for all Indian universe symbols and appends to daily_bars.
 */

import { KiteConnect } from "kiteconnect"
import { getPrisma } from "../../db/prisma.js"
import { updateMovingAveragesForSymbol } from "../../db/update-sma200.js"

const DELAY_MS = 350

export interface UpdateBarsResult {
  symbolsUpdated: number
  barsInserted: number
  errors: string[]
  tokenStale: boolean
}

function formatDate(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
}

/**
 * Convert an IST date (from Kite Connect) to UTC midnight of the IST trading date.
 * Kite returns "2026-02-13T00:00:00+0530" → JS parses to 2026-02-12T18:30:00Z.
 * We add 5:30 back to recover the IST calendar date (Feb 13), then store as UTC midnight.
 */
function istToTradingDate(date: Date): Date {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
  const istTime = new Date(date.getTime() + IST_OFFSET_MS)
  return new Date(Date.UTC(istTime.getUTCFullYear(), istTime.getUTCMonth(), istTime.getUTCDate()))
}

export async function updateBarsIndia(): Promise<UpdateBarsResult> {
  const prisma = getPrisma()
  const errors: string[] = []

  // 1. Get Kite access token from DB
  const tokenRow = await prisma.kiteToken.findUnique({ where: { id: 1 } })
  const accessToken = tokenRow?.accessToken ?? process.env.KITE_ACCESS_TOKEN
  if (!accessToken) {
    return { symbolsUpdated: 0, barsInserted: 0, errors: ["No Kite access token found"], tokenStale: true }
  }

  // Check token staleness (>20 hours old)
  const tokenStale = tokenRow?.loginTime
    ? Date.now() - tokenRow.loginTime.getTime() > 20 * 60 * 60 * 1000
    : true

  if (tokenStale) {
    console.warn("[UpdateBars/India] Kite token is stale — may fail. Reconnect via Admin → Data Sources.")
  }

  const apiKey = process.env.KITE_API_KEY
  if (!apiKey) {
    return { symbolsUpdated: 0, barsInserted: 0, errors: ["KITE_API_KEY not set"], tokenStale }
  }

  const kc = new KiteConnect({ api_key: apiKey })
  kc.setAccessToken(accessToken)

  // 2. Get all Indian symbols
  const members = await prisma.universeMember.findMany({
    where: { symbol: { endsWith: ".NS" } },
    select: { symbol: true },
  })
  const uniqueSymbols = [...new Set(members.map((m) => m.symbol.replace(/\.NS$/, "")))]

  // 3. Resolve instrument tokens
  const instruments = await prisma.kiteInstrument.findMany({
    where: { tradingsymbol: { in: uniqueSymbols }, exchange: "NSE" },
    select: { instrumentToken: true, tradingsymbol: true },
  })
  const tokenMap = new Map(instruments.map((i) => [i.tradingsymbol, i.instrumentToken]))

  const matched = uniqueSymbols.filter((s) => tokenMap.has(s))
  console.log(`[UpdateBars/India] ${matched.length} symbols with instrument tokens`)

  // 4. For each symbol: find last bar date → fetch missing → insert
  const to = new Date()
  let barsInserted = 0
  let symbolsUpdated = 0

  for (let i = 0; i < matched.length; i++) {
    const symbol = matched[i]
    const instToken = tokenMap.get(symbol)!

    try {
      // Find last bar date
      const lastBar = await prisma.dailyBar.findFirst({
        where: { symbol, exchange: "NSE" },
        orderBy: { date: "desc" },
        select: { date: true },
      })

      // Start from day after last bar, or 7 days ago if no data
      const from = lastBar
        ? new Date(lastBar.date.getTime() + 86_400_000)
        : new Date(Date.now() - 7 * 86_400_000)

      if (from >= to) continue // Already up to date

      const data: any[] = await kc.getHistoricalData(
        instToken, "day", formatDate(from), formatDate(to),
      )

      if (data.length === 0) continue

      const payload = data
        .filter((c: any) => c.date && Number.isFinite(c.open) && Number.isFinite(c.close))
        .map((c: any) => ({
          symbol,
          exchange: "NSE",
          date: istToTradingDate(new Date(c.date)),
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: BigInt(Math.round(c.volume ?? 0)),
          adjFactor: 1.0,
          source: "kite",
        }))

      if (payload.length > 0) {
        const result = await prisma.dailyBar.createMany({ data: payload, skipDuplicates: true })
        barsInserted += result.count
        if (result.count > 0) {
          symbolsUpdated++
          // Compute SMA200 + EMA200 for newly inserted bars
          await updateMovingAveragesForSymbol(symbol, "NSE")
        }
      }
    } catch (e: any) {
      errors.push(`${symbol}: ${e.message?.slice(0, 80)}`)
    }

    // Rate limit
    if (i < matched.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS))
    }
  }

  return { symbolsUpdated, barsInserted, errors, tokenStale }
}
