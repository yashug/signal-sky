/**
 * Sync universe_members from NSE MarketWatch CSV files.
 *
 * Reads downloaded CSVs from ~/Downloads, extracts symbols,
 * applies the most-granular-tag logic, and upserts into DB.
 *
 * Usage: npx tsx scripts/sync-universes-from-csv.ts
 */
import "dotenv/config"
import { readFileSync } from "fs"
import { getPrisma } from "../src/db/prisma.js"

const prisma = getPrisma()

// ── Parse MW CSV: extract SYMBOL column (skip index header row) ──
function parseSymbols(filePath: string): string[] {
  const raw = readFileSync(filePath, "utf-8")
  const lines = raw.split("\n").filter(l => l.trim())
  const symbols: string[] = []
  // Stock symbol pattern: uppercase letters, digits, & and - only, 1-20 chars
  const symbolRe = /^[A-Z0-9&\-]+$/
  for (const line of lines) {
    // First quoted field is the symbol
    const match = line.match(/^"([^"]+)"/)
    if (!match) continue
    const sym = match[1].trim()
    // Only accept valid stock symbols (no spaces, no field names)
    if (!symbolRe.test(sym)) continue
    symbols.push(sym)
  }
  return symbols
}

// ── CSV file paths ──
const HOME = process.env.HOME!
const csvFiles = {
  nifty50:       `${HOME}/Downloads/MW-NIFTY-50-10-Feb-2026.csv`,
  niftynext50:   `${HOME}/Downloads/MW-NIFTY-NEXT-50-10-Feb-2026.csv`,
  niftybank:     `${HOME}/Downloads/MW-NIFTY-BANK-10-Feb-2026.csv`,
  nifty100:      `${HOME}/Downloads/MW-NIFTY-100-11-Feb-2026.csv`,
  nifty200:      `${HOME}/Downloads/MW-NIFTY-200-11-Feb-2026.csv`,
  midcap50:      `${HOME}/Downloads/MW-NIFTY-MIDCAP-50-11-Feb-2026.csv`,
  midcap100:     `${HOME}/Downloads/MW-NIFTY-MIDCAP-100-11-Feb-2026.csv`,
  smallcap50:    `${HOME}/Downloads/MW-NIFTY-SMALLCAP-50-11-Feb-2026.csv`,
  smallcap100:   `${HOME}/Downloads/MW-NIFTY-SMALLCAP-100-11-Feb-2026.csv`,
}

// ── Parse all CSVs ──
const n50syms       = parseSymbols(csvFiles.nifty50)
const nn50syms      = parseSymbols(csvFiles.niftynext50)
const bankSyms      = parseSymbols(csvFiles.niftybank)
const n100syms      = parseSymbols(csvFiles.nifty100)
const n200syms      = parseSymbols(csvFiles.nifty200)
const mc50syms      = parseSymbols(csvFiles.midcap50)
const mc100syms     = parseSymbols(csvFiles.midcap100)
const sc50syms      = parseSymbols(csvFiles.smallcap50)
const sc100syms     = parseSymbols(csvFiles.smallcap100)

console.log("CSV counts:")
console.log(`  Nifty 50:       ${n50syms.length}`)
console.log(`  Nifty Next 50:  ${nn50syms.length}`)
console.log(`  Nifty Bank:     ${bankSyms.length}`)
console.log(`  Nifty 100:      ${n100syms.length}`)
console.log(`  Nifty 200:      ${n200syms.length}`)
console.log(`  Midcap 50:      ${mc50syms.length}`)
console.log(`  Midcap 100:     ${mc100syms.length}`)
console.log(`  Smallcap 50:    ${sc50syms.length}`)
console.log(`  Smallcap 100:   ${sc100syms.length}`)

// ── Compute stored universe memberships ──
// Each stock is stored ONCE under its most granular tag.
// Composite indices are resolved at query time.
const n100set = new Set(n100syms)
const mc50set = new Set(mc50syms)
const sc50set = new Set(sc50syms)

// nifty200 extras = in nifty200 but NOT in nifty100
const n200extras = n200syms.filter(s => !n100set.has(s))

// midcap100 extras = in midcap100 but NOT in midcap50
const mc100extras = mc100syms.filter(s => !mc50set.has(s))

// smallcap100 extras = in smallcap100 but NOT in smallcap50
const sc100extras = sc100syms.filter(s => !sc50set.has(s))

console.log("\nStored universe sizes:")
console.log(`  nifty50:          ${n50syms.length}`)
console.log(`  niftynext50:      ${nn50syms.length}`)
console.log(`  nifty200 extras:  ${n200extras.length}`)
console.log(`  niftymidcap50:    ${mc50syms.length}`)
console.log(`  niftymidcap100:   ${mc100extras.length}`)
console.log(`  niftysmallcap50:  ${sc50syms.length}`)
console.log(`  niftysmallcap100: ${sc100extras.length}`)
console.log(`  niftybank:        ${bankSyms.length}`)

// ── Build insert data ──
type Row = { universe: string; symbol: string }

function buildRows(universe: string, symbols: string[]): Row[] {
  return symbols.map(s => ({
    universe,
    symbol: s.endsWith(".NS") ? s : `${s}.NS`,
  }))
}

const allRows: Row[] = [
  ...buildRows("nifty50", n50syms),
  ...buildRows("niftynext50", nn50syms),
  ...buildRows("nifty200", n200extras),
  ...buildRows("niftymidcap50", mc50syms),
  ...buildRows("niftymidcap100", mc100extras),
  ...buildRows("niftysmallcap50", sc50syms),
  ...buildRows("niftysmallcap100", sc100extras),
  ...buildRows("niftybank", bankSyms),
]

const totalIndia = allRows.length
console.log(`\nTotal Indian rows to insert: ${totalIndia}`)

// ── Sync DB ──
// 1. Delete all existing Indian universe members
const indianUniverses = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100",
  "niftybank",
]

const deleted = await prisma.universeMember.deleteMany({
  where: { universe: { in: indianUniverses } },
})
console.log(`Deleted ${deleted.count} existing Indian members`)

// 2. Insert fresh
const inserted = await prisma.universeMember.createMany({
  data: allRows,
  skipDuplicates: true,
})
console.log(`Inserted ${inserted.count} new members`)

// 3. Verify final counts
const counts = await prisma.$queryRawUnsafe<{ universe: string; count: bigint }[]>(
  `SELECT universe, COUNT(*)::bigint as count FROM universe_members GROUP BY universe ORDER BY universe`
)
console.log("\nFinal DB counts:")
let total = 0
for (const { universe, count } of counts) {
  const c = Number(count)
  total += c
  console.log(`  ${universe}: ${c}`)
}
console.log(`  TOTAL: ${total}`)

await prisma.$disconnect()
console.log("\nDone!")
