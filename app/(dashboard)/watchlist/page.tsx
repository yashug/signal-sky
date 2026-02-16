"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import {
  StarIcon,
  Trash2Icon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  FlameIcon,
  ThermometerIcon,
  TrendingUpIcon,
  RocketIcon,
  CheckIcon,
  XIcon,
  Loader2Icon,
  AlertCircleIcon,
} from "lucide-react"

type HeatStatus = "breakout" | "boiling" | "simmering" | "cooling"

type WatchlistItem = {
  id: string
  symbol: string
  name: string
  exchange: string
  addedAt: string
  notes: string
  currentPrice: number
  ema200: number
  ath: number
  heat: HeatStatus
  distanceToBreakout: number
}

function HeatDot({ heat }: { heat: HeatStatus }) {
  const config = {
    breakout: { icon: RocketIcon, className: "text-heat-breakout" },
    boiling: { icon: FlameIcon, className: "text-heat-boiling" },
    simmering: { icon: ThermometerIcon, className: "text-heat-simmering" },
    cooling: { icon: TrendingUpIcon, className: "text-heat-cooling" },
  }
  const c = config[heat]
  return <c.icon className={cn("size-3.5", c.className)} />
}

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNotes, setEditNotes] = useState("")

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/watchlist")
      if (!res.ok) throw new Error("Failed to fetch watchlist")
      const data = await res.json()
      setItems(data.items ?? [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on mount
  useState(() => { fetchItems() })

  async function removeItem(id: string) {
    const item = items.find(i => i.id === id)
    try {
      const res = await fetch(`/api/watchlist/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to remove")
      setItems(prev => prev.filter(i => i.id !== id))
      if (item) toast(`Removed ${item.symbol} from watchlist`)
    } catch {
      toast.error("Failed to remove from watchlist")
    }
  }

  function startEdit(item: WatchlistItem) {
    setEditingId(item.id)
    setEditNotes(item.notes)
  }

  async function saveEdit(id: string) {
    try {
      const res = await fetch(`/api/watchlist/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: editNotes }),
      })
      if (!res.ok) throw new Error("Failed to update")
      setItems(prev => prev.map(i => i.id === id ? { ...i, notes: editNotes } : i))
      setEditingId(null)
      toast("Notes updated")
    } catch {
      toast.error("Failed to update notes")
    }
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <StarIcon className="size-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Watchlist</h1>
          <p className="text-xs text-muted-foreground">
            {items.length} symbols tracked — click the star in Scanner to add more
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2Icon className="size-6 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Loading watchlist...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <AlertCircleIcon className="size-6 text-bear" />
          <span className="text-sm text-muted-foreground">Failed to load watchlist</span>
          <span className="text-xs text-muted-foreground/60">{error}</span>
        </div>
      ) : items.length === 0 ? (
        <Card className="border-border/40 bg-surface">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
              <StarIcon className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No watchlist items yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1 max-w-xs">
              Click the star icon on any signal in the Scanner to add it to your watchlist.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/40 bg-surface">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/30 hover:bg-transparent">
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 w-10" />
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Symbol</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Price</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">EMA 200</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Dist. to ATH</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Notes</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Added</TableHead>
                  <TableHead className="h-9 w-16 px-3" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const currency = item.exchange === "NSE" ? "₹" : "$"
                  const isAbove = item.currentPrice > item.ema200
                  return (
                    <TableRow key={item.id} className="border-b border-border/15 hover:bg-surface-raised/50">
                      <TableCell className="px-4 py-2.5">
                        <HeatDot heat={item.heat} />
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <div className="flex flex-col">
                          <span className="font-mono text-sm font-semibold">
                            {item.symbol.replace(".NS", "")}
                          </span>
                          <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          {isAbove ? (
                            <ArrowUpRightIcon className="size-3 text-bull" />
                          ) : (
                            <ArrowDownRightIcon className="size-3 text-bear" />
                          )}
                          <span className={cn("font-mono text-sm font-medium", isAbove ? "text-bull" : "text-bear")}>
                            {currency}{item.currentPrice.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <span className="font-mono text-sm text-muted-foreground">
                          {currency}{item.ema200.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-14 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                item.distanceToBreakout < 0 ? "bg-heat-breakout" : item.distanceToBreakout <= 2 ? "bg-heat-boiling" : item.distanceToBreakout <= 5 ? "bg-heat-simmering" : "bg-heat-cooling"
                              )}
                              style={{ width: `${Math.max(5, Math.min(100, 100 - item.distanceToBreakout * 3))}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            {item.distanceToBreakout.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2.5 max-w-[200px]">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              className="h-7 text-xs bg-background"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit(item.id)
                                if (e.key === "Escape") setEditingId(null)
                              }}
                            />
                            <Button variant="ghost" size="icon-xs" onClick={() => saveEdit(item.id)}>
                              <CheckIcon className="size-3 text-bull" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" onClick={() => setEditingId(null)}>
                              <XIcon className="size-3" />
                            </Button>
                          </div>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                className="text-xs text-muted-foreground truncate block max-w-[180px] cursor-pointer hover:text-foreground"
                                onClick={() => startEdit(item)}
                              >
                                {item.notes || "Add notes..."}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>{item.notes || "Click to add notes"}</TooltipContent>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {new Date(item.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="size-6 text-muted-foreground hover:text-bear"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2Icon className="size-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
