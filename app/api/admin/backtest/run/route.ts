import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { exec } from "child_process"
import path from "path"
import { setJob } from "@/lib/backtest-job"

/**
 * POST /api/admin/backtest/run
 * Triggers the backtest pipeline as a background process and tracks status.
 * Body: { market?: "india" | "us" }
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const market: string = body.market ?? "all"

    const apiDir = path.resolve(process.cwd(), "api")
    const marketArg = market === "india" ? "india" : market === "us" ? "us" : ""
    const cmd = `npx tsx src/workers/backtest-runner.ts ${marketArg}`

    // Mark as running
    setJob(market, {
      status: "running",
      market,
      startedAt: new Date().toISOString(),
      completedAt: undefined,
      updated: undefined,
      skipped: undefined,
      total: undefined,
      errors: undefined,
      elapsedSec: undefined,
      lastLine: "Starting...",
    })

    const t0 = Date.now()

    exec(cmd, { cwd: apiDir, env: { ...process.env } }, (error, stdout, stderr) => {
      const elapsedSec = Math.round((Date.now() - t0) / 1000)
      const output = stdout + stderr

      if (error) {
        console.error(`[backtest/run] pipeline error:`, error.message)
        setJob(market, {
          status: "error",
          completedAt: new Date().toISOString(),
          elapsedSec,
          lastLine: error.message.slice(0, 120),
        })
        return
      }

      // Parse summary stats from stdout
      // e.g. "[Backtest] IN: 45 updated, 5 skipped (already up to date)"
      const summaryMatch = output.match(/\[Backtest\]\s+(?:IN|US|All):\s*(\d+) updated,\s*(\d+) skipped/)
      const totalMatch = output.match(/Processing (\d+)/)
      const errorsMatch = output.match(/Errors:\s+(\d+)/)

      setJob(market, {
        status: "done",
        completedAt: new Date().toISOString(),
        elapsedSec,
        updated: summaryMatch ? parseInt(summaryMatch[1]) : undefined,
        skipped: summaryMatch ? parseInt(summaryMatch[2]) : undefined,
        total: totalMatch ? parseInt(totalMatch[1]) : undefined,
        errors: errorsMatch ? parseInt(errorsMatch[1]) : undefined,
        lastLine: "Completed",
      })

      if (stdout) console.log(`[backtest/run] stdout:`, stdout.slice(-800))
      if (stderr) console.error(`[backtest/run] stderr:`, stderr.slice(-300))
    })

    const label = market === "india" ? "India" : market === "us" ? "US" : "All"
    return NextResponse.json({
      success: true,
      message: `Backtest pipeline started for ${label} stocks.`,
    })
  } catch (e: any) {
    console.error("[backtest/run] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
