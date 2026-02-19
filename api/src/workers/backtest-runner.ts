/**
 * Backtest Worker — CLI entry point.
 *
 * Runs backtests on all universe members and persists results.
 *
 * Usage:
 *   npm run backtest
 */

import "dotenv/config"
import { runBacktestPipeline } from "./pipelines/run-backtest.js"
import { disconnectPrisma } from "../db/prisma.js"

async function run() {
  const arg = process.argv[2]?.toLowerCase()
  const runIndia = !arg || arg === "india"
  const runUS = !arg || arg === "us"

  console.log(`[Backtest] Starting backtest run... (${arg || "all"})`)
  const t0 = Date.now()
  const allErrors: string[] = []

  if (runIndia) {
    const indiaResult = await runBacktestPipeline("IN")
    console.log(`\n[Backtest] India Complete:`)
    console.log(`  Backtests persisted: ${indiaResult.backtestsPersisted}`)
    console.log(`  Symbols processed: ${indiaResult.symbolsProcessed}`)
    console.log(`  Errors: ${indiaResult.errors.length}`)
    allErrors.push(...indiaResult.errors)
  }

  if (runUS) {
    const usResult = await runBacktestPipeline("US")
    console.log(`\n[Backtest] US Complete:`)
    console.log(`  Backtests persisted: ${usResult.backtestsPersisted}`)
    console.log(`  Symbols processed: ${usResult.symbolsProcessed}`)
    console.log(`  Errors: ${usResult.errors.length}`)
    allErrors.push(...usResult.errors)
  }

  if (allErrors.length > 0) {
    console.log(`\n  Errors (first 20):`)
    for (const err of allErrors.slice(0, 20)) {
      console.log(`    ${err}`)
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`\n[Backtest] Done in ${elapsed}s`)
}

run()
  .catch(console.error)
  .finally(() => disconnectPrisma())
