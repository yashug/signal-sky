import "dotenv/config"
import { getPrisma } from "../src/db/prisma.js"

const prisma = getPrisma()

for (const universe of ["nifty50", "niftynext50"]) {
  const members = await prisma.universeMember.findMany({
    where: { universe },
    orderBy: { symbol: "asc" },
    select: { id: true, symbol: true, name: true },
  })
  console.log(`\n${universe}: ${members.length} members`)
  for (const m of members) {
    // Flag suspicious entries (index names, spaces in symbols)
    const suspicious = m.symbol.includes(" ") || !m.symbol.match(/^[A-Z0-9&-]+\.NS$/)
    console.log(`  ${suspicious ? "** " : "   "}${m.symbol.padEnd(25)} ${m.name ?? ""}`)
  }
}

await prisma.$disconnect()
