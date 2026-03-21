import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { universeWhereSQL } from "./universes"
import type {
  ApiSignalsResponse,
  ApiSignal,
  ApiSignalChart,
} from "@/lib/api"

export const getUniverseMemberships = unstable_cache(
  async (): Promise<Record<string, string[]>> => {
    const rows = await prisma.universeMember.findMany({
      select: { symbol: true, universe: true },
    })

    const map: Record<string, string[]> = {}
    for (const row of rows) {
      if (!map[row.symbol]) map[row.symbol] = []
      map[row.symbol].push(row.universe)
    }
    return map
  },
  ["signals-memberships"],
  { tags: ["signals"], revalidate: 86400 }
)

export const getSignals = unstable_cache(
  async (universe: string): Promise<ApiSignalsResponse> => {
    const univSQL = universeWhereSQL("s", universe)

    const [signals, countResult, heatRows] = await Promise.all([
      prisma.$queryRawUnsafe(`
        SELECT s.*,
          (SELECT um.name FROM universe_members um WHERE um.symbol = s.symbol LIMIT 1) as member_name
        FROM signals s
        WHERE s.is_active = true
          AND s.distance_pct BETWEEN -5 AND 15
        ${univSQL}
        ORDER BY s.distance_pct ASC
        LIMIT 500
      `) as Promise<any[]>,
      prisma.$queryRawUnsafe(`
        SELECT COUNT(*)::int as count
        FROM signals s
        WHERE s.is_active = true
          AND s.distance_pct BETWEEN -5 AND 15
        ${univSQL}
      `) as Promise<[{ count: number }]>,
      prisma.$queryRawUnsafe(`
        SELECT s.heat, COUNT(*)::int as count
        FROM signals s
        WHERE s.is_active = true
          AND s.distance_pct BETWEEN -5 AND 15
        ${univSQL}
        GROUP BY s.heat
      `) as Promise<{ heat: string; count: number }[]>,
    ])

    const serialized: ApiSignal[] = signals.map((s: any) => ({
      id: s.id,
      symbol: s.symbol,
      exchange: s.exchange,
      name: s.member_name ?? s.symbol.replace(".NS", ""),
      strategyName: s.strategy_name,
      heat: s.heat,
      price: Number(s.price),
      ath: Number(s.ath),
      ema200: Number(s.ema200),
      ema220: s.ema220 ? Number(s.ema220) : Number(s.ema200),
      distancePct: Number(s.distance_pct),
      volumeSurge: s.volume_surge ? Number(s.volume_surge) : null,
      volumeToday: s.volume_today ? Number(s.volume_today) : null,
      volumeAvg20: s.volume_avg20 ? Number(s.volume_avg20) : null,
      signalDate: String(s.signal_date),
      isActive: s.is_active,
      breakDate: s.details?.breakDate ?? null,
      reclaimDate: s.details?.reclaimDate ?? null,
      details: s.details ?? {},
      createdAt: String(s.created_at),
    }))

    const heatCounts = { all: 0, breakout: 0, boiling: 0, simmering: 0, cooling: 0 }
    for (const row of heatRows) {
      heatCounts[row.heat as keyof typeof heatCounts] = row.count
      heatCounts.all += row.count
    }

    return {
      signals: serialized,
      total: countResult[0]?.count ?? 0,
      heatCounts,
      filters: { universe, heat: "all" },
      pagination: { limit: 500, offset: 0 },
    }
  },
  ["signals"],
  { tags: ["signals"], revalidate: 86400 }
)

