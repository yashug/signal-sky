"use client"

import type { ApiMarketHealth, ApiMarketHealthResponse } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { HeartPulseIcon } from "lucide-react"

function getHealthColor(percent: number): string {
  if (percent >= 60) return "text-bull"
  if (percent >= 40) return "text-heat-simmering"
  return "text-bear"
}

function getHealthBg(percent: number): string {
  if (percent >= 60) return "bg-bull"
  if (percent >= 40) return "bg-heat-simmering"
  return "bg-bear"
}

function getHealthLabel(percent: number): string {
  if (percent >= 60) return "BULLISH"
  if (percent >= 40) return "NEUTRAL"
  return "BEARISH"
}

function MarketSummaryCard({ market }: { market: ApiMarketHealth }) {
  const color = getHealthColor(market.percentAbove)
  const bg = getHealthBg(market.percentAbove)
  const label = getHealthLabel(market.percentAbove)

  return (
    <Card className="border-border/40 bg-surface hover:bg-surface-raised/50 transition-colors">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {market.label}
          </span>
          <span className={cn("text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", color, bg + "/10")}>
            {label}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className={cn("font-mono text-3xl font-bold tabular-nums", color)}>
            {market.percentAbove.toFixed(1)}%
          </span>
          <span className="text-[10px] text-muted-foreground">above EMA 200</span>
        </div>

        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", bg)}
            style={{ width: `${market.percentAbove}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="font-mono">{market.aboveEma200} above</span>
          <span className="font-mono">{market.totalStocks - market.aboveEma200} below</span>
          <span className="font-mono">{market.totalStocks} total</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function MarketHealthClient({ data }: { data: ApiMarketHealthResponse }) {
  const markets = data.markets

  const indianMarkets = markets.filter((m) => !["sp100", "nasdaq100"].includes(m.universe))
  const usMarkets = markets.filter((m) => ["sp100", "nasdaq100"].includes(m.universe))

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <HeartPulseIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Market Health</h1>
          <p className="text-xs text-muted-foreground">
            Breadth analysis — % of stocks trading above their 200-day EMA across indices
          </p>
        </div>
      </div>

      {markets.length > 0 ? (
        <>
          {indianMarkets.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Indian Indices
                </span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {indianMarkets.map((m) => (
                  <MarketSummaryCard key={m.universe} market={m} />
                ))}
              </div>
            </div>
          )}

          {usMarkets.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  US Indices
                </span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {usMarkets.map((m) => (
                  <MarketSummaryCard key={m.universe} market={m} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center py-10 gap-2">
          <HeartPulseIcon className="size-5 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">
            No market health data yet. Run the scanner to populate.
          </span>
        </div>
      )}
    </div>
  )
}
