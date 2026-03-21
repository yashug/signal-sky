import { Suspense } from "react"
import { getBacktests } from "@/lib/data/backtests"
import { getUniverseMemberships } from "@/lib/data/signals"
import { BacktestsClient } from "./backtests-client"
import { UNIVERSE_OPTIONS } from "@/lib/universes"
import { Loader2Icon, BarChart3Icon } from "lucide-react"

const validUniverses = UNIVERSE_OPTIONS.map((o) => o.value)
const validSlingshotWindows = ["30", "60", "90"] as const
type SlingshotWindow = (typeof validSlingshotWindows)[number] | null

function BacktestsSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2Icon className="size-6 text-primary animate-spin" />
      <span className="text-sm text-muted-foreground">
        Loading backtests...
      </span>
    </div>
  )
}

async function BacktestsData({
  searchParams,
}: {
  searchParams: Promise<{ universe?: string; slingshot?: string }>
}) {
  const params = await searchParams
  const initialUniverse =
    params.universe && validUniverses.includes(params.universe as any)
      ? params.universe
      : "nifty50"

  const slingshotParam = params.slingshot
  const initialSlingshot: SlingshotWindow =
    slingshotParam && validSlingshotWindows.includes(slingshotParam as any)
      ? (slingshotParam as SlingshotWindow)
      : null

  const parametersHash = initialSlingshot
    ? `v2-ath-ema220-s${initialSlingshot}`
    : "v2-ath-ema220"

  try {
    const [data, universeMemberships] = await Promise.all([
      getBacktests("all", parametersHash),
      getUniverseMemberships(),
    ])
    return (
      <BacktestsClient
        data={data}
        initialUniverse={initialUniverse}
        initialSlingshot={initialSlingshot}
        universeMemberships={universeMemberships}
      />
    )
  } catch (e: any) {
    return (
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
          {e.message || "Could not load backtest data"}
        </p>
      </div>
    )
  }
}

export default function BacktestsPage({
  searchParams,
}: {
  searchParams: Promise<{ universe?: string; slingshot?: string }>
}) {
  return (
    <Suspense fallback={<BacktestsSkeleton />}>
      <BacktestsData searchParams={searchParams} />
    </Suspense>
  )
}
