/**
 * Test: Run the "Reset & Reclaim" strategy against Nifty 50 daily bars stored in our DB.
 * Run: npx tsx scripts/test-strategy-scan.ts
 */

import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

// ─── Inline indicator functions (matching api/src/engine/indicators.ts) ─────

type Bar = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjustmentFactor: number
}

function sma(bars: Bar[], period: number): number {
  if (bars.length < period) return NaN
  const recent = bars.slice(-period)
  return recent.reduce((acc, b) => acc + b.close, 0) / period
}

function allTimeHigh(bars: Bar[]): number {
  if (bars.length === 0) return NaN
  return Math.max(...bars.map((b) => b.close * (b.adjustmentFactor ?? 1)))
}

function athDate(bars: Bar[]): string {
  let maxPrice = -Infinity
  let maxDate = ""
  for (const bar of bars) {
    const adj = bar.adjustmentFactor ?? 1
    if (bar.close * adj > maxPrice) {
      maxPrice = bar.close * adj
      maxDate = bar.date
    }
  }
  return maxDate
}

function avgVolume(bars: Bar[], period = 20): number {
  const recent = bars.slice(-period)
  return recent.reduce((acc, b) => acc + b.volume, 0) / recent.length
}

function hasReset(bars: Bar[], sma200: number, athDateStr: string): boolean {
  return bars.filter((b) => b.date > athDateStr).some((b) => b.low < sma200)
}

function distanceToBreakout(price: number, ath: number): number {
  if (ath <= 0) return Infinity
  return ((ath - price) / price) * 100
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Strategy Scan Test — Nifty 50 DB Data ===\n")

  // Get all unique NSE symbols in daily_bars
  const symbolRows = await prisma.dailyBar.findMany({
    where: { exchange: "NSE" },
    distinct: ["symbol"],
    select: { symbol: true },
  })
  const symbols = symbolRows.map((r) => r.symbol)
  console.log(`Found ${symbols.length} NSE symbols in daily_bars\n`)

  const signals: Array<{
    symbol: string
    heat: string
    price: number
    ath: number
    sma200: number
    distPct: number
    volSurge: number
    bars: number
  }> = []

  const skipped: Array<{ symbol: string; reason: string }> = []

  for (const symbol of symbols) {
    // Fetch all bars for this symbol, sorted by date ascending
    const dbBars = await prisma.dailyBar.findMany({
      where: { symbol, exchange: "NSE" },
      orderBy: { date: "asc" },
    })

    if (dbBars.length < 200) {
      skipped.push({ symbol, reason: `Only ${dbBars.length} bars (need 200)` })
      continue
    }

    // Convert to strategy format
    const bars: Bar[] = dbBars.map((b) => ({
      date: b.date.toISOString().split("T")[0],
      open: Number(b.open),
      high: Number(b.high),
      low: Number(b.low),
      close: Number(b.close),
      volume: Number(b.volume),
      adjustmentFactor: Number(b.adjFactor),
    }))

    const sma200 = sma(bars, 200)
    if (isNaN(sma200)) {
      skipped.push({ symbol, reason: "SMA200 = NaN" })
      continue
    }

    const ath = allTimeHigh(bars)
    if (isNaN(ath)) {
      skipped.push({ symbol, reason: "ATH = NaN" })
      continue
    }

    const athDateStr = athDate(bars)
    const currentBar = bars[bars.length - 1]
    const currentPrice = currentBar.close
    const vol20 = avgVolume(bars, 20)
    const volSurge = vol20 > 0 ? currentBar.volume / vol20 : 0

    // Check for reset
    const resetOccurred = hasReset(bars, sma200, athDateStr)
    if (!resetOccurred) {
      skipped.push({
        symbol,
        reason: `No reset (no low < SMA200 after ATH ${athDateStr})`,
      })
      continue
    }

    // Distance from ATH
    const distPct = distanceToBreakout(currentPrice, ath)

    // Heat classification
    let heat: string
    if (currentPrice < sma200) {
      heat = "cooling"
    } else if (distPct <= 5) {
      heat = "boiling"
    } else {
      heat = "simmering"
    }

    // Filter: skip if below SMA200 and too far from ATH
    if (currentPrice < sma200 && distPct > 30) {
      skipped.push({ symbol, reason: `Cooling + ${distPct.toFixed(1)}% from ATH (too far)` })
      continue
    }

    signals.push({
      symbol,
      heat,
      price: currentPrice,
      ath,
      sma200: Math.round(sma200 * 100) / 100,
      distPct: Math.round(distPct * 100) / 100,
      volSurge: Math.round(volSurge * 100) / 100,
      bars: bars.length,
    })
  }

  // Print results
  console.log("─── SIGNALS TRIGGERED ───\n")
  if (signals.length === 0) {
    console.log("No signals triggered.\n")
  } else {
    // Sort by heat priority: boiling > simmering > cooling, then by distPct asc
    const heatOrder: Record<string, number> = { boiling: 0, simmering: 1, cooling: 2 }
    signals.sort((a, b) => (heatOrder[a.heat] ?? 9) - (heatOrder[b.heat] ?? 9) || a.distPct - b.distPct)

    console.log(
      "Symbol".padEnd(15) +
        "Heat".padEnd(12) +
        "Price".padEnd(10) +
        "ATH".padEnd(10) +
        "SMA200".padEnd(10) +
        "Dist%".padEnd(8) +
        "VolSurge".padEnd(10) +
        "Bars",
    )
    console.log("─".repeat(85))
    for (const s of signals) {
      console.log(
        s.symbol.padEnd(15) +
          s.heat.padEnd(12) +
          String(s.price).padEnd(10) +
          String(s.ath).padEnd(10) +
          String(s.sma200).padEnd(10) +
          `${s.distPct}%`.padEnd(8) +
          `${s.volSurge}x`.padEnd(10) +
          String(s.bars),
      )
    }
  }

  console.log(`\nTotal signals: ${signals.length}`)
  console.log(
    `  Boiling: ${signals.filter((s) => s.heat === "boiling").length}` +
      ` | Simmering: ${signals.filter((s) => s.heat === "simmering").length}` +
      ` | Cooling: ${signals.filter((s) => s.heat === "cooling").length}`,
  )

  console.log(`\n─── SKIPPED (${skipped.length}) ───\n`)
  for (const s of skipped) {
    console.log(`  ${s.symbol}: ${s.reason}`)
  }

  console.log("\n=== Done ===")
}

main()
  .catch((e) => {
    console.error("FATAL:", e.message ?? e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
