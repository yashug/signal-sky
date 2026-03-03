import { Loader2Icon } from "lucide-react"

export default function MarketHealthLoading() {
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2Icon className="size-5 text-primary animate-spin" />
    </div>
  )
}
