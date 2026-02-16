/**
 * Cron Pipeline — automated EOD data update + strategy scan.
 *
 * Schedules:
 *   India EOD: 4:00 PM IST (10:30 UTC) Mon-Fri
 *   US EOD:    2:00 AM IST (20:30 UTC prev day) Tue-Sat
 *
 * Usage:
 *   npm run cron          # start scheduler (long-running)
 *   npm run cron:india    # run India pipeline once (manual)
 *   npm run cron:us       # run US pipeline once (manual)
 */

import "dotenv/config"
import cron from "node-cron"
import { updateBarsIndia } from "./pipelines/update-bars-india.js"
import { updateBarsUS } from "./pipelines/update-bars-us.js"
import { runScanPipeline } from "./pipelines/run-scan.js"
import { disconnectPrisma } from "../db/prisma.js"

// ─── Pipeline runners ────────────────────────────────────────────────

async function runIndiaPipeline() {
  const start = Date.now()
  console.log(`\n[Cron] ━━━ India EOD Pipeline started at ${new Date().toISOString()} ━━━`)

  // Step 1: Update daily bars from Kite
  console.log("\n[Step 1] Fetching today's bars from Kite...")
  const barsResult = await updateBarsIndia()
  console.log(`  Symbols updated: ${barsResult.symbolsUpdated}`)
  console.log(`  Bars inserted: ${barsResult.barsInserted}`)
  if (barsResult.tokenStale) {
    console.warn("  ⚠ Kite token is stale — reconnect via Admin → Data Sources")
  }
  if (barsResult.errors.length > 0) {
    console.warn(`  Errors: ${barsResult.errors.length}`)
    barsResult.errors.slice(0, 5).forEach((e) => console.warn(`    ${e}`))
  }

  // Step 2: Run strategy scan
  console.log("\n[Step 2] Running strategy scan...")
  const scanResult = await runScanPipeline("IN")
  console.log(`  Signals persisted: ${scanResult.signalsPersisted}`)
  console.log(`  Indicators upserted: ${scanResult.indicatorsUpserted}`)
  if (scanResult.errors.length > 0) {
    console.warn(`  Scan errors: ${scanResult.errors.length}`)
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n[Cron] ━━━ India EOD Pipeline complete in ${elapsed}s ━━━`)
}

async function runUSPipeline() {
  const start = Date.now()
  console.log(`\n[Cron] ━━━ US EOD Pipeline started at ${new Date().toISOString()} ━━━`)

  // Step 1: Update daily bars from Yahoo
  console.log("\n[Step 1] Fetching today's bars from Yahoo Finance...")
  const barsResult = await updateBarsUS()
  console.log(`  Symbols updated: ${barsResult.symbolsUpdated}`)
  console.log(`  Bars inserted: ${barsResult.barsInserted}`)
  if (barsResult.errors.length > 0) {
    console.warn(`  Errors: ${barsResult.errors.length}`)
    barsResult.errors.slice(0, 5).forEach((e) => console.warn(`    ${e}`))
  }

  // Step 2: Run strategy scan
  console.log("\n[Step 2] Running strategy scan...")
  const scanResult = await runScanPipeline("US")
  console.log(`  Signals persisted: ${scanResult.signalsPersisted}`)
  console.log(`  Indicators upserted: ${scanResult.indicatorsUpserted}`)
  if (scanResult.errors.length > 0) {
    console.warn(`  Scan errors: ${scanResult.errors.length}`)
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n[Cron] ━━━ US EOD Pipeline complete in ${elapsed}s ━━━`)
}

// ─── Entry point ─────────────────────────────────────────────────────

const mode = process.argv[2] // "india", "us", "scan-india", "scan-us", or undefined (scheduler mode)

if (mode === "india") {
  // One-shot India pipeline (fetch bars + scan)
  runIndiaPipeline()
    .catch((e) => console.error("[Cron] India pipeline failed:", e.message))
    .finally(() => disconnectPrisma())
} else if (mode === "us") {
  // One-shot US pipeline (fetch bars + scan)
  runUSPipeline()
    .catch((e) => console.error("[Cron] US pipeline failed:", e.message))
    .finally(() => disconnectPrisma())
} else if (mode === "scan-india") {
  // Scan only — skip Kite bar fetch, just evaluate strategy on existing DB data
  console.log(`\n[Cron] ━━━ India Scan-Only started at ${new Date().toISOString()} ━━━`)
  const start = Date.now()
  runScanPipeline("IN")
    .then((r) => {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1)
      console.log(`  Signals: ${r.signalsPersisted}, Indicators: ${r.indicatorsUpserted}, Scanned: ${r.symbolsScanned}`)
      if (r.errors.length > 0) console.warn(`  Errors: ${r.errors.length}`)
      console.log(`[Cron] ━━━ India Scan-Only complete in ${elapsed}s ━━━`)
    })
    .catch((e) => console.error("[Cron] India scan failed:", e.message))
    .finally(() => disconnectPrisma())
} else if (mode === "scan-us") {
  // Scan only — skip Yahoo bar fetch
  console.log(`\n[Cron] ━━━ US Scan-Only started at ${new Date().toISOString()} ━━━`)
  const start = Date.now()
  runScanPipeline("US")
    .then((r) => {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1)
      console.log(`  Signals: ${r.signalsPersisted}, Indicators: ${r.indicatorsUpserted}, Scanned: ${r.symbolsScanned}`)
      if (r.errors.length > 0) console.warn(`  Errors: ${r.errors.length}`)
      console.log(`[Cron] ━━━ US Scan-Only complete in ${elapsed}s ━━━`)
    })
    .catch((e) => console.error("[Cron] US scan failed:", e.message))
    .finally(() => disconnectPrisma())
} else {
  // Scheduler mode — long-running
  console.log("[Cron] Starting scheduler...")
  console.log("  India EOD: 4:00 PM IST (Mon-Fri)")
  console.log("  US EOD:    2:00 AM IST (Tue-Sat)")
  console.log("  Press Ctrl+C to stop\n")

  // India: 4:00 PM IST = 10:30 UTC, Mon-Fri
  cron.schedule("30 10 * * 1-5", () => {
    runIndiaPipeline().catch((e) =>
      console.error("[Cron] India pipeline failed:", e.message),
    )
  }, { timezone: "UTC" })

  // US: 2:00 AM IST = 20:30 UTC prev day, Mon-Fri US market = Tue-Sat IST
  cron.schedule("30 20 * * 1-5", () => {
    runUSPipeline().catch((e) =>
      console.error("[Cron] US pipeline failed:", e.message),
    )
  }, { timezone: "UTC" })

  // Keep process alive
  process.on("SIGINT", async () => {
    console.log("\n[Cron] Shutting down...")
    await disconnectPrisma()
    process.exit(0)
  })
}
