import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json(
      { watchlistCount: 0, journalCount: 0, openTrades: 0 },
      { status: 200 }
    )
  }

  const [watchlistCount, journalCount, openTrades, watchlistItems] = await Promise.all([
    prisma.watchlistItem.count({ where: { userId: session.userId } }),
    prisma.journalTrade.count({ where: { userId: session.userId } }),
    prisma.journalTrade.count({ where: { userId: session.userId, status: "OPEN" } }),
    prisma.watchlistItem.findMany({
      where: { userId: session.userId },
      select: { symbol: true, exchange: true },
      take: 6,
      orderBy: { addedAt: "desc" },
    }),
  ])

  const watchlistSymbols = watchlistItems.map((w) => ({
    symbol: w.symbol.replace(".NS", ""),
    exchange: w.exchange,
  }))

  return NextResponse.json({ watchlistCount, journalCount, openTrades, watchlistSymbols })
}
