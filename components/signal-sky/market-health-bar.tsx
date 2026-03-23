"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ActivityIcon } from "lucide-react"
import type { ApiMarketHealth } from "@/lib/api"

const SHORT_LABELS: Record<string, string> = {
  nifty50: "N50",
  niftybank: "BANK",
  sp100: "SPX",
  nasdaq100: "NDQ",
}

function getTrafficLight(percent: number) {
  if (percent >= 60) return { color: "text-bull", bg: "bg-bull", label: "BULLISH", glow: "shadow-[0_0_8px_oklch(0.72_0.19_155/0.4)]" }
  if (percent >= 40) return { color: "text-heat-simmering", bg: "bg-heat-simmering", label: "NEUTRAL", glow: "shadow-[0_0_8px_oklch(0.78_0.16_80/0.4)]" }
  return { color: "text-bear", bg: "bg-bear", label: "BEARISH", glow: "shadow-[0_0_8px_oklch(0.68_0.22_25/0.4)]" }
}

// Full card — desktop
function MarketCard({ market }: { market: ApiMarketHealth }) {
  const light = getTrafficLight(market.percentAbove)
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-border/30 bg-card/80 backdrop-blur-sm ring-1 ring-border/15 px-3 py-1.5 transition-colors hover:bg-surface-raised">
      <div className={cn("size-2 rounded-full shrink-0 animate-pulse-dot", light.bg, light.glow)} />
      <div className="flex flex-col">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground leading-none mb-0.5">
          {market.label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("font-mono text-[13px] font-bold leading-none", light.color)}>
            {market.percentAbove.toFixed(1)}%
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/50 leading-none">
            {market.aboveEma200}/{market.totalStocks}
          </span>
        </div>
      </div>
      <span className={cn("text-[8px] font-bold uppercase tracking-wider ml-0.5", light.color)}>
        {light.label}
      </span>
    </div>
  )
}

// Compact chip — mobile
function CompactChip({ market }: { market: ApiMarketHealth }) {
  const light = getTrafficLight(market.percentAbove)
  const short = SHORT_LABELS[market.universe] ?? market.universe.slice(0, 4).toUpperCase()
  return (
    <div className="flex items-center gap-1 rounded border border-border/30 bg-card/80 backdrop-blur-sm ring-1 ring-border/15 px-1.5 py-1">
      <div className={cn("size-1.5 rounded-full shrink-0", light.bg)} />
      <span className="font-mono text-[9px] font-semibold tracking-wide text-muted-foreground">{short}</span>
      <span className={cn("font-mono text-[11px] font-bold", light.color)}>
        {market.percentAbove.toFixed(0)}%
      </span>
    </div>
  )
}

export function MarketHealthBar({ markets }: { markets: ApiMarketHealth[] }) {
  const filtered = markets.filter((m) =>
    m.universe === "nifty50" || m.universe === "niftybank" ||
    m.universe === "sp100" || m.universe === "nasdaq100"
  )
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-3 sm:px-4 h-11 sm:h-[68px]">
        <SidebarTrigger className="text-muted-foreground shrink-0" />
        <Separator orientation="vertical" className="mx-1 h-5 hidden sm:block" />

        {/* Label — desktop only */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <ActivityIcon className="size-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Market Health</span>
        </div>

        {/* Mobile: single inline row */}
        <div className="flex sm:hidden items-center gap-1 ml-1.5">
          {filtered.map((m) => (
            <CompactChip key={m.universe} market={m} />
          ))}
        </div>

        {/* Desktop: full cards */}
        <div className="hidden sm:flex items-center gap-2 ml-2">
          {filtered.length === 0 ? (
            <span className="text-[11px] text-muted-foreground/60">Unavailable</span>
          ) : (
            filtered.map((m) => (
              <MarketCard key={m.universe} market={m} />
            ))
          )}
        </div>

        {/* Clock */}
        <div className="ml-auto flex items-center shrink-0">
          {now && (
            <div className="hidden md:flex flex-col items-end">
              <span className="font-mono text-[10px] text-muted-foreground/50">
                {now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/70 font-medium tabular-nums">
                {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
