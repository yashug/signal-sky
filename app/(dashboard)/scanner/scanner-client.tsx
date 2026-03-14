"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWatchlistMap, useWatchlistMutations } from "@/hooks/use-watchlist"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  flexRender,
} from "@tanstack/react-table"
import type { ApiSignal, ApiSignalsResponse, HeatStatus } from "@/lib/api"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  CrosshairIcon,
  SearchIcon,
  ArrowUpDownIcon,
  FlameIcon,
  ThermometerIcon,
  TrendingUpIcon,
  RocketIcon,
  LayersIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  ZapIcon,
  StarIcon,
  GlobeIcon,
  SparklesIcon,
  ArrowRightIcon,
  TrophyIcon,
} from "lucide-react"
import { UNIVERSE_OPTIONS, resolveUniverseTags, type UniverseGroupKey } from "@/lib/universes"
import { useAuth } from "@/hooks/use-auth"
import type { BacktestStatEntry } from "@/lib/data/backtests"
import { JournalStatsWidget } from "@/components/signal-sky/journal-stats-widget"

type ScannerTableMeta = {
  backtestStats?: Record<string, BacktestStatEntry>
}

const HEAT_CONFIG = {
  breakout: {
    label: "Breakout",
    tooltip: "Price crossed above prior peak (0–5% above)",
    icon: RocketIcon,
    className: "bg-heat-breakout/10 text-heat-breakout border-heat-breakout/20",
  },
  boiling: {
    label: "Boiling",
    tooltip: "Within 2% of prior peak — breakout imminent",
    icon: FlameIcon,
    className: "bg-heat-boiling/10 text-heat-boiling border-heat-boiling/20",
  },
  simmering: {
    label: "Simmering",
    tooltip: "2–5% from prior peak — building momentum",
    icon: ThermometerIcon,
    className: "bg-heat-simmering/10 text-heat-simmering border-heat-simmering/20",
  },
  cooling: {
    label: "Warming",
    tooltip: "5–15% from prior peak — on the radar",
    icon: TrendingUpIcon,
    className: "bg-heat-cooling/10 text-heat-cooling border-heat-cooling/20",
  },
} as const

function HeatBadge({ heat }: { heat: HeatStatus }) {
  const c = HEAT_CONFIG[heat]
  return (
    <Tooltip>
      <TooltipTrigger>
        <span className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
          c.className
        )}>
          <c.icon className="size-2.5" />
          {c.label}
        </span>
      </TooltipTrigger>
      <TooltipContent side="left">
        <span className="text-xs">{c.tooltip}</span>
      </TooltipContent>
    </Tooltip>
  )
}

function ExchangeBadge({ exchange }: { exchange: string }) {
  return (
    <span className={cn(
      "font-mono text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
      exchange === "NSE"
        ? "bg-primary/10 text-primary"
        : "bg-muted text-muted-foreground"
    )}>
      {exchange}
    </span>
  )
}

