import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { getPrisma } from "../db/prisma.js"
import { resolveUniverseTags, type UniverseGroupKey } from "../config/universes.js"

const VALID_UNIVERSES = [
  "all", "nifty50", "niftynext50", "nifty100", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100",
  "niftybank",
  "sp100", "nasdaq100",
] as const

const querySchema = z.object({
  universe: z.enum(VALID_UNIVERSES).optional().default("all"),
  heat: z.enum(["breakout", "boiling", "simmering", "cooling", "all"]).optional().default("all"),
  limit: z.coerce.number().min(1).max(500).optional().default(100),
  offset: z.coerce.number().min(0).optional().default(0),
})

/**
 * Build a SQL WHERE fragment to filter signals by universe group.
 * Uses a subquery on universe_members to resolve composite indices.
 */
function universeWhereSQL(universe: string): string {
  if (universe === "all") return ""
  if (universe === "sp100" || universe === "nasdaq100") {
    const tags = resolveUniverseTags(universe as UniverseGroupKey)
    const tagList = tags.map((t) => `'${t}'`).join(", ")
    return `AND s.symbol IN (SELECT symbol FROM universe_members WHERE universe IN (${tagList}))`
  }

  // For Indian indices, resolve to universe tags and filter via universe_members join
  const tags = resolveUniverseTags(universe as UniverseGroupKey)
  const tagList = tags.map((t) => `'${t}'`).join(", ")
  return `AND s.symbol IN (SELECT symbol FROM universe_members WHERE universe IN (${tagList}))`
}

export async function signalsRoutes(app: FastifyInstance) {
  app.get("/signals", async (request) => {
    const query = querySchema.parse(request.query)
    const prisma = getPrisma()

    const heatSQL = query.heat !== "all" ? `AND s.heat = '${query.heat}'` : ""
    const univSQL = universeWhereSQL(query.universe)

    // Fetch signals with universe member join for name
    const [signals, countResult] = await Promise.all([
      prisma.$queryRawUnsafe(`
        SELECT s.*,
          (SELECT um.name FROM universe_members um WHERE um.symbol = s.symbol LIMIT 1) as member_name
        FROM signals s
        WHERE s.is_active = true
        ${heatSQL}
        ${univSQL}
        ORDER BY s.distance_pct ASC
        LIMIT ${query.limit} OFFSET ${query.offset}
      `),
      prisma.$queryRawUnsafe(`
        SELECT COUNT(*)::int as count
        FROM signals s
        WHERE s.is_active = true
        ${heatSQL}
        ${univSQL}
      `) as Promise<[{ count: number }]>,
    ])

    const total = countResult[0]?.count ?? 0

    const serialized = (signals as any[]).map((s) => ({
      id: s.id,
      symbol: s.symbol,
      exchange: s.exchange,
      name: s.member_name ?? s.symbol.replace(".NS", ""),
      strategyName: s.strategy_name,
      heat: s.heat,
      price: Number(s.price),
      ath: Number(s.ath),
      ema200: Number(s.ema200),
      distancePct: Number(s.distance_pct),
      volumeSurge: s.volume_surge ? Number(s.volume_surge) : null,
      volumeToday: s.volume_today ? Number(s.volume_today) : null,
      volumeAvg20: s.volume_avg20 ? Number(s.volume_avg20) : null,
      signalDate: s.signal_date,
      isActive: s.is_active,
      details: s.details,
      createdAt: s.created_at,
    }))

    // Heat counts for the filter tabs
    const heatRows = await prisma.$queryRawUnsafe(`
      SELECT s.heat, COUNT(*)::int as count
      FROM signals s
      WHERE s.is_active = true
      ${univSQL}
      GROUP BY s.heat
    `) as { heat: string; count: number }[]

    const heatCounts = { all: 0, breakout: 0, boiling: 0, simmering: 0, cooling: 0 }
    for (const row of heatRows) {
      heatCounts[row.heat as keyof typeof heatCounts] = row.count
      heatCounts.all += row.count
    }

    return {
      signals: serialized,
      total,
      heatCounts,
      filters: {
        universe: query.universe,
        heat: query.heat,
      },
      pagination: {
        limit: query.limit,
        offset: query.offset,
      },
    }
  })

  // Chart data for a specific signal
  app.get("/signals/:id/chart", async (request) => {
    const { id } = request.params as { id: string }
    const prisma = getPrisma()

    const signal = await prisma.signal.findUnique({ where: { id } })
    if (!signal) {
      return { error: "Signal not found" }
    }

    const bars = await prisma.dailyBar.findMany({
      where: { symbol: signal.symbol },
      orderBy: { date: "desc" },
      take: 30,
    })
    bars.reverse()

    return {
      priceHistory: bars.map((b) => Number(b.close)),
      ema200History: bars.map((b) => (b.ema200 ? Number(b.ema200) : null)),
    }
  })
}
