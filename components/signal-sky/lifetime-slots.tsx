import { UsersIcon } from "lucide-react"
import type { LifetimeDealInfo } from "@/lib/data/deals"

export function LifetimeSlots({ deal }: { deal: LifetimeDealInfo }) {
  return (
    <div className="rounded-lg border border-heat-simmering/20 bg-heat-simmering/[0.04] p-2.5 mb-4">
      <div className="flex items-center gap-1.5 mb-1.5">
        <UsersIcon className="size-3 text-heat-simmering" />
        <span className="text-[10px] font-semibold text-foreground">
          Only {deal.cap} seats available
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-1">
        <div
          className="h-full rounded-full bg-gradient-to-r from-heat-simmering to-heat-boiling transition-all"
          style={{ width: `${(deal.sold / deal.cap) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold text-heat-simmering">
          {deal.remaining} spots left
        </span>
        <span className="text-[9px] text-muted-foreground">
          {deal.sold} claimed
        </span>
      </div>
    </div>
  )
}
