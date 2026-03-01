"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
  Loader2Icon,
  CheckCircle2Icon,
  AlertCircleIcon,
  XCircleIcon,
  RefreshCwIcon,
  DownloadCloudIcon,
  PlayIcon,
  ScanSearchIcon,
  FlameIcon,
  DatabaseIcon,
  CircleDotIcon,
  CalendarIcon,
  BarChart3Icon,
  ShieldCheckIcon,
  CloudDownloadIcon,
  GlobeIcon,
  ActivityIcon,
  LayersIcon,
  MessageSquareIcon,
  CheckIcon,
  BugIcon,
  LightbulbIcon,
  MessageCircleIcon,
  MailIcon,
  EyeIcon,
} from "lucide-react"

// ─── Constants ──────────────────────────────────────────────────
const INDIA_UNIVERSES = [
  "nifty50",
  "niftynext50",
  "nifty200",
  "niftymidcap50",
  "niftymidcap100",
  "niftysmallcap50",
  "niftysmallcap100",
  "niftybank",
] as const

const US_UNIVERSES = ["sp100", "nasdaq100"] as const

const ALL_UNIVERSES = [...INDIA_UNIVERSES, ...US_UNIVERSES] as const

function isIndianUniverse(u: string) {
  return (INDIA_UNIVERSES as readonly string[]).includes(u)
}

// ─── Types ──────────────────────────────────────────────────────
type ScanStatus = {
  lastScanTime?: string
  lastScanDate?: string
  activeSignals?: number
  heatBreakdown?: Record<string, number>
  totalBars?: number
  totalIndicators?: number
}

type UniverseMember = {
  symbol: string
  name: string | null
  sector: string | null
  firstDate: string | null
  lastDate: string | null
  barCount: number
  coverage: number
  isUpToDate: boolean
  has10YearHistory: boolean
  has20YearHistory: boolean
}

type UniverseData = {
  universe: string
  exchange: string
  total: number
  withData: number
  upToDate: number
  full10Year: number
  full20Year: number
  members: UniverseMember[]
}

type ActionResult = {
  success?: boolean
  error?: string
  [key: string]: unknown
}

// ─── Utility: format IST date ───────────────────────────────────
function formatIST(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  })
}

