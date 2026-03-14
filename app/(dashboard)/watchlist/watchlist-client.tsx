"use client"

import { useState } from "react"
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
  BellIcon,
  BellOffIcon,
  BellRingIcon,
} from "lucide-react"
import type { WatchlistItemData } from "@/lib/data/watchlist"
import {
  useWatchlist,
  useWatchlistMutations,
  useUpdateWatchlistNotes,
  useUpdateWatchlistAlert,
  type WatchlistItem,
} from "@/hooks/use-watchlist"

type HeatStatus = "breakout" | "boiling" | "simmering" | "cooling"

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

export function WatchlistClient({ initialItems }: { initialItems: WatchlistItemData[] }) {
  // TanStack Query — shows initialItems instantly, refetches in background
  const { data: items = initialItems } = useWatchlist(initialItems as WatchlistItem[])
  const { remove } = useWatchlistMutations()
  const updateNotes = useUpdateWatchlistNotes()
  const updateAlert = useUpdateWatchlistAlert()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNotes, setEditNotes] = useState("")
  const [alertEditId, setAlertEditId] = useState<string | null>(null)
  const [alertPriceInput, setAlertPriceInput] = useState("")

  function startAlertEdit(item: WatchlistItem) {
    setAlertEditId(item.id)
    setAlertPriceInput(item.alertPrice ? String(item.alertPrice) : "")
  }

  function saveAlert(item: WatchlistItem) {
    const price = parseFloat(alertPriceInput)
    if (isNaN(price) || price <= 0) {
      updateAlert.mutate({ id: item.id, alertPrice: null, alertDirection: null })
    } else {
      const direction = price >= item.currentPrice ? "above" : "below"
      updateAlert.mutate({ id: item.id, alertPrice: price, alertDirection: direction as "above" | "below" })
    }
    setAlertEditId(null)
    setAlertPriceInput("")
  }

  function startEdit(item: WatchlistItem) {
    setEditingId(item.id)
    setEditNotes(item.notes)
  }

  function saveEdit(id: string) {
    updateNotes.mutate({ id, notes: editNotes })
    setEditingId(null)
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-5">
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

      {items.length === 0 ? (
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
        <Card className="border-border/40 bg-surface overflow-x-auto">
          <CardContent className="p-0">
            <div className="min-w-[700px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/30 hover:bg-transparent">
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 w-10" />
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Symbol</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Price</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Return</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">EMA 200</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Dist. to ATH</TableHead>
                  <TableHead className="h-9 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">Alert</TableHead>
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
                        {item.priceAtAdd && item.currentPrice > 0 ? (() => {
                          const ret = ((item.currentPrice - item.priceAtAdd) / item.priceAtAdd) * 100
                          const isPos = ret >= 0
                          return (
                            <Tooltip>
                              <TooltipTrigger className="text-left">
                                <span className={cn(
                                  "font-mono text-sm font-semibold tabular-nums",
                                  isPos ? "text-bull" : "text-bear"
                                )}>
                                  {isPos ? "+" : ""}{ret.toFixed(1)}%
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p className="text-xs font-semibold">
                                  {isPos ? "+" : ""}{ret.toFixed(2)}% since added
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Added at {currency}{item.priceAtAdd.toLocaleString(undefined, { maximumFractionDigits: 2 })} · Now {currency}{item.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          )
                        })() : (
                          <span className="font-mono text-sm text-muted-foreground/40">—</span>
                        )}
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
                      {/* Alert cell */}
                      <TableCell className="px-3 py-2.5">
                        {alertEditId === item.id ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={alertPriceInput}
                              onChange={(e) => setAlertPriceInput(e.target.value)}
                              placeholder="price"
                              className="h-7 w-24 text-[16px] sm:text-xs bg-background font-mono"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveAlert(item)
                                if (e.key === "Escape") setAlertEditId(null)
                              }}
                            />
                            <Button variant="ghost" size="icon-xs" onClick={() => saveAlert(item)}>
                              <CheckIcon className="size-3 text-bull" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" onClick={() => setAlertEditId(null)}>
                              <XIcon className="size-3" />
                            </Button>
                          </div>
                        ) : item.alertPrice ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                type="button"
                                onClick={() => startAlertEdit(item)}
                                className="flex items-center gap-1"
                              >
                                {item.alertTriggeredAt ? (
                                  <BellRingIcon className="size-3 text-heat-boiling" />
                                ) : (
                                  <BellIcon className="size-3 text-primary" />
                                )}
                                <span className="font-mono text-[11px] text-primary">
                                  {item.exchange === "NSE" ? "₹" : "$"}{item.alertPrice.toLocaleString()}
                                </span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="text-xs font-semibold">
                                Alert: notify when price goes {item.alertDirection} {item.exchange === "NSE" ? "₹" : "$"}{item.alertPrice}
                              </p>
                              {item.alertTriggeredAt && (
                                <p className="text-xs text-muted-foreground">Triggered {new Date(item.alertTriggeredAt).toLocaleDateString()}</p>
                              )}
                              <p className="text-[10px] text-muted-foreground mt-0.5">Click to edit</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                type="button"
                                onClick={() => startAlertEdit(item)}
                                className="text-muted-foreground/30 hover:text-muted-foreground transition-colors"
                              >
                                <BellOffIcon className="size-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="text-xs">Click to set a price alert</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </TableCell>

                      <TableCell className="px-3 py-2.5 max-w-[200px]">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              className="h-7 text-[16px] sm:text-xs bg-background"
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
                          onClick={() => remove.mutate({ id: item.id, symbol: item.symbol })}
                        >
                          <Trash2Icon className="size-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
