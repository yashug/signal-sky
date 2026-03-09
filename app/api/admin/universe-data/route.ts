import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/admin/universe-data?universe=nifty50
 * Returns all universe members with their dailyBar coverage stats.
 */
export async function GET(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const universe = req.nextUrl.searchParams.get("universe") ?? "nifty50"

  try {
    const members = await prisma.universeMember.findMany({
      where: { universe },
      orderBy: { symbol: "asc" },
    })

    if (members.length === 0) {
      return NextResponse.json({ universe, members: [], total: 0 })
    }

    // Determine exchange based on universe name
    const isIndian = !["sp100", "sp500", "nasdaq100", "dowjones"].includes(universe)
    const exchange = isIndian ? "NSE" : "US"

    // Get symbols without .NS suffix for Indian stocks
    const symbols = members.map((m) =>
      isIndian ? m.symbol.replace(/\.NS$/, "") : m.symbol
    )

    // Aggregate bar stats per symbol in a single query
    const barStats = await prisma.dailyBar.groupBy({
      by: ["symbol"],
      where: {
        symbol: { in: symbols },
        exchange,
      },
      _min: { date: true },
      _max: { date: true },
      _count: { id: true },
    })

    const statsMap = new Map(
      barStats.map((s) => [
        s.symbol,
        {
          firstDate: s._min.date,
          lastDate: s._max.date,
          barCount: s._count.id,
        },
      ])
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const twentyYearsAgo = new Date(today)
    twentyYearsAgo.setFullYear(twentyYearsAgo.getFullYear() - 20)
    const tenYearsAgo = new Date(today)
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10)

    const enriched = members.map((m) => {
      const sym = isIndian ? m.symbol.replace(/\.NS$/, "") : m.symbol
      const stats = statsMap.get(sym)

      let coverage = 0
      if (stats?.firstDate && stats?.lastDate) {
        const firstMs = stats.firstDate.getTime()
        const lastMs = stats.lastDate.getTime()
        const twentyYearsMs = twentyYearsAgo.getTime()
        const todayMs = today.getTime()

        // Coverage: how much of the 20-year window is filled
        const idealSpan = todayMs - twentyYearsMs
        const actualStart = Math.max(firstMs, twentyYearsMs)
        const actualEnd = Math.min(lastMs, todayMs)
        const actualSpan = Math.max(0, actualEnd - actualStart)
        coverage = idealSpan > 0 ? Math.round((actualSpan / idealSpan) * 100) : 0
      }

      // Is last date recent (within 5 days to account for weekends/holidays)?
      const isUpToDate = stats?.lastDate
        ? today.getTime() - stats.lastDate.getTime() < 5 * 86_400_000
        : false

      // Has 20 year history? (allow 30 day buffer)
      const has20YearHistory = stats?.firstDate
        ? stats.firstDate.getTime() <= twentyYearsAgo.getTime() + 30 * 86_400_000
        : false

      // Has at least 10 year history?
      const has10YearHistory = stats?.firstDate
        ? stats.firstDate.getTime() <= tenYearsAgo.getTime() + 30 * 86_400_000
        : false

      return {
        symbol: sym,
        name: m.name,
        sector: m.sector,
        firstDate: stats?.firstDate?.toISOString().split("T")[0] ?? null,
        lastDate: stats?.lastDate?.toISOString().split("T")[0] ?? null,
        barCount: stats?.barCount ?? 0,
        coverage,
        isUpToDate,
        has10YearHistory,
        has20YearHistory,
      }
    })

    // Summary stats
    const withData = enriched.filter((m) => m.barCount > 0)
    const upToDate = enriched.filter((m) => m.isUpToDate)
    const full20Y = enriched.filter((m) => m.has20YearHistory)

    return NextResponse.json({
      universe,
      exchange,
      total: enriched.length,
      withData: withData.length,
      upToDate: upToDate.length,
      full10Year: enriched.filter((m) => m.has10YearHistory).length,
      full20Year: full20Y.length,
      members: enriched,
    })
  } catch (e: any) {
    console.error("[universe-data] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
