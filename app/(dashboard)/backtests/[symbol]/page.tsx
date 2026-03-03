import { Suspense } from "react"
import { getBacktestDetail } from "@/lib/data/backtests"
import { BacktestDetailClient } from "./backtest-detail-client"
import { Loader2Icon, AlertCircleIcon, ArrowLeftIcon, ZapIcon } from "lucide-react"
import Link from "next/link"

function BacktestDetailSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <Loader2Icon className="size-6 text-primary animate-spin" />
      <span className="text-sm text-muted-foreground">Loading backtest...</span>
    </div>
  )
}

async function BacktestDetailResolver({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  const { symbol } = await params
  const decodedSymbol = decodeURIComponent(symbol)
  const detail = await getBacktestDetail(decodedSymbol)

  return <BacktestDetailClient detail={detail} symbol={decodedSymbol} />
}

export default function BacktestDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  return (
    <Suspense fallback={<BacktestDetailSkeleton />}>
      <BacktestDetailResolver params={params} />
    </Suspense>
  )
}
