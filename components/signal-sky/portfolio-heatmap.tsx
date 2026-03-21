"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import type { JournalTradeData } from "@/lib/data/journal"

// ─── Treemap layout (squarified algorithm) ─────────────────────────────────

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

type LayoutItem = JournalTradeData & Rect & { area: number; positionValue: number; pnlPct: number; unrealizedPnl: number }

function worstAspect(row: { area: number }[], thickness: number): number {
  if (thickness === 0) return Infinity
  let worst = 0
  for (const item of row) {
    const len = item.area / thickness
    const ratio = len === 0 ? Infinity : Math.max(thickness / len, len / thickness)
    worst = Math.max(worst, ratio)
  }
  return worst
}

function layoutRow(
  row: LayoutItem[],
  x: number, y: number,
  w: number, h: number,
  isHorizontal: boolean,
  thickness: number,
  out: LayoutItem[]
) {
  let offset = 0
  for (const item of row) {
    const len = thickness > 0 ? item.area / thickness : 0
    if (isHorizontal) {
      out.push({ ...item, x, y: y + offset, width: thickness, height: len })
      offset += len
    } else {
      out.push({ ...item, x: x + offset, y, width: len, height: thickness })
      offset += len
    }
  }
}

function squarify(
  items: LayoutItem[],
  x: number, y: number,
  w: number, h: number,
  out: LayoutItem[]
) {
  if (items.length === 0 || w <= 0 || h <= 0) return

  if (items.length === 1) {
    out.push({ ...items[0], x, y, width: w, height: h })
    return
  }

  const isHorizontal = w >= h
  const rowLength = isHorizontal ? h : w

  let row: LayoutItem[] = []
  const remaining = [...items]

  while (remaining.length > 0) {
    const next = remaining[0]
    const candidate = [...row, next]

    if (row.length === 0 || worstAspect(row, rowLength) >= worstAspect(candidate, rowLength)) {
      row.push(next)
      remaining.shift()
    } else {
      const rowArea = row.reduce((s, i) => s + i.area, 0)
      const thickness = rowArea / rowLength
      layoutRow(row, x, y, w, h, isHorizontal, thickness, out)

      if (isHorizontal) { x += thickness; w -= thickness }
      else { y += thickness; h -= thickness }

      row = []
    }
  }

  if (row.length > 0) {
    const rowArea = row.reduce((s, i) => s + i.area, 0)
    const thickness = rowLength > 0 ? rowArea / rowLength : 0
    layoutRow(row, x, y, w, h, isHorizontal, thickness, out)
  }
}

function computeTreemap(trades: JournalTradeData[], cw: number, ch: number): LayoutItem[] {
  if (trades.length === 0 || cw <= 0 || ch <= 0) return []

  const enriched = trades.map((t) => {
    const positionValue = t.entryPrice * t.quantity
    const unrealizedPnl = (t.currentPrice - t.entryPrice) * t.quantity
    const pnlPct = ((t.currentPrice - t.entryPrice) / t.entryPrice) * 100
    return { ...t, positionValue, unrealizedPnl, pnlPct, area: 0, x: 0, y: 0, width: 0, height: 0 }
  })

  const total = enriched.reduce((s, i) => s + i.positionValue, 0)
  if (total === 0) return []

  const totalArea = cw * ch
  const sorted = enriched
    .filter((i) => i.positionValue > 0)
    .sort((a, b) => b.positionValue - a.positionValue)
    .map((i) => ({ ...i, area: (i.positionValue / total) * totalArea }))

  const out: LayoutItem[] = []
  squarify(sorted, 0, 0, cw, ch, out)
  return out
}

// ─── Color scale ────────────────────────────────────────────────────────────

function getTileColors(pct: number, emaBreach: boolean): { bg: string; text: string; border: string } {
  if (emaBreach) return { bg: "rgba(127,29,29,0.9)", text: "#fca5a5", border: "rgba(239,68,68,0.5)" }
  if (pct <= -5)  return { bg: "rgba(120,20,20,0.9)", text: "#fca5a5", border: "rgba(185,28,28,0.6)" }
  if (pct <= -2)  return { bg: "rgba(153,27,27,0.85)", text: "#fca5a5", border: "rgba(220,38,38,0.5)" }
  if (pct < -0.3) return { bg: "rgba(87,13,13,0.85)", text: "#f87171", border: "rgba(239,68,68,0.3)" }
  if (pct <= 0.3) return { bg: "rgba(15,23,42,0.9)", text: "#64748b", border: "rgba(255,255,255,0.08)" }
  if (pct < 2)    return { bg: "rgba(5,46,22,0.85)", text: "#86efac", border: "rgba(34,197,94,0.3)" }
  if (pct < 5)    return { bg: "rgba(20,83,45,0.9)", text: "#86efac", border: "rgba(34,197,94,0.5)" }
  return           { bg: "rgba(22,101,52,0.95)", text: "#4ade80", border: "rgba(34,197,94,0.7)" }
}

