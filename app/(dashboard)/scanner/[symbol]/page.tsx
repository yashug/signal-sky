"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  fetchSignalBySymbol,
  fetchSignalChart,
  type ApiSignal,
  type HeatStatus,
} from "@/lib/api"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { BacktestCard } from "@/components/signal-sky/backtest-card"
import { Button } from "@/components/ui/button"
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
  ArrowLeftIcon,
  TrendingUpIcon,
  TargetIcon,
  ActivityIcon,
  ShieldAlertIcon,
  ZapIcon,
  BarChart3Icon,
  CalendarIcon,
  BookOpenIcon,
  Loader2Icon,
  AlertCircleIcon,
} from "lucide-react"

// ─── Chart config ───────────────────────────────────────────────

const chartConfig: ChartConfig = {
  price: { label: "Price", color: "oklch(0.72 0.19 220)" },
  ema200: { label: "EMA 200", color: "oklch(0.78 0.16 80)" },
}

// ─── Heat Badge ─────────────────────────────────────────────────

const HEAT_CONFIG = {
  breakout: {
    label: "Breakout",
    className:
      "bg-heat-breakout/15 text-heat-breakout border-heat-breakout/30",
  },
  boiling: {
    label: "Boiling",
    className: "bg-heat-boiling/15 text-heat-boiling border-heat-boiling/30",
  },
  simmering: {
    label: "Simmering",
    className:
      "bg-heat-simmering/15 text-heat-simmering border-heat-simmering/30",
  },
  cooling: {
    label: "Warming",
    className: "bg-heat-cooling/15 text-heat-cooling border-heat-cooling/30",
  },
} as const

function HeatBadge({ heat }: { heat: HeatStatus }) {
  const c = HEAT_CONFIG[heat]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
        c.className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          heat === "breakout"
            ? "bg-heat-breakout"
            : heat === "boiling"
              ? "bg-heat-boiling"
              : heat === "simmering"
                ? "bg-heat-simmering"
                : "bg-heat-cooling"
        )}
      />
      {c.label}
    </span>
  )
}

