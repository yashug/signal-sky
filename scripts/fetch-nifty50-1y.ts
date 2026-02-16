
/**
 * Fetch 1 year of daily OHLCV data for all Nifty 50 stocks from Kite Connect.
 * Run: npx tsx scripts/fetch-nifty50-1y.ts
 */

import { KiteConnect } from "kiteconnect"
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

function formatDate(d: Date): string {
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(d.getUTCDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

function toUTCMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

async function main() {
  console.log("=== Fetch Nifty 50 — 1 Year Daily Data ===\n")

  // 1. Init Kite
  const apiKey = process.env.KITE_API_KEY!
  const accessToken = process.env.KITE_ACCESS_TOKEN!
  const kc = new KiteConnect({ api_key: apiKey })
  kc.setAccessToken(accessToken)

  // Also try DB token
  try {
    const row = await prisma.kiteToken.findUnique({ where: { id: 1 } })
    if (row?.accessToken) {
      kc.setAccessToken(row.accessToken)
      console.log("Using access token from DB")
    } else {
      console.log("Using access token from env")
    }
  } catch {
    console.log("Using access token from env")
  }

  // 2. Get Nifty 50 universe members
  const members = await prisma.universeMember.findMany({
    where: { universe: "nifty50" },
    select: { symbol: true, name: true },
  })
  console.log(`Nifty 50 universe: ${members.length} stocks`)

  // Strip .NS suffix for Kite matching
  const symbols = members.map((m) => m.symbol.replace(/\.NS$/, ""))
  console.log(`Symbols (first 10): ${symbols.slice(0, 10).join(", ")}...\n`)

  // 3. Refresh instrument master (NSE EQ only)
  console.log("Downloading instrument master from Kite...")
  const allInstruments: any[] = await kc.getInstruments("NSE")
  const eqInstruments = allInstruments.filter((i: any) => i.instrument_type === "EQ")
  console.log(`Total NSE instruments: ${allInstruments.length}, EQ only: ${eqInstruments.length}`)

  // Build lookup: tradingsymbol -> instrument
  const instrumentMap = new Map<string, any>()
  for (const inst of eqInstruments) {
    instrumentMap.set(inst.tradingsymbol, inst)
  }

  // Upsert instruments for our symbols
  let upsertCount = 0
  for (const sym of symbols) {
    const inst = instrumentMap.get(sym)
    if (!inst) continue
    await prisma.kiteInstrument.upsert({
      where: { instrumentToken: Number(inst.instrument_token) },
      create: {
        instrumentToken: Number(inst.instrument_token),
        exchangeToken: Number(inst.exchange_token ?? 0),
        tradingsymbol: sym,
        name: inst.name?.trim() ?? null,
        exchange: "NSE",
        segment: inst.segment ?? "NSE",
        instrumentType: inst.instrument_type,
        lotSize: Number(inst.lot_size ?? 1),
      },
      update: {
        tradingsymbol: sym,
        name: inst.name?.trim() ?? null,
      },
    })
    upsertCount++
  }
  console.log(`Upserted ${upsertCount} instruments into DB`)

  // 4. Match symbols to tokens
  const matched: Array<{ symbol: string; token: number }> = []
  const unmatched: string[] = []
  for (const sym of symbols) {
    const inst = instrumentMap.get(sym)
    if (inst) {
      matched.push({ symbol: sym, token: Number(inst.instrument_token) })
    } else {
      unmatched.push(sym)
    }
  }
  console.log(`\nMatched: ${matched.length}, Unmatched: ${unmatched.length}`)
  if (unmatched.length > 0) {
    console.log("Unmatched symbols:", unmatched.join(", "))
  }

  // 5. Fetch 1 year of daily candles
  const to = new Date(Date.UTC(2026, 1, 10)) // Feb 10, 2026
  const from = new Date(Date.UTC(2025, 1, 10)) // Feb 10, 2025

  console.log(`\nDate range: ${formatDate(from)} → ${formatDate(to)}`)
  console.log(`Fetching candles for ${matched.length} stocks...\n`)

  let totalInserted = 0
  let totalSkipped = 0
  let totalCandles = 0
  const errors: string[] = []
  const DELAY_MS = 350 // Kite rate limit ~3 req/sec

  for (let i = 0; i < matched.length; i++) {
    const { symbol, token } = matched[i]
    const progress = `[${i + 1}/${matched.length}]`

    try {
      const data: any[] = await kc.getHistoricalData(
        token,
        "day",
        formatDate(from),
        formatDate(to),
      )

      // Store in DB
      const payload = data
        .filter((c: any) => c.date && Number.isFinite(c.open) && Number.isFinite(c.close))
        .map((c: any) => ({
          symbol,
          exchange: "NSE",
          date: toUTCMidnight(new Date(c.date)),
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: BigInt(Math.round(c.volume ?? 0)),
          adjFactor: 1.0,
          source: "kite",
        }))

      let inserted = 0
      const BATCH = 500
      for (let b = 0; b < payload.length; b += BATCH) {
        const batch = payload.slice(b, b + BATCH)
        const result = await prisma.dailyBar.createMany({
          data: batch,
          skipDuplicates: true,
        })
        inserted += result.count
      }

      totalCandles += data.length
      totalInserted += inserted
      totalSkipped += payload.length - inserted

      console.log(`${progress} ${symbol}: ${data.length} candles, ${inserted} inserted`)
    } catch (e: any) {
      console.error(`${progress} ${symbol}: ERROR — ${e.message}`)
      errors.push(`${symbol}: ${e.message?.slice(0, 80)}`)
    }

    // Rate limit delay
    if (i < matched.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS))
    }
  }

  // 6. Summary
  console.log("\n=== Summary ===")
  console.log(`Stocks processed: ${matched.length}`)
  console.log(`Total candles fetched: ${totalCandles}`)
  console.log(`Inserted: ${totalInserted}`)
  console.log(`Skipped (duplicates): ${totalSkipped}`)
  console.log(`Errors: ${errors.length}`)
  if (errors.length > 0) {
    console.log("Failed symbols:")
    errors.forEach((e) => console.log(`  - ${e}`))
  }

  // Verify
  const totalBars = await prisma.dailyBar.count({ where: { exchange: "NSE" } })
  console.log(`\nTotal NSE bars in DB: ${totalBars}`)

  console.log("\n=== Done ===")
}

main()
  .catch((e) => {
    console.error("FATAL:", e.message ?? e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
