"use client"

import { useState, useMemo, useEffect } from "react"
import type { ApiSignal, HeatStatus } from "@/lib/api"
import { fetchSignalChart } from "@/lib/api"
import { cn } from "@/lib/utils"
import { BacktestCard } from "@/components/signal-sky/backtest-card"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Area,
  CartesianGrid,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts"
import {
  TrendingUpIcon,
  TargetIcon,
  ActivityIcon,
  ShieldAlertIcon,
  CalculatorIcon,
  ZapIcon,
  BarChart3Icon,
  BookOpenIcon,
  Loader2Icon,
} from "lucide-react"

const chartConfig: ChartConfig = {
  price: { label: "Price", color: "oklch(0.72 0.19 220)" },
  ema200: { label: "EMA 200", color: "oklch(0.78 0.16 80)" },
}

function HeatBadge({ heat }: { heat: HeatStatus }) {
  const config = {
    breakout: { label: "Breakout", className: "bg-heat-breakout/15 text-heat-breakout border-heat-breakout/30" },
    boiling: { label: "Boiling", className: "bg-heat-boiling/15 text-heat-boiling border-heat-boiling/30" },
    simmering: { label: "Simmering", className: "bg-heat-simmering/15 text-heat-simmering border-heat-simmering/30" },
    cooling: { label: "Warming", className: "bg-heat-cooling/15 text-heat-cooling border-heat-cooling/30" },
  }
  const c = config[heat]
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", c.className)}>
      <span className={cn(
        "size-1.5 rounded-full",
        heat === "breakout" ? "bg-heat-breakout" : heat === "boiling" ? "bg-heat-boiling" : heat === "simmering" ? "bg-heat-simmering" : "bg-heat-cooling"
      )} />
      {c.label}
    </span>
  )
}

function MetricBlock({ label, value, sub, icon: Icon, accent }: {
  label: string
  value: string
  sub?: string
  icon: React.ElementType
  accent?: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/50", accent)}>
        <Icon className="size-3.5" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-mono text-sm font-semibold">{value}</span>
        {sub && <span className="font-mono text-[10px] text-muted-foreground">{sub}</span>}
      </div>
    </div>
  )
}

// Generate synthetic chart data as fallback when real data is unavailable
function generateSyntheticChart(price: number, ema200: number): { priceHistory: number[]; ema200History: number[] } {
  const prices: number[] = []
  const emaArr: number[] = []
  const startPrice = price * (0.92 + Math.random() * 0.06)
  const startEma = ema200 * (0.98 + Math.random() * 0.03)
  let p = startPrice
  let e = startEma

  for (let i = 0; i < 30; i++) {
    p += (price - startPrice) / 30 + (Math.random() - 0.48) * price * 0.015
    e += (ema200 - startEma) / 30 + (Math.random() - 0.5) * ema200 * 0.002
    prices.push(Math.round(p * 100) / 100)
    emaArr.push(Math.round(e * 100) / 100)
  }
  return { priceHistory: prices, ema200History: emaArr }
}