// ─── Metric Card ────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  sub?: string
  icon: React.ElementType
  accent?: string
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border/20 bg-surface/50 px-3 py-2.5 transition-colors hover:bg-surface/80">
      <div
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-md bg-muted/50",
          accent
        )}
      >
        <Icon className="size-3" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
          {label}
        </span>
        <span className="font-mono text-sm font-bold tabular-nums leading-tight">
          {value}
        </span>
        {sub && (
          <span className="font-mono text-[10px] text-muted-foreground/50">
            {sub}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Synthetic chart fallback ───────────────────────────────────

function generateSyntheticChart(
  price: number,
  ema200: number
): { priceHistory: number[]; ema200History: number[] } {
  const prices: number[] = []
  const emaArr: number[] = []
  let p = price * (0.92 + Math.random() * 0.06)
  let e = ema200 * (0.98 + Math.random() * 0.03)

  for (let i = 0; i < 30; i++) {
    p += ((price - p) / 30) * 2 + (Math.random() - 0.48) * price * 0.015
    e += ((ema200 - e) / 30) * 2 + (Math.random() - 0.5) * ema200 * 0.002
    prices.push(Math.round(p * 100) / 100)
    emaArr.push(Math.round(e * 100) / 100)
  }
  return { priceHistory: prices, ema200History: emaArr }
}

// ─── Main Page ──────────────────────────────────────────────────

export default function SignalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = decodeURIComponent(params.symbol as string)
  const { user } = useAuth()

  const [signal, setSignal] = useState<ApiSignal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [chartData, setChartData] = useState<{
    priceHistory: number[]
    ema200History: (number | null)[]
    dates?: string[]
    ath?: number | null
  } | null>(null)
  const [chartLoading, setChartLoading] = useState(false)

  const [capital, setCapital] = useState("")
  const [shares, setShares] = useState("")
  const [lastEdited, setLastEdited] = useState<"capital" | "shares">("capital")
  const [loggingTrade, setLoggingTrade] = useState(false)

  // Fetch signal data
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchSignalBySymbol(symbol)
      .then((data) => {
        if ("error" in data) {
          setError("Signal not found")
          return
        }
        setSignal(data)
        // Set default capital based on market — use user settings if available
        const settings = user?.settings
        if (data.exchange === "NSE") {
          setCapital(String(settings?.defaultCapitalINR ?? 100000))
        } else {
          setCapital(String(settings?.defaultCapitalUSD ?? 1000))
        }
        setLastEdited("capital")
      })
      .catch((err) => setError(err.message || "Failed to load signal"))
      .finally(() => setLoading(false))
  }, [symbol, user?.settings])

  // Fetch chart data once signal is loaded
  useEffect(() => {
    if (!signal) return
    setChartLoading(true)
    fetchSignalChart(signal.id)
      .then((data) => {
        if (data.priceHistory.length > 0) {
          setChartData(data)
        } else {
          setChartData(generateSyntheticChart(signal.price, signal.ema200))
        }
      })
      .catch(() => {
        setChartData(generateSyntheticChart(signal.price, signal.ema200))
      })
      .finally(() => setChartLoading(false))
  }, [signal])

  // Sync capital ↔ shares when signal loads or when one input changes
  useEffect(() => {
    if (!signal || signal.price <= 0) return
    if (lastEdited === "capital") {
      const cap = parseFloat(capital) || 0
      setShares(String(Math.floor(cap / signal.price)))
    }
  }, [capital, signal, lastEdited])

  useEffect(() => {
    if (!signal || signal.price <= 0) return
    if (lastEdited === "shares") {
      const qty = parseInt(shares) || 0
      setCapital(String(Math.round(qty * signal.price)))
    }
  }, [shares, signal, lastEdited])

  const tradeCalc = useMemo(() => {
    if (!signal) return null
    const qty = parseInt(shares) || 0
    if (qty <= 0) return null
    const riskPerShare = signal.price - signal.ema200
    const isValid = riskPerShare > 0
    const totalRisk = riskPerShare * qty
    const positionValue = qty * signal.price
    const cap = parseFloat(capital) || positionValue
    const riskPctOfCapital = cap > 0 ? (totalRisk / cap) * 100 : 0
    return {
      qty,
      riskPerShare: isValid ? riskPerShare : 0,
      totalRisk: isValid ? totalRisk : 0,
      positionValue,
      riskPctOfCapital: isValid ? riskPctOfCapital : 0,
      isValid,
    }
  }, [signal, shares, capital])

  async function logTrade() {
    if (!signal || !tradeCalc || tradeCalc.qty <= 0) return
    setLoggingTrade(true)
    const currency = signal.exchange === "NSE" ? "\u20B9" : "$"
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: signal.symbol,
          exchange: signal.exchange,
          side: "LONG",
          entryDate: new Date().toISOString(),
          entryPrice: signal.price,
          quantity: tradeCalc.qty,
          stopLoss: signal.ema200,
          notes: `${signal.strategyName} signal — entry at ${currency}${signal.price.toLocaleString()}, exit trigger: EMA200 at ${currency}${signal.ema200.toLocaleString()}`,
          linkedSignalId: signal.id,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      const name = signal.symbol.replace(".NS", "")
      if (data.merged) {
        toast(`${name}: added ${tradeCalc.qty} shares — now ${data.newQty} shares @ avg ${currency}${data.avgPrice.toLocaleString()}`)
      } else {
        toast(`Trade logged for ${name}`)
      }
    } catch {
      toast.error("Failed to log trade")
    } finally {
      setLoggingTrade(false)
    }
  }

  const chartDataFormatted = useMemo(() => {
    if (!chartData) return []
    return chartData.priceHistory.map((price, i) => ({
      date: chartData.dates?.[i]
        ? new Date(chartData.dates[i]).toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          })
        : String(i + 1),
      price,
      ema200: chartData.ema200History[i] ?? undefined,
    }))
  }, [chartData])

  // ─── Loading state ────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Loader2Icon className="size-6 text-primary animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading signal...
        </span>
      </div>
    )
  }

  if (error || !signal) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex size-16 items-center justify-center rounded-full border border-bear/20 bg-bear/5">
          <AlertCircleIcon className="size-7 text-bear/60" />
        </div>
        <h3 className="text-base font-semibold">Signal Not Found</h3>
        <p className="text-sm text-muted-foreground max-w-xs text-center">
          {error || `No active signal found for ${symbol}`}
        </p>
        <Link
          href="/scanner"
          className="text-sm text-primary hover:underline flex items-center gap-1.5"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to Scanner
        </Link>
      </div>
    )
  }

  const isAboveEma = signal.price > signal.ema200
  const currency = signal.exchange === "NSE" ? "\u20B9" : "$"
  const breakDateStr = signal.details?.breakDate as string | undefined
  const athDateStr = signal.details?.preSetATHDate as string | undefined

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 border-b border-border/30 shrink-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="size-3.5" />
          Scanner
        </button>

        <Separator orientation="vertical" className="h-5 hidden sm:block" />

        <div className="flex items-center gap-3">
          <h1 className="font-mono text-lg font-bold tracking-tight">
            {signal.symbol.replace(".NS", "")}
          </h1>
          <span className="text-sm text-muted-foreground/70 truncate max-w-[160px] sm:max-w-[240px] hidden sm:inline">
            {signal.name}
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <HeatBadge heat={signal.heat} />
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1">
            <ZapIcon className="size-3 text-primary" />
            <span className="text-[10px] font-bold tracking-wide text-primary">
              {signal.strategyName}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Grid — Above the fold ── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_400px] grid-rows-[1fr_auto] gap-0 overflow-auto">
        {/* ── Top Left: Price Chart ── */}
        <div className="border-b border-border/20 lg:border-r lg:border-b-0 p-4 sm:p-5 flex flex-col min-h-[260px] sm:min-h-[320px]">
          <div className="flex items-center gap-2 mb-3 shrink-0">
            <ActivityIcon className="size-3.5 text-primary/70" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
              Price vs EMA 200 — Since Pre-set ATH
            </span>
            {athDateStr && (
              <span className="ml-auto text-[10px] font-mono text-muted-foreground/40 tabular-nums">
                {new Date(athDateStr).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                — Present
              </span>
            )}
          </div>

          {chartLoading ? (
            <div className="flex items-center justify-center flex-1">
              <Loader2Icon className="size-5 text-primary animate-spin" />
            </div>
          ) : chartDataFormatted.length > 0 ? (
            <ChartContainer config={chartConfig} className="flex-1 w-full min-h-[260px]">
              <ComposedChart
                data={chartDataFormatted}
                margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
              >
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
                  interval="equidistantPreserveStart"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.55 0.015 260)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                  width={60}
                  tickFormatter={(v: number) => v.toLocaleString()}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine
                  y={chartData?.ath ?? signal.ath}
                  stroke="oklch(0.68 0.22 25 / 0.4)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Pre-set ATH",
                    position: "right",
                    fontSize: 9,
                    fill: "oklch(0.68 0.22 25 / 0.6)",
                  }}
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
            <div className="flex items-center justify-center flex-1 text-xs text-muted-foreground">
              No chart data available
            </div>
          )}
        </div>

        {/* ── Top Right: Metrics + Strategy ── */}
        <div className="border-b border-border/20 p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
          {/* Metrics Grid */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <TrendingUpIcon className="size-3.5 text-primary/70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                Key Metrics
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <MetricCard
                label="Current Price"
                value={`${currency}${signal.price.toLocaleString()}`}
                icon={TrendingUpIcon}
                accent={isAboveEma ? "text-bull" : "text-bear"}
              />
              <MetricCard
                label="Pre-set ATH"
                value={`${currency}${signal.ath.toLocaleString()}`}
                sub={`${signal.distancePct.toFixed(1)}% away`}
                icon={TargetIcon}
              />
              <MetricCard
                label="EMA 200"
                value={`${currency}${signal.ema200.toLocaleString()}`}
                sub={isAboveEma ? "Price above" : "Price below"}
                icon={ActivityIcon}
                accent={isAboveEma ? "text-bull" : "text-bear"}
              />
              <MetricCard
                label="Volume Surge"
                value={`${(signal.volumeSurge ?? 0).toFixed(2)}x`}
                sub="vs 20d avg"
                icon={BarChart3Icon}
                accent={
                  (signal.volumeSurge ?? 0) >= 1.5
                    ? "text-bull"
                    : "text-muted-foreground"
                }
              />
              <MetricCard
                label="Signal Date"
                value={new Date(signal.signalDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                sub={new Date(signal.signalDate).getFullYear().toString()}
                icon={CalendarIcon}
              />
              {breakDateStr && (
                <MetricCard
                  label="Break Date"
                  value={new Date(breakDateStr).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  sub={new Date(breakDateStr).getFullYear().toString()}
                  icon={ShieldAlertIcon}
                  accent="text-bear"
                />
              )}
            </div>
          </div>

          {/* Strategy Explanation */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlertIcon className="size-3.5 text-primary/70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                Why this triggered
              </span>
            </div>
            <div className="rounded-lg border border-border/20 bg-surface/30 p-3.5">
              <div className="space-y-2 text-[13px] text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-mono font-medium text-foreground">
                    {signal.symbol.replace(".NS", "")}
                  </span>{" "}
                  hit an all-time high of{" "}
                  <span className="font-mono text-foreground">
                    {currency}
                    {signal.ath.toLocaleString()}
                  </span>
                  , then pulled back below its 200-day EMA (
                  <span className="font-mono text-foreground">
                    {currency}
                    {signal.ema200.toLocaleString()}
                  </span>
                  ) — a classic &ldquo;reset.&rdquo;
                </p>
                <p>
                  The stock has since reclaimed the EMA 200 and is now trading
                  at{" "}
                  <span className="font-mono text-foreground">
                    {currency}
                    {signal.price.toLocaleString()}
                  </span>
                  , just{" "}
                  <span
                    className={cn(
                      "font-mono font-medium",
                      signal.distancePct <= 5
                        ? "text-bull"
                        : "text-foreground"
                    )}
                  >
                    {signal.distancePct.toFixed(1)}%
                  </span>{" "}
                  from its ATH.
                  {(signal.volumeSurge ?? 0) >= 1.5 && (
                    <span className="text-bull">
                      {" "}
                      Volume confirmation present at{" "}
                      {(signal.volumeSurge ?? 0).toFixed(1)}x average.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Left: Backtest Summary (prominent) ── */}
        <div className="lg:border-r border-border/20 p-4 sm:p-5">
          <BacktestCard signal={signal} />
        </div>

        {/* ── Bottom Right: Trade Ticket ── */}
        <div className="p-4 sm:p-5">
          <Card size="sm" className="bg-surface border-border/30 overflow-hidden">
            {/* Ticket Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-primary/5 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <BookOpenIcon className="size-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                  Trade Ticket
                </span>
              </div>
              <span className="text-[9px] font-mono text-primary/50 uppercase tracking-wider">
                Long
              </span>
            </div>

            <CardContent className="pt-4 pb-4">
              {/* Entry + Exit Rule */}
              <div className="flex items-stretch gap-0 mb-4">
                {/* Entry */}
                <div className="flex-1 rounded-l-md border border-border/20 bg-background/30 px-3 py-2.5">
                  <span className="block text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/40 mb-0.5">
                    Buy at
                  </span>
                  <span className="block font-mono text-base font-black tabular-nums text-foreground">
                    {currency}{signal.price.toLocaleString()}
                  </span>
                </div>
                {/* Arrow */}
                <div className="flex items-center justify-center w-8 border-y border-border/20 bg-background/15">
                  <span className="text-muted-foreground/30 text-sm">→</span>
                </div>
                {/* Exit rule */}
                <div className="flex-1 rounded-r-md border border-bear/15 bg-bear/5 px-3 py-2.5">
                  <span className="block text-[8px] font-semibold uppercase tracking-wider text-bear/50 mb-0.5">
                    Exit below EMA200
                  </span>
                  <span className="block font-mono text-base font-black tabular-nums text-bear">
                    {currency}{signal.ema200.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Risk per share callout */}
              {signal.price > signal.ema200 && (
                <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-md bg-muted/20 border border-border/10">
                  <ShieldAlertIcon className="size-3 text-muted-foreground/40 shrink-0" />
                  <span className="text-[10px] text-muted-foreground/60">
                    Risk per share:{" "}
                    <span className="font-mono font-bold text-foreground/80">
                      {currency}{(signal.price - signal.ema200).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-muted-foreground/40">
                      {" "}({((signal.price - signal.ema200) / signal.price * 100).toFixed(1)}% from entry)
                    </span>
                  </span>
                </div>
              )}

              {/* Linked inputs: Capital ↔ Shares */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1 block">
                    Capital ({currency})
                  </label>
                  <Input
                    type="number"
                    value={capital}
                    onChange={(e) => { setLastEdited("capital"); setCapital(e.target.value) }}
                    onFocus={() => setLastEdited("capital")}
                    className={cn(
                      "h-8 font-mono text-sm border-border/30",
                      lastEdited === "capital" ? "bg-background/80 border-primary/30" : "bg-background/30 text-muted-foreground"
                    )}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1 block">
                    Shares
                  </label>
                  <Input
                    type="number"
                    value={shares}
                    onChange={(e) => { setLastEdited("shares"); setShares(e.target.value) }}
                    onFocus={() => setLastEdited("shares")}
                    className={cn(
                      "h-8 font-mono text-sm border-border/30",
                      lastEdited === "shares" ? "bg-background/80 border-primary/30" : "bg-background/30 text-muted-foreground"
                    )}
                    min="1"
                  />
                </div>
              </div>
              <p className="text-[9px] text-muted-foreground/30 mt-1.5 text-center">
                Change one — the other updates automatically
              </p>

              {/* Position summary */}
              {tradeCalc && tradeCalc.qty > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-background/30 border border-border/10 px-2 py-2">
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground/40">Position</span>
                    <span className="block font-mono text-[12px] font-bold tabular-nums text-foreground/80">
                      {currency}{tradeCalc.positionValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-md bg-bear/5 border border-bear/10 px-2 py-2">
                    <span className="block text-[8px] uppercase tracking-wider text-bear/40">Total Risk</span>
                    <span className="block font-mono text-[12px] font-bold tabular-nums text-bear">
                      {currency}{tradeCalc.totalRisk.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-md bg-background/30 border border-border/10 px-2 py-2">
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground/40">Risk %</span>
                    <span className={cn(
                      "block font-mono text-[12px] font-bold tabular-nums",
                      tradeCalc.riskPctOfCapital > 5 ? "text-bear" : tradeCalc.riskPctOfCapital > 2 ? "text-heat-simmering" : "text-foreground/80"
                    )}>
                      {tradeCalc.riskPctOfCapital.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              {/* Log Trade CTA */}
              <Button
                className="w-full mt-4 h-10 gap-2 font-semibold text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_12px_oklch(0.72_0.19_220/0.2)] transition-all hover:shadow-[0_0_20px_oklch(0.72_0.19_220/0.3)]"
                onClick={logTrade}
                disabled={loggingTrade || !tradeCalc || tradeCalc.qty <= 0}
              >
                <BookOpenIcon className="size-4" />
                {loggingTrade ? "Logging Trade..." : `Log ${tradeCalc?.qty ?? 0} Shares to Journal`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
