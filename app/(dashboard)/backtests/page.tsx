"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  flexRender,
} from "@tanstack/react-table"
import {
  fetchBacktests,
  type ApiBacktestSummaryRow,
} from "@/lib/api"
import { useApi } from "@/hooks/use-api"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  BarChart3Icon,
  SearchIcon,
  ArrowUpDownIcon,
  TrophyIcon,
  TargetIcon,
  Loader2Icon,
  GlobeIcon,
  ActivityIcon,
  ZapIcon,
} from "lucide-react"
import { UNIVERSE_OPTIONS, type UniverseGroupKey } from "@/lib/universes"

function WinRateBadge({ rate }: { rate: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold font-mono tabular-nums",
        rate >= 55
          ? "bg-bull/10 text-bull border-bull/20"
          : rate >= 45
            ? "bg-heat-simmering/10 text-heat-simmering border-heat-simmering/20"
            : "bg-bear/10 text-bear border-bear/20"
      )}
    >
      {rate.toFixed(1)}%
    </span>
  )
}

function PnlText({ value }: { value: number | null }) {
  if (value == null) return <span className="text-muted-foreground">—</span>
  const isPositive = value > 0
  return (
    <span
      className={cn(
        "font-mono text-xs font-semibold tabular-nums",
        isPositive ? "text-bull" : value < 0 ? "text-bear" : "text-muted-foreground"
      )}
    >
      {isPositive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  )
}

const columns: ColumnDef<ApiBacktestSummaryRow>[] = [
  {
    accessorKey: "symbol",
    header: "Stock",
    cell: ({ row }) => {
      const b = row.original
      return (
        <div className="flex flex-col">
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
            {b.symbol.replace(".NS", "")}
          </span>
          <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">
            {b.name}
          </span>
        </div>
      )
    },
    size: 160,
  },
  {
    accessorKey: "exchange",
    header: "Mkt",
    cell: ({ row }) => (
      <span
        className={cn(
          "font-mono text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
          row.original.exchange === "NSE"
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        {row.original.exchange}
      </span>
    ),
    size: 60,
  },
  {
    accessorKey: "totalTrades",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trades
        <ArrowUpDownIcon className="size-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm tabular-nums">
        {row.original.totalTrades}
      </span>
    ),
    size: 80,
  },
  {
    accessorKey: "winRate",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Win Rate
        <ArrowUpDownIcon className="size-3" />
      </button>
    ),
    cell: ({ row }) => <WinRateBadge rate={row.original.winRate} />,
    size: 100,
  },
  {
    accessorKey: "avgReturn",
    header: ({ column }) => (
      <Tooltip>
        <TooltipTrigger
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Avg Return
          <ArrowUpDownIcon className="size-3" />
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-xs">Average P&L per closed trade</span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => <PnlText value={row.original.avgReturn} />,
    size: 100,
  },
  {
    accessorKey: "maxDrawdown",
    header: ({ column }) => (
      <Tooltip>
        <TooltipTrigger
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Max DD
          <ArrowUpDownIcon className="size-3" />
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-xs">
            Maximum drawdown — largest peak-to-trough decline
          </span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-bear tabular-nums">
        -{row.original.maxDrawdown.toFixed(1)}%
      </span>
    ),
    size: 90,
  },
  {
    accessorKey: "profitFactor",
    header: ({ column }) => (
      <Tooltip>
        <TooltipTrigger
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PF
          <ArrowUpDownIcon className="size-3" />
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-xs">
            Profit Factor — gross profit / gross loss. Above 1.5 is good.
          </span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => {
      const pf = row.original.profitFactor
      return (
        <span
          className={cn(
            "font-mono text-xs font-semibold tabular-nums",
            pf >= 1.5
              ? "text-bull"
              : pf >= 1
                ? "text-heat-simmering"
                : "text-bear"
          )}
        >
          {pf.toFixed(2)}
        </span>
      )
    },
    size: 80,
  },
  {
    accessorKey: "sharpeRatio",
    header: ({ column }) => (
      <Tooltip>
        <TooltipTrigger
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sharpe
          <ArrowUpDownIcon className="size-3" />
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-xs">
            Risk-adjusted return. Above 1.0 is good, above 2.0 is excellent.
          </span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => {
      const sr = row.original.sharpeRatio
      if (sr == null) return <span className="text-muted-foreground">—</span>
      return (
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            sr >= 1 ? "text-bull" : "text-muted-foreground"
          )}
        >
          {sr.toFixed(2)}
        </span>
      )
    },
    size: 80,
  },
]

export default function BacktestsPage() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([
    { id: "winRate", desc: true },
  ])
  const [globalFilter, setGlobalFilter] = useState("")
  const [universeFilter, setUniverseFilter] = useState<UniverseGroupKey>("nifty50")

  const { data, loading, error, refetch } = useApi(
    () => fetchBacktests({ universe: universeFilter, limit: 500 }),
    [universeFilter]
  )

  const backtests = data?.backtests ?? []

  const table = useReactTable({
    data: backtests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const b = row.original
      return (
        b.symbol.toLowerCase().includes(search) ||
        b.name.toLowerCase().includes(search)
      )
    },
  })

  // Aggregate stats
  const aggStats = useMemo(() => {
    if (backtests.length === 0) return null
    const avgWR =
      backtests.reduce((s, b) => s + b.winRate, 0) / backtests.length
    const avgPF =
      backtests.reduce((s, b) => s + b.profitFactor, 0) / backtests.length
    const totalTrades = backtests.reduce((s, b) => s + b.totalTrades, 0)
    return {
      stocks: backtests.length,
      totalTrades,
      avgWinRate: avgWR.toFixed(1),
      avgProfitFactor: avgPF.toFixed(2),
    }
  }, [backtests])

  return (
    <div className="flex flex-col gap-0 min-h-0">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3Icon className="size-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Backtests</h1>
            <p className="text-xs text-muted-foreground">
              Historical strategy performance across all stocks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Universe selector */}
          <Select
            value={universeFilter}
            onValueChange={(v) => setUniverseFilter(v as UniverseGroupKey)}
          >
            <SelectTrigger
              size="sm"
              className="h-8 w-[160px] sm:w-[180px] bg-surface border-border/40 text-xs"
            >
              <GlobeIcon className="size-3 text-muted-foreground mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNIVERSE_OPTIONS.filter((o) => o.group === "all").map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>India</SelectLabel>
                {UNIVERSE_OPTIONS.filter((o) => o.group === "india").map(
                  (opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>USA</SelectLabel>
                {UNIVERSE_OPTIONS.filter((o) => o.group === "us").map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative flex-1 sm:flex-none sm:w-56">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search symbol..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-8 pl-8 font-mono text-xs bg-surface border-border/40"
            />
          </div>
        </div>
      </div>

      {/* Aggregate stats bar */}
      {aggStats && !loading && (
        <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 border-b border-border/20 bg-surface/30 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <ActivityIcon className="size-3 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {aggStats.stocks} stocks
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ZapIcon className="size-3 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {aggStats.totalTrades} total trades
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrophyIcon className="size-3 text-bull" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Avg win rate: {aggStats.avgWinRate}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TargetIcon className="size-3 text-primary" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Avg PF: {aggStats.avgProfitFactor}
            </span>
          </div>
        </div>
      )}

      {/* Loading / Error / Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2Icon className="size-6 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading backtests...
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="relative mb-4">
            <div className="relative flex size-16 items-center justify-center rounded-full border border-bear/20 bg-bear/5">
              <BarChart3Icon className="size-7 text-bear/60" />
            </div>
          </div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">
            Backtests Unavailable
          </h3>
          <p className="mt-1 max-w-xs text-center text-sm text-muted-foreground">
            {error}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-2 border-border/40 text-xs"
            onClick={() => refetch()}
          >
            <Loader2Icon className="size-3" />
            Retry
          </Button>
        </div>
      ) : backtests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <BarChart3Icon className="size-10 text-muted-foreground/30" />
          <h3 className="text-base font-semibold text-foreground">
            Backtest Data Not Available
          </h3>
          <p className="text-sm text-muted-foreground">
            Backtest results are being processed. Check back soon.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="min-w-[700px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-border/30 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No backtests match your current filters.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      "cursor-pointer border-b border-border/15 transition-colors hover:bg-surface-raised/50",
                      row.original.winRate >= 55 && "border-l-2 border-l-bull/30",
                      row.original.winRate < 45 && "border-l-2 border-l-bear/30"
                    )}
                    onClick={() => router.push(`/backtests/${encodeURIComponent(row.original.symbol)}`)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3 py-2.5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </div>
      )}

    </div>
  )
}
