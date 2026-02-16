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

  const trade = await prisma.journalTrade.create({
    data: {
      userId: session.user.id,
      symbol: body.symbol,
      exchange: body.exchange ?? (body.symbol.endsWith(".NS") ? "NSE" : "NASDAQ"),
      side: (body.side ?? "LONG").toUpperCase(),
      entryDate: new Date(body.entryDate),
      entryPrice: body.entryPrice,
      quantity: body.quantity,
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
  }, { status: 201 })
}
