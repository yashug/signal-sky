/**
 * Quick test: Fetch BHARTIARTL historical data from Kite and store in DB.
 * Run: npx tsx scripts/test-kite-bhartiartl.ts
 */

import { KiteConnect } from "kiteconnect"
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  console.log("=== Kite BHARTIARTL Test ===\n")

  // 1. Get access token from DB
  const tokenRow = await prisma.kiteToken.findUnique({ where: { id: 1 } })
  const accessToken = tokenRow?.accessToken ?? process.env.KITE_ACCESS_TOKEN
  if (!accessToken) {
    console.error("No access token found in DB or env. Connect Kite first.")
    process.exit(1)
  }
  console.log("Access token source:", tokenRow?.accessToken ? "DB" : "env")
  console.log("Token login time:", tokenRow?.loginTime?.toISOString() ?? "N/A")

  // 2. Init Kite client
  const kc = new KiteConnect({ api_key: process.env.KITE_API_KEY! })
  kc.setAccessToken(accessToken)

  // 3. Look up BHARTIARTL instrument token
  console.log("\nLooking up BHARTIARTL instrument token...")
  let instrumentToken: number | null = null

  // Check DB first
  const dbInstr = await prisma.kiteInstrument.findFirst({
    where: { tradingsymbol: "BHARTIARTL", exchange: "NSE" },
  })

  if (dbInstr) {
    instrumentToken = dbInstr.instrumentToken
    console.log(`Found in DB: token=${instrumentToken}, name="${dbInstr.name}"`)
  } else {
    // Fetch from Kite API
    console.log("Not in DB, fetching instrument list from Kite...")
    const instruments: any[] = await kc.getInstruments("NSE")
    const match = instruments.find(
      (i: any) => i.tradingsymbol === "BHARTIARTL" && i.instrument_type === "EQ",
    )
    if (!match) {
      console.error("BHARTIARTL not found in NSE instruments!")
      process.exit(1)
    }
    instrumentToken = Number(match.instrument_token)
    console.log(`Found via API: token=${instrumentToken}, name="${match.name}"`)

    // Store it
    await prisma.kiteInstrument.upsert({
      where: { instrumentToken },
      create: {
        instrumentToken,
        exchangeToken: Number(match.exchange_token ?? 0),
        tradingsymbol: "BHARTIARTL",
        name: match.name ?? null,
        exchange: "NSE",
        segment: match.segment ?? "NSE",
        instrumentType: match.instrument_type,
        lotSize: Number(match.lot_size ?? 1),
      },
      update: { name: match.name ?? null },
    })
    console.log("Stored instrument in DB.")
  }

  // 4. Fetch 1 year of daily candles
  const to = new Date()
  const from = new Date()
  from.setFullYear(from.getFullYear() - 1)

  const fromStr = formatDate(from)
  const toStr = formatDate(to)
  console.log(`\nFetching daily candles: ${fromStr} → ${toStr}`)

  const data: any[] = await kc.getHistoricalData(
    instrumentToken!,
    "day",
    fromStr,
    toStr,
  )

  console.log(`Received ${data.length} candles`)

  if (data.length > 0) {
    console.log("\nFirst candle:", JSON.stringify(data[0], null, 2))
    console.log("Last candle:", JSON.stringify(data[data.length - 1], null, 2))
  }

  // 5. Store in daily_bars
  console.log(`\nStoring ${data.length} candles in daily_bars...`)

  const payload = data
    .filter((c: any) => c.date && Number.isFinite(c.open) && Number.isFinite(c.close))
    .map((c: any) => ({
      symbol: "BHARTIARTL",
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
  for (let i = 0; i < payload.length; i += BATCH) {
    const batch = payload.slice(i, i + BATCH)
    const result = await prisma.dailyBar.createMany({
      data: batch,
      skipDuplicates: true,
    })
    inserted += result.count
  }

  console.log(`Inserted: ${inserted}, Skipped (duplicates): ${payload.length - inserted}`)

  // 6. Verify stored data
  const count = await prisma.dailyBar.count({
    where: { symbol: "BHARTIARTL", exchange: "NSE" },
  })
  const latest = await prisma.dailyBar.findFirst({
    where: { symbol: "BHARTIARTL", exchange: "NSE" },
    orderBy: { date: "desc" },
  })

  console.log(`\nTotal BHARTIARTL bars in DB: ${count}`)
  if (latest) {
    console.log(
      `Latest bar: ${latest.date.toISOString().split("T")[0]} | ` +
        `O:${latest.open} H:${latest.high} L:${latest.low} C:${latest.close} V:${latest.volume}`,
    )
  }

  console.log("\n=== Test Complete ===")
}

function formatDate(d: Date): string {
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(d.getUTCDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

function toUTCMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

main()
  .catch((e) => {
    console.error("FATAL:", e.message ?? e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
