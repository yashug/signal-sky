/**
 * Fix universe_members: standardize all Indian symbols to .NS suffix,
 * remove duplicates where both SYMBOL and SYMBOL.NS exist.
 */
import "dotenv/config"
import { getPrisma } from "../src/db/prisma.js"

const prisma = getPrisma()

const INDIAN_UNIVERSES = ["nifty50", "niftynext50", "nifty200", "niftymidcap50", "niftymidcap100", "niftysmallcap50", "niftysmallcap100", "niftybank"]

const all = await prisma.universeMember.findMany({
  where: { universe: { in: INDIAN_UNIVERSES } },
})

console.log(`Total Indian universe_members: ${all.length}`)

let deleted = 0
let renamed = 0

for (const member of all) {
  // Skip if already has .NS suffix
  if (member.symbol.endsWith(".NS")) continue

  // This is a bare symbol (no .NS) in an Indian universe
  const nsSymbol = member.symbol + ".NS"

  // Check if the .NS version already exists in the same universe
  const nsExists = all.some(m => m.symbol === nsSymbol && m.universe === member.universe)

  if (nsExists) {
    // Duplicate — delete the bare one
    await prisma.universeMember.delete({ where: { id: member.id } })
    console.log(`  Deleted duplicate: ${member.universe}/${member.symbol} (${nsSymbol} exists)`)
    deleted++
  } else {
    // No .NS version — rename this one to add .NS
    await prisma.universeMember.update({
      where: { id: member.id },
      data: { symbol: nsSymbol },
    })
    console.log(`  Renamed: ${member.universe}/${member.symbol} -> ${nsSymbol}`)
    renamed++
  }
}

// Also fix daily_bars: ensure Indian market bars have consistent symbols
// The daily_bars table stores symbols WITHOUT .NS (exchange="NSE" distinguishes them)
// This is correct — no changes needed there.

console.log(`\nDone. Deleted ${deleted} duplicates, renamed ${renamed} bare symbols.`)

// Verify final counts
const final = await prisma.universeMember.findMany({
  where: { universe: { in: INDIAN_UNIVERSES } },
})
const byUniverse: Record<string, number> = {}
for (const m of final) {
  byUniverse[m.universe] = (byUniverse[m.universe] ?? 0) + 1
}
console.log("\nFinal counts:")
for (const [u, count] of Object.entries(byUniverse).sort()) {
  console.log(`  ${u}: ${count}`)
}

await prisma.$disconnect()