// ─── Reusable Action Hook ───────────────────────────────────────
function useAction() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ActionResult | null>(null)

  const execute = useCallback(
    async (
      endpoint: string,
      opts?: { method?: string; body?: Record<string, unknown> }
    ) => {
      setLoading(true)
      setResult(null)
      try {
        const res = await fetch(endpoint, {
          method: opts?.method ?? "POST",
          headers: { "Content-Type": "application/json" },
          body: opts?.body ? JSON.stringify(opts.body) : undefined,
        })
        const data = await res.json()
        const r = res.ok ? data : { error: data.error ?? `Failed (${res.status})` }
        setResult(r)
        if (r.error) toast.error(r.error)
        else toast.success("Action completed")
        return r
      } catch (e: any) {
        const r = { error: e.message }
        setResult(r)
        toast.error(e.message)
        return r
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { loading, result, execute, setResult }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 2+3: UNIVERSE EXPLORER + DATA HEALTH
// ═══════════════════════════════════════════════════════════════════
function UniverseExplorerSection() {
  const [selected, setSelected] = useState<string>("nifty50")
  const [data, setData] = useState<UniverseData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback((universe: string) => {
    setLoading(true)
    setData(null)
    fetch(`/api/admin/universe-data?universe=${universe}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => toast.error("Failed to load universe data"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData(selected)
  }, [selected, fetchData])

  return (
    <section>
      <div className="flex items-center justify-between">
        <SectionHeader
          icon={<LayersIcon className="size-4" />}
          title="Data Explorer"
          description="Browse index constituents and verify data coverage"
        />
        <Button
          size="sm"
          variant="ghost"
          className="gap-1.5"
          onClick={() => fetchData(selected)}
        >
          <RefreshCwIcon className="size-3.5" />
          Refresh
        </Button>
      </div>

      {/* Universe Selector */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {ALL_UNIVERSES.map((u) => (
          <button
            key={u}
            onClick={() => setSelected(u)}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
              selected === u
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {u}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard
          label="Total Stocks"
          value={loading ? "---" : String(data?.total ?? 0)}
          icon={<DatabaseIcon className="size-3.5 text-muted-foreground" />}
        />
        <MetricCard
          label="With Data"
          value={loading ? "---" : String(data?.withData ?? 0)}
          icon={<BarChart3Icon className="size-3.5 text-primary" />}
          accent={data && data.withData === data.total ? "bull" : undefined}
        />
        <MetricCard
          label="Up to Date"
          value={loading ? "---" : String(data?.upToDate ?? 0)}
          icon={<CheckCircle2Icon className="size-3.5 text-bull" />}
          accent={data && data.upToDate === data.total ? "bull" : undefined}
        />
        <MetricCard
          label="20Y History"
          value={loading ? "---" : String(data?.full20Year ?? 0)}
          icon={<CalendarIcon className="size-3.5 text-muted-foreground" />}
          accent={data && data.full20Year === data.total ? "bull" : undefined}
        />
      </div>

      {/* Data Health Table — full space, no collapsible */}
      <div className="mt-4 rounded-lg border border-border/50 bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30 bg-muted/20">
          <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <ActivityIcon className="size-3.5" />
            Stock Data Coverage
            {data && (
              <Badge variant="secondary" className="text-[10px] px-1.5 h-4">
                {data.members.length} stocks
              </Badge>
            )}
          </span>
        </div>

        {loading ? (
          <div className="px-4 py-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : data && data.members.length > 0 ? (
          <div className="max-h-[calc(100vh-380px)] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-[11px] uppercase tracking-wider bg-muted/30">
                  <TableHead className="text-[11px] font-semibold w-[100px]">Symbol</TableHead>
                  <TableHead className="text-[11px] font-semibold">Name</TableHead>
                  <TableHead className="text-[11px] font-semibold text-center">Bars</TableHead>
                  <TableHead className="text-[11px] font-semibold">First Date</TableHead>
                  <TableHead className="text-[11px] font-semibold">Last Date</TableHead>
                  <TableHead className="text-[11px] font-semibold">Coverage</TableHead>
                  <TableHead className="text-[11px] font-semibold text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.members.map((m) => (
                  <TableRow
                    key={m.symbol}
                    className={cn(
                      "text-xs",
                      m.barCount === 0 && "bg-destructive/5"
                    )}
                  >
                    <TableCell className="font-mono font-semibold text-foreground">
                      {m.symbol}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {m.name ?? "---"}
                    </TableCell>
                    <TableCell className="text-center font-mono font-num">
                      {m.barCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">
                      {m.firstDate ?? (
                        <span className="text-destructive">No data</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">
                      {m.lastDate ?? "---"}
                    </TableCell>
                    <TableCell>
                      <CoverageBar pct={m.coverage} />
                    </TableCell>
                    <TableCell className="text-center">
                      <DataStatusDot member={m} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="px-4 py-6 text-xs text-muted-foreground text-center">
            No members found for this universe. Upload universe data via CSV first.
          </div>
        )}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: STRATEGY SCANNER
// ═══════════════════════════════════════════════════════════════════
function StrategyScannerSection() {
  const [status, setStatus] = useState<ScanStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [scanRunning, setScanRunning] = useState<string | null>(null) // "india" | "us" | "all" | null
  const scanIndiaAction = useAction()
  const scanUsAction = useAction()
  const scanAllAction = useAction()
  const syncIndiaAction = useAction()
  const syncUsAction = useAction()
  const syncAllAction = useAction()
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const preScanTimeRef = useRef<string | null>(null)

  const refreshStatus = useCallback(() => {
    fetch("/api/admin/scan/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refreshStatus()
  }, [refreshStatus])

  // Poll for scan completion — check if lastScanTime has changed
  const startPolling = useCallback((market: string) => {
    if (pollRef.current) clearInterval(pollRef.current)
    setScanRunning(market)
    pollRef.current = setInterval(() => {
      fetch("/api/admin/scan/status")
        .then((r) => r.json())
        .then((data) => {
          setStatus(data)
          // Scan is complete when lastScanTime changes from pre-scan value
          if (data.lastScanTime && data.lastScanTime !== preScanTimeRef.current) {
            setScanRunning(null)
            if (pollRef.current) clearInterval(pollRef.current)
            pollRef.current = null
            const marketLabel = market === "all" ? "India + US" : market.toUpperCase()
            toast.success(`${marketLabel} scan complete — ${data.activeSignals} active signals`)
          }
        })
        .catch(() => {})
    }, 5000)
  }, [])

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const runScan = useCallback(
    (market: "india" | "us" | "all") => {
      const action =
        market === "india" ? scanIndiaAction : market === "us" ? scanUsAction : scanAllAction
      preScanTimeRef.current = status?.lastScanTime ?? null
      action.execute("/api/admin/scan/run", { body: { market } }).then((r) => {
        if (!r?.error) {
          startPolling(market)
        }
      })
    },
    [scanIndiaAction, scanUsAction, scanAllAction, status?.lastScanTime, startPolling]
  )

  return (
    <section>
      <SectionHeader
        icon={<ScanSearchIcon className="size-4" />}
        title="Strategy Scanner"
        description="Run the Reset & Reclaim strategy scan on stored market data"
        badge={
          !loading && status?.activeSignals != null ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <FlameIcon className="size-3 text-heat-boiling" />
              {status.activeSignals} active
            </span>
          ) : null
        }
      />

      {/* Scan in progress banner */}
      {scanRunning && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <Loader2Icon className="size-4 text-primary animate-spin" />
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">
              {scanRunning === "all" ? "India + US" : scanRunning.toUpperCase()} scan in progress...
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              Auto-refreshing status every 5s
            </span>
          </div>
        </div>
      )}

      {/* Status Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <MetricCard
          label="Last Scan"
          value={
            loading
              ? "---"
              : status?.lastScanTime
                ? formatIST(status.lastScanTime)
                : "Never"
          }
          icon={<CalendarIcon className="size-3.5 text-muted-foreground" />}
          small
        />
        <MetricCard
          label="Active Signals"
          value={loading ? "---" : String(status?.activeSignals ?? 0)}
          icon={<FlameIcon className="size-3.5 text-heat-boiling" />}
          small
        />
        <MetricCard
          label="Breakout"
          value={
            loading
              ? "---"
              : String(status?.heatBreakdown?.breakout ?? 0)
          }
          icon={<CircleDotIcon className="size-3.5 text-heat-breakout" />}
          small
        />
        <MetricCard
          label="Boiling"
          value={
            loading
              ? "---"
              : String(status?.heatBreakdown?.boiling ?? 0)
          }
          icon={<CircleDotIcon className="size-3.5 text-heat-boiling" />}
          small
        />
        <MetricCard
          label="Simmering"
          value={
            loading
              ? "---"
              : String(status?.heatBreakdown?.simmering ?? 0)
          }
          icon={<CircleDotIcon className="size-3.5 text-heat-simmering" />}
          small
        />
        <MetricCard
          label="Warming"
          value={
            loading
              ? "---"
              : String(status?.heatBreakdown?.cooling ?? 0)
          }
          icon={<CircleDotIcon className="size-3.5 text-heat-cooling" />}
          small
        />
      </div>

      {/* Stats row */}
      {status && (
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground px-1">
          <span>
            <span className="font-medium text-foreground">
              {(status.totalBars ?? 0).toLocaleString()}
            </span>{" "}
            total bars
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="font-medium text-foreground">
              {(status.totalIndicators ?? 0).toLocaleString()}
            </span>{" "}
            indicators
          </span>
        </div>
      )}

      {/* Scan All + Sync All — primary action buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          className="w-full gap-2"
          disabled={!!scanRunning || scanAllAction.loading}
          onClick={() => runScan("all")}
        >
          {scanRunning === "all" || scanAllAction.loading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <ScanSearchIcon className="size-4" />
          )}
          {scanRunning === "all" || scanAllAction.loading
            ? "Scanning..."
            : "Scan All (India + US)"}
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          disabled={syncAllAction.loading}
          onClick={() =>
            syncAllAction
              .execute("/api/admin/sync/all")
              .then(() => setTimeout(refreshStatus, 2000))
          }
        >
          {syncAllAction.loading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <CloudDownloadIcon className="size-4" />
          )}
          {syncAllAction.loading ? "Syncing..." : "Sync Today — All Universes"}
        </Button>
      </div>

      {scanAllAction.result && (
        <ResultBanner result={scanAllAction.result} className="mt-2" />
      )}
      {syncAllAction.result && (
        <ResultBanner result={syncAllAction.result} className="mt-2" />
      )}

      {/* Scan + Individual Sync Grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ActionCard
          label={scanRunning === "india" ? "Scanning..." : "Scan India"}
          loadingLabel="Starting..."
          icon={<ScanSearchIcon className="size-4" />}
          flag="IN"
          loading={scanIndiaAction.loading || scanRunning === "india"}
          onClick={() => runScan("india")}
        />
        <ActionCard
          label={scanRunning === "us" ? "Scanning..." : "Scan US"}
          loadingLabel="Starting..."
          icon={<ScanSearchIcon className="size-4" />}
          flag="US"
          loading={scanUsAction.loading || scanRunning === "us"}
          onClick={() => runScan("us")}
        />
        <ActionCard
          label="Sync India"
          loadingLabel="Syncing..."
          icon={<CloudDownloadIcon className="size-4" />}
          flag="IN"
          loading={syncIndiaAction.loading}
          onClick={() =>
            syncIndiaAction
              .execute("/api/admin/sync/india/daily", {
                body: { universe: "nifty200" },
              })
              .then(() => setTimeout(refreshStatus, 2000))
          }
        />
        <ActionCard
          label="Sync US"
          loadingLabel="Syncing..."
          icon={<CloudDownloadIcon className="size-4" />}
          flag="US"
          loading={syncUsAction.loading}
          onClick={() =>
            syncUsAction
              .execute("/api/admin/sync/us/daily", { body: {} })
              .then(() => setTimeout(refreshStatus, 2000))
          }
        />
      </div>

      {/* Results */}
      {scanIndiaAction.result && (
        <ResultBanner result={scanIndiaAction.result} className="mt-2" />
      )}
      {scanUsAction.result && (
        <ResultBanner result={scanUsAction.result} className="mt-2" />
      )}
      {syncIndiaAction.result && (
        <ResultBanner result={syncIndiaAction.result} className="mt-2" />
      )}
      {syncUsAction.result && (
        <ResultBanner result={syncUsAction.result} className="mt-2" />
      )}

      {/* Backtest */}
      <Separator className="mt-4 opacity-30" />
      <BacktestRunSection />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: BACKTEST RUN
// ═══════════════════════════════════════════════════════════════════
type BacktestJob = {
  status: "idle" | "running" | "done" | "error"
  market: string
  startedAt?: string
  completedAt?: string
  updated?: number
  skipped?: number
  total?: number
  errors?: number
  elapsedSec?: number
  lastLine?: string
}

function BacktestStatusCard({ market }: { market: string }) {
  const [job, setJob] = useState<BacktestJob | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchStatus = useCallback(() => {
    fetch(`/api/admin/backtest/status?market=${market}`)
      .then((r) => r.json())
      .then(setJob)
      .catch(() => {})
  }, [market])

  // Start polling when a job is running, stop when done/error
  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  useEffect(() => {
    if (job?.status === "running") {
      if (!pollRef.current) {
        pollRef.current = setInterval(fetchStatus, 3000)
      }
    } else {
      if (pollRef.current) {
        clearInterval(pollRef.current)
        pollRef.current = null
      }
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [job?.status, fetchStatus])

  if (!job || job.status === "idle") return null

  const isRunning = job.status === "running"
  const isDone = job.status === "done"
  const isError = job.status === "error"

  return (
    <div className={cn(
      "mt-2 rounded-lg border px-3 py-2.5 text-xs transition-all",
      isRunning && "border-primary/30 bg-primary/5",
      isDone && "border-bull/30 bg-bull/5",
      isError && "border-destructive/30 bg-destructive/5",
    )}>
      <div className="flex items-center gap-2 mb-1.5">
        {isRunning && <Loader2Icon className="size-3.5 text-primary animate-spin shrink-0" />}
        {isDone && <CheckCircle2Icon className="size-3.5 text-bull shrink-0" />}
        {isError && <AlertCircleIcon className="size-3.5 text-destructive shrink-0" />}
        <span className={cn(
          "font-medium",
          isRunning && "text-primary",
          isDone && "text-bull",
          isError && "text-destructive",
        )}>
          {isRunning && "Running..."}
          {isDone && "Done"}
          {isError && "Error"}
        </span>
        {job.elapsedSec != null && (
          <span className="ml-auto font-mono text-muted-foreground text-[10px]">
            {job.elapsedSec}s
          </span>
        )}
      </div>

      {isDone && (
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground">
          {job.updated != null && (
            <span><span className="font-medium text-foreground">{job.updated}</span> updated</span>
          )}
          {job.skipped != null && (
            <span><span className="font-medium text-foreground">{job.skipped}</span> skipped</span>
          )}
          {job.total != null && (
            <span><span className="font-medium text-foreground">{job.total}</span> total</span>
          )}
          {job.errors != null && job.errors > 0 && (
            <span className="text-destructive"><span className="font-medium">{job.errors}</span> errors</span>
          )}
        </div>
      )}

      {isError && job.lastLine && (
        <p className="text-destructive text-[11px] mt-0.5 truncate">{job.lastLine}</p>
      )}

      {isRunning && (
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Polling every 3s — page stays live while pipeline runs in background
        </p>
      )}
    </div>
  )
}

function BacktestRunSection() {
  const indiaAction = useAction()
  const usAction = useAction()
  const [indiaTriggered, setIndiaTriggered] = useState(false)
  const [usTriggered, setUsTriggered] = useState(false)

  return (
    <div className="mt-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BarChart3Icon className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Backtest Engine
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Only re-runs symbols where bar data changed — skips already up-to-date results
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ActionCard
          label="Backtest India"
          loadingLabel="Starting..."
          icon={<BarChart3Icon className="size-4" />}
          flag="IN"
          loading={indiaAction.loading}
          onClick={() => {
            indiaAction.execute("/api/admin/backtest/run", { body: { market: "india" } })
              .then(() => setIndiaTriggered(true))
          }}
        />
        <ActionCard
          label="Backtest US"
          loadingLabel="Starting..."
          icon={<BarChart3Icon className="size-4" />}
          flag="US"
          loading={usAction.loading}
          onClick={() => {
            usAction.execute("/api/admin/backtest/run", { body: { market: "us" } })
              .then(() => setUsTriggered(true))
          }}
        />
      </div>

      {indiaTriggered && <BacktestStatusCard market="india" />}
      {usTriggered && <BacktestStatusCard market="us" />}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: SYNC & BACKFILL (dedicated tab)
// ═══════════════════════════════════════════════════════════════════
function SyncBackfillSection() {
  const [indiaUniverse, setIndiaUniverse] = useState("nifty50")
  const [usUniverse, setUsUniverse] = useState("sp100")
  const indiaBackfill = useAction()
  const indiaDaily = useAction()
  const usBackfill = useAction()
  const usDaily = useAction()

  return (
    <>
      {/* India */}
      <section>
        <SectionHeader
          icon={<DownloadCloudIcon className="size-4" />}
          title="India (NSE) — Yahoo Finance"
          description="Backfill and sync daily OHLCV bars via Yahoo Finance"
        />

        <div className="mt-4 rounded-lg border border-border/50 bg-card p-5 space-y-5">
          {/* Universe Picker */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Select Universe
            </p>
            <div className="flex flex-wrap gap-1.5">
              {INDIA_UNIVERSES.map((u) => (
                <button
                  key={u}
                  onClick={() => setIndiaUniverse(u)}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
                    indiaUniverse === u
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <Separator className="opacity-30" />

          {/* Actions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Historical Backfill (Extend −10Y)
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                Fetches 10 years before the oldest existing data. Run twice to reach 20Y total.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 w-full justify-center"
                disabled={indiaBackfill.loading}
                onClick={() =>
                  indiaBackfill.execute("/api/admin/sync/india/backfill", {
                    body: { universe: indiaUniverse, years: 10 },
                  })
                }
              >
                {indiaBackfill.loading ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <DownloadCloudIcon className="size-3.5" />
                )}
                {indiaBackfill.loading
                  ? `Backfilling ${indiaUniverse}...`
                  : `Backfill ${indiaUniverse} — Extend −10Y`}
              </Button>
              {indiaBackfill.result && (
                <ResultBanner result={indiaBackfill.result} />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Daily Incremental Sync
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 w-full justify-center"
                disabled={indiaDaily.loading}
                onClick={() =>
                  indiaDaily.execute("/api/admin/sync/india/daily", {
                    body: { universe: indiaUniverse },
                  })
                }
              >
                {indiaDaily.loading ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <PlayIcon className="size-3.5" />
                )}
                {indiaDaily.loading
                  ? `Syncing ${indiaUniverse}...`
                  : `Sync Today — ${indiaUniverse}`}
              </Button>
              {indiaDaily.result && (
                <ResultBanner result={indiaDaily.result} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Separator className="opacity-40" />

      {/* US */}
      <section>
        <SectionHeader
          icon={<DownloadCloudIcon className="size-4" />}
          title="US — Yahoo Finance"
          description="Backfill and sync daily OHLCV bars from Yahoo Finance"
        />

        <div className="mt-4 rounded-lg border border-border/50 bg-card p-5 space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Select Universe
            </p>
            <div className="flex flex-wrap gap-1.5">
              {US_UNIVERSES.map((u) => (
                <button
                  key={u}
                  onClick={() => setUsUniverse(u)}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
                    usUniverse === u
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <Separator className="opacity-30" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Historical Backfill (Extend −10Y)
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                Fetches 10 years before the oldest existing data. Run twice to reach 20Y total.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 w-full justify-center"
                disabled={usBackfill.loading}
                onClick={() =>
                  usBackfill.execute("/api/admin/sync/us/backfill", {
                    body: { universe: usUniverse, years: 10 },
                  })
                }
              >
                {usBackfill.loading ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <DownloadCloudIcon className="size-3.5" />
                )}
                {usBackfill.loading
                  ? `Backfilling ${usUniverse}...`
                  : `Backfill ${usUniverse} — Extend −10Y`}
              </Button>
              {usBackfill.result && (
                <ResultBanner result={usBackfill.result} />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Daily Incremental Sync
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 w-full justify-center"
                disabled={usDaily.loading}
                onClick={() =>
                  usDaily.execute("/api/admin/sync/us/daily", {
                    body: { universe: usUniverse },
                  })
                }
              >
                {usDaily.loading ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <PlayIcon className="size-3.5" />
                )}
                {usDaily.loading
                  ? `Syncing ${usUniverse}...`
                  : `Sync Today — ${usUniverse}`}
              </Button>
              {usDaily.result && (
                <ResultBanner result={usDaily.result} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function SectionHeader({
  icon,
  title,
  description,
  badge,
}: {
  icon: React.ReactNode
  title: string
  description: string
  badge?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      {badge}
    </div>
  )
}

function StatusBadge({ status }: { status: "connected" | "expired" | "disconnected" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        status === "connected" &&
          "bg-bull/10 text-bull",
        status === "expired" &&
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        status === "disconnected" &&
          "bg-destructive/10 text-destructive"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "connected" && "bg-bull",
          status === "expired" && "bg-yellow-500 animate-pulse",
          status === "disconnected" && "bg-destructive"
        )}
      />
      {status === "connected"
        ? "Connected"
        : status === "expired"
          ? "Token Expired"
          : "Disconnected"}
    </span>
  )
}

function MetricCard({
  label,
  value,
  icon,
  accent,
  small,
}: {
  label: string
  value: string
  icon: React.ReactNode
  accent?: "bull" | "bear"
  small?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/50 bg-card px-3 py-2.5",
        accent === "bull" && "border-bull/30 bg-bull/5"
      )}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "font-mono font-semibold font-num",
          small ? "text-sm" : "text-lg",
          accent === "bull" && "text-bull"
        )}
      >
        {value}
      </div>
    </div>
  )
}

function ActionCard({
  label,
  loadingLabel,
  icon,
  flag,
  loading,
  onClick,
}: {
  label: string
  loadingLabel: string
  icon: React.ReactNode
  flag: "IN" | "US"
  loading: boolean
  onClick: () => void
}) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-4 transition-all",
        "hover:bg-muted/50 hover:border-border active:scale-[0.98]",
        "disabled:opacity-50 disabled:pointer-events-none"
      )}
    >
      <div className="relative">
        {loading ? (
          <Loader2Icon className="size-5 animate-spin text-primary" />
        ) : (
          <div className="text-primary">{icon}</div>
        )}
        <span
          className={cn(
            "absolute -top-1 -right-3 text-[9px] font-bold rounded px-1 py-px",
            flag === "IN"
              ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
              : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
          )}
        >
          {flag}
        </span>
      </div>
      <span className="text-xs font-medium">
        {loading ? loadingLabel : label}
      </span>
    </button>
  )
}

function CoverageBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pct >= 95
              ? "bg-bull"
              : pct >= 50
                ? "bg-yellow-500"
                : pct > 0
                  ? "bg-orange-500"
                  : "bg-destructive"
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className="text-[10px] font-mono font-num text-muted-foreground w-8 text-right">
        {pct}%
      </span>
    </div>
  )
}

function DataStatusDot({ member }: { member: UniverseMember }) {
  if (member.barCount === 0) {
    return (
      <span className="inline-flex items-center justify-center" title="No data">
        <XCircleIcon className="size-3.5 text-destructive" />
      </span>
    )
  }
  if (member.isUpToDate && member.has20YearHistory) {
    return (
      <span className="inline-flex items-center justify-center" title="Complete: 20Y + up to date">
        <CheckCircle2Icon className="size-3.5 text-bull" />
      </span>
    )
  }
  if (member.isUpToDate && member.has10YearHistory) {
    return (
      <span className="inline-flex items-center justify-center" title="10Y history, up to date — run backfill to extend to 20Y">
        <CheckCircle2Icon className="size-3.5 text-primary" />
      </span>
    )
  }
  if (member.isUpToDate) {
    return (
      <span className="inline-flex items-center justify-center" title="Up to date but missing older data">
        <AlertCircleIcon className="size-3.5 text-yellow-500" />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center" title="Data is stale">
      <AlertCircleIcon className="size-3.5 text-orange-500" />
    </span>
  )
}

function ResultBanner({
  result,
  className,
}: {
  result: ActionResult
  className?: string
}) {
  const isError = !!result.error
  const entries = Object.entries(result).filter(
    ([k]) => !["success", "error"].includes(k)
  )

  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2.5 text-xs",
        isError
          ? "border-destructive/30 bg-destructive/5"
          : "border-bull/30 bg-bull/5",
        className
      )}
    >
      {isError ? (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircleIcon className="size-3.5 shrink-0" />
          <span>{result.error as string}</span>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <CheckCircle2Icon className="size-3.5 text-bull" />
            Done
          </span>
          {entries.map(([key, val]) => {
            if (Array.isArray(val) && val.length === 0) return null
            // Handle nested objects (e.g. india: { inserted: 5, ... })
            if (val && typeof val === "object" && !Array.isArray(val)) {
              const subEntries = Object.entries(val).filter(
                ([, v]) => !(Array.isArray(v) && v.length === 0)
              )
              if (subEntries.length === 0) return null
              return (
                <span key={key} className="text-muted-foreground">
                  <span className="text-foreground font-medium">{key}:</span>{" "}
                  {subEntries.map(([sk, sv]) => {
                    const svDisplay = Array.isArray(sv) ? sv.join(", ") : String(sv)
                    return `${sk}: ${svDisplay}`
                  }).join(" · ")}
                </span>
              )
            }
            const display = Array.isArray(val) ? val.join(", ") : String(val)
            return (
              <span key={key} className="text-muted-foreground">
                <span className="text-foreground">{key}:</span> {display}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// FEEDBACK SECTION
// ═══════════════════════════════════════════════════════════════════

type FeedbackItem = {
  id: string
  category: string
  message: string
  isRead: boolean
  createdAt: string
  user: { email: string | null; name: string | null; image: string | null }
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: typeof BugIcon; color: string; bg: string }> = {
  bug: { label: "BUG", icon: BugIcon, color: "text-bear", bg: "bg-bear/10 border-bear/20" },
  feature: { label: "FEATURE", icon: LightbulbIcon, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  general: { label: "GENERAL", icon: MessageCircleIcon, color: "text-muted-foreground", bg: "bg-muted/50 border-border/30" },
}

function formatFeedbackTime(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDays = Math.floor(diffHr / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
}

function FeedbackSection() {
  const [items, setItems] = useState<FeedbackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [markingRead, setMarkingRead] = useState<Set<string>>(new Set())

  const fetchFeedback = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/feedback?unreadOnly=${showAll ? "0" : "1"}&limit=50`)
      const data = await res.json()
      setItems(data.items ?? [])
      setUnreadCount(data.unreadCount ?? 0)
      setTotal(data.total ?? 0)
    } finally {
      setLoading(false)
    }
  }, [showAll])

  useEffect(() => { fetchFeedback() }, [fetchFeedback])

  async function handleMarkRead(id: string) {
    setMarkingRead((prev) => new Set(prev).add(id))
    try {
      await fetch("/api/feedback", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      setItems((prev) => prev.map((f) => f.id === id ? { ...f, isRead: true } : f))
      setUnreadCount((prev) => Math.max(0, prev - 1))
      if (!showAll) {
        setItems((prev) => prev.filter((f) => f.id !== id))
      }
    } finally {
      setMarkingRead((prev) => { const n = new Set(prev); n.delete(id); return n })
    }
  }

  async function handleMarkAllRead() {
    const unreadIds = items.filter((f) => !f.isRead).map((f) => f.id)
    if (unreadIds.length === 0) return
    setMarkingRead(new Set(unreadIds))
    try {
      await fetch("/api/feedback", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: unreadIds }),
      })
      if (showAll) {
        setItems((prev) => prev.map((f) => ({ ...f, isRead: true })))
      } else {
        setItems([])
      }
      setUnreadCount(0)
    } finally {
      setMarkingRead(new Set())
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <MailIcon className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">User Feedback</h2>
            <p className="text-[11px] text-muted-foreground font-mono">
              {unreadCount > 0 ? (
                <><span className="text-primary font-bold">{unreadCount}</span> unread of {total} total</>
              ) : (
                <>{total} total — all read</>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`
              inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-all
              ${showAll
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/30 bg-background text-muted-foreground hover:text-foreground"
              }
            `}
          >
            <EyeIcon className="size-3" />
            {showAll ? "All" : "Unread"}
          </button>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] gap-1.5"
              onClick={handleMarkAllRead}
            >
              <CheckIcon className="size-3" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MessageSquareIcon className="size-8 mb-3 opacity-30" />
          <p className="text-sm">{showAll ? "No feedback yet" : "No unread feedback"}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/30 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/20">
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold w-[180px]">User</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold w-[90px]">Type</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold">Message</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold w-[90px] text-right">When</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const cat = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.general
                const CatIcon = cat.icon
                const isExpanded = expandedId === item.id

                return (
                  <TableRow
                    key={item.id}
                    className={cn(
                      "border-border/10 cursor-pointer transition-colors",
                      !item.isRead && "bg-primary/[0.02]",
                      isExpanded && "bg-surface"
                    )}
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  >
                    <TableCell className="py-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        {!item.isRead && (
                          <span className="flex size-1.5 shrink-0">
                            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">
                            {item.user.name ?? "—"}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono truncate">
                            {item.user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${cat.bg} ${cat.color}`}>
                        <CatIcon className="size-2.5" />
                        {cat.label}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <p className={cn(
                        "text-xs text-muted-foreground",
                        isExpanded ? "whitespace-pre-wrap" : "truncate max-w-[400px]"
                      )}>
                        {item.message}
                      </p>
                    </TableCell>
                    <TableCell className="py-2.5 text-right">
                      <span className="text-[10px] font-mono text-muted-foreground/70">
                        {formatFeedbackTime(item.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5">
                      {!item.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          disabled={markingRead.has(item.id)}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkRead(item.id)
                          }}
                        >
                          {markingRead.has(item.id) ? (
                            <Loader2Icon className="size-3 animate-spin" />
                          ) : (
                            <CheckIcon className="size-3 text-bull" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════
export default function AdminPanelPage() {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2Icon className="size-6 text-primary animate-spin" />
      </div>
    )
  }

  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-sm text-muted-foreground">
        <ShieldCheckIcon className="size-8 mb-3 text-muted-foreground/50" />
        <p>Admin access required.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Sticky Header + Tabs Nav */}
      <Tabs defaultValue="overview" className="flex flex-col h-full gap-0">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40">
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <GlobeIcon className="size-4 text-primary" />
              </div>
              <h1 className="text-base font-semibold tracking-tight">Admin Panel</h1>
            </div>
          </div>
          <div className="px-6 pb-0">
            <TabsList variant="line" className="gap-0">
              <TabsTrigger value="overview" className="px-4 text-xs">
                <ScanSearchIcon className="size-3.5" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="explorer" className="px-4 text-xs">
                <LayersIcon className="size-3.5" />
                Data Explorer
              </TabsTrigger>
              <TabsTrigger value="sync" className="px-4 text-xs">
                <CloudDownloadIcon className="size-3.5" />
                Sync & Backfill
              </TabsTrigger>
              <TabsTrigger value="feedback" className="px-4 text-xs">
                <MessageSquareIcon className="size-3.5" />
                Feedback
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab: Overview */}
        <TabsContent value="overview" className="flex-1 overflow-auto">
          <div className="flex flex-col gap-8 px-6 py-6 w-full">
            <StrategyScannerSection />
          </div>
        </TabsContent>

        {/* Tab: Data Explorer */}
        <TabsContent value="explorer" className="flex-1 overflow-auto">
          <div className="flex flex-col gap-6 px-6 py-6 w-full">
            <UniverseExplorerSection />
          </div>
        </TabsContent>

        {/* Tab: Sync & Backfill */}
        <TabsContent value="sync" className="flex-1 overflow-auto">
          <div className="flex flex-col gap-6 px-6 py-6 w-full">
            <SyncBackfillSection />
          </div>
        </TabsContent>

        {/* Tab: Feedback */}
        <TabsContent value="feedback" className="flex-1 overflow-auto">
          <div className="flex flex-col gap-6 px-6 py-6 w-full">
            <FeedbackSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
