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
 * Set fullPipeline=true to also fetch new bars from Kite/Yahoo first.
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const market = body.market === "us" ? "us" : "india"
  const fullPipeline = body.fullPipeline === true

  try {
    const apiDir = path.resolve(process.cwd(), "api")

    // scan-only is fast (~2 min), full pipeline fetches new bars first (~10+ min)
    const mode = fullPipeline ? market : `scan-${market}`
    const cmd = `npx tsx src/workers/cron-pipeline.ts ${mode}`

    exec(cmd, { cwd: apiDir, env: { ...process.env } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[scan/run] ${mode} pipeline error:`, error.message)
      }
      if (stdout) console.log(`[scan/run] ${mode} stdout:`, stdout.slice(-500))
      if (stderr) console.error(`[scan/run] ${mode} stderr:`, stderr.slice(-500))
    })

    const modeLabel = fullPipeline ? "Full pipeline (fetch + scan)" : "Scan-only"

    return NextResponse.json({
      success: true,
      message: `${market.toUpperCase()} ${modeLabel} started. Check scan status for results.`,
      market,
      mode: fullPipeline ? "full" : "scan-only",
    })
  } catch (e: any) {
    console.error("[scan/run] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
