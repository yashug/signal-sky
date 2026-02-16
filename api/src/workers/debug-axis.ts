import "dotenv/config"
import { DatabaseProvider } from "../providers/database.js"
import { currentEma200, allTimeHigh, athDate, distanceToBreakout, preResetATH, hasReset } from "../engine/indicators.js"
import { ResetReclaimStrategy } from "../engine/strategies/reset-reclaim.js"
import { disconnectPrisma } from "../db/prisma.js"

async function main() {
  const provider = new DatabaseProvider()
  const today = new Date().toISOString().split("T")[0]
  const from = new Date()
  from.setFullYear(from.getFullYear() - 2)
  const fromStr = from.toISOString().split("T")[0]

  const symbol = "AXISBANK.NS"
  const bars = await provider.fetchBars(symbol, fromStr, today)
  const quote = await provider.fetchQuote(symbol)

  console.log(`=== ${symbol} ===`)
  console.log(`Total bars: ${bars.length}`)
  console.log(`Quote price: ${quote?.price}`)
  console.log(`Quote volume: ${quote?.volume}`)

  if (!quote || bars.length < 200) {
    console.log("SKIP: insufficient data")
    return
  }

  const ema200Val = currentEma200(bars)
  const athVal = allTimeHigh(bars)
  const athDateVal = athDate(bars)
  const preResetAth = preResetATH(bars)
  const distPct = distanceToBreakout(quote.price, athVal)
  const preResetDist = distanceToBreakout(quote.price, preResetAth)
  const resetOk = hasReset(bars)

  console.log(`\nEMA200 (current): ${ema200Val.toFixed(2)}`)
  console.log(`Above EMA200: ${quote.price > ema200Val}`)
  console.log(`\nAll-Time High: ${athVal.toFixed(2)} on ${athDateVal}`)
  console.log(`Pre-Reset ATH: ${preResetAth.toFixed(2)}`)
  console.log(`\nDist to ATH: ${distPct.toFixed(2)}%`)
  console.log(`Dist to Pre-Reset ATH: ${preResetDist.toFixed(2)}%`)
  console.log(`Has Reset: ${resetOk}`)

  // Check bars after ATH
  const barsAfterATH = bars.filter(b => b.date > athDateVal)
  console.log(`\nBars after ATH date: ${barsAfterATH.length}`)
  if (barsAfterATH.length > 0) {
    const barsBelow = barsAfterATH.filter(b => b.ema200 != null && b.low < b.ema200!)
    console.log(`Bars after ATH where low < ema200: ${barsBelow.length}`)
  }

  // Show last reset point (most recent bar where low < ema200)
  for (let i = bars.length - 1; i >= 0; i--) {
    if (bars[i].ema200 != null && bars[i].low < bars[i].ema200!) {
      console.log(`\nLast reset bar: ${bars[i].date} low=${bars[i].low} ema200=${bars[i].ema200}`)
      // Show the ATH up to this point
      const preBars = bars.slice(0, i + 1)
      const preAth = Math.max(...preBars.map(b => {
        const adj = b.adjustmentFactor ?? 1
        return b.high * adj
      }))
      console.log(`ATH up to reset point: ${preAth.toFixed(2)}`)
      break
    }
  }

  // Show last 10 bars
  console.log(`\nLast 10 bars:`)
  const last10 = bars.slice(-10)
  for (const b of last10) {
    console.log(`  ${b.date}  O=${b.open.toFixed(2)} H=${b.high.toFixed(2)} L=${b.low.toFixed(2)} C=${b.close.toFixed(2)} EMA200=${b.ema200?.toFixed(2) ?? "null"}`)
  }

  // Run strategy
  const strategy = new ResetReclaimStrategy()
  const signal = strategy.evaluate(symbol, { bars, quote })
  console.log(`\nStrategy result: ${signal ? `heat=${signal.heat} dist=${signal.distanceToBreakout.toFixed(2)}%` : "NO SIGNAL"}`)
  if (signal) {
    console.log(`Details:`, JSON.stringify(signal.details, null, 2))
  }

  // Check heat classification manually
  console.log(`\n--- Heat classification check ---`)
  console.log(`price < ema200? ${quote.price < ema200Val} → would be cooling`)
  console.log(`preResetDist < 0 && >= -5? ${preResetDist < 0 && preResetDist >= -5} (preResetDist=${preResetDist.toFixed(2)}%) → would be breakout`)
  console.log(`distPct <= 5? ${distPct <= 5} (distPct=${distPct.toFixed(2)}%) → would be boiling`)
}

main().catch(console.error).finally(() => disconnectPrisma())
