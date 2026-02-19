"use client"

import { useMemo } from "react"
import type { ApiBacktestDetail, ApiBacktestTrade } from "@/lib/api"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  ReferenceLine,
  PieChart,
  Pie,
} from "recharts"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  CalendarIcon,
  ActivityIcon,
  ZapIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ShieldIcon,
  ClockIcon,
  BarChart3Icon,
  TrophyIcon,
  SkullIcon,
  ScaleIcon,
  XIcon,
} from "lucide-react"

// ─── Chart configs ───────────────────────────────────────────────

const equityConfig: ChartConfig = {
  cumPnl: { label: "Cumulative P&L", color: "var(--primary)" },
}

const tradeBarConfig: ChartConfig = {
  pnl: { label: "P&L %", color: "var(--primary)" },
}

const pieConfig: ChartConfig = {
  wins: { label: "Winners", color: "var(--bull)" },
  losses: { label: "Losers", color: "var(--bear)" },
}

// ─── Helpers ─────────────────────────────────────────────────────

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function fmtDateFull(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function fmtPct(v: number | null) {
  if (v == null) return "—"
  return `${v > 0 ? "+" : ""}${v.toFixed(2)}%`
}

// ─── Stat Card ──────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  accent?: string
}) {
  return (
    <div className="group relative flex flex-col gap-1 rounded-lg border border-border/20 bg-surface/60 px-3.5 py-2.5 transition-colors hover:border-border/40 hover:bg-surface/80">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3 text-muted-foreground/50" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
          {label}
        </span>
      </div>
      <span
        className={cn(
          "font-mono text-lg font-bold leading-none tabular-nums tracking-tight",
          accent ?? "text-foreground"
        )}
      >
        {value}
      </span>
      {sub && (
        <span className="font-mono text-[10px] text-muted-foreground/50 tabular-nums">
          {sub}
        </span>
      )}
    </div>
  )
}

// ─── Section Header ─────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  right,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="size-3.5 text-primary/70" />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
        {title}
      </span>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  )
}

// ─── Trade Row ───────────────────────────────────────────────────

