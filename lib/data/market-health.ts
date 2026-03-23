import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { ApiMarketHealth, ApiMarketHealthResponse } from "@/lib/api"

const UNIVERSE_LABELS: Record<string, string> = {
  nifty50: "Nifty 50",
  niftynext50: "Nifty Next 50",
  nifty100: "Nifty 100",
  nifty200: "Nifty 200",
  niftymidcap50: "Nifty Midcap 50",
  niftymidcap100: "Nifty Midcap 100",
  niftysmallcap50: "Nifty Smallcap 50",
  niftysmallcap100: "Nifty Smallcap 100",
  niftybank: "Nifty Bank",
  sp100: "S&P 100",
  nasdaq100: "NASDAQ 100",
}

const COMPOSITE_TAGS: Record<string, string[]> = {
  nifty100: ["nifty50", "niftynext50"],
  nifty200: ["nifty50", "niftynext50", "nifty200"],
  niftymidcap100: ["niftymidcap50", "niftymidcap100"],
  niftysmallcap100: ["niftysmallcap50", "niftysmallcap100"],
}

function trafficLight(pct: number): "green" | "amber" | "red" {
  if (pct >= 60) return "green"
  if (pct >= 40) return "amber"
  return "red"
}

const ALL_KEYS = [
  "nifty50", "niftynext50", "nifty100", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100",
  "niftybank", "sp100", "nasdaq100",
]

export const getMarketHealth = unstable_cache(
  async (): Promise<ApiMarketHealthResponse> => {
    // Single query: latest row per universe (replaces 11+ individual findFirst calls)
    const rows = await prisma.$queryRaw<Array<{
      universe: string
      date: Date
      total_stocks: number
      above_ema200: number
      pct_above: string
    }>>`
      SELECT DISTINCT ON (universe) universe, date, total_stocks, above_ema200, pct_above
      FROM market_health
      WHERE universe = ANY(${ALL_KEYS}::text[])
      ORDER BY universe, date DESC
    `

    const byUniverse = new Map(rows.map(r => [r.universe, r]))
    const markets: ApiMarketHealth[] = []

    for (const key of ALL_KEYS) {
      const row = byUniverse.get(key)
      if (row) {
        markets.push({
          universe: key,
          label: UNIVERSE_LABELS[key] ?? key,
          date: row.date.toISOString().split("T")[0],
          totalStocks: row.total_stocks,
          aboveEma200: row.above_ema200,
          percentAbove: Number(row.pct_above),
          trafficLight: trafficLight(Number(row.pct_above)),
        })
      } else if (COMPOSITE_TAGS[key]) {
        const tags = COMPOSITE_TAGS[key]
        const tagRows = tags.map(t => byUniverse.get(t)).filter(Boolean)
        if (tagRows.length > 0) {
          let above = 0, total = 0
          for (const r of tagRows) {
            above += r!.above_ema200
            total += r!.total_stocks
          }
          const pctAbove = total > 0 ? (above / total) * 100 : 0
          markets.push({
            universe: key,
            label: UNIVERSE_LABELS[key] ?? key,
            date: tagRows[0]!.date.toISOString().split("T")[0],
            totalStocks: total,
            aboveEma200: above,
            percentAbove: pctAbove,
            trafficLight: trafficLight(pctAbove),
          })
        }
      }
    }

    return { markets }
  },
  ["market-health"],
  { tags: ["market-health"], revalidate: 86400 }
)
