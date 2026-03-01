/**
 * In-memory backtest job tracker.
 * Shared between the run route and status route within the same Next.js process.
 */

export type BacktestJobStatus = "idle" | "running" | "done" | "error"

export type BacktestJob = {
  status: BacktestJobStatus
  market: string
  startedAt: string
  completedAt?: string
  updated?: number
  skipped?: number
  total?: number
  errors?: number
  elapsedSec?: number
  lastLine?: string // last stdout line for live progress
}

const jobs = new Map<string, BacktestJob>()

export function setJob(market: string, data: Partial<BacktestJob>) {
  const existing = jobs.get(market) ?? { status: "idle", market, startedAt: new Date().toISOString() }
  jobs.set(market, { ...existing, ...data })
}

export function getJob(market: string): BacktestJob {
  return jobs.get(market) ?? { status: "idle", market, startedAt: "" }
}
