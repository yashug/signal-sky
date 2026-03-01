import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { exec } from "child_process"
import path from "path"

/**
 * POST /api/admin/scan/run
 * Triggers the strategy scan pipeline for a given market.
 * Body: { market?: "india" | "us", fullPipeline?: boolean }
 *
 * By default runs scan-only (fast, ~2 min) using existing DB bars.
 * Set fullPipeline=true to also fetch new bars from Yahoo Finance first.
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const marketRaw = body.market
  const market: "india" | "us" | "all" =
    marketRaw === "us" ? "us" : marketRaw === "all" ? "all" : "india"
  const fullPipeline = body.fullPipeline === true

  try {
    const apiDir = path.resolve(process.cwd(), "api")

    const spawnPipeline = (m: "india" | "us") => {
      const mode = fullPipeline ? m : `scan-${m}`
      const cmd = `npx tsx src/workers/cron-pipeline.ts ${mode}`
      exec(cmd, { cwd: apiDir, env: { ...process.env } }, (error, stdout, stderr) => {
        if (error) console.error(`[scan/run] ${mode} pipeline error:`, error.message)
        if (stdout) console.log(`[scan/run] ${mode} stdout:`, stdout.slice(-500))
        if (stderr) console.error(`[scan/run] ${mode} stderr:`, stderr.slice(-500))
      })
    }

    if (market === "all") {
      spawnPipeline("india")
      spawnPipeline("us")
    } else {
      spawnPipeline(market)
    }

    const modeLabel = fullPipeline ? "Full pipeline (fetch + scan)" : "Scan-only"
    const marketLabel = market === "all" ? "India + US" : market.toUpperCase()

    return NextResponse.json({
      success: true,
      message: `${marketLabel} ${modeLabel} started. Check scan status for results.`,
      market,
      mode: fullPipeline ? "full" : "scan-only",
    })
  } catch (e: any) {
    console.error("[scan/run] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
