import { getBacktestAggregates, getBacktests } from "@/lib/data/backtests"
import {
  TrendingUpIcon,
  TargetIcon,
  ShieldIcon,
  BarChart3Icon,
  InfoIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

function StatCard({
  label,
  value,
  sub,
  color,
  icon: Icon,
}: {
  label: string
  value: string
  sub?: string
  color?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-3.5 text-primary" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <span className={cn("font-mono text-2xl font-bold tracking-tight", color ?? "text-foreground")}>
        {value}
      </span>
      {sub && (
        <span className="text-[11px] text-muted-foreground">{sub}</span>
      )}
    </div>
  )
}

export default async function PerformancePage() {
  const [aggregates, allBacktests] = await Promise.all([
    getBacktestAggregates(),
    getBacktests("all"),
  ])

  const top10 = allBacktests.backtests
    .filter((b) => b.totalTrades >= 3)
    .slice(0, 10)

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <TrendingUpIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Strategy Performance</h1>
          <p className="text-xs text-muted-foreground">
            Historical outcomes for the Reset &amp; Reclaim strategy
          </p>
        </div>
      </div>

      {/* Aggregate stats */}
      {aggregates ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Avg Win Rate"
            value={`${aggregates.winRate.toFixed(1)}%`}
            sub={`Across ${aggregates.symbolCount} backtested stocks`}
            color={aggregates.winRate >= 55 ? "text-bull" : aggregates.winRate < 45 ? "text-bear" : "text-foreground"}
            icon={TargetIcon}
          />
          <StatCard
            label="Avg Return"
            value={`${aggregates.avgReturn >= 0 ? "+" : ""}${aggregates.avgReturn.toFixed(1)}%`}
            sub="Per closed trade"
            color={aggregates.avgReturn >= 0 ? "text-bull" : "text-bear"}
            icon={TrendingUpIcon}
          />
          <StatCard
            label="Max Drawdown"
            value={`${aggregates.maxDrawdown.toFixed(1)}%`}
            sub="Avg across all symbols"
            color="text-bear"
            icon={ShieldIcon}
          />
          {aggregates.sharpeRatio != null && (
            <StatCard
              label="Sharpe Ratio"
              value={aggregates.sharpeRatio.toFixed(2)}
              sub="Risk-adjusted return"
              color={aggregates.sharpeRatio >= 1 ? "text-bull" : "text-foreground"}
              icon={BarChart3Icon}
            />
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border/30 bg-surface/40 py-12 text-center text-sm text-muted-foreground">
          No backtest data yet. Run backtests from the admin panel to see strategy performance.
        </div>
      )}

      {/* Top performers table */}
      {top10.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Top Performers</h2>
            <span className="text-[11px] text-muted-foreground">Ranked by win rate · min 3 trades</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border/40">
            <table className="min-w-[600px] w-full text-xs">
              <thead>
                <tr className="border-b border-border/30 bg-surface/60">
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    #
                  </th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Symbol
                  </th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Market
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Trades
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Win Rate
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Avg Return
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Max DD
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Profit Factor
                  </th>
                </tr>
              </thead>
              <tbody>
                {top10.map((b, i) => (
                  <tr
                    key={b.id}
                    className="border-b border-border/15 hover:bg-surface/40 transition-colors"
                  >
                    <td className="px-4 py-2.5 font-mono text-muted-foreground/50">{i + 1}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-col">
                        <span className="font-mono font-semibold text-foreground">
                          {b.symbol.replace(".NS", "")}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                          {b.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn(
                        "font-mono text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
                        b.exchange === "NSE"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {b.exchange}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-foreground/80">
                      {b.totalTrades}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={cn(
                        "font-mono font-bold",
                        b.winRate >= 55 ? "text-bull" : b.winRate < 45 ? "text-bear" : "text-foreground"
                      )}>
                        {b.winRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={cn(
                        "font-mono font-semibold",
                        b.avgReturn >= 0 ? "text-bull" : "text-bear"
                      )}>
                        {b.avgReturn >= 0 ? "+" : ""}{b.avgReturn.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-bear">
                      {b.maxDrawdown.toFixed(1)}%
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={cn(
                        "font-mono font-semibold",
                        b.profitFactor >= 1.5 ? "text-bull" : b.profitFactor < 1 ? "text-bear" : "text-foreground"
                      )}>
                        {b.profitFactor.toFixed(2)}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strategy explanation */}
      <div className="rounded-xl border border-border/30 bg-surface/40 p-4 flex gap-3">
        <InfoIcon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-foreground">About these results</span>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Backtest results use the Reset &amp; Reclaim strategy on historical daily OHLCV data. Win rate is the percentage of closed trades that resulted in a profit. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </div>
  )
}
