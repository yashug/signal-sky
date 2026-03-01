/**
 * India bar update pipeline — fetches today's bars from Yahoo Finance
 * for all Indian universe symbols (.NS) and appends to daily_bars.
 */

import YahooFinance from "yahoo-finance2"
import { getPrisma } from "../../db/prisma.js"
import { updateMovingAveragesForSymbol } from "../../db/update-sma200.js"

const yf = new (YahooFinance as any)()

const DELAY_MS = 200

export interface UpdateBarsResult {
  symbolsUpdated: number
  barsInserted: number
  errors: string[]
}

function toUTCMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

export async function updateBarsIndia(): Promise<UpdateBarsResult> {
  const prisma = getPrisma()
  const errors: string[] = []

  // 1. Get all Indian symbols (they have .NS suffix)
  const members = await prisma.universeMember.findMany({
    where: { symbol: { endsWith: ".NS" } },
    select: { symbol: true },
  })
  const symbols = [...new Set(members.map((m) => m.symbol))]

  if (symbols.length === 0) {
    return { symbolsUpdated: 0, barsInserted: 0, errors: ["No Indian universe members in DB"] }
  }

  console.log(`[UpdateBars/India] ${symbols.length} Indian symbols`)

  const to = new Date()
  let barsInserted = 0
  let symbolsUpdated = 0

  for (let i = 0; i < symbols.length; i++) {
    const yahooSymbol = symbols[i]                          // e.g. "RELIANCE.NS" — for Yahoo only
    const dbSymbol = yahooSymbol.replace(/\.NS$/, "")       // e.g. "RELIANCE"    — for DB only

    try {
      // Find last bar date (use clean symbol)
      const lastBar = await prisma.dailyBar.findFirst({
        where: { symbol: dbSymbol, exchange: "NSE" },
        orderBy: { date: "desc" },
        select: { date: true },
      })

      const from = lastBar
        ? new Date(lastBar.date.getTime() + 86_400_000)
        : new Date(Date.now() - 7 * 86_400_000)

      if (from >= to) continue

      // Fetch from Yahoo Finance (use .NS symbol)
      const result: any[] = await yf.historical(yahooSymbol, {
        period1: from.toISOString().split("T")[0],
        period2: to.toISOString().split("T")[0],
        interval: "1d",
      })

      if (!result || result.length === 0) continue

      const payload = result
        .filter((bar: any) => bar.date && Number.isFinite(bar.open) && Number.isFinite(bar.close))
        .map((bar: any) => ({
          symbol: dbSymbol,   // store WITHOUT .NS
          exchange: "NSE",
          date: toUTCMidnight(new Date(bar.date)),
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
          volume: BigInt(Math.round(bar.volume ?? 0)),
          adjFactor: bar.adjClose && bar.close ? bar.adjClose / bar.close : 1.0,
          source: "yahoo",
        }))

      if (payload.length > 0) {
        const inserted = await prisma.dailyBar.createMany({ data: payload, skipDuplicates: true })
        barsInserted += inserted.count
        if (inserted.count > 0) {
          symbolsUpdated++
          await updateMovingAveragesForSymbol(dbSymbol, "NSE")
        }
      }
    } catch (e: any) {
      errors.push(`${yahooSymbol}: ${e.message?.slice(0, 80)}`)
    }

    if (i < symbols.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS))
    }
  }

  return { symbolsUpdated, barsInserted, errors }
}
