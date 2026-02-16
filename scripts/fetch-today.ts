/**
 * Fetch today's (Feb 11, 2026) daily bar for all Nifty 50 stocks.
 * Run: npx tsx scripts/fetch-today.ts
 */

import { KiteConnect } from "kiteconnect"
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) throw new Error("DATABASE_URL required")
const adapter = new PrismaPg({ connectionString: dbUrl })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  const apiKey = process.env.KITE_API_KEY
  if (!apiKey) throw new Error("KITE_API_KEY required")

  const kc = new KiteConnect({ api_key: apiKey })
  const row = await prisma.kiteToken.findUnique({ where: { id: 1 } })
  if (!row?.accessToken) throw new Error("No Kite token in DB")
  kc.setAccessToken(row.accessToken)

  const members = await prisma.universeMember.findMany({
    where: { universe: "nifty50" },
    select: { symbol: true },
  })

  const instruments: any[] = await kc.getInstruments("NSE")
  const eqMap = new Map<string, any>()
  for (const inst of instruments) {
    if (inst.instrument_type === "EQ") eqMap.set(inst.tradingsymbol, inst)
  }

  const today = "2026-02-11"
  let inserted = 0
  const errors: string[] = []

  for (const m of members) {
    const sym = m.symbol.replace(/\.NS$/, "")
    const inst = eqMap.get(sym)
    if (!inst) { errors.push(`${sym}: no instrument`); continue }

    try {
      const data: any[] = await kc.getHistoricalData(
        Number(inst.instrument_token), "day", today, today,
      )
      if (data.length === 0) {
        console.log(`${sym}: no data for today (market may be closed)`)
        continue
      }

      const payload = data.map((c: any) => ({
        symbol: sym,
        exchange: "NSE",
        date: new Date(Date.UTC(2026, 1, 11)),
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
        volume: BigInt(Math.round(c.volume ?? 0)),
        adjFactor: 1.0,
        source: "kite",
      }))

      const result = await prisma.dailyBar.createMany({ data: payload, skipDuplicates: true })
      inserted += result.count
      if (result.count > 0) console.log(`${sym}: inserted`)
      else console.log(`${sym}: already exists`)
    } catch (e: any) {
      errors.push(`${sym}: ${e.message?.slice(0, 60)}`)
    }
    await new Promise((r) => setTimeout(r, 350))
  }

  console.log(`\nTotal inserted: ${inserted}`)
  if (errors.length) {
    console.log(`Errors (${errors.length}):`)
    errors.forEach((e) => console.log(`  - ${e}`))
  }
}

main()
  .catch((e) => console.error("FATAL:", e.message))
  .finally(() => prisma.$disconnect())
