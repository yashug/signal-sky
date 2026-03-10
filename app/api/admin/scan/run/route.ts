import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { requireAdmin } from "@/lib/admin"
import { runScanForMarket } from "@/lib/scan-pipeline"

/**
 * POST /api/admin/scan/run
 * Runs the strategy scan pipeline in-process using existing DB bars.
 * Body: { market?: "india" | "us" | "all" }
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

  try {
    const results: Awaited<ReturnType<typeof runScanForMarket>>[] = []

    if (market === "all") {
      const [indiaResult, usResult] = await Promise.all([
        runScanForMarket("india"),
        runScanForMarket("us"),
      ])
      results.push(indiaResult, usResult)
    } else {
      results.push(await runScanForMarket(market))
    }

    const totalSignals = results.reduce((sum, r) => sum + r.signals, 0)
    const totalSymbols = results.reduce((sum, r) => sum + r.total, 0)

    revalidateTag("signals", {})
    revalidateTag("market-health", {})

    const marketLabel = market === "all" ? "India + US" : market.toUpperCase()
    console.log(`[scan/run] ${marketLabel}: ${totalSignals} signals from ${totalSymbols} symbols`)

    return NextResponse.json({
      success: true,
      message: `${marketLabel} scan complete — ${totalSignals} active signals from ${totalSymbols} symbols.`,
      market,
      signals: totalSignals,
      symbolsScanned: totalSymbols,
      results,
    })
  } catch (e: any) {
    console.error("[scan/run] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
