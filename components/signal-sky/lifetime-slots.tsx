"use client"

import { useState, useEffect } from "react"
import { UsersIcon } from "lucide-react"

export function LifetimeSlots() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/deals/lifetime")
      .then((r) => r.json())
      .then((data) => setRemaining(data.remaining ?? null))
      .catch(() => {})
  }, [])

  if (remaining === null) {
    return (
      <div className="rounded-lg border border-heat-simmering/20 bg-heat-simmering/[0.04] p-2.5 mb-4">
        <div className="h-2 rounded-full bg-muted animate-pulse" />
      </div>
    )
  }

  const sold = 100 - remaining

  return (
    <div className="rounded-lg border border-heat-simmering/20 bg-heat-simmering/[0.04] p-2.5 mb-4">
      <div className="flex items-center gap-1.5 mb-1.5">
        <UsersIcon className="size-3 text-heat-simmering" />
        <span className="text-[10px] font-semibold text-foreground">
          Only 100 seats available
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-1">
        <div
          className="h-full rounded-full bg-gradient-to-r from-heat-simmering to-heat-boiling transition-all"
          style={{ width: `${(sold / 100) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold text-heat-simmering">
          {remaining} spots left
        </span>
        <span className="text-[9px] text-muted-foreground">
          {sold} claimed
        </span>
      </div>
    </div>
  )
}
