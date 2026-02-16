"use client"

import { useState } from "react"
import {
  fetchMarketHealth,
  fetchMarketHealthHistory,
  type ApiMarketHealth,
} from "@/lib/api"
import { useApi } from "@/hooks/use-api"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts"
import {
  HeartPulseIcon,
  Loader2Icon,
  WifiOffIcon,
} from "lucide-react"

const breadthChartConfig: ChartConfig = {
  nifty200: { label: "NIFTY 200", color: "oklch(0.72 0.19 220)" },
  sp100: { label: "S&P 100", color: "oklch(0.72 0.19 155)" },
  nasdaq100: { label: "NASDAQ 100", color: "oklch(0.65 0.17 300)" },
}

function getHealthColor(percent: number): string {
  if (percent >= 60) return "text-bull"
  if (percent >= 40) return "text-heat-simmering"
  return "text-bear"
}

function getHealthBg(percent: number): string {
  if (percent >= 60) return "bg-bull/10"
  if (percent >= 40) return "bg-heat-simmering/10"
  return "bg-bear/10"
}

function MarketSummaryCard({ market }: { market: ApiMarketHealth }) {
  const color = getHealthColor(market.percentAbove)
  const bg = getHealthBg(market.percentAbove)

  return (
    <Card className="border-border/40 bg-surface">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{market.label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className={cn("font-mono text-3xl font-bold", color)}>
            {market.percentAbove.toFixed(1)}%
          </span>
          <span className="text-xs text-muted-foreground">above EMA 200</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", bg.replace("/10", ""))}
            style={{ width: `${market.percentAbove}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">{market.aboveEma200} above</span>
          <span className="font-mono">{market.totalStocks - market.aboveEma200} below</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ConnectionError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-0">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-bear/5 animate-ping" style={{ animationDuration: "2.5s" }} />
        <div className="relative flex size-14 items-center justify-center rounded-full border border-bear/20 bg-bear/5">
          <WifiOffIcon className="size-6 text-bear/60" />
        </div>
      </div>
      <h3 className="text-sm font-semibold text-foreground tracking-tight">
        Data Unavailable
      </h3>
      <p className="mt-1.5 max-w-xs text-center text-xs text-muted-foreground leading-relaxed">
        {message}
      </p>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-bear/60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-bear" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-bear/70">
          api unreachable
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-5 gap-2 border-border/40 text-xs"
        onClick={onRetry}
      >
        <Loader2Icon className="size-3" />
        Retry
      </Button>
    </div>
  )
}

export default function MarketHealthPage() {
  const [timeRange, setTimeRange] = useState("90d")

  const days = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90

  const { data: healthData, loading: healthLoading, error: healthError, refetch: healthRefetch } = useApi(() => fetchMarketHealth(), [])
  const { data: historyData, loading: historyLoading, error: historyError, refetch: historyRefetch } = useApi(
    () => fetchMarketHealthHistory(days),
    [days]
  )

  const markets = healthData?.markets ?? []
  const history = historyData?.history ?? []

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <HeartPulseIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Market Health</h1>
          <p className="text-xs text-muted-foreground">
            Breadth analysis — % of stocks trading above their 200-day SMA
          </p>
        </div>
      </div>

      {/* Market summary cards */}
      {healthLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2Icon className="size-5 text-primary animate-spin" />
        </div>
      ) : healthError ? (
        <ConnectionError message={healthError} onRetry={healthRefetch} />
      ) : markets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {markets.map((m) => (
            <MarketSummaryCard key={m.universe} market={m} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 gap-2">
          <HeartPulseIcon className="size-5 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">
            No market health data yet. Run the scanner to populate.
          </span>
        </div>
      )}

      {/* Market breadth chart */}
      <Card className="border-border/40 bg-surface">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Market Breadth Over Time
            </CardTitle>
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="h-7">
                <TabsTrigger value="7d" className="text-[10px] px-2.5 h-6">7D</TabsTrigger>
                <TabsTrigger value="30d" className="text-[10px] px-2.5 h-6">30D</TabsTrigger>
                <TabsTrigger value="90d" className="text-[10px] px-2.5 h-6">90D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2Icon className="size-5 text-primary animate-spin" />
            </div>
          ) : historyError ? (
            <div className="flex flex-col items-center justify-center h-[300px] gap-0">
              <WifiOffIcon className="size-5 text-bear/50 mb-2" />
              <span className="text-xs text-muted-foreground">{historyError}</span>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-xs text-muted-foreground"
                onClick={historyRefetch}
              >
                Retry
              </Button>
            </div>
          ) : history.length > 0 ? (
            <>
              <ChartContainer config={breadthChartConfig} className="h-[300px] w-full">
                <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.25 0.012 260 / 0.3)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "oklch(0.55 0.015 260)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: string) => {
                      const d = new Date(v)
                      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "oklch(0.55 0.015 260)" }}
                    tickLine={false}
                    axisLine={false}
                    domain={[20, 85]}
                    width={35}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ReferenceLine
                    y={60}
                    stroke="oklch(0.72 0.19 155 / 0.2)"
                    strokeDasharray="6 3"
                    label={{ value: "Bullish (60%)", position: "right", fontSize: 9, fill: "oklch(0.72 0.19 155 / 0.4)" }}
                  />
                  <ReferenceLine
                    y={40}
                    stroke="oklch(0.68 0.22 25 / 0.2)"
                    strokeDasharray="6 3"
                    label={{ value: "Bearish (40%)", position: "right", fontSize: 9, fill: "oklch(0.68 0.22 25 / 0.4)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sp100"
                    stroke="oklch(0.72 0.19 155)"
                    fill="oklch(0.72 0.19 155 / 0.06)"
                    strokeWidth={2}
                    dot={false}
                    name="sp100"
                  />
                  <Area
                    type="monotone"
                    dataKey="nasdaq100"
                    stroke="oklch(0.65 0.17 300)"
                    fill="oklch(0.65 0.17 300 / 0.06)"
                    strokeWidth={2}
                    dot={false}
                    name="nasdaq100"
                  />
                  <Area
                    type="monotone"
                    dataKey="nifty200"
                    stroke="oklch(0.72 0.19 220)"
                    fill="oklch(0.72 0.19 220 / 0.06)"
                    strokeWidth={2}
                    dot={false}
                    name="nifty200"
                  />
                </AreaChart>
              </ChartContainer>
              <div className="flex items-center justify-center gap-6 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full" style={{ background: "oklch(0.72 0.19 220)" }} />
                  <span className="text-xs text-muted-foreground">NIFTY 200</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full" style={{ background: "oklch(0.72 0.19 155)" }} />
                  <span className="text-xs text-muted-foreground">S&P 100</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full" style={{ background: "oklch(0.65 0.17 300)" }} />
                  <span className="text-xs text-muted-foreground">NASDAQ 100</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] gap-2">
              <span className="text-sm text-muted-foreground">
                No history data yet — run the scanner daily to build breadth charts.
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
