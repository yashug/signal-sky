import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export type JournalTradeData = {
  id: string
  symbol: string
  name: string
  exchange: string
  side: string
  entryDate: string
  entryPrice: number
  quantity: number
  stopLoss: number | null
  targetPrice: number | null
  exitDate: string | null
  exitPrice: number | null
  exitReason: string | null
  pnl: number | null
  pnlPercent: number | null
  notes: string | null
  linkedSignalId: string | null
  status: string
  currentPrice: number
  ema200: number | null
}

export async function getJournalTrades(): Promise<JournalTradeData[]> {
  const session = await getSession()
  if (!session?.user?.id) return []

  const trades = await prisma.journalTrade.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  if (trades.length === 0) return []

  const symbols = [...new Set(trades.map((t: any) => t.symbol as string))]
  const [members, latestSignals] = await Promise.all([
    prisma.universeMember.findMany({ where: { symbol: { in: symbols } } }),
    prisma.signal.findMany({
      where: { symbol: { in: symbols }, isActive: true },
      distinct: ["symbol"],
    }),
  ])
  const memberMap = new Map(members.map((m: any) => [m.symbol, m]))
  const signalMap = new Map(latestSignals.map((s: any) => [s.symbol, s]))

  return trades.map((t: any) => {
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
      entryDate: t.entryDate.toISOString(),
      entryPrice: Number(t.entryPrice),
      quantity: t.quantity,
      stopLoss: t.stopLoss ? Number(t.stopLoss) : null,
      targetPrice: t.targetPrice ? Number(t.targetPrice) : null,
      exitDate: t.exitDate ? t.exitDate.toISOString() : null,
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
}
