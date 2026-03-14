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
  alertPrice: number | null
  alertDirection: "above" | "below" | null
  alertTriggeredAt: string | null
  currentPrice: number
  ema200: number
  ath: number
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  distanceToBreakout: number
  priceAtAdd: number | null
}

export async function getWatchlistItems(): Promise<WatchlistItemData[]> {
  const user = await getInitialUser()
  if (!user?.id) return []

  const rows = await prisma.$queryRawUnsafe(`
    SELECT
      w.id,
      w.symbol,
      w.exchange,
      w.added_at           AS "addedAt",
      w.notes,
      w.alert_price        AS "alertPrice",
      w.alert_direction    AS "alertDirection",
      w.alert_triggered_at AS "alertTriggeredAt",
      um.name,
      s.price,
      s.ema200,
      s.ath,
      s.heat,
      s.distance_pct AS "distancePct",
      db.close       AS "priceAtAdd"
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
    LEFT JOIN LATERAL (
      SELECT close
      FROM daily_bars
      WHERE symbol = REPLACE(w.symbol, '.NS', '')
        AND date <= DATE(w.added_at)
      ORDER BY date DESC
      LIMIT 1
    ) db ON true
    WHERE w.user_id = $1
    ORDER BY w.added_at DESC
  `, user.id) as any[]

  return rows.map((r: any) => ({
    id: r.id,
    symbol: r.symbol,
    exchange: r.exchange,
    addedAt: String(r.addedAt),
    notes: r.notes ?? "",
    alertPrice: r.alertPrice ? Number(r.alertPrice) : null,
    alertDirection: (r.alertDirection ?? null) as "above" | "below" | null,
    alertTriggeredAt: r.alertTriggeredAt ? String(r.alertTriggeredAt) : null,
    name: r.name ?? r.symbol.replace(".NS", ""),
    currentPrice: r.price ? Number(r.price) : 0,
    ema200: r.ema200 ? Number(r.ema200) : 0,
    ath: r.ath ? Number(r.ath) : 0,
    heat: (r.heat ?? "cooling") as WatchlistItemData["heat"],
    distanceToBreakout: r.distancePct ? Number(r.distancePct) : 0,
    priceAtAdd: r.priceAtAdd ? Number(r.priceAtAdd) : null,
  }))
}
