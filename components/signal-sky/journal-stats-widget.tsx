"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useJournalTrades } from "@/hooks/use-journal"
import { cn } from "@/lib/utils"
import { BookOpenIcon, ArrowRightIcon } from "lucide-react"

function computeMarket(
  trades: ReturnType<typeof useJournalTrades>["data"],
  exchange: "NSE" | "US"
) {
  const mt = (trades ?? []).filter((t) => t.exchange === exchange)
  const open = mt.filter((t) => t.status === "open")
  const closed = mt.filter((t) => t.status === "closed" || t.status === "stopped_out")

  if (open.length === 0 && closed.length === 0) return null

  const openPnl = open.reduce(
    (sum, t) => sum + (t.currentPrice - t.entryPrice) * t.quantity,
    0
  )
  const realizedPnl = closed.reduce((sum, t) => sum + (t.pnl ?? 0), 0)
  const winners = closed.filter((t) => (t.pnl ?? 0) > 0).length
  const winRate = closed.length > 0
    ? Math.round((winners / closed.length) * 100)
    : null

  return {
    currency: exchange === "NSE" ? "₹" : "$",
    label: exchange === "NSE" ? "India" : "US",
    openCount: open.length,
    openPnl,
    realizedPnl,
    closedCount: closed.length,
    winRate,
  }
}

function PnlStat({
  label,
  value,
  currency,
  count,
  countLabel,
}: {
  label: string
  value: number
  currency: string
  count?: number
  countLabel?: string
}) {
  const isPos = value >= 0
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="text-[10px] text-muted-foreground/60">{label}</span>
      <span className={cn(
        "font-mono text-[11px] font-bold tabular-nums",
        isPos ? "text-bull" : "text-bear"
      )}>
        {isPos ? "+" : "-"}{currency}{Math.abs(Math.round(value)).toLocaleString()}
      </span>
      {count != null && (
        <span className="text-[10px] text-muted-foreground/40">
          ({count} {countLabel})
        </span>
      )}
    </div>
  )
}

export function JournalStatsWidget() {
  const { data: trades = [] } = useJournalTrades()

  const { nse, us } = useMemo(() => ({
    nse: computeMarket(trades, "NSE"),
    us: computeMarket(trades, "US"),
  }), [trades])

  if (!nse && !us) return null

  const markets = [nse, us].filter(Boolean) as NonNullable<typeof nse>[]

  return (
    <Link
      href="/journal"
      className="flex items-center gap-3 px-4 sm:px-6 py-2.5 border-b border-border/20 bg-surface/30 hover:bg-surface/60 transition-colors group"
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <BookOpenIcon className="size-3.5 text-muted-foreground" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Journal
        </span>
      </div>

      <div className="flex items-center gap-4 min-w-0 overflow-x-auto">
        {markets.map((m, i) => (
          <div key={m.label} className="flex items-center gap-3 shrink-0">
            {i > 0 && (
              <span className="text-muted-foreground/20 text-[10px]">|</span>
            )}

            {/* Market label */}
            <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider">
              {m.label}
            </span>

            {m.openCount > 0 && (
              <PnlStat
                label="Open"
                value={m.openPnl}
                currency={m.currency}
                count={m.openCount}
                countLabel="pos"
              />
            )}

            {m.closedCount > 0 && (
              <>
                {m.openCount > 0 && (
                  <span className="text-muted-foreground/20 text-[10px]">·</span>
                )}
                <PnlStat
                  label="Realized"
                  value={m.realizedPnl}
                  currency={m.currency}
                />
              </>
            )}

            {m.winRate !== null && (
              <>
                <span className="text-muted-foreground/20 text-[10px]">·</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-muted-foreground/60">WR</span>
                  <span className={cn(
                    "font-mono text-[11px] font-bold tabular-nums",
                    m.winRate >= 50 ? "text-bull" : "text-bear"
                  )}>
                    {m.winRate}%
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0">
        <ArrowRightIcon className="size-3" />
      </div>
    </Link>
  )
}
