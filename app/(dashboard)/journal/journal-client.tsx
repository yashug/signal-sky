"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useJournalTrades, useDeleteTrade, useExitTrade } from "@/hooks/use-journal"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import {
  BookOpenIcon,
  CircleDotIcon,
  CheckCircle2Icon,
  XCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ShieldAlertIcon,
  AlertTriangleIcon,
  LogOutIcon,
  XIcon,
  ShieldCheckIcon,
  LayoutGridIcon,
  TableIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "lucide-react"
import type { JournalTradeData } from "@/lib/data/journal"
import { PortfolioHeatmap } from "@/components/signal-sky/portfolio-heatmap"

type TradeStatus = "open" | "closed" | "stopped_out"
type FilterTab = "all" | TradeStatus

function StatusBadge({ status }: { status: TradeStatus }) {
  const config = {
    open: {
      label: "Open",
      icon: CircleDotIcon,
      className: "bg-primary/15 text-primary border-primary/30",
    },
    closed: {
      label: "Closed",
      icon: CheckCircle2Icon,
      className: "bg-bull/15 text-bull border-bull/30",
    },
    stopped_out: {
      label: "Stopped",
      icon: XCircleIcon,
      className: "bg-bear/15 text-bear border-bear/30",
    },
  }
  const c = config[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        c.className
      )}
    >
      <c.icon className="size-2.5" />
      {c.label}
    </span>
  )
}

