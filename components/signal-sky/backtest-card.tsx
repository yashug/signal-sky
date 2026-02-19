"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import type { ApiSignal } from "@/lib/api"
import { fetchBacktestDetail, type ApiBacktestDetail } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
  BarChart3Icon,
  ArrowUpIcon,
  ArrowDownIcon,
  Loader2Icon,
  ArrowRightIcon,
  ZapIcon,
} from "lucide-react"

function Metric({ label, value, sub, positive }: {
  label: string
  value: string
  sub?: string
  positive?: boolean | null
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={cn(
        "font-mono text-sm font-semibold",
        positive === true ? "text-bull" : positive === false ? "text-bear" : "text-foreground"
      )}>
        {value}
      </span>
      {sub && <span className="font-mono text-[10px] text-muted-foreground">{sub}</span>}
    </div>
  )
}

export function BacktestCard({ signal }: { signal: ApiSignal }) {
  const [backtest, setBacktest] = useState<ApiBacktestDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const triggerBacktest = useCallback(async () => {
    setGenerating(true)
    setGenError(null)
    try {
      const res = await fetch("/api/backtest/run-single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: signal.symbol }),
      })
      const data = await res.json()
      if (!res.ok) {
        setGenError(data.error ?? "Failed to generate backtest")
        return
      }
      if (data && data.summary) {
        setBacktest(data)
      } else {
        setGenError("No trades generated for this stock")
      }
    } catch {
      setGenError("Failed to generate backtest")
    } finally {
      setGenerating(false)
    }
  }, [signal.symbol])

  useEffect(() => {
    setLoading(true)
    setBacktest(null)
    setGenError(null)
    fetchBacktestDetail(signal.symbol)
      .then((data) => {
        if (data && !("error" in data) && data.summary) {
          setBacktest(data)
        } else {
          // No existing backtest — auto-trigger generation
          setBacktest(null)
          setLoading(false)
          triggerBacktest()
          return
        }
      })
      .catch(() => {
        setBacktest(null)
        setLoading(false)
        triggerBacktest()
        return
      })
      .finally(() => setLoading(false))
  }, [signal.symbol, triggerBacktest])

  if (loading || generating) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3Icon className="size-3.5 text-primary" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Backtest Summary
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <Loader2Icon className="size-4 text-primary animate-spin" />
          <span className="text-xs text-muted-foreground">
            {generating ? "Generating backtest results..." : "Loading backtest..."}
          </span>
          {generating && (
            <span className="text-[10px] text-muted-foreground/60">
              Running strategy on historical data
            </span>
          )}
        </div>
      </div>
    )
  }

  if (!backtest || !backtest.summary) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3Icon className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Backtest Summary
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <span className="text-xs text-muted-foreground">
            {genError ?? "Backtest data not available for this stock."}
          </span>
          {genError && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 text-[10px]"
              onClick={triggerBacktest}
            >
              <ZapIcon className="size-3" />
              Retry
            </Button>
          )}
        </div>
      </div>
    )
  }

  const summary = backtest.summary
  const trades = backtest.trades ?? []

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BarChart3Icon className="size-3.5 text-primary" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Backtest Summary
        </span>
        <span className="text-[9px] text-muted-foreground/60 ml-auto">
          {backtest.fromDate ? new Date(backtest.fromDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
          {" — "}
          {backtest.toDate ? new Date(backtest.toDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
        </span>
      </div>

      <Card size="sm" className="bg-surface border-border/40">
        <CardContent className="pt-4">
          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            <Metric
              label="Win Rate"
              value={`${summary.winRate}%`}
              sub={`${summary.winners}W / ${summary.losers}L`}
              positive={summary.winRate >= 50}
            />
            <Metric
              label="Avg Return"
              value={`${summary.avgReturn > 0 ? "+" : ""}${summary.avgReturn}%`}
              positive={summary.avgReturn > 0}
            />
            <Metric
              label="Profit Factor"
              value={summary.profitFactor.toFixed(2)}
              positive={summary.profitFactor > 1}
            />
            <Metric
              label="Total Trades"
              value={String(summary.totalTrades)}
            />
            <Metric
              label="Max Drawdown"
              value={`-${summary.maxDrawdown}%`}
              positive={false}
            />
            <Metric
              label="Sharpe Ratio"
              value={summary.sharpeRatio.toFixed(2)}
              positive={summary.sharpeRatio > 1}
            />
          </div>

          <Separator className="my-3" />

          {/* Recent trades */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Recent Trades
            </span>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/20 hover:bg-transparent">
                  <TableHead className="h-7 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2">Entry</TableHead>
                  <TableHead className="h-7 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2">Exit</TableHead>
                  <TableHead className="h-7 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2 text-right">P&L</TableHead>
                  <TableHead className="h-7 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2 text-right">Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...trades].reverse().slice(0, 8).map((trade, i) => (
                  <TableRow key={i} className="border-b border-border/10 hover:bg-surface-raised/30">
                    <TableCell className="px-2 py-1.5">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px]">
                          {new Date(trade.entryDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {signal.exchange === "NSE" ? "\u20B9" : "$"}{trade.entryPrice.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px]">
                          {trade.exitDate ? new Date(trade.exitDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Open"}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {trade.exitPrice ? `${signal.exchange === "NSE" ? "\u20B9" : "$"}${trade.exitPrice.toLocaleString()}` : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 py-1.5 text-right">
                      {trade.pnlPercent != null ? (
                        <div className="flex items-center justify-end gap-0.5">
                          {trade.pnlPercent > 0 ? (
                            <ArrowUpIcon className="size-2.5 text-bull" />
                          ) : (
                            <ArrowDownIcon className="size-2.5 text-bear" />
                          )}
                          <span className={cn(
                            "font-mono text-[10px] font-semibold",
                            trade.pnlPercent > 0 ? "text-bull" : "text-bear"
                          )}>
                            {trade.pnlPercent > 0 ? "+" : ""}{trade.pnlPercent}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-2 py-1.5 text-right">
                      <span className="font-mono text-[9px] text-muted-foreground">
                        {trade.daysHeld}d
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-3" />

          {/* Full Backtest Button */}
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            className="w-full gap-2 border-border/30 bg-surface/50 text-xs font-medium hover:bg-surface-raised/50 hover:border-primary/30 transition-all"
            render={<Link href={`/backtests/${encodeURIComponent(signal.symbol)}`} />}
          >
            <ArrowRightIcon className="size-3 text-primary" />
            Full Backtest Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
