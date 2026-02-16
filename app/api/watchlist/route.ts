import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  })

  // Enrich with signal data and universe member info
  const symbols = [...new Set(items.map((i: any) => i.symbol as string))]
  const members = await prisma.universeMember.findMany({
    where: { symbol: { in: symbols } },
  })
  const memberMap = new Map(members.map((m: any) => [m.symbol, m]))

  const signals = await prisma.signal.findMany({
    where: { symbol: { in: symbols }, isActive: true },
    distinct: ["symbol"],
  })
  const signalMap = new Map(signals.map((s: any) => [s.symbol, s]))

  const enriched = items.map((item: any) => {
    const member = memberMap.get(item.symbol) as any
    const sig = signalMap.get(item.symbol) as any

    return {
      id: item.id,
      symbol: item.symbol,
      name: member?.name ?? (item.symbol as string).replace(".NS", ""),
      exchange: item.exchange,
      addedAt: item.addedAt,
      notes: item.notes ?? "",
      currentPrice: sig ? Number(sig.price) : 0,
      ema200: sig ? Number(sig.ema200) : 0,
      ath: sig ? Number(sig.ath) : 0,
      heat: sig?.heat ?? "cooling",
      distanceToBreakout: sig ? Number(sig.distancePct) : 0,
    }
  })

  return NextResponse.json({ items: enriched })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const exchange = body.exchange ?? (body.symbol.endsWith(".NS") ? "NSE" : "NASDAQ")

  const item = await prisma.watchlistItem.create({
    data: {
      userId: session.user.id,
      symbol: body.symbol,
      exchange,
      notes: body.notes ?? null,
    },
  })

  return NextResponse.json({ id: item.id, symbol: item.symbol }, { status: 201 })
}