// ─── Component ──────────────────────────────────────────────────────────────

interface TooltipData {
  trade: LayoutItem
  // screen-relative coordinates for positioning
  screenX: number
  screenY: number
}

const GAP = 2

export function PortfolioHeatmap({ trades }: { trades: JournalTradeData[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [layout, setLayout] = useState<LayoutItem[]>([])
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)

  const openTrades = trades.filter((t) => t.status === "open")

  const measure = useCallback(() => {
    if (!containerRef.current) return
    const { width, height } = containerRef.current.getBoundingClientRect()
    setDims({ w: Math.floor(width), h: Math.floor(height) })
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    if (dims.w > 0 && dims.h > 0) {
      setLayout(computeTreemap(openTrades, dims.w, dims.h))
    }
  }, [openTrades.length, dims.w, dims.h]) // eslint-disable-line react-hooks/exhaustive-deps

  const totalValue = openTrades.reduce((s, t) => s + t.entryPrice * t.quantity, 0)
  const totalPnl = openTrades.reduce((s, t) => s + (t.currentPrice - t.entryPrice) * t.quantity, 0)

  if (openTrades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-2xl mb-2">📭</div>
        <p className="text-sm text-muted-foreground font-medium">No open positions</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Log a trade from the Scanner to see your portfolio map.</p>
      </div>
    )
  }

  const currency = openTrades[0]?.exchange === "NSE" ? "₹" : "$"
  const fmtVal = (v: number) => {
    const sign = v >= 0 ? "+" : ""
    if (Math.abs(v) >= 100_000) return `${sign}${currency}${(v / 100_000).toFixed(1)}L`
    if (Math.abs(v) >= 1_000)   return `${sign}${currency}${Math.round(v / 1_000)}K`
    return `${sign}${currency}${Math.round(v).toLocaleString()}`
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Summary strip */}
      <div className="flex items-center gap-4 px-1 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Deployed</span>
          <span className="font-mono text-xs font-semibold tabular-nums">{currency}{Math.round(totalValue).toLocaleString()}</span>
        </div>
        <div className="h-3 w-px bg-border/40" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Unrealized</span>
          <span className={cn("font-mono text-xs font-semibold tabular-nums", totalPnl >= 0 ? "text-bull" : "text-bear")}>
            {totalPnl >= 0 ? "+" : ""}{currency}{Math.abs(Math.round(totalPnl)).toLocaleString()}
          </span>
        </div>
        <div className="h-3 w-px bg-border/40" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Positions</span>
          <span className="font-mono text-xs font-semibold tabular-nums">{openTrades.length}</span>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[10px] text-muted-foreground/50">
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[#166534]"></span>Profit</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[#1e293b]"></span>Flat</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[#991b1b]"></span>Loss</span>
        </div>
      </div>

      {/* Treemap container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-lg overflow-hidden border border-border/30"
        style={{ height: Math.max(220, Math.min(420, openTrades.length * 60)) }}
        onMouseLeave={() => setTooltip(null)}
      >
        {layout.map((item) => {
          const emaBreach = item.ema200 != null && item.currentPrice < item.ema200
          const colors = getTileColors(item.pnlPct, emaBreach)
          const showSymbol = item.width > 52 && item.height > 30
          const showPct = item.width > 52 && item.height > 44
          const showVal = item.width > 80 && item.height > 60
          const sym = item.symbol.replace(".NS", "")

          return (
            <div
              key={item.id}
              className="absolute cursor-default select-none transition-all duration-150 hover:brightness-125 hover:z-10"
              style={{
                left: item.x + GAP / 2,
                top: item.y + GAP / 2,
                width: Math.max(0, item.width - GAP),
                height: Math.max(0, item.height - GAP),
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
              }}
              onMouseEnter={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                setTooltip({
                  trade: item,
                  screenX: rect.left + rect.width / 2,
                  screenY: rect.top + rect.height / 2,
                })
              }}
            >
              {showSymbol && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-1 overflow-hidden">
                  <span
                    className="font-mono font-bold leading-none tracking-tight truncate w-full text-center"
                    style={{
                      color: colors.text,
                      fontSize: Math.min(14, Math.max(8, item.width / 5)),
                    }}
                  >
                    {sym}
                  </span>
                  {showPct && (
                    <span
                      className="font-mono font-semibold leading-none"
                      style={{
                        color: colors.text,
                        fontSize: Math.min(12, Math.max(8, item.width / 6)),
                        opacity: 0.9,
                      }}
                    >
                      {item.pnlPct >= 0 ? "+" : ""}{item.pnlPct.toFixed(2)}%
                    </span>
                  )}
                  {showVal && (
                    <span
                      className="font-mono leading-none"
                      style={{
                        color: colors.text,
                        fontSize: Math.min(10, Math.max(7, item.width / 8)),
                        opacity: 0.55,
                      }}
                    >
                      {fmtVal(item.unrealizedPnl)}
                    </span>
                  )}
                  {emaBreach && showPct && (
                    <span
                      className="font-mono font-bold leading-none"
                      style={{ color: "#fca5a5", fontSize: 8, opacity: 0.8 }}
                    >
                      ⚠ EMA
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}

      </div>

      {/* Tooltip rendered via portal — escapes overflow:hidden container */}
      {tooltip && typeof document !== "undefined" && createPortal(
        <HeatmapTooltip
          item={tooltip.trade}
          screenX={tooltip.screenX}
          screenY={tooltip.screenY}
        />,
        document.body
      )}
    </div>
  )
}

