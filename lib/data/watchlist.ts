import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function getWatchlistSymbolMap(): Promise<Record<string, string>> {
  const session = await getSession()
  if (!session?.user?.id) return {}

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
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
  const session = await getSession()
  if (!session?.user?.id) return []

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  })

  if (items.length === 0) return []

  const symbols = [...new Set(items.map((i: any) => i.symbol as string))]
  const [members, signals] = await Promise.all([
    prisma.universeMember.findMany({ where: { symbol: { in: symbols } } }),
    prisma.signal.findMany({
      where: { symbol: { in: symbols }, isActive: true },
      distinct: ["symbol"],
    }),
  ])
  const memberMap = new Map(members.map((m: any) => [m.symbol, m]))
  const signalMap = new Map(signals.map((s: any) => [s.symbol, s]))

  return items.map((item: any) => {
    const member = memberMap.get(item.symbol) as any
    const sig = signalMap.get(item.symbol) as any
    return {
      id: item.id,
      symbol: item.symbol,
      name: member?.name ?? (item.symbol as string).replace(".NS", ""),
      exchange: item.exchange,
      addedAt: item.addedAt.toISOString(),
      notes: item.notes ?? "",
      currentPrice: sig ? Number(sig.price) : 0,
      ema200: sig ? Number(sig.ema200) : 0,
      ath: sig ? Number(sig.ath) : 0,
      heat: sig?.heat ?? "cooling",
      distanceToBreakout: sig ? Number(sig.distancePct) : 0,
    }
  })
}