const columns: ColumnDef<ApiSignal>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row, table }) => {
      const signal = row.original
      const meta = table.options.meta as ScannerTableMeta | undefined
      const bt = meta?.backtestStats?.[signal.symbol]
      return (
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
              {signal.symbol.replace(".NS", "")}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground truncate max-w-[90px]">
                {signal.name}
              </span>
              {bt && bt.totalTrades >= 3 && (
                <Tooltip>
                  <TooltipTrigger className={cn(
                    "font-mono text-[9px] font-bold tabular-nums px-1 py-0.5 rounded cursor-default",
                    bt.winRate >= 55
                      ? "bg-bull/10 text-bull"
                      : bt.winRate < 45
                      ? "bg-bear/10 text-bear"
                      : "bg-muted/60 text-muted-foreground"
                  )}>
                    {bt.winRate.toFixed(0)}% WR
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px]">
                    <p className="text-xs font-semibold">{bt.winRate.toFixed(1)}% win rate</p>
                    <p className="text-xs text-muted-foreground">
                      Based on {bt.totalTrades} backtested Reset &amp; Reclaim trades for this symbol
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )
    },
    size: 190,
  },
  {
    accessorKey: "exchange",
    header: "Mkt",
    cell: ({ row }) => <ExchangeBadge exchange={row.original.exchange} />,
    size: 60,
  },
  {
    accessorKey: "heat",
    header: "Status",
    cell: ({ row }) => <HeatBadge heat={row.original.heat} />,
    size: 110,
  },
  {
    accessorKey: "price",
    header: () => (
      <Tooltip>
        <TooltipTrigger className="text-[10px] font-semibold uppercase tracking-wider">
          Price
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-xs">Latest traded price</span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => {
      const s = row.original
      const currency = s.exchange === "NSE" ? "₹" : "$"
      const isUp = s.price > s.ema200
      return (
        <div className="flex items-center gap-1">
          {isUp ? (
            <ArrowUpRightIcon className="size-3 text-bull" />
          ) : (
            <ArrowDownRightIcon className="size-3 text-bear" />
          )}
          <span className={cn("font-mono text-sm font-medium", isUp ? "text-bull" : "text-bear")}>
            {currency}{s.price.toLocaleString(undefined, { minimumFractionDigits: s.exchange === "NSE" ? 0 : 2 })}
          </span>
        </div>
      )
    },
    size: 110,
  },
  {
    accessorKey: "ath",
    header: () => (
      <Tooltip>
        <TooltipTrigger className="text-[10px] font-semibold uppercase tracking-wider">
          Prior Peak
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[220px]">
          <span className="text-xs">Highest price reached before the stock broke below its EMA 200</span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => {
      const s = row.original
      const currency = s.exchange === "NSE" ? "₹" : "$"
      const dateStr = s.details?.preSetATHDate as string | undefined
      return (
        <div className="flex flex-col">
          <span className="font-mono text-sm text-foreground/80">
            {currency}{s.ath.toLocaleString(undefined, { minimumFractionDigits: s.exchange === "NSE" ? 0 : 2 })}
          </span>
          {dateStr && (
            <span className="font-mono text-[10px] text-muted-foreground/60">
              {new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>
      )
    },
    size: 120,
  },
  {
    accessorKey: "distancePct",
    header: ({ column }) => (
      <Tooltip>
        <TooltipTrigger
          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gap to Peak
          <ArrowUpDownIcon className="size-3" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <span className="text-xs">How far the current price is from the prior peak. Negative means price has crossed above it.</span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => {
      const d = row.original.distancePct
      const isBreakout = d < 0
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isBreakout ? "bg-heat-breakout" : d <= 2 ? "bg-heat-boiling" : d <= 5 ? "bg-heat-simmering" : "bg-heat-cooling"
              )}
              style={{ width: isBreakout ? "100%" : `${Math.max(5, Math.min(100, 100 - d * 6.67))}%` }}
            />
          </div>
          <span className={cn(
            "font-mono text-xs font-semibold",
            isBreakout ? "text-heat-breakout" : d <= 2 ? "text-heat-boiling" : d <= 5 ? "text-heat-simmering" : "text-muted-foreground"
          )}>
            {isBreakout ? `+${Math.abs(d).toFixed(1)}%` : `${d.toFixed(1)}%`}
          </span>
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: "ema200",
    header: () => (
      <Tooltip>
        <TooltipTrigger className="text-[10px] font-semibold uppercase tracking-wider">
          EMA 200
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <span className="text-xs">200-day exponential moving average — acts as the key support level and stop-loss trigger</span>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => {
      const s = row.original
      const currency = s.exchange === "NSE" ? "₹" : "$"
      return (
        <span className="font-mono text-sm text-muted-foreground">
          {currency}{s.ema200.toLocaleString(undefined, { minimumFractionDigits: s.exchange === "NSE" ? 0 : 2 })}
        </span>
      )
    },
    size: 110,
  },
]

export function ScannerClient({
  data,
  initialUniverse,
  universeMemberships,
  backtestStats,
}: {
  data: ApiSignalsResponse
  initialUniverse: string
  universeMemberships: Record<string, string[]>
  backtestStats?: Record<string, BacktestStatEntry>
}) {
  const router = useRouter()
  const { user } = useAuth()

  const trialInfo = useMemo(() => {
    if (!user) return { isTrialActive: false, isPro: false, daysRemaining: 0 }
    const isPro = user.tier === "PRO" || user.tier === "INSTITUTIONAL"
    const trialEndsAt = user.trialEndsAt ? new Date(user.trialEndsAt) : null
    const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
    const daysRemaining = trialEndsAt
      ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / 86400000))
      : 0
    return { isPro, isTrialActive, daysRemaining }
  }, [user])

  const showUpgradeNudge = trialInfo.isTrialActive && !trialInfo.isPro && trialInfo.daysRemaining <= 2

  const validHeats = ["all", "breakout", "boiling", "simmering", "cooling"]

  const [universe, setUniverse] = useState(initialUniverse)
  const [sorting, setSorting] = useState<SortingState>([
    { id: "distancePct", desc: false },
  ])
  const [globalFilter, setGlobalFilter] = useState("")
  const [heatFilter, setHeatFilter] = useState<string>(() => {
    if (typeof window === "undefined") return "all"
    const h = new URLSearchParams(window.location.search).get("heat")
    return h && validHeats.includes(h) ? h : "all"
  })

  const watchlistMap = useWatchlistMap()
  const { add: addToWatchlist, remove: removeFromWatchlist } = useWatchlistMutations()

  const updateURL = useCallback(
    (newUniverse: string, heat: string) => {
      const params = new URLSearchParams()
      if (newUniverse !== "nifty50") params.set("universe", newUniverse)
      if (heat !== "all") params.set("heat", heat)
      const qs = params.toString()
      window.history.replaceState(null, "", `/scanner${qs ? `?${qs}` : ""}`)
    },
    []
  )

  const universeSignals = useMemo(() => {
    if (universe === "all") return data.signals
    const tags = new Set(resolveUniverseTags(universe))
    return data.signals.filter((s) => {
      const memberTags = universeMemberships[s.symbol]
      return memberTags?.some((t) => tags.has(t))
    })
  }, [data.signals, universe, universeMemberships])

  const heatCounts = useMemo(() => {
    const counts = { all: 0, breakout: 0, boiling: 0, simmering: 0, cooling: 0 }
    for (const s of universeSignals) {
      counts.all++
      if (s.heat in counts) counts[s.heat as keyof typeof counts]++
    }
    return counts
  }, [universeSignals])

  const filteredData = useMemo(() => {
    if (heatFilter === "all") return universeSignals
    return universeSignals.filter((s) => s.heat === heatFilter)
  }, [universeSignals, heatFilter])

  const spotlightSignal = useMemo(() => {
    const priority = ["breakout", "boiling", "simmering", "cooling"]
    for (const heat of priority) {
      const match = universeSignals.find((s) => s.heat === heat)
      if (match) return match
    }
    return null
  }, [universeSignals])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    meta: { backtestStats } as ScannerTableMeta,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const s = row.original
      return (
        s.symbol.toLowerCase().includes(search) ||
        s.name.toLowerCase().includes(search)
      )
    },
  })

  const toggleWatchlist = useCallback((signal: ApiSignal) => {
    const existing = watchlistMap.get(signal.symbol)
    if (existing) {
      removeFromWatchlist.mutate({ id: existing, symbol: signal.symbol })
    } else {
      addToWatchlist.mutate({ symbol: signal.symbol, exchange: signal.exchange })
    }
  }, [watchlistMap, addToWatchlist, removeFromWatchlist])

  return (
    <div className="flex flex-col gap-0 min-h-0">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <CrosshairIcon className="size-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Signal Scanner</h1>
            <p className="text-xs text-muted-foreground">
              Reset & Reclaim signals across India & US markets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={universe as UniverseGroupKey} onValueChange={(v) => { if (v) { setUniverse(v); updateURL(v, heatFilter) } }}>
            <SelectTrigger size="sm" className="h-8 w-[160px] sm:w-[180px] bg-surface border-border/40 text-xs">
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
                {UNIVERSE_OPTIONS.filter((o) => o.group === "india").map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
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

          <div className="relative flex-1 sm:flex-none sm:w-56">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search symbol..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-8 pl-8 font-mono text-[16px] sm:text-xs bg-surface border-border/40"
            />
          </div>
        </div>
      </div>

      {/* Journal stats strip */}
      <JournalStatsWidget />

      {/* Signal Spotlight */}
      {spotlightSignal && (
        <div
          className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-border/20 bg-surface/20 cursor-pointer hover:bg-surface/40 transition-colors"
          onClick={() => router.push(`/scanner/${encodeURIComponent(spotlightSignal.symbol)}`)}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <TrophyIcon className="size-3.5 text-heat-simmering" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Today&apos;s Top Signal
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-sm font-bold text-foreground">
              {spotlightSignal.symbol.replace(".NS", "")}
            </span>
            <HeatBadge heat={spotlightSignal.heat} />
            <span className={cn(
              "font-mono text-xs font-semibold",
              spotlightSignal.distancePct < 0 ? "text-heat-breakout" : spotlightSignal.distancePct <= 2 ? "text-heat-boiling" : "text-heat-simmering"
            )}>
              {spotlightSignal.distancePct < 0
                ? `+${Math.abs(spotlightSignal.distancePct).toFixed(1)}% above peak`
                : `${spotlightSignal.distancePct.toFixed(1)}% from peak`}
            </span>
            <ExchangeBadge exchange={spotlightSignal.exchange} />
          </div>
          <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors shrink-0">
            View <ArrowRightIcon className="size-3" />
          </div>
        </div>
      )}

      {/* Upgrade nudge for expiring trial */}
      {showUpgradeNudge && (
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2 border-b border-heat-boiling/20 bg-heat-boiling/5">
          <div className="flex items-center gap-2">
            <SparklesIcon className="size-3.5 text-heat-boiling shrink-0" />
            <span className="text-xs text-heat-boiling">
              <span className="font-bold">{trialInfo.daysRemaining} day{trialInfo.daysRemaining !== 1 ? "s" : ""} left</span> in your trial — subscribe to keep full access to all markets
            </span>
          </div>
          <Link
            href="/pricing"
            className="flex items-center gap-1 text-[10px] font-semibold text-heat-boiling hover:text-heat-boiling/80 transition-colors whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            Subscribe <ArrowRightIcon className="size-3" />
          </Link>
        </div>
      )}

      {/* Heat filter tabs */}
      <div className="flex items-center gap-4 px-4 sm:px-6 py-3 border-b border-border/20 bg-surface/30 overflow-x-auto">
        <Tabs value={heatFilter} onValueChange={(v: string) => { setHeatFilter(v); updateURL(universe, v) }}>
          <TabsList variant="line" className="h-8 gap-0.5">
            <TabsTrigger value="all" className="text-xs px-3 h-7 gap-1.5">
              <LayersIcon className="size-3" />
              All
              <span className="font-mono text-[10px] text-muted-foreground ml-0.5">
                {heatCounts.all}
              </span>
            </TabsTrigger>
            <TabsTrigger value="breakout" className="text-xs px-3 h-7 gap-1.5">
              <RocketIcon className="size-3" />
              Breakout
              <span className="font-mono text-[10px] text-heat-breakout ml-0.5">
                {heatCounts.breakout}
              </span>
            </TabsTrigger>
            <TabsTrigger value="boiling" className="text-xs px-3 h-7 gap-1.5">
              <FlameIcon className="size-3" />
              Boiling
              <span className="font-mono text-[10px] text-heat-boiling ml-0.5">
                {heatCounts.boiling}
              </span>
            </TabsTrigger>
            <TabsTrigger value="simmering" className="text-xs px-3 h-7 gap-1.5">
              <ThermometerIcon className="size-3" />
              Simmering
              <span className="font-mono text-[10px] text-heat-simmering ml-0.5">
                {heatCounts.simmering}
              </span>
            </TabsTrigger>
            <TabsTrigger value="cooling" className="text-xs px-3 h-7 gap-1.5">
              <TrendingUpIcon className="size-3" />
              Warming
              <span className="font-mono text-[10px] text-heat-cooling ml-0.5">
                {heatCounts.cooling}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="ml-auto flex items-center gap-2">
          <ZapIcon className="size-3 text-primary" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {table.getFilteredRowModel().rows.length} signals
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-border/30 hover:bg-transparent">
                  <TableHead className="h-9 w-10 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" />
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-24 text-center text-muted-foreground">
                    No signals match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      "cursor-pointer border-b border-border/15 transition-colors",
                      row.original.heat === "breakout" && "row-breakout",
                      row.original.heat === "boiling" && "row-boiling",
                      row.original.heat === "simmering" && "row-simmering",
                      row.original.heat === "cooling" && "row-cooling",
                      "hover:bg-surface-raised/50"
                    )}
                    onClick={() => {
                      router.push(`/scanner/${encodeURIComponent(row.original.symbol)}`)
                    }}
                  >
                    <TableCell className="px-3 py-2.5 w-10">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="size-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(row.original)
                        }}
                      >
                        <StarIcon className={cn(
                          "size-3.5 transition-colors",
                          watchlistMap.has(row.original.symbol)
                            ? "fill-heat-simmering text-heat-simmering"
                            : "text-muted-foreground/40"
                        )} />
                      </Button>
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3 py-2.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
