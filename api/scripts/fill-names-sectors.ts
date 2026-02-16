/**
 * Fetch company names and sectors from Yahoo Finance
 * for all universe_members that have NULL/empty name or sector.
 *
 * Usage: npx tsx scripts/fill-names-sectors.ts
 */
import "dotenv/config"
import YahooFinance from "yahoo-finance2"
import { getPrisma } from "../src/db/prisma.js"

const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] })

const prisma = getPrisma()

// Fetch all members missing name or sector
const members = await prisma.universeMember.findMany({
  where: {
    OR: [
      { name: null },
      { name: "" },
      { sector: null },
      { sector: "" },
    ],
  },
  orderBy: [{ universe: "asc" }, { symbol: "asc" }],
})

console.log(`Found ${members.length} members needing name/sector info\n`)

if (members.length === 0) {
  console.log("Nothing to do!")
  await prisma.$disconnect()
  process.exit(0)
}

// Dedupe symbols (same stock can appear in niftybank + nifty50)
const uniqueSymbols = [...new Set(members.map(m => m.symbol))]
console.log(`Unique symbols to look up: ${uniqueSymbols.length}`)

// Fetch in batches to avoid rate limits
const BATCH_SIZE = 5
const DELAY_MS = 1000

type Info = { name: string; sector: string }
const infoMap = new Map<string, Info>()
let fetched = 0
let errors = 0

for (let i = 0; i < uniqueSymbols.length; i += BATCH_SIZE) {
  const batch = uniqueSymbols.slice(i, i + BATCH_SIZE)

  const results = await Promise.allSettled(
    batch.map(async (symbol) => {
      try {
        const result: any = await yf.quoteSummary(symbol, {
          modules: ["assetProfile", "quoteType"],
        })

        const name =
          result?.quoteType?.shortName ||
          result?.quoteType?.longName ||
          ""
        const sector =
          result?.assetProfile?.sector ||
          result?.assetProfile?.industry ||
          ""

        return { symbol, name, sector }
      } catch {
        // Fallback: try quote endpoint
        try {
          const q: any = await yf.quote(symbol)
          return {
            symbol,
            name: q?.shortName || q?.longName || "",
            sector: "",
          }
        } catch {
          return { symbol, name: "", sector: "" }
        }
      }
    })
  )

  for (const r of results) {
    if (r.status === "fulfilled" && r.value) {
      const { symbol, name, sector } = r.value
      if (name || sector) {
        infoMap.set(symbol, { name, sector })
        fetched++
      } else {
        errors++
      }
    } else {
      errors++
    }
  }

  const progress = Math.min(i + BATCH_SIZE, uniqueSymbols.length)
  process.stdout.write(`\r  Fetched ${progress}/${uniqueSymbols.length} (${fetched} ok, ${errors} failed)`)

  if (i + BATCH_SIZE < uniqueSymbols.length) {
    await new Promise(r => setTimeout(r, DELAY_MS))
  }
}

console.log("\n")

// Update DB
let updated = 0
for (const member of members) {
  const info = infoMap.get(member.symbol)
  if (!info) continue
  if (!info.name && !info.sector) continue

  await prisma.universeMember.update({
    where: { id: member.id },
    data: {
      ...(info.name ? { name: info.name } : {}),
      ...(info.sector ? { sector: info.sector } : {}),
    },
  })
  updated++
}

console.log(`Updated ${updated} rows in DB`)

// Show remaining nulls
const remaining = await prisma.universeMember.count({
  where: {
    OR: [
      { name: null },
      { name: "" },
      { sector: null },
      { sector: "" },
    ],
  },
})
console.log(`Remaining with missing name/sector: ${remaining}`)

await prisma.$disconnect()
console.log("Done!")
