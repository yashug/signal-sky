"use client"

import { useMemo } from "react"
import type { ApiSignal } from "@/lib/api"
import { generateBacktest, type BacktestResult } from "@/lib/backtest-utils"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
  const backtest = useMemo(() => generateBacktest({
    symbol: signal.symbol,
    exchange: signal.exchange,
    strategyName: signal.strategyName,
    price: signal.price,
  }), [signal.id])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BarChart3Icon className="size-3.5 text-primary" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Backtest Summary
        </span>
        <span className="text-[9px] text-muted-foreground/60 ml-auto">
          {backtest.fromDate} — {backtest.toDate}
        </span>
      </div>

      <Card size="sm" className="bg-surface border-border/40">
        <CardContent className="pt-4">
          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            <Metric
              label="Win Rate"
              value={`${backtest.winRate}%`}
              sub={`${backtest.winners}W / ${backtest.losers}L`}
              positive={backtest.winRate >= 50}
            />
            <Metric
              label="Avg Return"
              value={`${backtest.avgReturn > 0 ? "+" : ""}${backtest.avgReturn}%`}
              positive={backtest.avgReturn > 0}
            />
            <Metric
              label="Profit Factor"
              value={backtest.profitFactor.toFixed(2)}
              positive={backtest.profitFactor > 1}
            />
            <Metric
              label="Total Trades"
              value={String(backtest.totalTrades)}
            />
            <Metric
              label="Max Drawdown"
              value={`-${backtest.maxDrawdown}%`}
              positive={false}
            />
            <Metric
              label="Sharpe Ratio"
              value={backtest.sharpeRatio.toFixed(2)}
              positive={backtest.sharpeRatio > 1}
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
                  <TableHead className="h-7 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2 text-right">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backtest.trades.slice(0, 8).map((trade, i) => (
                  <TableRow key={i} className="border-b border-border/10 hover:bg-surface-raised/30">
                    <TableCell className="px-2 py-1.5">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px]">
                          {new Date(trade.entryDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {signal.exchange === "NSE" ? "₹" : "$"}{trade.entryPrice.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px]">
                          {new Date(trade.exitDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {signal.exchange === "NSE" ? "₹" : "$"}{trade.exitPrice.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 py-1.5 text-right">
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
                    </TableCell>
                    <TableCell className="px-2 py-1.5 text-right">
                      <span className={cn(
                        "text-[9px] font-medium uppercase",
                        trade.exitReason === "target" ? "text-bull" : "text-bear"
                      )}>
                        {trade.exitReason === "target" ? "Target" : "Stop"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
