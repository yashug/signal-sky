/**
 * One-time backfill: Fetch 10 years of daily OHLCV data for all Nifty 50
 * stocks from Kite Connect and store in daily_bars.
 *
 * Kite allows ~2000 candles per request, so we split into 2 x 5-year chunks.
 *
 * Run: npx tsx scripts/backfill-nifty50-10y.ts
 * Requires: DATABASE_URL, KITE_API_KEY, and kite_tokens DB row or KITE_ACCESS_TOKEN env.
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

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const universe = process.argv[2] ?? "nifty50"
  console.log(`=== Backfill ${universe} — 10 Years ===\n`)

  // 1. Init Kite
  const apiKey = process.env.KITE_API_KEY!
  if (!apiKey) {
    throw new Error("KITE_API_KEY must be set")
  }
  const kc = new KiteConnect({ api_key: apiKey })

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

  // 2. Get Nifty 50 universe members
  const members = await prisma.universeMember.findMany({
    where: { universe },
    select: { symbol: true, name: true },
  })
  const uniqueSymbols = members.map((m) => m.symbol.replace(/\.NS$/, ""))
  console.log(`${universe} members: ${members.length}`)

  // 3. Download instrument master and match
  console.log("Downloading Kite instrument master (NSE EQ)...")
  const allInstruments: any[] = await kc.getInstruments("NSE")
  const eqMap = new Map<string, any>()
  for (const inst of allInstruments) {
    if (inst.instrument_type === "EQ") {
      eqMap.set(inst.tradingsymbol, inst)
    }
  }
  console.log(`NSE EQ instruments: ${eqMap.size}`)

  const matched: Array<{ symbol: string; token: number; name: string }> = []
  const unmatched: string[] = []
  for (let i = 0; i < uniqueSymbols.length; i++) {
    const sym = uniqueSymbols[i]
    const inst = eqMap.get(sym)
    if (inst) {
      matched.push({ symbol: sym, token: Number(inst.instrument_token), name: members[i].name ?? sym })
    } else {
      unmatched.push(sym)
    }
  }
  console.log(`Matched: ${matched.length}, Unmatched: ${unmatched.length}`)
  if (unmatched.length > 0) {
    console.log(`Unmatched: ${unmatched.join(", ")}`)
  }

  // 4. Define 2 x 5-year date chunks
  const today = new Date()
  const chunks = [
    {
      from: new Date(Date.UTC(today.getUTCFullYear() - 10, today.getUTCMonth(), today.getUTCDate())),
      to: new Date(Date.UTC(today.getUTCFullYear() - 5, today.getUTCMonth(), today.getUTCDate() - 1)),
      label: "chunk 1 (10y-5y ago)",
    },
    {
      from: new Date(Date.UTC(today.getUTCFullYear() - 5, today.getUTCMonth(), today.getUTCDate())),
      to: today,
      label: "chunk 2 (5y ago-today)",
    },
  ]

  console.log(`\nDate chunks:`)
  for (const c of chunks) {
    console.log(`  ${c.label}: ${formatDate(c.from)} → ${formatDate(c.to)}`)
  }
  console.log(`\nTotal API calls: ${matched.length} stocks × ${chunks.length} chunks = ${matched.length * chunks.length}`)
  console.log(`Estimated time: ~${Math.ceil((matched.length * chunks.length * DELAY_MS) / 1000)}s\n`)

  // 5. Fetch and store
  let totalInserted = 0
  let totalSkipped = 0
  let totalCandles = 0
  const errors: string[] = []

  for (let i = 0; i < matched.length; i++) {
    const { symbol, token, name } = matched[i]
    const progress = `[${i + 1}/${matched.length}]`

    let allCandles: any[] = []

    for (let c = 0; c < chunks.length; c++) {
      const chunk = chunks[c]
      try {
        const data: any[] = await kc.getHistoricalData(
          token, "day", formatDate(chunk.from), formatDate(chunk.to),
        )
        allCandles.push(...data)
      } catch (e: any) {
        console.error(`${progress} ${symbol} ${chunk.label}: ERROR — ${e.message?.slice(0, 80)}`)
        errors.push(`${symbol} (${chunk.label}): ${e.message?.slice(0, 80)}`)
      }

      // Rate limit
      await sleep(DELAY_MS)
    }

    // Build payload and insert
    const payload = allCandles
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

    totalCandles += allCandles.length
    totalInserted += inserted
    totalSkipped += payload.length - inserted

    console.log(`${progress} ${symbol} (${name}): ${allCandles.length} candles, ${inserted} new`)
  }

  // 6. Summary
  console.log("\n=== Summary ===")
  console.log(`Stocks processed: ${matched.length}`)
  console.log(`Total candles fetched: ${totalCandles}`)
  console.log(`Inserted: ${totalInserted}`)
  console.log(`Skipped (duplicates): ${totalSkipped}`)
  console.log(`Errors: ${errors.length}`)
  if (errors.length > 0) {
    console.log("\nFailed:")
    errors.forEach((e) => console.log(`  - ${e}`))
  }

  const totalBars = await prisma.dailyBar.count({ where: { exchange: "NSE" } })
  console.log(`\nTotal NSE bars in DB: ${totalBars}`)
  console.log("\n=== Done ===")
}

main()
  .catch((e) => { console.error("FATAL:", e.message ?? e); process.exit(1) })
  .finally(() => prisma.$disconnect())