export const getActiveSignalCount = unstable_cache(
  async (): Promise<number> => {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(*)::int as count
      FROM signals
      WHERE is_active = true
        AND distance_pct BETWEEN -5 AND 15
    `) as [{ count: number }]
    return result[0]?.count ?? 0
  },
  ["signals-count"],
  { tags: ["signals"], revalidate: 3600 }
)

export const getSignalBySymbol = unstable_cache(
  async (symbol: string): Promise<ApiSignal | null> => {
    const rows = (await prisma.$queryRawUnsafe(
      `
      SELECT s.*,
        (SELECT um.name FROM universe_members um WHERE um.symbol = s.symbol LIMIT 1) as member_name
      FROM signals s
      WHERE s.symbol = $1 AND s.is_active = true
      ORDER BY s.signal_date DESC
      LIMIT 1
    `,
      symbol
    )) as any[]

    if (rows.length === 0) return null

    const s = rows[0]
    return {
      id: s.id,
      symbol: s.symbol,
      exchange: s.exchange,
      name: s.member_name ?? s.symbol.replace(".NS", ""),
      strategyName: s.strategy_name,
      heat: s.heat,
      price: Number(s.price),
      ath: Number(s.ath),
      ema200: Number(s.ema200),
      ema220: s.ema220 ? Number(s.ema220) : Number(s.ema200),
      distancePct: Number(s.distance_pct),
      volumeSurge: s.volume_surge ? Number(s.volume_surge) : null,
      volumeToday: s.volume_today ? Number(s.volume_today) : null,
      volumeAvg20: s.volume_avg20 ? Number(s.volume_avg20) : null,
      signalDate: String(s.signal_date),
      isActive: s.is_active,
      breakDate: s.details?.breakDate ?? null,
      reclaimDate: s.details?.reclaimDate ?? null,
      details: s.details ?? {},
      createdAt: String(s.created_at),
    }
  },
  ["signal-by-symbol"],
  { tags: ["signals"], revalidate: 86400 }
)

export const getLastScanTime = unstable_cache(
  async (): Promise<string | null> => {
    const row = await prisma.signal.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    })

    return row ? row.createdAt.toISOString() : null
  },
  ["last-scan-time"],
  { tags: ["signals"], revalidate: 86400 }
)

export const getLandingStats = unstable_cache(
  async (): Promise<{ signalCount: number; stockCount: number }> => {
    const [signalRow, stockRow] = await Promise.all([
      prisma.$queryRawUnsafe(`
        SELECT COUNT(*)::int as count FROM signals WHERE is_active = true AND distance_pct BETWEEN -5 AND 15
      `) as Promise<[{ count: number }]>,
      prisma.$queryRawUnsafe(`
        SELECT COUNT(DISTINCT symbol)::int as count FROM universe_members
      `) as Promise<[{ count: number }]>,
    ])
    return {
      signalCount: signalRow[0]?.count ?? 0,
      stockCount: stockRow[0]?.count ?? 0,
    }
  },
  ["landing-stats"],
  { tags: ["signals"], revalidate: 3600 }
)

export const getSignalChart = unstable_cache(
  async (signalId: string): Promise<ApiSignalChart> => {
    const signal = await prisma.signal.findUnique({ where: { id: signalId } })
    if (!signal) return { priceHistory: [], ema200History: [], ema220History: [], dates: [], ath: null, breakDate: null, breakEma200: null, breakEma220: null, reclaimDate: null }

    const barSymbol =
      signal.exchange === "NSE"
        ? signal.symbol.replace(/\.NS$/, "")
        : signal.symbol

    const details = signal.details as Record<string, any> | null
    const preSetATHDate = details?.preSetATHDate
      ? new Date(details.preSetATHDate)
      : null

    const whereClause: any = { symbol: barSymbol, exchange: signal.exchange }
    if (preSetATHDate) whereClause.date = { gte: preSetATHDate }

    const bars = await prisma.dailyBar.findMany({
      where: whereClause,
      orderBy: { date: "asc" },
    })

    // breakDate = FIRST day after the pre-set ATH that close dropped below EMA220 (fallback to EMA200)
    // breakEma220 = the EMA220 value on that specific break date
    // reclaimDate = most recent day price crossed from below to above EMA220 (fallback to EMA200)
    let breakDate: string | null = null
    let breakEma200: number | null = null
    let breakEma220: number | null = null
    let reclaimDate: string | null = null

    // Determine whether to use EMA220 or EMA200 for break/reclaim detection
    // Use EMA220 if available, fall back to EMA200 for older bars
    // Scan FORWARD from bar[0] (starts at preSetATHDate) to find the first break
    for (let i = 0; i < bars.length; i++) {
      const ema220 = bars[i].ema220 ? Number(bars[i].ema220) : null
      const ema200 = bars[i].ema200 ? Number(bars[i].ema200) : null
      const ema = ema220 ?? ema200
      if (!ema) continue
      if (Number(bars[i].close) < ema) {
        breakDate = bars[i].date.toISOString().split("T")[0]
        breakEma200 = ema200
        breakEma220 = ema220
        break
      }
    }

    // Scan BACKWARD from end to find the most recent cross from below → above EMA220 (fallback EMA200)
    for (let i = bars.length - 1; i >= 1; i--) {
      const ema220 = bars[i].ema220 ? Number(bars[i].ema220) : null
      const ema200 = bars[i].ema200 ? Number(bars[i].ema200) : null
      const ema = ema220 ?? ema200
      const prevEma220 = bars[i - 1].ema220 ? Number(bars[i - 1].ema220) : null
      const prevEma200 = bars[i - 1].ema200 ? Number(bars[i - 1].ema200) : null
      const prevEma = prevEma220 ?? prevEma200
      if (!ema || !prevEma) continue
      if (Number(bars[i].close) >= ema && Number(bars[i - 1].close) < prevEma) {
        reclaimDate = bars[i].date.toISOString().split("T")[0]
        break
      }
    }

    return {
      priceHistory: bars.map((b) => Number(b.close)),
      ema200History: bars.map((b) => (b.ema200 ? Number(b.ema200) : null)),
      ema220History: bars.map((b) => (b.ema220 ? Number(b.ema220) : null)),
      dates: bars.map((b) => b.date.toISOString().split("T")[0]),
      ath: details?.preSetATH ? Number(details.preSetATH) : null,
      breakDate,
      breakEma200,
      breakEma220,
      reclaimDate,
    }
  },
  ["signal-chart"],
  { tags: ["signals"], revalidate: 86400 }
)
