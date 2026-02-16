import "dotenv/config"
import { getPrisma } from "../src/db/prisma.js"

const prisma = getPrisma()

// Universe ordering as specified
const UNIVERSE_ORDER = [
  "nifty50",
  "niftynext50",
  "nifty200",
  "niftymidcap50",
  "niftymidcap100",
  "niftysmallcap50",
  "niftysmallcap100",
  "niftybank",
  "sp100",
  "nasdaq100",
]

// Pretty labels for section comments
const UNIVERSE_LABELS: Record<string, string> = {
  nifty50: "Nifty 50",
  niftynext50: "Nifty Next 50",
  nifty200: "Nifty 200",
  niftymidcap50: "Nifty Midcap 50",
  niftymidcap100: "Nifty Midcap 100",
  niftysmallcap50: "Nifty Smallcap 50",
  niftysmallcap100: "Nifty Smallcap 100",
  niftybank: "Nifty Bank",
  sp100: "S&P 100",
  nasdaq100: "NASDAQ 100",
}

async function main() {
  // Fetch all universe_members ordered alphabetically by symbol within each universe
  const rows = await prisma.universeMember.findMany({
    orderBy: [{ universe: "asc" }, { symbol: "asc" }],
  })

  // Group by universe
  const byUniverse: Record<string, typeof rows> = {}
  for (const row of rows) {
    if (!byUniverse[row.universe]) byUniverse[row.universe] = []
    byUniverse[row.universe].push(row)
  }

  // Output in specified order
  for (const universe of UNIVERSE_ORDER) {
    const members = byUniverse[universe]
    if (!members || members.length === 0) continue

    const label = UNIVERSE_LABELS[universe] ?? universe
    console.log(`// ── ${label} (${members.length} stocks) ──`)
    console.log(`[`)

    for (const m of members) {
      const name = m.name ?? ""
      const sector = m.sector ?? ""
      // Escape any double quotes inside values
      const safeName = name.replace(/"/g, '\\"')
      const safeSector = sector.replace(/"/g, '\\"')
      const safeSymbol = m.symbol.replace(/"/g, '\\"')
      console.log(
        `  { universe: "${universe}", symbol: "${safeSymbol}", name: "${safeName}", sector: "${safeSector}" },`
      )
    }

    console.log(`]`)
    console.log()
  }

  // Report any universes in DB that weren't in our ordered list
  const knownSet = new Set(UNIVERSE_ORDER)
  const unknown = Object.keys(byUniverse).filter((u) => !knownSet.has(u))
  if (unknown.length > 0) {
    console.log(`// ── WARNING: Unknown universes found in DB: ${unknown.join(", ")} ──`)
    for (const universe of unknown.sort()) {
      const members = byUniverse[universe]
      console.log(`// ── ${universe} (${members.length} stocks) ──`)
      console.log(`[`)
      for (const m of members) {
        const name = m.name ?? ""
        const sector = m.sector ?? ""
        const safeName = name.replace(/"/g, '\\"')
        const safeSector = sector.replace(/"/g, '\\"')
        const safeSymbol = m.symbol.replace(/"/g, '\\"')
        console.log(
          `  { universe: "${universe}", symbol: "${safeSymbol}", name: "${safeName}", sector: "${safeSector}" },`
        )
      }
      console.log(`]`)
      console.log()
    }
  }

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
