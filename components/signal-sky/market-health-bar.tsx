"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  ActivityIcon,
} from "lucide-react"
import type { ApiMarketHealth } from "@/lib/api"

function getTrafficLight(percent: number): {
  color: string
  bg: string
  label: string
  glow: string
} {
  if (percent >= 60) return { color: "text-bull", bg: "bg-bull", label: "BULLISH", glow: "shadow-[0_0_8px_oklch(0.72_0.19_155/0.4)]" }
  if (percent >= 40) return { color: "text-heat-simmering", bg: "bg-heat-simmering", label: "NEUTRAL", glow: "shadow-[0_0_8px_oklch(0.78_0.16_80/0.4)]" }
  return { color: "text-bear", bg: "bg-bear", label: "BEARISH", glow: "shadow-[0_0_8px_oklch(0.68_0.22_25/0.4)]" }
}

function MarketCard({ market }: { market: ApiMarketHealth }) {
  const light = getTrafficLight(market.percentAbove)

  return (
    <div className="flex items-center gap-3 rounded-md border border-border/40 bg-surface px-3 py-2 transition-colors hover:bg-surface-raised">
      {/* Traffic light dot */}
      <div className="flex flex-col items-center gap-1">
        <div className={cn("size-2.5 rounded-full animate-pulse-dot", light.bg, light.glow)} />
      </div>

      {/* Market info */}
      <div className="flex flex-col">
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          {market.label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("font-mono text-sm font-semibold", light.color)}>
            {market.percentAbove.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-end">
        <span className={cn("text-[9px] font-medium uppercase tracking-wider", light.color)}>
          {light.label}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {market.aboveEma200}/{market.totalStocks}
        </span>
      </div>
    </div>
  )
}

export function MarketHealthBar({ markets }: { markets: ApiMarketHealth[] }) {
  const filtered = markets.filter((m) => m.universe === "nifty50" || m.universe === "niftybank")
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => { setNow(new Date()) }, [])

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-2 border-b border-border/40 bg-background/80 backdrop-blur-xl px-3 sm:px-4 py-2 sm:h-[68px]">
      <SidebarTrigger className="text-muted-foreground shrink-0" />
      <Separator orientation="vertical" className="mx-1 h-5 hidden sm:block" />

      <div className="hidden sm:flex items-center gap-1.5">
        <ActivityIcon className="size-3.5 text-primary" />
        <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
          Market Health
        </span>
      </div>

      <div className="flex items-center gap-2 ml-1 sm:ml-2 overflow-x-auto shrink-0">
        {filtered.length === 0 ? (
          <span className="text-[11px] text-muted-foreground/60">Unavailable</span>
        ) : (
          filtered.map((m) => (
            <MarketCard key={m.universe} market={m} />
          ))
        )}
      </div>

      {/* Right side: timestamp */}
      <div className="ml-auto flex items-center gap-2">
        {now && (
          <span className="font-mono text-[10px] text-muted-foreground/60 hidden md:inline">
            {now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            {" "}
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </header>
  )
}
