import { Suspense } from "react"
import { getMarketHealth } from "@/lib/data/market-health"
import { MarketHealthClient } from "./market-health-client"
import { Loader2Icon, HeartPulseIcon, WifiOffIcon } from "lucide-react"

function MarketHealthSkeleton() {
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2Icon className="size-5 text-primary animate-spin" />
    </div>
  )
}

async function MarketHealthData() {
  try {
    const data = await getMarketHealth()
    return <MarketHealthClient data={data} />
  } catch (e: any) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-0">
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-bear/5 animate-ping" style={{ animationDuration: "2.5s" }} />
          <div className="relative flex size-14 items-center justify-center rounded-full border border-bear/20 bg-bear/5">
            <WifiOffIcon className="size-6 text-bear/60" />
          </div>
        </div>
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          Data Unavailable
        </h3>
        <p className="mt-1.5 max-w-xs text-center text-xs text-muted-foreground leading-relaxed">
          {e.message || "Could not load market health data"}
        </p>
      </div>
    )
  }
}

export default async function MarketHealthPage() {
  return (
    <Suspense fallback={<MarketHealthSkeleton />}>
      <MarketHealthData />
    </Suspense>
  )
}
