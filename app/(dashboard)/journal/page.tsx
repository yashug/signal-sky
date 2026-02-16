"use client"

import { useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import {
  BookOpenIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CircleDotIcon,
  CheckCircle2Icon,
  XCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  ShieldAlertIcon,
  WalletIcon,
  Loader2Icon,
  AlertCircleIcon,
} from "lucide-react"

type TradeStatus = "open" | "closed" | "stopped_out"
type FilterTab = "all" | TradeStatus

type JournalTrade = {
  id: string
  symbol: string
  name: string
  exchange: string
  side: string
  entryDate: string
  entryPrice: number
  quantity: number
  stopLoss: number | null
  targetPrice: number | null
  exitDate: string | null
  exitPrice: number | null
  exitReason: string | null
  pnl: number | null
  pnlPercent: number | null
  notes: string | null
  linkedSignalId: string | null
  status: TradeStatus
  currentPrice: number
}

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

export default function JournalPage() {
  const [trades, setTrades] = useState<JournalTrade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const fetchTrades = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/journal")
      if (!res.ok) throw new Error("Failed to fetch trades")
      const data = await res.json()
      setTrades(data.trades ?? [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on mount
  useState(() => { fetchTrades() })

  const filteredTrades = useMemo(() => {
    if (activeTab === "all") return trades
    return trades.filter((t) => t.status === activeTab)
  }, [trades, activeTab])

  const stats = useMemo(() => {
    const openTrades = trades.filter((t) => t.status === "open")
    const closedTrades = trades.filter(
      (t) => t.status === "closed" || t.status === "stopped_out"
    )

    const totalClosedPnl = closedTrades.reduce(
      (sum, t) => sum + (t.pnl ?? 0),
      0
    )
    const winCount = closedTrades.filter((t) => (t.pnl ?? 0) > 0).length
    const winRate =
      closedTrades.length > 0
        ? ((winCount / closedTrades.length) * 100).toFixed(0)
        : "—"

    const openPnl = openTrades.reduce((sum, t) => {
      const unrealized = (t.currentPrice - t.entryPrice) * t.quantity
      return sum + unrealized
    }, 0)

    const capitalDeployed = openTrades.reduce(
      (sum, t) => sum + t.entryPrice * t.quantity,
      0
    )

    return {
      openCount: openTrades.length,
      closedCount: closedTrades.length,
      totalPnl: totalClosedPnl,
      openPnl,
      winRate,
      capitalDeployed,
    }
  }, [trades])

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: trades.length },
    {
      key: "open",
      label: "Open",
      count: trades.filter((t) => t.status === "open").length,
    },
    {
      key: "closed",
      label: "Closed",
      count: trades.filter((t) => t.status === "closed").length,
    },
    {
      key: "stopped_out",
      label: "Stopped",
      count: trades.filter((t) => t.status === "stopped_out").length,
    },
  ]

  async function deleteTrade(id: string) {
    try {
      const res = await fetch(`/api/journal/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      setTrades((prev) => prev.filter((t) => t.id !== id))
      toast("Trade deleted")
    } catch {
      toast.error("Failed to delete trade")
    }
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
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

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Open Trades"
          value={String(stats.openCount)}
          icon={CircleDotIcon}
          accent="text-primary"
        />
        <StatCard
          label="Unrealized P&L"
          value={`${stats.openPnl >= 0 ? "+" : ""}${stats.openPnl.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`}
          sub={`Capital: ${stats.capitalDeployed.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`}
          icon={TrendingUpIcon}
          accent={stats.openPnl >= 0 ? "text-bull" : "text-bear"}
        />
        <StatCard
          label="Realized P&L"
          value={`${stats.totalPnl >= 0 ? "+" : ""}${stats.totalPnl.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`}
          sub={`${stats.closedCount} closed trades`}
          icon={WalletIcon}
          accent={stats.totalPnl >= 0 ? "text-bull" : "text-bear"}
        />
        <StatCard
          label="Win Rate"
          value={`${stats.winRate}%`}
          sub={`of closed trades`}
          icon={TargetIcon}
          accent="text-foreground"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
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
      </div>

      {/* Loading / Error / Trades Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2Icon className="size-6 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Loading trades...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <AlertCircleIcon className="size-6 text-bear" />
          <span className="text-sm text-muted-foreground">Failed to load trades</span>
          <span className="text-xs text-muted-foreground/60">{error}</span>
        </div>
      ) : filteredTrades.length === 0 ? (
        <Card className="border-border/40 bg-surface">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
              <BookOpenIcon className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No trades in this category
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1 max-w-xs">
              Open a signal from the Scanner and click &ldquo;Log Trade&rdquo;
              to start tracking.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/40 bg-surface">
          <CardContent className="p-0">
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
                    Side
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Entry
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Qty
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Stop / Target
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
                    Exit
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 text-right">
                    P&L
                  </TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 max-w-[180px]">
                    Notes
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrades.map((trade) => {
                  const currency = trade.exchange === "NSE" ? "₹" : "$"
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

                  return (
                    <TableRow
                      key={trade.id}
                      className="border-b border-border/15 hover:bg-surface-raised/50"
                    >
                      <TableCell className="px-4 py-2.5">
                        <StatusBadge status={trade.status} />
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
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider",
                            trade.side === "long"
                              ? "text-bull"
                              : "text-bear"
                          )}
                        >
                          {trade.side === "long" ? (
                            <ArrowUpIcon className="size-2.5" />
                          ) : (
                            <ArrowDownIcon className="size-2.5" />
                          )}
                          {trade.side}
                        </span>
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
                              { month: "short", day: "numeric" }
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
                        <div className="flex flex-col gap-0.5">
                          {trade.stopLoss && (
                            <div className="flex items-center gap-1">
                              <ShieldAlertIcon className="size-2.5 text-bear" />
                              <span className="font-mono text-[11px] text-bear">
                                {currency}
                                {trade.stopLoss.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {trade.targetPrice && (
                            <div className="flex items-center gap-1">
                              <TargetIcon className="size-2.5 text-bull" />
                              <span className="font-mono text-[11px] text-bull">
                                {currency}
                                {trade.targetPrice.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
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
                                })}
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
                      <TableCell className="px-3 py-2.5 max-w-[180px]">
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-xs text-muted-foreground truncate block max-w-[160px]">
                              {trade.notes || "—"}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            {trade.notes || "No notes"}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
