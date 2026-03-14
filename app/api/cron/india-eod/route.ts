import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars, getLastBarDate, updateMovingAverages } from "@/lib/market-data/store"
import { runScanForMarket, INDIA_UNIVERSES } from "@/lib/scan-pipeline"
import { dispatchAlerts } from "@/lib/alerts/dispatch"
import { checkWatchlistAlerts } from "@/lib/alerts/watchlist-alerts"

/**
 * GET /api/cron/india-eod
 *
 * Automated India EOD pipeline: sync daily bars + run strategy scan.
 * Called by Vercel Cron at 10:30 UTC (4:00 PM IST) Mon–Fri.
 * Auth: Vercel sends Authorization: Bearer {CRON_SECRET} automatically.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const start = Date.now()
  const results = {
    symbolsProcessed: 0,
    barsInserted: 0,
    skipped: 0,
    errors: [] as string[],
    scanResult: null as any,
  }

  try {
    // Step 1: Sync daily bars from Yahoo Finance
    const to = new Date()
    const members = await prisma.universeMember.findMany({
      where: { universe: { in: INDIA_UNIVERSES } },
      select: { symbol: true },
    })
    const symbols = [...new Set(members.map((m) => m.symbol))]

    const CONCURRENCY = 15
    const processSymbol = async (yahooSymbol: string) => {
      const dbSymbol = yahooSymbol.replace(/\.NS$/, "")
      try {
        const lastDate = await getLastBarDate(dbSymbol, "NSE")
        const from = lastDate
          ? new Date(lastDate.getTime() + 86_400_000)
          : new Date(Date.now() - 30 * 86_400_000)

        if (from >= to) {
          results.symbolsProcessed++
          return
        }

        const candles = await getYahooDailyCandles(yahooSymbol, from, to)
        if (candles.length > 0) {
          const r = await upsertDailyBars({ symbol: dbSymbol, exchange: "NSE", candles, source: "yahoo" })
          results.barsInserted += r.inserted
          results.skipped += r.skipped
          if (r.inserted > 0) {
            await updateMovingAverages(dbSymbol, "NSE")
          }
        }
        results.symbolsProcessed++
      } catch (e: any) {
        results.errors.push(`${dbSymbol}: ${e.message?.slice(0, 80)}`)
      }
    }

    for (let i = 0; i < symbols.length; i += CONCURRENCY) {
      await Promise.allSettled(symbols.slice(i, i + CONCURRENCY).map(processSymbol))
    }

    // Step 2: Run strategy scan in-process
    try {
      results.scanResult = await runScanForMarket("india")
      revalidateTag("signals", {})
      revalidateTag("market-health", {})
      console.log(`[cron/india-eod] scan complete:`, results.scanResult)

      // Dispatch alerts for new signals (non-blocking)
      if (results.scanResult?.createdSignals?.length > 0) {
        dispatchAlerts("india", results.scanResult.createdSignals).then((r) => {
          console.log(`[cron/india-eod] alerts dispatched:`, r)
        }).catch((e) => {
          console.error(`[cron/india-eod] alert dispatch error:`, e.message)
        })
      }

      // Check watchlist price alerts (non-blocking)
      checkWatchlistAlerts("india").then((r) => {
        console.log(`[cron/india-eod] watchlist alerts checked:`, r)
      }).catch((e) => {
        console.error(`[cron/india-eod] watchlist alert error:`, e.message)
      })
    } catch (e: any) {
      results.errors.push(`scan failed: ${e.message?.slice(0, 80)}`)
      console.error(`[cron/india-eod] scan error:`, e.message)
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
    console.log(`[cron/india-eod] done in ${elapsed}s — ${results.barsInserted} bars inserted, ${results.symbolsProcessed} symbols`)

    return NextResponse.json({
      success: true,
      market: "india",
      elapsed: `${elapsed}s`,
      uniqueSymbols: symbols.length,
      ...results,
      errors: results.errors.slice(0, 10),
    })
  } catch (e: any) {
    console.error("[cron/india-eod] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export const maxDuration = 300
