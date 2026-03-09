export const runtime = 'nodejs'
import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getYahooDailyCandles } from "@/lib/market-data/yahoo"
import { upsertDailyBars, getLastBarDate, updateMovingAverages } from "@/lib/market-data/store"
import { exec } from "child_process"
import path from "path"

const INDIA_UNIVERSES = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100",
  "niftybank",
]

/**
 * GET /api/cron/india-eod
 *
 * Automated India EOD pipeline: sync daily bars + run strategy scan.
 * Called by Vercel Cron at 10:30 UTC (4:00 PM IST) Mon–Fri.
 * Auth: CRON_SECRET header.
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
    scanTriggered: false,
  }

  try {
    // Step 1: Sync daily bars from Yahoo Finance
    const to = new Date()
    const members = await prisma.universeMember.findMany({
      where: { universe: { in: INDIA_UNIVERSES } },
      select: { symbol: true },
    })
    const symbols = [...new Set(members.map((m) => m.symbol))]

    for (const yahooSymbol of symbols) {
      const dbSymbol = yahooSymbol.replace(/\.NS$/, "")
      try {
        const lastDate = await getLastBarDate(dbSymbol, "NSE")
        const from = lastDate
          ? new Date(lastDate.getTime() + 86_400_000)
          : new Date(Date.now() - 30 * 86_400_000)

        if (from >= to) {
          results.symbolsProcessed++
          continue
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
        await new Promise((r) => setTimeout(r, 150))
      } catch (e: any) {
        results.errors.push(`${dbSymbol}: ${e.message?.slice(0, 80)}`)
      }
    }

    // Step 2: Trigger strategy scan via cron-pipeline worker
    try {
      const apiDir = path.resolve(process.cwd(), "api")
      exec(
        `npx tsx src/workers/cron-pipeline.ts scan-india`,
        { cwd: apiDir, env: { ...process.env } },
        (error, stdout, stderr) => {
          if (error) console.error(`[cron/india-eod] scan error:`, error.message)
          if (stdout) console.log(`[cron/india-eod] scan stdout:`, stdout.slice(-500))
          if (stderr) console.error(`[cron/india-eod] scan stderr:`, stderr.slice(-500))

          try {
            revalidateTag("signals", { expire: 0 })
            revalidateTag("market-health", { expire: 0 })
            console.log(`[cron/india-eod] cache revalidated`)
          } catch (e: any) {
            console.error(`[cron/india-eod] revalidation failed:`, e.message)
          }
        }
      )
      results.scanTriggered = true
    } catch (e: any) {
      results.errors.push(`scan trigger failed: ${e.message?.slice(0, 80)}`)
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1)
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
