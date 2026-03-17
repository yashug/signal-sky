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
  const dbSymbols = symbols.map((s: string) => s.replace(/\.NS$/, ""))

  const [members, latestBars] = await Promise.all([
    prisma.universeMember.findMany({ where: { symbol: { in: symbols } } }),
    prisma.$queryRawUnsafe(`
      SELECT DISTINCT ON (symbol) symbol, close, ema200
      FROM daily_bars
      WHERE symbol = ANY($1::text[])
      ORDER BY symbol, date DESC
    `, dbSymbols) as Promise<Array<{ symbol: string; close: any; ema200: any }>>,
  ])
  const memberMap = new Map(members.map((m: any) => [m.symbol, m]))
  const priceMap = new Map<string, { price: number; ema200: number | null }>()
  for (const bar of latestBars) {
    const entry = { price: Number(bar.close), ema200: bar.ema200 ? Number(bar.ema200) : null }
    priceMap.set(bar.symbol, entry)
    priceMap.set(`${bar.symbol}.NS`, entry)
  }

  return trades.map((t: any) => {
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