// ─── Tooltip (portal-based, pure inline styles) ─────────────────────────────

function HeatmapTooltip({
  item, screenX, screenY,
}: {
  item: LayoutItem
  screenX: number
  screenY: number
}) {
  const currency = item.exchange === "NSE" ? "₹" : "$"
  const emaBreach = item.ema200 != null && item.currentPrice < item.ema200
  const colors = getTileColors(item.pnlPct, emaBreach)

  const tooltipW = 220
  // Position below cursor, flip up if near bottom of viewport
  const vph = typeof window !== "undefined" ? window.innerHeight : 800
  const vpw = typeof window !== "undefined" ? window.innerWidth : 1200
  const flipUp = screenY + 16 + 220 > vph
  const left = Math.min(Math.max(screenX - tooltipW / 2, 8), vpw - tooltipW - 8)
  const top = flipUp ? screenY - 16 - 220 : screenY + 16

  const emaDistPct = item.ema200 != null
    ? (((item.currentPrice - item.ema200) / item.ema200) * 100).toFixed(1)
    : null

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        left,
        top,
        width: tooltipW,
        background: "rgba(8,12,16,0.98)",
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        pointerEvents: "none",
        fontFamily: "inherit",
        color: "#e2e8f0",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 12px 8px",
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: colors.text, flexShrink: 0 }}>
          {item.symbol.replace(".NS", "")}
        </span>
        <span style={{ fontSize: 10, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
          {item.name}
        </span>
        {emaBreach && (
          <span style={{ fontSize: 9, fontWeight: 700, color: "#f87171", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 4, padding: "2px 6px", flexShrink: 0 }}>
            ⚠ EMA
          </span>
        )}
      </div>

      {/* Stats */}
      <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
        <TooltipRow label="Entry" value={`${currency}${Number(item.entryPrice).toLocaleString()}`} />
        <TooltipRow label="Current" value={`${currency}${Number(item.currentPrice).toLocaleString()}`} />
        <TooltipRow label="Qty" value={Number(item.quantity).toLocaleString()} />
        <TooltipRow label="Position" value={`${currency}${Math.round(item.positionValue).toLocaleString()}`} />

        <div style={{ margin: "4px 0 2px", borderTop: `1px solid ${colors.border}`, paddingTop: 6 }}>
          <TooltipRow
            label="Unrealized P&L"
            value={`${item.unrealizedPnl >= 0 ? "+" : ""}${currency}${Math.abs(Math.round(item.unrealizedPnl)).toLocaleString()} (${item.pnlPct >= 0 ? "+" : ""}${item.pnlPct.toFixed(2)}%)`}
            valueColor={colors.text}
            bold
          />
        </div>

        {emaDistPct !== null && (
          <TooltipRow
            label="vs EMA 220"
            value={`${emaDistPct}%`}
            valueColor={emaBreach ? "#f87171" : "#86efac"}
          />
        )}
      </div>
    </div>
  )
}

function TooltipRow({ label, value, valueColor, bold }: {
  label: string
  value: string
  valueColor?: string
  bold?: boolean
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 10, color: "#64748b", flexShrink: 0 }}>{label}</span>
      <span style={{
        fontFamily: "monospace",
        fontSize: 10,
        fontWeight: bold ? 600 : 400,
        color: valueColor ?? "#e2e8f0",
        textAlign: "right",
      }}>
        {value}
      </span>
    </div>
  )
}