function TradeRow({
  trade,
  index,
  exchange,
}: {
  trade: ApiBacktestTrade
  index: number
  exchange: string
}) {
  const isWin = (trade.pnlPercent ?? 0) > 0
  const isOpen = trade.exitDate == null
  const curr = exchange === "NSE" ? "\u20B9" : "$"

  return (
    <div
      className={cn(
        "grid grid-cols-[2.5rem_1fr_1fr_6rem_5rem_6rem] items-center gap-3 px-4 py-2 text-xs border-b border-border/10 transition-colors hover:bg-surface-raised/30",
        isOpen && "bg-primary/[0.03]"
      )}
    >
      <span className="font-mono text-[11px] text-muted-foreground/40 tabular-nums text-center">
        {index + 1}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs text-foreground tabular-nums">
          {fmtDate(trade.entryDate)}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/50">
          {curr}
          {trade.entryPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {isOpen ? (
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[11px] font-semibold text-primary">
              Open Position
            </span>
          </span>
        ) : (
          <>
            <span className="font-mono text-xs text-foreground tabular-nums">
              {fmtDate(trade.exitDate!)}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50">
              {curr}
              {trade.exitPrice!.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center justify-end gap-1">
        {trade.pnlPercent != null ? (
          <>
            {isWin ? (
              <ArrowUpIcon className="size-3 text-bull" />
            ) : (
              <ArrowDownIcon className="size-3 text-bear" />
            )}
            <span
              className={cn(
                "font-mono text-xs font-bold tabular-nums",
                isWin ? "text-bull" : "text-bear"
              )}
            >
              {fmtPct(trade.pnlPercent)}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
      <span className="font-mono text-[11px] text-muted-foreground/50 tabular-nums text-right">
        {trade.daysHeld}d
      </span>
      <span className="font-mono text-[11px] text-muted-foreground/40 tabular-nums text-right">
        {curr}
        {trade.preSetATHAtEntry.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}
      </span>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────

export function BacktestFullView({
  detail,
  open,
  onOpenChange,
}: {
  detail: ApiBacktestDetail | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { equityData, tradeBarData, winLossData, tradeTimeline } =
    useMemo(() => {
      if (!detail?.trades?.length)
        return {
          equityData: [],
          tradeBarData: [],
          winLossData: [],
          tradeTimeline: [],
        }

      const closedTrades = detail.trades.filter((t) => t.exitDate != null)

      // Equity curve: cumulative P&L
      let cumPnl = 0
      const equityData = [
        { label: "Start", cumPnl: 0, trade: 0 },
        ...closedTrades.map((t, i) => {
          cumPnl += t.pnlPercent ?? 0
          return {
            label: fmtDate(t.exitDate!),
            cumPnl: Math.round(cumPnl * 100) / 100,
            trade: i + 1,
          }
        }),
      ]

      // Trade P&L bars
      const tradeBarData = closedTrades.map((t, i) => ({
        label: `#${i + 1}`,
        date: fmtDate(t.entryDate),
        pnl: t.pnlPercent ?? 0,
        fill: (t.pnlPercent ?? 0) >= 0 ? "var(--bull)" : "var(--bear)",
      }))

      // Win/loss pie
      const wins = closedTrades.filter(
        (t) => (t.pnlPercent ?? 0) > 0
      ).length
      const losses = closedTrades.length - wins
      const winLossData = [
        { name: "Winners", value: wins, fill: "var(--bull)" },
        { name: "Losers", value: losses, fill: "var(--bear)" },
      ]

      // Trade timeline
      const tradeTimeline = closedTrades.map((t, i) => ({
        index: i + 1,
        entry: t.entryDate,
        exit: t.exitDate!,
        days: t.daysHeld,
        pnl: t.pnlPercent ?? 0,
      }))

      return { equityData, tradeBarData, winLossData, tradeTimeline }
    }, [detail])

  if (!detail) return null

  const s = detail.summary
  const trades = detail.trades ?? []
  const tradesReversed = [...trades].reverse()
  const closedTrades = trades.filter((t) => t.exitDate != null)
  const openTrade = trades.find((t) => t.exitDate == null)

  const maxEquity = equityData.reduce(
    (max, d) => Math.max(max, d.cumPnl),
    0
  )
  const minEquity = equityData.reduce(
    (min, d) => Math.min(min, d.cumPnl),
    0
  )

  const cumReturn =
    equityData.length > 0 ? equityData[equityData.length - 1]?.cumPnl ?? 0 : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-3 max-w-none w-auto h-auto translate-x-0 translate-y-0 rounded-xl border border-border/30 bg-background p-0 sm:max-w-none flex flex-col overflow-hidden gap-0"
      >
        {/* ── Header ── */}
        <DialogHeader className="shrink-0 border-b border-border/20 bg-background px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <ActivityIcon className="size-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="font-mono text-lg font-bold tracking-tight">
                {detail.symbol.replace(".NS", "")}
                <span className="ml-2 text-sm font-normal text-muted-foreground/60">
                  {detail.name}
                </span>
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-[11px] text-muted-foreground/50 mt-0.5">
                <CalendarIcon className="size-3" />
                {fmtDateFull(detail.fromDate)} — {fmtDateFull(detail.toDate)}
                <span className="text-muted-foreground/30">|</span>
                {closedTrades.length} closed trade{closedTrades.length !== 1 ? "s" : ""}
                {openTrade && (
                  <>
                    <span className="text-muted-foreground/30">|</span>
                    <span className="text-primary font-medium">1 open</span>
                  </>
                )}
              </DialogDescription>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
                <ZapIcon className="size-3 text-primary" />
                <span className="text-[10px] font-bold tracking-wide text-primary">
                  Reset & Reclaim
                </span>
              </div>
              <DialogClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground"
                  />
                }
              >
                <XIcon className="size-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto min-h-0">

            {/* ── Content ── */}
            <div className="flex-1 px-6 py-5 space-y-6">
              {/* ── Key Stats Grid ── */}
              <div className="grid grid-cols-3 lg:grid-cols-9 gap-2">
                <StatCard
                  icon={TargetIcon}
                  label="Win Rate"
                  value={`${s.winRate.toFixed(1)}%`}
                  sub={`${s.winners}W / ${s.losers}L`}
                  accent={
                    s.winRate >= 55
                      ? "text-bull"
                      : s.winRate >= 45
                        ? "text-heat-simmering"
                        : "text-bear"
                  }
                />
                <StatCard
                  icon={TrendingUpIcon}
                  label="Avg Return"
                  value={fmtPct(s.avgReturn)}
                  sub="per trade"
                  accent={s.avgReturn > 0 ? "text-bull" : "text-bear"}
                />
                <StatCard
                  icon={ScaleIcon}
                  label="Profit Factor"
                  value={s.profitFactor.toFixed(2)}
                  sub={
                    s.profitFactor >= 1.5
                      ? "Strong"
                      : s.profitFactor >= 1
                        ? "Positive"
                        : "Weak"
                  }
                  accent={
                    s.profitFactor >= 1.5
                      ? "text-bull"
                      : s.profitFactor >= 1
                        ? "text-heat-simmering"
                        : "text-bear"
                  }
                />
                <StatCard
                  icon={BarChart3Icon}
                  label="Sharpe"
                  value={s.sharpeRatio.toFixed(2)}
                  accent={
                    s.sharpeRatio > 1 ? "text-bull" : "text-muted-foreground"
                  }
                />
                <StatCard
                  icon={ArrowUpIcon}
                  label="Avg Win"
                  value={`+${s.avgWin.toFixed(1)}%`}
                  accent="text-bull"
                />
                <StatCard
                  icon={ArrowDownIcon}
                  label="Avg Loss"
                  value={`-${s.avgLoss.toFixed(1)}%`}
                  accent="text-bear"
                />
                <StatCard
                  icon={ShieldIcon}
                  label="Max Drawdown"
                  value={`-${s.maxDrawdown.toFixed(1)}%`}
                  accent="text-bear"
                />
                <StatCard
                  icon={TrophyIcon}
                  label="Best Trade"
                  value={fmtPct(s.bestTrade)}
                  accent="text-bull"
                />
                <StatCard
                  icon={SkullIcon}
                  label="Worst Trade"
                  value={fmtPct(s.worstTrade)}
                  accent="text-bear"
                />
              </div>

              {/* ── Equity Curve — Full Width Hero Chart ── */}
              {equityData.length > 1 && (
                <div className="rounded-lg border border-border/20 bg-surface/30 p-4">
                  <SectionHeader
                    icon={TrendingUpIcon}
                    title="Equity Curve"
                    right={
                      <span
                        className={cn(
                          "font-mono text-sm font-bold tabular-nums",
                          cumReturn >= 0 ? "text-bull" : "text-bear"
                        )}
                      >
                        Cumulative: {fmtPct(cumReturn)}
                      </span>
                    }
                  />
                  <ChartContainer
                    config={equityConfig}
                    className="aspect-[5/1] w-full"
                  >
                    <AreaChart
                      data={equityData}
                      margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="equityGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--primary)"
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--primary)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        strokeOpacity={0.2}
                      />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        stroke="var(--muted-foreground)"
                        strokeOpacity={0.3}
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${v}%`}
                        stroke="var(--muted-foreground)"
                        strokeOpacity={0.3}
                        domain={[
                          Math.floor(minEquity - 5),
                          Math.ceil(maxEquity + 5),
                        ]}
                      />
                      <ReferenceLine
                        y={0}
                        stroke="var(--muted-foreground)"
                        strokeOpacity={0.25}
                        strokeDasharray="6 4"
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(_, payload) => {
                              const p = payload?.[0]?.payload
                              return p ? `Trade ${p.trade}: ${p.label}` : ""
                            }}
                            formatter={(value) => [
                              `${Number(value).toFixed(2)}%`,
                              "Cum P&L",
                            ]}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="cumPnl"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#equityGrad)"
                        dot={false}
                        activeDot={{
                          r: 4,
                          fill: "var(--primary)",
                          stroke: "var(--background)",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              )}

              {/* ── Charts Row: Trade P&L + Win/Loss + Duration ── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
                {/* Trade P&L Bars */}
                {tradeBarData.length > 0 && (
                  <div className="rounded-lg border border-border/20 bg-surface/30 p-4">
                    <SectionHeader
                      icon={BarChart3Icon}
                      title="Individual Trade Returns"
                    />
                    <ChartContainer
                      config={tradeBarConfig}
                      className="aspect-[3/1] w-full"
                    >
                      <BarChart
                        data={tradeBarData}
                        margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--border)"
                          strokeOpacity={0.2}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 9 }}
                          tickLine={false}
                          axisLine={false}
                          stroke="var(--muted-foreground)"
                          strokeOpacity={0.3}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => `${v}%`}
                          stroke="var(--muted-foreground)"
                          strokeOpacity={0.3}
                        />
                        <ReferenceLine
                          y={0}
                          stroke="var(--muted-foreground)"
                          strokeOpacity={0.3}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              labelFormatter={(_, payload) => {
                                const p = payload?.[0]?.payload
                                return p?.date ?? ""
                              }}
                              formatter={(value) => [
                                `${Number(value) > 0 ? "+" : ""}${Number(value).toFixed(2)}%`,
                                "P&L",
                              ]}
                            />
                          }
                        />
                        <Bar
                          dataKey="pnl"
                          radius={[3, 3, 0, 0]}
                          maxBarSize={40}
                        >
                          {tradeBarData.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={entry.fill}
                              fillOpacity={0.85}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                )}

                {/* Win/Loss Donut + Duration */}
                <div className="flex flex-col gap-4">
                  {/* Win/Loss Pie */}
                  <div className="rounded-lg border border-border/20 bg-surface/30 p-4">
                    <SectionHeader icon={TargetIcon} title="Win / Loss" />
                    <ChartContainer
                      config={pieConfig}
                      className="aspect-square max-h-[160px] mx-auto"
                    >
                      <PieChart>
                        <Pie
                          data={winLossData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius="55%"
                          outerRadius="82%"
                          strokeWidth={2}
                          stroke="var(--background)"
                        >
                          {winLossData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                    <div className="flex justify-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5">
                        <div className="size-2 rounded-full bg-bull" />
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {s.winners} Winners
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-2 rounded-full bg-bear" />
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {s.losers} Losers
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Holding Period */}
                  <div className="rounded-lg border border-border/20 bg-surface/30 p-4 flex-1">
                    <SectionHeader icon={ClockIcon} title="Holding Period" />
                    <div className="space-y-1 max-h-[160px] overflow-y-auto">
                      {tradeTimeline.map((t) => {
                        const maxDays = Math.max(
                          ...tradeTimeline.map((x) => x.days),
                          1
                        )
                        const widthPct = Math.max(
                          (t.days / maxDays) * 100,
                          8
                        )
                        const isWin = t.pnl > 0

                        return (
                          <div
                            key={t.index}
                            className="flex items-center gap-2"
                          >
                            <span className="font-mono text-[9px] text-muted-foreground/40 w-4 text-right tabular-nums shrink-0">
                              {t.index}
                            </span>
                            <div className="relative flex-1 h-4">
                              <div
                                className={cn(
                                  "h-full rounded-sm",
                                  isWin
                                    ? "bg-bull/20 border border-bull/30"
                                    : "bg-bear/20 border border-bear/30"
                                )}
                                style={{ width: `${widthPct}%` }}
                              />
                              <span
                                className={cn(
                                  "absolute left-1.5 top-1/2 -translate-y-1/2 font-mono text-[8px] font-bold tabular-nums",
                                  isWin ? "text-bull" : "text-bear"
                                )}
                              >
                                {fmtPct(t.pnl)}
                              </span>
                            </div>
                            <span className="font-mono text-[8px] text-muted-foreground/40 w-6 text-right tabular-nums shrink-0">
                              {t.days}d
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[9px] text-muted-foreground/40">
                      <CalendarIcon className="size-2.5" />
                      Avg holding: {s.avgHoldingDays} days
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Full Trade History Table ── */}
              <div className="rounded-lg border border-border/20 bg-surface/30 overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <SectionHeader
                    icon={ActivityIcon}
                    title="Complete Trade History"
                    right={
                      <span className="text-[10px] text-muted-foreground/40 tabular-nums font-mono">
                        {trades.length} trade{trades.length !== 1 ? "s" : ""}
                      </span>
                    }
                  />
                </div>
                {/* Table header */}
                <div className="grid grid-cols-[2.5rem_1fr_1fr_6rem_5rem_6rem] gap-3 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground/40 border-b border-border/20 bg-surface/40">
                  <span className="text-center">#</span>
                  <span>Entry</span>
                  <span>Exit</span>
                  <span className="text-right">P&L</span>
                  <span className="text-right">Days</span>
                  <span className="text-right">Pre-set ATH</span>
                </div>
                {/* Table body — latest first */}
                <div>
                  {tradesReversed.map((trade, i) => (
                    <TradeRow
                      key={i}
                      trade={trade}
                      index={trades.length - 1 - i}
                      exchange={detail.exchange}
                    />
                  ))}
                </div>
              </div>

              {/* ── Footer ── */}
              <div className="border-t border-border/15 px-6 py-3 flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground/30 font-mono uppercase tracking-widest">
                  SignalSky Backtest Engine v2
                </span>
                <span className="text-[9px] text-muted-foreground/30 font-mono tabular-nums">
                  Computed {fmtDateFull(detail.computedAt)}
                </span>
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}