function StatCard({
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
    <Card className="border-border/40 bg-surface">
      <CardContent className="flex items-start gap-3 py-3 px-4">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/50",
            accent
          )}
        >
          <Icon className="size-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <span className={cn("font-mono text-sm font-semibold", accent)}>
            {value}
          </span>
          {sub && (
            <span className="font-mono text-[10px] text-muted-foreground">
              {sub}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getCurrency(trade: JournalTradeData): string {
  return trade.exchange === "NSE" ? "₹" : "$"
}

const EMPTY_MESSAGES: Record<FilterTab, { title: string; description: string }> = {
  all: {
    title: "No trades yet",
    description: "Open a signal from the Scanner and click \"Log Trade\" to start tracking your positions.",
  },
  open: {
    title: "No open positions",
    description: "You don't have any active trades. Log a new trade from the Scanner to open a position.",
  },
  closed: {
    title: "No closed trades",
    description: "Trades you manually exit or that hit their target will appear here with realized P&L.",
  },
  stopped_out: {
    title: "No stopped trades",
    description: "Trades that were exited because the price broke below the EMA200 exit trigger will appear here.",
  },
}

export function JournalClient({ initialTrades }: { initialTrades: JournalTradeData[] }) {
  const { data: trades = initialTrades } = useJournalTrades(initialTrades)
  const deleteTrade = useDeleteTrade()
  const exitTrade = useExitTrade()
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState<FilterTab>("all")
  const [marketFilter, setMarketFilter] = useState<"all" | "NSE" | "US">("all")

  const [viewMode, setViewMode] = useState<"table" | "heatmap">("table")
  const [exitingTradeId, setExitingTradeId] = useState<string | null>(null)
  const [exitQty, setExitQty] = useState("")
  const [exitPrice, setExitPrice] = useState("")
  const [exitReason, setExitReason] = useState<"manual" | "stop" | "target">("manual")


  const alertTrades = useMemo(() => {
    return trades.filter(
      (t) => t.status === "open" && t.ema200 != null && t.currentPrice < t.ema200!
    )
  }, [trades])

  const marketTrades = useMemo(() => {
    if (marketFilter === "all") return trades
    return trades.filter((t) => t.exchange === marketFilter)
  }, [trades, marketFilter])

  const filteredTrades = useMemo(() => {
    const list = activeTab === "all" ? marketTrades : marketTrades.filter((t) => t.status === activeTab)
    const isBreach = (t: JournalTradeData) =>
      t.status === "open" && t.ema200 != null && t.currentPrice < t.ema200!
    if (activeTab === "all" || activeTab === "open") {
      const order: Record<string, number> = { open: 1, closed: 2, stopped_out: 3 }
      return [...list].sort((a, b) => {
        const aBreached = isBreach(a) ? 0 : (order[a.status] ?? 9)
        const bBreached = isBreach(b) ? 0 : (order[b.status] ?? 9)
        return aBreached - bBreached
      })
    }
    return list
  }, [marketTrades, activeTab])

  const marketStats = useMemo(() => {
    function computeMarket(market: "NSE" | "US") {
      const mt = trades.filter((t) => t.exchange === market)
      const openTrades = mt.filter((t) => t.status === "open")
      const closedTrades = mt.filter(
        (t) => t.status === "closed" || t.status === "stopped_out"
      )
      const totalClosedPnl = closedTrades.reduce((sum, t) => sum + (t.pnl ?? 0), 0)
      const winCount = closedTrades.filter((t) => (t.pnl ?? 0) > 0).length
      const winRate = closedTrades.length > 0 ? ((winCount / closedTrades.length) * 100).toFixed(0) : "—"
      const openPnl = openTrades.reduce((sum, t) => {
        return sum + (t.currentPrice - t.entryPrice) * t.quantity
      }, 0)
      const capitalDeployed = openTrades.reduce((sum, t) => sum + t.entryPrice * t.quantity, 0)
      return {
        total: mt.length,
        openCount: openTrades.length,
        closedCount: closedTrades.length,
        totalPnl: totalClosedPnl,
        openPnl,
        winRate,
        capitalDeployed,
        currency: market === "NSE" ? "₹" : "$",
        label: market === "NSE" ? "India" : "US",
        flag: market === "NSE" ? "IN" : "US",
      }
    }
    return { nse: computeMarket("NSE"), us: computeMarket("US") }
  }, [trades])

  const hasMultipleMarkets = marketStats.nse.total > 0 && marketStats.us.total > 0

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: marketTrades.length },
    {
      key: "open",
      label: "Open",
      count: marketTrades.filter((t) => t.status === "open").length,
    },
    {
      key: "closed",
      label: "Closed",
      count: marketTrades.filter((t) => t.status === "closed").length,
    },
    {
      key: "stopped_out",
      label: "Stopped",
      count: marketTrades.filter((t) => t.status === "stopped_out").length,
    },
  ]

  function startExit(trade: JournalTradeData) {
    setExitingTradeId(trade.id)
    setExitQty(String(trade.quantity))
    setExitPrice(String(trade.currentPrice))
    setExitReason("manual")
  }

  function cancelExit() {
    setExitingTradeId(null)
    setExitQty("")
    setExitPrice("")
    setExitReason("manual")
  }

  function confirmExit() {
    if (!exitingTradeId) return
    const qty = parseInt(exitQty) || 0
    const price = parseFloat(exitPrice) || 0
    if (qty <= 0 || price <= 0) {
      toast.error("Enter valid quantity and price")
      return
    }
    exitTrade.mutate(
      { id: exitingTradeId, exitPrice: price, exitDate: new Date().toISOString(), exitQuantity: qty, exitReason },
      { onSuccess: cancelExit }
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <BookOpenIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Trade Journal
          </h1>
          <p className="text-xs text-muted-foreground">
            {trades.length} trades logged — track entries, exits, and
            performance
          </p>
        </div>
      </div>

      {/* Market P&L Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[marketStats.nse, marketStats.us].filter((m) => m.total > 0).map((m) => {
          const fmtM = (amt: number) => {
            const sign = amt >= 0 ? "+" : ""
            return `${sign}${m.currency}${Math.abs(Math.round(amt)).toLocaleString()}`
          }
          return (
            <Card key={m.flag} className="border-border/40 bg-surface overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-2.5 px-4 py-2 border-b border-border/20 bg-surface-raised/20">
                  <span className="font-mono text-[10px] font-black tracking-widest text-muted-foreground/40 bg-muted/30 rounded px-1.5 py-0.5">
                    {m.flag}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
                    {m.label} Market
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground/40 tabular-nums">
                    {m.total} trade{m.total !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border/15">
                  <div className="px-3 py-2.5">
                    <span className="block text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/40">
                      Realized
                    </span>
                    <span className={cn("block font-mono text-sm font-bold tabular-nums", m.totalPnl >= 0 ? "text-bull" : "text-bear")}>
                      {fmtM(m.totalPnl)}
                    </span>
                    <span className="block font-mono text-[9px] text-muted-foreground/40 tabular-nums">
                      {m.closedCount} closed
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <span className="block text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/40">
                      Unrealized
                    </span>
                    <span className={cn("block font-mono text-sm font-bold tabular-nums", m.openPnl >= 0 ? "text-bull" : "text-bear")}>
                      {fmtM(m.openPnl)}
                    </span>
                    <span className="block font-mono text-[9px] text-muted-foreground/40 tabular-nums">
                      {m.openCount} open
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <span className="block text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/40">
                      Deployed
                    </span>
                    <span className="block font-mono text-sm font-bold tabular-nums text-foreground/80">
                      {m.currency}{Math.round(m.capitalDeployed).toLocaleString()}
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <span className="block text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/40">
                      Win Rate
                    </span>
                    <span className="block font-mono text-sm font-bold tabular-nums text-foreground/80">
                      {m.winRate === "—" ? "—" : `${m.winRate}%`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {marketStats.nse.total === 0 && marketStats.us.total === 0 && (
          <div className="col-span-full">
            <StatCard
              label="Open Trades"
              value="0"
              icon={CircleDotIcon}
              accent="text-primary"
            />
          </div>
        )}
      </div>

      {/* Upgrade nudge — show when trial active and overall P&L is positive */}
      {(() => {
        if (!user) return null
        const isPro = user.tier === "PRO" || user.tier === "INSTITUTIONAL"
        if (isPro || user.isAdmin) return null
        const trialEndsAt = user.trialEndsAt ? new Date(user.trialEndsAt) : null
        const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
        if (!isTrialActive) return null
        const daysRemaining = trialEndsAt
          ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / 86400000))
          : 0
        const totalPnl = marketStats.nse.totalPnl + marketStats.us.totalPnl + marketStats.nse.openPnl + marketStats.us.openPnl
        if (totalPnl <= 0 && daysRemaining > 3) return null
        return (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-bull/25 bg-bull/5 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <SparklesIcon className="size-4 text-bull shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-foreground">
                  {totalPnl > 0 ? "Your journal is tracking a positive P&L." : `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} left in your trial.`}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Subscribe to keep tracking your trades and performance.
                </span>
              </div>
            </div>
            <Link
              href="/pricing"
              className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap shrink-0"
            >
              Subscribe <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        )
      })()}

      {/* EMA200 Breach Alert Banner */}
      {alertTrades.length > 0 && (
        <div className="relative overflow-hidden rounded-lg border border-bear/30 bg-bear/[0.06]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-bear to-transparent opacity-80" />
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
              <div className="absolute size-7 animate-ping rounded-full bg-bear/20" style={{ animationDuration: "2s" }} />
              <div className="relative flex size-7 items-center justify-center rounded-full bg-bear/15 ring-1 ring-bear/30">
                <AlertTriangleIcon className="size-3.5 text-bear" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-bear">
                  Exit Signal
                </span>
                <span className="inline-flex items-center rounded bg-bear/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-bear tabular-nums ring-1 ring-bear/20">
                  {alertTrades.length} {alertTrades.length === 1 ? "trade" : "trades"}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-bear/70">
                Price has closed below EMA200 — strategy says exit.{" "}
                {alertTrades.map((t, i) => (
                  <span key={t.id}>
                    {i > 0 && ", "}
                    <span className="font-mono font-semibold text-bear/90">
                      {t.symbol.replace(".NS", "")}
                    </span>
                    <span className="text-bear/50">
                      {" "}({((t.currentPrice - t.ema200!) / t.ema200! * 100).toFixed(1)}%)
                    </span>
                  </span>
                ))}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 h-7 gap-1.5 border-bear/30 text-bear text-[10px] font-bold uppercase tracking-wider hover:bg-bear/10 hover:border-bear/50"
              onClick={() => {
                setActiveTab("open")
              }}
            >
              <LogOutIcon className="size-3" />
              Review
            </Button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
              activeTab === tab.key
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tab.label}
            <span
              className={cn(
                "font-mono text-[10px] tabular-nums",
                activeTab === tab.key
                  ? "text-primary/70"
                  : "text-muted-foreground/60"
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}

        {hasMultipleMarkets && (
          <>
            <div className="mx-2 h-4 w-px bg-border/30" />
            {(["all", "NSE", "US"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMarketFilter(m)}
                className={cn(
                  "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer",
                  marketFilter === m
                    ? "bg-muted/60 text-foreground"
                    : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/30"
                )}
              >
                {m === "all" ? "All Markets" : m === "NSE" ? "India" : "US"}
              </button>
            ))}
          </>
        )}

        {/* View toggle — only meaningful on the open tab */}
        {(activeTab === "open" || activeTab === "all") && (
          <>
            <div className="mx-2 h-4 w-px bg-border/30" />
            <div className="flex items-center gap-0.5 rounded-md border border-border/30 p-0.5">
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer",
                  viewMode === "table"
                    ? "bg-muted/60 text-foreground"
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                )}
              >
                <TableIcon className="size-3" />
                Table
              </button>
              <button
                onClick={() => setViewMode("heatmap")}
                className={cn(
                  "inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer",
                  viewMode === "heatmap"
                    ? "bg-muted/60 text-foreground"
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                )}
              >
                <LayoutGridIcon className="size-3" />
                Map
              </button>
            </div>
          </>
        )}
      </div>

      {/* Portfolio Heatmap */}
      {viewMode === "heatmap" && (activeTab === "open" || activeTab === "all") && (
        <Card className="border-border/40 bg-surface">
          <CardContent className="p-4">
            <PortfolioHeatmap trades={marketTrades} />
          </CardContent>
        </Card>
      )}

      {/* Trades Table — hidden when heatmap is active */}
      {viewMode === "heatmap" && (activeTab === "open" || activeTab === "all") ? null : filteredTrades.length === 0 ? (
        <Card className="border-border/40 bg-surface">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
              {activeTab === "closed" ? (
                <CheckCircle2Icon className="size-5 text-muted-foreground" />
              ) : activeTab === "stopped_out" ? (
                <XCircleIcon className="size-5 text-muted-foreground" />
              ) : (
                <BookOpenIcon className="size-5 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {EMPTY_MESSAGES[activeTab].title}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1 max-w-xs">
              {EMPTY_MESSAGES[activeTab].description}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/40 bg-surface overflow-x-scroll" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}>
          <CardContent className="p-0">
            <div className="min-w-[700px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/30 hover:bg-transparent">
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4">
                    Status
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Symbol
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Entry
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Qty
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Exit Trigger
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Current / Exit
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 text-right">
                    P&L
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrades.map((trade) => {
                  const currency = getCurrency(trade)
                  const isOpen = trade.status === "open"
                  const unrealizedPnl = isOpen
                    ? (trade.currentPrice - trade.entryPrice) * trade.quantity
                    : null
                  const unrealizedPct = isOpen
                    ? ((trade.currentPrice - trade.entryPrice) /
                        trade.entryPrice) *
                      100
                    : null
                  const displayPnl = isOpen ? unrealizedPnl : trade.pnl
                  const displayPct = isOpen
                    ? unrealizedPct
                    : trade.pnlPercent
                  const isProfitable = (displayPnl ?? 0) > 0
                  const isExiting = exitingTradeId === trade.id

                  const hasEma = isOpen && trade.ema200 != null
                  const emaBreach = hasEma && trade.currentPrice < trade.ema200!
                  const emaDistance = hasEma
                    ? ((trade.currentPrice - trade.ema200!) / trade.ema200!) * 100
                    : null

                  return (
                    <TableRow
                      key={trade.id}
                      className={cn(
                        "border-b border-border/15 hover:bg-surface-raised/50 relative",
                        isExiting && "bg-primary/5",
                        emaBreach && "bg-bear/[0.04] border-b-bear/20"
                      )}
                    >
                      {emaBreach && (
                        <td className="absolute inset-y-0 left-0 w-[3px] p-0">
                          <div className="h-full w-full bg-bear animate-pulse" style={{ animationDuration: "2.5s" }} />
                        </td>
                      )}
                      <TableCell className="px-4 py-2.5">
                        {emaBreach ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-bear/40 bg-bear/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bear animate-pulse" style={{ animationDuration: "3s" }}>
                            <AlertTriangleIcon className="size-2.5" />
                            Exit
                          </span>
                        ) : (
                          <StatusBadge status={trade.status as TradeStatus} />
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <div className="flex flex-col">
                          <span className="font-mono text-sm font-semibold">
                            {trade.symbol.replace(".NS", "")}
                          </span>
                          <span className="text-[11px] text-muted-foreground truncate max-w-[100px]">
                            {trade.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <div className="flex flex-col">
                          <span className="font-mono text-sm font-medium">
                            {currency}
                            {trade.entryPrice.toLocaleString()}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {new Date(trade.entryDate).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <span className="font-mono text-sm text-muted-foreground">
                          {trade.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        {hasEma ? (
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-[11px] text-muted-foreground">
                                EMA {currency}{trade.ema200!.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            {emaBreach ? (
                              <span className="inline-flex w-fit items-center gap-1 rounded bg-bear/15 px-1.5 py-0.5 ring-1 ring-bear/25">
                                <AlertTriangleIcon className="size-2.5 text-bear" />
                                <span className="font-mono text-[10px] font-bold text-bear">
                                  {emaDistance!.toFixed(1)}% below
                                </span>
                              </span>
                            ) : (
                              <span className="inline-flex w-fit items-center gap-1 rounded bg-bull/8 px-1.5 py-0.5">
                                <ShieldCheckIcon className="size-2.5 text-bull/60" />
                                <span className="font-mono text-[10px] text-bull/70">
                                  +{emaDistance!.toFixed(1)}% above
                                </span>
                              </span>
                            )}
                          </div>
                        ) : trade.stopLoss ? (
                          <div className="flex items-center gap-1">
                            <ShieldAlertIcon className="size-2.5 text-bear/60" />
                            <span className="font-mono text-[11px] text-bear/80">
                              {currency}{trade.stopLoss.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/30">—</span>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        {isOpen ? (
                          <div className="flex flex-col">
                            <span className="font-mono text-sm font-medium text-muted-foreground">
                              {currency}
                              {trade.currentPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">
                              current
                            </span>
                          </div>
                        ) : trade.exitPrice ? (
                          <div className="flex flex-col">
                            <span className="font-mono text-sm font-medium">
                              {currency}
                              {trade.exitPrice.toLocaleString()}
                            </span>
                            {trade.exitDate && (
                              <span className="font-mono text-[10px] text-muted-foreground">
                                {new Date(
                                  trade.exitDate
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                                {trade.exitReason && (
                                  <span className="ml-1 text-muted-foreground/50">
                                    ({trade.exitReason === "stop" ? "EMA200" : trade.exitReason})
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/40">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5 text-right">
                        {displayPnl !== null && displayPnl !== undefined ? (
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-0.5">
                              {isProfitable ? (
                                <TrendingUpIcon className="size-2.5 text-bull" />
                              ) : (
                                <TrendingDownIcon className="size-2.5 text-bear" />
                              )}
                              <span
                                className={cn(
                                  "font-mono text-sm font-semibold",
                                  isProfitable ? "text-bull" : "text-bear"
                                )}
                              >
                                {isProfitable ? "+" : ""}
                                {currency}
                                {Math.abs(displayPnl).toLocaleString(
                                  undefined,
                                  { maximumFractionDigits: 0 }
                                )}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "font-mono text-[10px]",
                                isProfitable
                                  ? "text-bull/70"
                                  : "text-bear/70"
                              )}
                            >
                              {isProfitable ? "+" : ""}
                              {displayPct?.toFixed(2)}%
                              {isOpen && " (unreal.)"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/40">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5 text-right">
                        {isOpen && !isExiting && (
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "h-6 px-2 gap-1 text-[10px] font-semibold",
                              emaBreach
                                ? "border-bear/50 bg-bear/10 text-bear hover:bg-bear/20 hover:border-bear"
                                : "border-border/30 hover:border-bear/30 hover:text-bear"
                            )}
                            onClick={(e) => { e.stopPropagation(); startExit(trade) }}
                          >
                            <LogOutIcon className="size-2.5" />
                            {emaBreach ? "Exit Now" : "Exit"}
                          </Button>
                        )}
                        {isExiting && (
                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <Input
                                  type="number"
                                  value={exitQty}
                                  onChange={(e) => setExitQty(e.target.value)}
                                  className="h-6 w-14 font-mono text-[10px] px-1.5"
                                  placeholder="Qty"
                                  min="1"
                                  max={trade.quantity}
                                />
                                <span className="text-[9px] text-muted-foreground/50">@</span>
                                <Input
                                  type="number"
                                  value={exitPrice}
                                  onChange={(e) => setExitPrice(e.target.value)}
                                  className="h-6 w-20 font-mono text-[10px] px-1.5"
                                  placeholder="Price"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                {(["manual", "stop", "target"] as const).map((r) => (
                                  <button
                                    key={r}
                                    onClick={() => setExitReason(r)}
                                    className={cn(
                                      "text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors",
                                      exitReason === r
                                        ? r === "stop" ? "bg-bear/15 text-bear" : r === "target" ? "bg-bull/15 text-bull" : "bg-primary/15 text-primary"
                                        : "text-muted-foreground/40 hover:text-muted-foreground"
                                    )}
                                  >
                                    {r === "stop" ? "EMA200" : r === "target" ? "Target" : "Manual"}
                                  </button>
                                ))}
                                <div className="flex gap-0.5 ml-auto">
                                  <Button
                                    size="sm"
                                    className="h-5 px-1.5 text-[9px] bg-primary"
                                    onClick={confirmExit}
                                    disabled={exitTrade.isPending}
                                  >
                                    {exitTrade.isPending ? "..." : "OK"}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 px-1 text-[9px]"
                                    onClick={cancelExit}
                                  >
                                    <XIcon className="size-2.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
