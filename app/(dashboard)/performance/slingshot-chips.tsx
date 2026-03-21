"use client"

import Link from "next/link"
import { ZapIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const chipOptions = [
  { value: null, label: "Baseline", href: "/performance" },
  { value: "30", label: "≤30d", href: "/performance?slingshot=30" },
  { value: "60", label: "≤60d", href: "/performance?slingshot=60" },
  { value: "90", label: "≤90d", href: "/performance?slingshot=90" },
] as const

export function SlingshotChips({ active }: { active: string | null }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<div />}>
        <div className="flex items-center gap-2">
          <ZapIcon className={cn("size-3 transition-colors", active ? "text-primary" : "text-muted-foreground/40")} />
          <span className={cn("text-[9px] font-bold uppercase tracking-widest hidden sm:block", active ? "text-primary/90" : "text-muted-foreground/40")}>
            Slingshot
          </span>
          <div className="flex gap-0.5 rounded-md border border-border/25 bg-muted/20 p-0.5">
            {chipOptions.map((opt) => (
              <Link
                key={String(opt.value)}
                href={opt.href}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-semibold transition-colors",
                  active === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[260px]">
        <p className="text-xs font-semibold mb-1">⚡ Slingshot Filter</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Filter by how quickly the stock broke its pre-set ATH after reclaiming EMA220.
          Faster breakouts = stronger momentum. Each window is a fully independent backtest,
          not a post-hoc filter on the baseline.
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
