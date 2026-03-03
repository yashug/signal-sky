import { Suspense } from "react"
import { getSignalBySymbol, getSignalChart } from "@/lib/data/signals"
import { SignalDetailClient } from "./signal-detail-client"
import { Loader2Icon, AlertCircleIcon, ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

function SignalDetailSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <Loader2Icon className="size-6 text-primary animate-spin" />
      <span className="text-sm text-muted-foreground">Loading signal...</span>
    </div>
  )
}

async function SignalDetailResolver({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  const { symbol } = await params
  const decodedSymbol = decodeURIComponent(symbol)
  const signal = await getSignalBySymbol(decodedSymbol)

  if (!signal) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex size-16 items-center justify-center rounded-full border border-bear/20 bg-bear/5">
          <AlertCircleIcon className="size-7 text-bear/60" />
        </div>
        <h3 className="text-base font-semibold">Signal Not Found</h3>
        <p className="text-sm text-muted-foreground max-w-xs text-center">
          No active signal found for {decodedSymbol.replace(".NS", "")}
        </p>
        <Link
          href="/scanner"
          className="text-sm text-primary hover:underline flex items-center gap-1.5"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to Scanner
        </Link>
      </div>
    )
  }

  let chartData = null
  try {
    chartData = await getSignalChart(signal.id)
    if (chartData.priceHistory.length === 0) chartData = null
  } catch {
    chartData = null
  }

  return <SignalDetailClient signal={signal} chartData={chartData} />
}

export default function SignalDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  return (
    <Suspense fallback={<SignalDetailSkeleton />}>
      <SignalDetailResolver params={params} />
    </Suspense>
  )
}
