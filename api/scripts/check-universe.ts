import "dotenv/config"
import { getPrisma } from "../src/db/prisma.js"

const prisma = getPrisma()

const all = await prisma.universeMember.findMany({ orderBy: [{ universe: "asc" }, { symbol: "asc" }] })
console.log("Total universe_members:", all.length)

// Group by universe
const byUniverse: Record<string, string[]> = {}
for (const m of all) {
  if (!byUniverse[m.universe]) byUniverse[m.universe] = []
  byUniverse[m.universe].push(m.symbol)
}

for (const [u, syms] of Object.entries(byUniverse)) {
  const withNS = syms.filter(s => s.endsWith(".NS"))
  const withoutNS = syms.filter(s => !s.endsWith(".NS"))
  console.log(`\n${u}: ${syms.length} total (${withNS.length} with .NS, ${withoutNS.length} without)`)

  // Find duplicates (same base symbol, one with .NS and one without)
  const baseMap = new Map<string, string[]>()
  for (const s of syms) {
    const base = s.replace(/\.NS$/, "")
    const existing = baseMap.get(base) ?? []
    existing.push(s)
    baseMap.set(base, existing)
  }
  const dupes = [...baseMap.entries()].filter(([, v]) => v.length > 1)
  if (dupes.length > 0) {
    console.log("  DUPLICATES:", dupes.length)
    dupes.forEach(([base, variants]) => console.log("   ", base, "->", variants))
  }

  // Show a sample of without-NS if any
  if (withoutNS.length > 0 && withNS.length > 0) {
    console.log("  Sample WITHOUT .NS:", withoutNS.slice(0, 5))
    console.log("  Sample WITH .NS:", withNS.slice(0, 5))
  }
}

await prisma.$disconnect()
