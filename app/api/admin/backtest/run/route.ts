import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { exec } from "child_process"
import path from "path"

/**
 * POST /api/admin/backtest/run
 * Triggers the backtest pipeline.
 * Body: { market?: "india" | "us" }  — defaults to both if omitted
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const market: string | undefined = body.market

    const apiDir = path.resolve(process.cwd(), "api")
    const marketArg = market === "india" ? "india" : market === "us" ? "us" : ""
    const cmd = `npx tsx src/workers/backtest-runner.ts ${marketArg}`

    exec(cmd, { cwd: apiDir, env: { ...process.env } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[backtest/run] pipeline error:`, error.message)
      }
      if (stdout) console.log(`[backtest/run] stdout:`, stdout.slice(-500))
      if (stderr) console.error(`[backtest/run] stderr:`, stderr.slice(-500))
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
