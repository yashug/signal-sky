import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Single query with lateral joins — avoids 2 extra round trips to Supabase
  const rows = await prisma.$queryRawUnsafe(`
    SELECT
      w.id,
      w.symbol,
      w.exchange,
      w.added_at          AS "addedAt",
      w.notes,
      w.alert_price       AS "alertPrice",
      w.alert_direction   AS "alertDirection",
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
  `, session.userId) as any[]

  const items = rows.map((r: any) => ({
    id: r.id,
    symbol: r.symbol,
    exchange: r.exchange,
    addedAt: r.addedAt,
    notes: r.notes ?? "",
    alertPrice: r.alertPrice ? Number(r.alertPrice) : null,
    alertDirection: r.alertDirection ?? null,
    alertTriggeredAt: r.alertTriggeredAt?.toISOString?.() ?? null,
    name: r.name ?? r.symbol.replace(".NS", ""),
    currentPrice: r.price ? Number(r.price) : 0,
    ema200: r.ema200 ? Number(r.ema200) : 0,
    ath: r.ath ? Number(r.ath) : 0,
    heat: r.heat ?? "cooling",
    distanceToBreakout: r.distancePct ? Number(r.distancePct) : 0,
    priceAtAdd: r.priceAtAdd ? Number(r.priceAtAdd) : null,
  }))

  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const exchange = body.exchange ?? (body.symbol.endsWith(".NS") ? "NSE" : "NASDAQ")

  const item = await prisma.watchlistItem.create({
    data: {
      userId: session.userId,
      symbol: body.symbol,
      exchange,
      notes: body.notes ?? null,
    },
  })

  return NextResponse.json({ id: item.id, symbol: item.symbol }, { status: 201 })
}
