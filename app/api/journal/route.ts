import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const trades = await prisma.journalTrade.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  })

  // Enrich with universe member names and latest signal data
  const symbols = [...new Set(trades.map((t: any) => t.symbol as string))]
  const members = await prisma.universeMember.findMany({
    where: { symbol: { in: symbols } },
  })
  const memberMap = new Map(members.map((m: any) => [m.symbol, m]))

  // Get latest price from daily_bars (most reliable — always populated for all symbols)
  // NSE symbols in journal are stored WITH .NS suffix; daily_bars stores WITHOUT .NS
  const dbSymbols = symbols.map((s: string) => s.replace(/\.NS$/, ""))
  const latestBars = await prisma.$queryRawUnsafe(`
    SELECT DISTINCT ON (symbol) symbol, exchange, close, ema200
    FROM daily_bars
    WHERE symbol = ANY($1::text[])
    ORDER BY symbol, date DESC
  `, dbSymbols) as Array<{ symbol: string; exchange: string; close: any; ema200: any }>

  // Build map keyed by both raw symbol (US) and symbol+.NS (NSE)
  const priceMap = new Map<string, { price: number; ema200: number | null }>()
  for (const bar of latestBars) {
    const price = Number(bar.close)
    const ema = bar.ema200 ? Number(bar.ema200) : null
    priceMap.set(bar.symbol, { price, ema200: ema })
    priceMap.set(`${bar.symbol}.NS`, { price, ema200: ema })
  }

  const enriched = trades.map((t: any) => {
    const member = memberMap.get(t.symbol) as any
    const barKey = (t.symbol as string).replace(/\.NS$/, "")
    const bar = priceMap.get(barKey) ?? priceMap.get(t.symbol as string)
    const currentPrice = bar?.price ?? Number(t.entryPrice)
    const ema200 = bar?.ema200 ?? null

    return {
      id: t.id,
      symbol: t.symbol,
      name: member?.name ?? (t.symbol as string).replace(".NS", ""),
      exchange: t.exchange,
      side: (t.side as string).toLowerCase(),
      entryDate: t.entryDate,
      entryPrice: Number(t.entryPrice),
      quantity: t.quantity,
      stopLoss: t.stopLoss ? Number(t.stopLoss) : null,
      targetPrice: t.targetPrice ? Number(t.targetPrice) : null,
      exitDate: t.exitDate,
      exitPrice: t.exitPrice ? Number(t.exitPrice) : null,
      exitReason: t.exitReason,
      pnl: t.pnl ? Number(t.pnl) : null,
      pnlPercent: t.pnlPercent ? Number(t.pnlPercent) : null,
      notes: t.notes,
      linkedSignalId: t.linkedSignalId,
      status: (t.status as string).toLowerCase(),
      currentPrice,
      ema200,
    }
  })

  return NextResponse.json({ trades: enriched })
}

export async function POST(request: Request) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const symbol = body.symbol
  const exchange = body.exchange ?? (symbol.endsWith(".NS") ? "NSE" : "NASDAQ")
  const side = (body.side ?? "LONG").toUpperCase()
  const newQty = body.quantity as number
  const newPrice = body.entryPrice as number

  // Check for existing open trade on the same symbol + side
  const existing = await prisma.journalTrade.findFirst({
    where: {
      userId: session.userId,
      symbol,
      side,
      status: "OPEN",
    },
  })

  if (existing) {
    // Merge: weighted average entry price + combined quantity
    const oldQty = existing.quantity
    const oldPrice = Number(existing.entryPrice)
    const combinedQty = oldQty + newQty
    const avgPrice = (oldPrice * oldQty + newPrice * newQty) / combinedQty

    const updated = await prisma.journalTrade.update({
      where: { id: existing.id },
      data: {
        entryPrice: Math.round(avgPrice * 100) / 100,
        quantity: combinedQty,
        stopLoss: body.stopLoss ?? existing.stopLoss,
        notes: existing.notes
          ? `${existing.notes}\nAdded ${newQty} shares @ ${newPrice}`
          : `Added ${newQty} shares @ ${newPrice}`,
      },
    })

    return NextResponse.json({
      id: updated.id,
      symbol: updated.symbol,
      status: updated.status,
      merged: true,
      previousQty: oldQty,
      newQty: combinedQty,
      avgPrice: Math.round(avgPrice * 100) / 100,
    }, { status: 200 })
  }

  // No existing open trade — create new
  const trade = await prisma.journalTrade.create({
    data: {
      userId: session.userId,
      symbol,
      exchange,
      side,
      entryDate: new Date(body.entryDate),
      entryPrice: newPrice,
      quantity: newQty,
      stopLoss: body.stopLoss ?? null,
      targetPrice: body.targetPrice ?? null,
      notes: body.notes ?? null,
      linkedSignalId: body.linkedSignalId ?? null,
      status: "OPEN",
    },
  })

  return NextResponse.json({
    id: trade.id,
    symbol: trade.symbol,
    status: trade.status,
    merged: false,
  }, { status: 201 })
}
