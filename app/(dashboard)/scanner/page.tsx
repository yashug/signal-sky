import { Suspense } from "react"
import { getSignals, getUniverseMemberships } from "@/lib/data/signals"
import { getBacktestStatsMap } from "@/lib/data/backtests"
import { ScannerClient } from "./scanner-client"
import { UNIVERSE_OPTIONS } from "@/lib/universes"
import { Loader2Icon, CrosshairIcon } from "lucide-react"

const validUniverses = UNIVERSE_OPTIONS.map((o) => o.value)

function ScannerSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2Icon className="size-6 text-primary animate-spin" />
      <span className="text-sm text-muted-foreground">Loading signals...</span>
    </div>
  )
}

async function ScannerData({
  searchParams,
}: {
  searchParams: Promise<{ universe?: string; heat?: string }>
}) {
  const params = await searchParams
  const initialUniverse =
    params.universe && validUniverses.includes(params.universe as any)
      ? params.universe
      : "nifty50"

  try {
    const [data, universeMemberships, backtestStats] = await Promise.all([
      getSignals("all"),
      getUniverseMemberships(),
      getBacktestStatsMap(),
    ])
    return (
      <ScannerClient
        data={data}
        initialUniverse={initialUniverse}
        universeMemberships={universeMemberships}
        backtestStats={backtestStats}
      />
    )
  } catch (e: any) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-0">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-bear/5 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="relative flex size-16 items-center justify-center rounded-full border border-bear/20 bg-bear/5">
            <CrosshairIcon className="size-7 text-bear/60" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground tracking-tight">Scanner Offline</h3>
        <p className="mt-1.5 max-w-xs text-center text-sm text-muted-foreground leading-relaxed">
          {e.message || "Could not load signals"}
        </p>
      </div>
    )
  }
}

export default function ScannerPage({
  searchParams,
}: {
  searchParams: Promise<{ universe?: string; heat?: string }>
}) {
  return (
    <Suspense fallback={<ScannerSkeleton />}>
      <ScannerData searchParams={searchParams} />
    </Suspense>
  )
}
