import { Loader2Icon } from "lucide-react"

export default function BacktestsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2Icon className="size-6 text-primary animate-spin" />
      <span className="text-sm text-muted-foreground">Loading backtests...</span>
    </div>
  )
}
