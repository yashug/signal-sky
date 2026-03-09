import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const trades = await prisma.journalTrade.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  // Enrich with universe member names and latest signal data
  const symbols = [...new Set(trades.map((t: any) => t.symbol as string))]
  const members = await prisma.universeMember.findMany({
    where: { symbol: { in: symbols } },
  })
  const memberMap = new Map(members.map((m: any) => [m.symbol, m]))

  // Get latest signals for current price
  const latestSignals = await prisma.signal.findMany({
    where: { symbol: { in: symbols }, isActive: true },
    distinct: ["symbol"],
  })
  const signalMap = new Map(latestSignals.map((s: any) => [s.symbol, s]))

  const enriched = trades.map((t: any) => {
    const member = memberMap.get(t.symbol) as any
    const sig = signalMap.get(t.symbol) as any
    const currentPrice = sig ? Number(sig.price) : Number(t.entryPrice)
    const ema200 = sig ? Number(sig.ema200) : null

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
  const session = await getSession()
  if (!session?.user?.id) {
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
      userId: session.user.id,
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
      userId: session.user.id,
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