export function SignalDetailDrawer({
  signal,
  open,
  onOpenChange,
}: {
  signal: ApiSignal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [capital, setCapital] = useState("500000")
  const [riskPercent, setRiskPercent] = useState("2")
  const [chartData, setChartData] = useState<{ priceHistory: number[]; ema200History: (number | null)[]; dates?: string[]; ath?: number | null } | null>(null)
  const [chartLoading, setChartLoading] = useState(false)

  // Lazy-load chart data when drawer opens
  useEffect(() => {
    if (!open || !signal) {
      setChartData(null)
      return
    }
    setChartLoading(true)
    fetchSignalChart(signal.id)
      .then((data) => {
        // Use real data if available, else fall back to synthetic
        if (data.priceHistory.length > 0) {
          setChartData(data)
        } else {
          setChartData(generateSyntheticChart(signal.price, signal.ema200))
        }
      })
      .catch(() => {
        // Fallback to synthetic chart data
        setChartData(generateSyntheticChart(signal.price, signal.ema200))
      })
      .finally(() => setChartLoading(false))
  }, [open, signal?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const positionCalc = useMemo(() => {
    if (!signal) return null
    const cap = parseFloat(capital) || 0
    const risk = parseFloat(riskPercent) || 0
    const stop = signal.ema200
    const riskPerShare = signal.price - stop
    if (riskPerShare <= 0) return null
    const riskAmount = cap * (risk / 100)
    const shares = Math.floor(riskAmount / riskPerShare)
    const positionValue = shares * signal.price
    return {
      stop,
      riskPerShare: riskPerShare.toFixed(2),
      riskAmount: riskAmount.toFixed(0),
      shares,
      positionValue: positionValue.toFixed(0),
      positionPercent: ((positionValue / cap) * 100).toFixed(1),
    }
  }, [signal, capital, riskPercent])

  if (!signal) return null

  const chartDataFormatted = chartData
    ? chartData.priceHistory.map((price, i) => ({
        date: chartData.dates?.[i]
          ? new Date(chartData.dates[i]).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
          : String(i + 1),
        price,
        ema200: chartData.ema200History[i] ?? undefined,
      }))
    : []

  const isAboveEma = signal.price > signal.ema200
  const currency = signal.exchange === "NSE" ? "₹" : "$"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto border-l border-border/40 bg-background p-0"
      >
        <SheetHeader className="px-5 pt-5 pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <SheetTitle className="font-mono text-lg font-bold tracking-tight">
                  {signal.symbol}
                </SheetTitle>
                <HeatBadge heat={signal.heat} />
              </div>
              <SheetDescription className="mt-0.5 text-sm text-muted-foreground">
                {signal.name}
              </SheetDescription>
            </div>
          </div>

          {/* Strategy badge */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
            <ZapIcon className="size-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">{signal.strategyName}</span>
            <Separator orientation="vertical" className="mx-1 h-3" />
            <span className="text-[10px] text-muted-foreground">
              Signal triggered {new Date(signal.signalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </SheetHeader>

        <Separator />

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-3 px-5 py-4">
          <MetricBlock
            label="Current Price"
            value={`${currency}${signal.price.toLocaleString()}`}
            icon={TrendingUpIcon}
            accent={isAboveEma ? "text-bull" : "text-bear"}
          />
          <MetricBlock
            label="All-Time High"
            value={`${currency}${signal.ath.toLocaleString()}`}
            sub={`${signal.distancePct.toFixed(1)}% away`}
            icon={TargetIcon}
          />
          <MetricBlock
            label="EMA 200"
            value={`${currency}${signal.ema200.toLocaleString()}`}
            sub={isAboveEma ? "Price above" : "Price below"}
            icon={ActivityIcon}
            accent={isAboveEma ? "text-bull" : "text-bear"}
          />
          <MetricBlock
            label="Volume Surge"
            value={`${(signal.volumeSurge ?? 0).toFixed(2)}x`}
            sub={`vs 20d avg`}
            icon={BarChart3Icon}
            accent={(signal.volumeSurge ?? 0) >= 1.5 ? "text-bull" : "text-muted-foreground"}
          />
        </div>

        <Separator />

        {/* Price chart */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Price vs EMA 200 — Since Pre-set ATH
            </span>
          </div>
          {chartLoading ? (
            <div className="flex items-center justify-center h-[180px]">
              <Loader2Icon className="size-5 text-primary animate-spin" />
            </div>
          ) : chartDataFormatted.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <ComposedChart data={chartDataFormatted} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.25 0.012 260 / 0.3)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 9, fill: "oklch(0.55 0.015 260)" }}
                  tickLine={false}
                  axisLine={false}
                  interval="equidistantPreserveStart"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.55 0.015 260)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                  width={55}
                  tickFormatter={(v: number) => v.toLocaleString()}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine
                  y={chartData?.ath ?? signal.ath}
                  stroke="oklch(0.68 0.22 25 / 0.4)"
                  strokeDasharray="4 4"
                  label={{ value: "Pre-set ATH", position: "right", fontSize: 9, fill: "oklch(0.68 0.22 25 / 0.6)" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="oklch(0.72 0.19 220)"
                  fill="oklch(0.72 0.19 220 / 0.08)"
                  strokeWidth={2}
                  dot={false}
                  name="price"
                />
                <Line
                  type="monotone"
                  dataKey="ema200"
                  stroke="oklch(0.78 0.16 80)"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  dot={false}
                  name="ema200"
                />
              </ComposedChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[180px] text-xs text-muted-foreground">
              No chart data available
            </div>
          )}
        </div>

        <Separator />

        {/* Strategy Explanation */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlertIcon className="size-3.5 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Why this triggered
            </span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              <span className="font-mono font-medium text-foreground">{signal.symbol}</span> hit an
              all-time high of <span className="font-mono text-foreground">{currency}{signal.ath.toLocaleString()}</span>,
              then pulled back below its 200-day EMA (<span className="font-mono text-foreground">{currency}{signal.ema200.toLocaleString()}</span>)
              — a classic &ldquo;reset.&rdquo;
            </p>
            <p>
              The stock has since reclaimed the EMA 200 and is now trading at{" "}
              <span className="font-mono text-foreground">{currency}{signal.price.toLocaleString()}</span>,
              just <span className={cn("font-mono font-medium", signal.distancePct <= 5 ? "text-bull" : "text-foreground")}>
                {signal.distancePct.toFixed(1)}%
              </span> from its ATH.
              {(signal.volumeSurge ?? 0) >= 1.5 && (
                <span className="text-bull"> Volume confirmation present at {(signal.volumeSurge ?? 0).toFixed(1)}x average.</span>
              )}
            </p>
          </div>
        </div>

        <Separator />

        {/* Position Size Calculator */}
        <div className="px-5 py-4 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <CalculatorIcon className="size-3.5 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Position Calculator
            </span>
          </div>

          <Card size="sm" className="bg-surface border-border/40">
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                    Capital ({currency})
                  </label>
                  <Input
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="h-8 font-mono text-sm bg-background"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                    Risk %
                  </label>
                  <Input
                    type="number"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(e.target.value)}
                    className="h-8 font-mono text-sm bg-background"
                    step="0.5"
                    min="0.5"
                    max="10"
                  />
                </div>
              </div>

              {positionCalc && (
                <div className="mt-4 space-y-2">
                  <Separator />
                  <div className="grid grid-cols-2 gap-y-2 pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Stop Loss (EMA 200)
                      </span>
                      <span className="font-mono text-sm font-semibold text-bear">
                        {currency}{positionCalc.stop.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Risk/Share
                      </span>
                      <span className="font-mono text-sm font-semibold">
                        {currency}{positionCalc.riskPerShare}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Shares to Buy
                      </span>
                      <span className="font-mono text-sm font-bold text-primary">
                        {positionCalc.shares.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Position Value
                      </span>
                      <span className="font-mono text-sm font-semibold">
                        {currency}{parseInt(positionCalc.positionValue).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Risk Amount
                      </span>
                      <span className="font-mono text-sm font-semibold text-bear">
                        {currency}{parseInt(positionCalc.riskAmount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        % of Capital
                      </span>
                      <span className="font-mono text-sm font-semibold">
                        {positionCalc.positionPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Backtest Summary */}
        <div className="px-5 py-4">
          <BacktestCard signal={signal} />
        </div>

        <Separator />

        {/* Actions */}
        <div className="px-5 py-4 pb-6 flex gap-2">
          <Button size="sm" className="flex-1 h-8 text-xs gap-1.5">
            <BookOpenIcon className="size-3" />
            Log Trade
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1.5">
            <BarChart3Icon className="size-3" />
            Full Backtest
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
