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
    const markets: ApiMarketHealth[] = []

    for (const key of ALL_KEYS) {
      const latest = await prisma.marketHealth.findFirst({
        where: { universe: key },
        orderBy: { date: "desc" },
      })

      if (latest) {
        markets.push({
          universe: key,
          label: UNIVERSE_LABELS[key] ?? key,
          date: latest.date.toISOString().split("T")[0],
          totalStocks: latest.totalStocks,
          aboveEma200: latest.aboveEma200,
          percentAbove: Number(latest.pctAbove),
          trafficLight: trafficLight(Number(latest.pctAbove)),
        })
      } else if (COMPOSITE_TAGS[key]) {
        const tagRows = await prisma.marketHealth.findMany({
          where: { universe: { in: COMPOSITE_TAGS[key] } },
          orderBy: { date: "desc" },
          distinct: ["universe"],
        })
        if (tagRows.length > 0) {
          let above = 0, total = 0
          for (const r of tagRows) {
            above += r.aboveEma200
            total += r.totalStocks
          }
          const pctAbove = total > 0 ? (above / total) * 100 : 0
          markets.push({
            universe: key,
            label: UNIVERSE_LABELS[key] ?? key,
            date: tagRows[0].date.toISOString().split("T")[0],
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
