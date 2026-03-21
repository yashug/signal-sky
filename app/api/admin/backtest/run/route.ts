import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { runBacktest } from "@/lib/backtest-engine"
import { setJob } from "@/lib/backtest-job"

const INDIA_UNIVERSES = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100", "niftybank",
]
const US_UNIVERSES = ["sp100", "nasdaq100"]
const SLINGSHOT_WINDOWS = [30, 60, 90]

/**
 * POST /api/admin/backtest/run
 * Runs backtest pipeline in-process for all symbols in the given market.
 * Body: { market?: "india" | "us" | "all" }
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const market: string = body.market ?? "all"

    const universes =
      market === "india" ? INDIA_UNIVERSES
      : market === "us" ? US_UNIVERSES
      : [...INDIA_UNIVERSES, ...US_UNIVERSES]

    // Get unique symbols for this market
    const memberRows = await prisma.universeMember.findMany({
      where: { universe: { in: universes } },
      select: { symbol: true },
    })
    const symbols = [...new Set(memberRows.map((m) => m.symbol))]

    setJob(market, {
      status: "running",
      market,
      startedAt: new Date().toISOString(),
      total: symbols.length,
      updated: 0,
      skipped: 0,
      errors: 0,
      lastLine: `Starting backtest for ${symbols.length} symbols...`,
    })

    const t0 = Date.now()

    // Run in background — fire and forget
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      let updated = 0
      let skipped = 0
      let errors = 0

      for (const memberSymbol of symbols) {
        try {
          const isNSE = memberSymbol.endsWith(".NS")
          const dbSymbol = isNSE ? memberSymbol.replace(/\.NS$/, "") : memberSymbol
          const exchange = isNSE ? "NSE" : "US"

          const dbBars = await prisma.dailyBar.findMany({
            where: { symbol: dbSymbol, exchange },
            orderBy: { date: "asc" },
          })

          if (dbBars.length < 220) {
            skipped++
            continue
          }

          const bars = dbBars.map((b: any) => ({
            date: b.date.toISOString().split("T")[0],
            open: Number(b.open),
            high: Number(b.high),
            low: Number(b.low),
            close: Number(b.close),
            volume: Number(b.volume),
            ema200: b.ema200 != null ? Number(b.ema200) : null,
            ema220: b.ema220 != null ? Number(b.ema220) : null,
          }))

          // Compute baseline + slingshot variants
          const variants = [
            { hash: "v2-ath-ema220", result: runBacktest(bars) },
            ...SLINGSHOT_WINDOWS.map((days) => ({
              hash: `v2-ath-ema220-s${days}`,
              result: runBacktest(bars, { slingshotDays: days }),
            })),
          ]

          const baseResult = variants[0].result
          if (baseResult.trades.length === 0) {
            skipped++
            continue
          }

          // Delete all existing records for this symbol
          await prisma.backtest.deleteMany({
            where: { symbol: memberSymbol, strategyName: "Reset & Reclaim" },
          })

          // Persist all non-empty variants
          for (const { hash, result } of variants) {
            if (result.trades.length === 0) continue

            const backtest = await prisma.backtest.create({
              data: {
                symbol: memberSymbol,
                exchange,
                strategyName: "Reset & Reclaim",
                parametersHash: hash,
                fromDate: new Date(result.fromDate),
                toDate: new Date(result.toDate),
                totalTrades: result.summary.totalTrades,
                winRate: result.summary.winRate,
                avgReturn: result.summary.avgReturnPct,
                maxDrawdown: result.summary.maxDrawdownPct,
                profitFactor: result.summary.profitFactor,
                sharpeRatio: result.summary.sharpeRatio,
                trades: result.trades as any,
                summary: result.summary as any,
              },
            })

            try {
              await prisma.backtestTrade.createMany({
                data: result.trades.map((t) => ({
                  backtestId: backtest.id,
                  symbol: memberSymbol,
                  exchange,
                  entryDate: new Date(t.entryDate),
                  entryPrice: t.entryPrice,
                  exitDate: t.exitDate ? new Date(t.exitDate) : null,
                  exitPrice: t.exitPrice,
                  pnlPercent: t.pnlPercent,
                  daysHeld: t.daysHeld,
                  preSetATHAtEntry: t.preSetATHAtEntry,
                })),
              })
            } catch {
              // Non-critical — trade details already stored in backtest.trades JSON
            }
          }

          updated++
          setJob(market, { updated, skipped, errors, lastLine: `${memberSymbol} ✓ (${variants.filter(v => v.result.trades.length > 0).length} variants)` })
        } catch (e: any) {
          errors++
          console.error(`[backtest/run] ${memberSymbol} error:`, e.message)
          setJob(market, { updated, skipped, errors, lastLine: `${memberSymbol} error: ${e.message?.slice(0, 60)}` })
        }
      }

      const elapsedSec = Math.round((Date.now() - t0) / 1000)
      setJob(market, {
        status: "done",
        completedAt: new Date().toISOString(),
        elapsedSec,
        updated,
        skipped,
        errors,
        total: symbols.length,
        lastLine: `Completed — ${updated} updated, ${skipped} skipped, ${errors} errors`,
      })

      try {
        revalidateTag("backtests", {})
      } catch (e: any) {
        console.error("[backtest/run] revalidation failed:", e.message)
      }

      console.log(`[backtest/run] ${market}: ${updated} updated, ${skipped} skipped, ${errors} errors in ${elapsedSec}s`)
    })().catch((e) => {
      setJob(market, {
        status: "error",
        completedAt: new Date().toISOString(),
        lastLine: e.message?.slice(0, 120),
      })
    })

    const label = market === "india" ? "India" : market === "us" ? "US" : "All"
    return NextResponse.json({
      success: true,
      message: `Backtest pipeline started for ${label} stocks (${symbols.length} symbols).`,
    })
  } catch (e: any) {
    console.error("[backtest/run] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
