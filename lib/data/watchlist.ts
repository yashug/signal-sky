import { prisma } from "@/lib/prisma"
import { getInitialUser } from "@/lib/auth"

export async function getWatchlistSymbolMap(): Promise<Record<string, string>> {
  const user = await getInitialUser()
  if (!user?.id) return {}

  const items = await prisma.watchlistItem.findMany({
    where: { userId: user.id },
    select: { id: true, symbol: true },
  })

  const map: Record<string, string> = {}
  for (const item of items) map[item.symbol] = item.id
  return map
}

export type WatchlistItemData = {
  id: string
  symbol: string
  name: string
  exchange: string
  addedAt: string
  notes: string
  currentPrice: number
  ema200: number
  ath: number
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  distanceToBreakout: number
}

export async function getWatchlistItems(): Promise<WatchlistItemData[]> {
  const user = await getInitialUser()
  if (!user?.id) return []

  const rows = await prisma.$queryRawUnsafe(`
    SELECT
      w.id,
      w.symbol,
      w.exchange,
      w.added_at    AS "addedAt",
      w.notes,
      um.name,
      s.price,
      s.ema200,
      s.ath,
      s.heat,
      s.distance_pct AS "distancePct"
    FROM watchlist_items w
    LEFT JOIN LATERAL (
      SELECT name FROM universe_members WHERE symbol = w.symbol LIMIT 1
    ) um ON true
    LEFT JOIN LATERAL (
      SELECT price, ema200, ath, heat, distance_pct
      FROM signals
      WHERE symbol = w.symbol AND is_active = true
      ORDER BY signal_date DESC
      LIMIT 1
    ) s ON true
    WHERE w.user_id = $1
    ORDER BY w.added_at DESC
  `, user.id) as any[]

  return rows.map((r: any) => ({
    id: r.id,
    symbol: r.symbol,
    exchange: r.exchange,
    addedAt: String(r.addedAt),
    notes: r.notes ?? "",
    name: r.name ?? r.symbol.replace(".NS", ""),
    currentPrice: r.price ? Number(r.price) : 0,
    ema200: r.ema200 ? Number(r.ema200) : 0,
    ath: r.ath ? Number(r.ath) : 0,
    heat: (r.heat ?? "cooling") as WatchlistItemData["heat"],
    distanceToBreakout: r.distancePct ? Number(r.distancePct) : 0,
  }))
}
