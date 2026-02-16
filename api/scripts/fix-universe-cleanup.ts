/**
 * Cleanup universe_members:
 * 1. Remove index name entries (NIFTY 50.NS, NIFTY NEXT 50.NS, etc.)
 * 2. Remove cross-index duplicates (keep in nifty50, remove from niftynext50)
 */
import "dotenv/config"
import { getPrisma } from "../src/db/prisma.js"

const prisma = getPrisma()

// 1. Delete index name entries (symbols with spaces)
const indexNames = await prisma.universeMember.findMany({
  where: { symbol: { contains: " " } },
})
for (const row of indexNames) {
  console.log(`Deleting index name: ${row.universe}/${row.symbol}`)
  await prisma.universeMember.delete({ where: { id: row.id } })
}
console.log(`Removed ${indexNames.length} index name entries\n`)

// 2. Find symbols that exist in both nifty50 and niftynext50
const n50 = await prisma.universeMember.findMany({ where: { universe: "nifty50" }, select: { symbol: true } })
const nn50 = await prisma.universeMember.findMany({ where: { universe: "niftynext50" }, select: { id: true, symbol: true } })

const n50Set = new Set(n50.map(m => m.symbol))
const overlaps = nn50.filter(m => n50Set.has(m.symbol))

if (overlaps.length > 0) {
  console.log(`Cross-index duplicates (in both nifty50 and niftynext50): ${overlaps.length}`)
  for (const m of overlaps) {
    console.log(`  Removing from niftynext50: ${m.symbol}`)
    await prisma.universeMember.delete({ where: { id: m.id } })
  }
}

// 3. Print final counts
console.log("\nFinal universe counts:")
const UNIVERSES = ["nifty50", "niftynext50", "nifty200", "niftymidcap50", "niftymidcap100", "niftysmallcap50", "niftysmallcap100", "niftybank", "sp100", "nasdaq100"]
for (const u of UNIVERSES) {
  const count = await prisma.universeMember.count({ where: { universe: u } })
  if (count > 0) console.log(`  ${u}: ${count}`)
}

const total = await prisma.universeMember.count()
console.log(`  TOTAL: ${total}`)

await prisma.$disconnect()
