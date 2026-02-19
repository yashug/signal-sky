/**
 * Run backtests for all universe stocks.
 *
 * Usage:  npx tsx scripts/run-backtest.ts
 *
 * This calls the API's backtest worker directly. Make sure your
 * DATABASE_URL is set in .env.local or the environment.
 */

import "dotenv/config"
import { spawn } from "node:child_process"
import path from "node:path"

const apiDir = path.resolve(import.meta.dirname, "..", "api")

console.log("[run-backtest] Launching api/src/workers/backtest-runner.ts...")

const child = spawn("npx", ["tsx", "src/workers/backtest-runner.ts"], {
  cwd: apiDir,
  stdio: "inherit",
  env: { ...process.env },
})

child.on("close", (code) => {
  process.exit(code ?? 0)
})
