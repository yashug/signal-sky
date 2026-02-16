/**
 * One-time backfill: Fetch 2 years of daily OHLCV data for ALL Indian universe
 * stocks from Kite Connect and store in daily_bars.
 *
 * Run: export DATABASE_URL="..." && export KITE_API_KEY="..." && export KITE_ACCESS_TOKEN="..." && npx tsx scripts/backfill-all-india.ts
 */

import { KiteConnect } from "kiteconnect"
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

const DELAY_MS = 350
const BATCH_SIZE = 500

function formatDate(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
}

function toUTCMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

async function main() {
  console.log("=== Backfill ALL Indian Universes — 2 Years ===\n")

  // 1. Init Kite
  const apiKey = process.env.KITE_API_KEY!
  const kc = new KiteConnect({ api_key: apiKey })

  // Try DB token first, then env
  let tokenSource = "env"
  try {
    const row = await prisma.kiteToken.findUnique({ where: { id: 1 } })
    if (row?.accessToken) {
      kc.setAccessToken(row.accessToken)
      tokenSource = "DB"
    } else {
      kc.setAccessToken(process.env.KITE_ACCESS_TOKEN!)
    }
  } catch {
    kc.setAccessToken(process.env.KITE_ACCESS_TOKEN!)
  }
  console.log(`Access token source: ${tokenSource}`)

  // 2. Get all Indian universe members (symbols ending with .NS)
  const allMembers = await prisma.universeMember.findMany({
    where: { symbol: { endsWith: ".NS" } },
    select: { symbol: true, universe: true },
  })

  // Deduplicate — each symbol fetched once regardless of how many universes
  const uniqueSymbols = [...new Set(allMembers.map((m) => m.symbol.replace(/\.NS$/, "")))]
  console.log(`Total Indian universe members: ${allMembers.length}`)
  console.log(`Unique symbols (deduplicated): ${uniqueSymbols.length}\n`)

  // 3. Refresh instrument master for our symbols
  console.log("Downloading Kite instrument master (NSE EQ)...")
  const allInstruments: any[] = await kc.getInstruments("NSE")
  const eqMap = new Map<string, any>()
  for (const inst of allInstruments) {
    if (inst.instrument_type === "EQ") {
      eqMap.set(inst.tradingsymbol, inst)
    }
  }
  console.log(`NSE EQ instruments: ${eqMap.size}`)

  // Upsert instruments for our symbols
  let upsertCount = 0
  for (const sym of uniqueSymbols) {
    const inst = eqMap.get(sym)
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
      update: { tradingsymbol: sym, name: inst.name?.trim() ?? null },
    })
    upsertCount++
  }
  console.log(`Upserted ${upsertCount} instruments\n`)

  // 4. Match symbols to tokens
  const matched: Array<{ symbol: string; token: number }> = []
  const unmatched: string[] = []
  for (const sym of uniqueSymbols) {
    const inst = eqMap.get(sym)
    if (inst) {
      matched.push({ symbol: sym, token: Number(inst.instrument_token) })
    } else {
      unmatched.push(sym)
    }
  }
  console.log(`Matched: ${matched.length}, Unmatched: ${unmatched.length}`)
  if (unmatched.length > 0) {
    console.log(`Unmatched: ${unmatched.slice(0, 20).join(", ")}${unmatched.length > 20 ? "..." : ""}`)
  }

  // 5. Date range — 2 years back from today
  const to = new Date()
  const from = new Date()
  from.setFullYear(from.getFullYear() - 2)
  console.log(`\nDate range: ${formatDate(from)} → ${formatDate(to)}`)
  console.log(`Fetching candles for ${matched.length} stocks...\n`)

  // 6. Fetch and store
  let totalInserted = 0
  let totalSkipped = 0
  let totalCandles = 0
  const errors: string[] = []

  for (let i = 0; i < matched.length; i++) {
    const { symbol, token } = matched[i]
    const progress = `[${i + 1}/${matched.length}]`

    try {
      const data: any[] = await kc.getHistoricalData(token, "day", formatDate(from), formatDate(to))

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
      for (let b = 0; b < payload.length; b += BATCH_SIZE) {
        const batch = payload.slice(b, b + BATCH_SIZE)
        const result = await prisma.dailyBar.createMany({ data: batch, skipDuplicates: true })
        inserted += result.count
      }

      totalCandles += data.length
      totalInserted += inserted
      totalSkipped += payload.length - inserted

      console.log(`${progress} ${symbol}: ${data.length} candles, ${inserted} new`)
    } catch (e: any) {
      console.error(`${progress} ${symbol}: ERROR — ${e.message?.slice(0, 80)}`)
      errors.push(`${symbol}: ${e.message?.slice(0, 80)}`)
    }

    if (i < matched.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS))
    }
  }

  // 7. Summary
  console.log("\n=== Summary ===")
  console.log(`Stocks processed: ${matched.length}`)
  console.log(`Total candles fetched: ${totalCandles}`)
  console.log(`Inserted: ${totalInserted}`)
  console.log(`Skipped (duplicates): ${totalSkipped}`)
  console.log(`Errors: ${errors.length}`)
  if (errors.length > 0) {
    console.log("\nFailed symbols:")
    errors.forEach((e) => console.log(`  - ${e}`))
  }

  const totalBars = await prisma.dailyBar.count({ where: { exchange: "NSE" } })
  console.log(`\nTotal NSE bars in DB: ${totalBars}`)
  console.log("\n=== Done ===")
}

main()
  .catch((e) => { console.error("FATAL:", e.message ?? e); process.exit(1) })
  .finally(() => prisma.$disconnect())
