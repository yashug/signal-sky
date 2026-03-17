import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { HeatBadge } from "./HeatBadge";

type HeatLevel = "breakout" | "boiling" | "simmering" | "warming";

interface ScanRow {
  symbol: string;
  name: string;
  market: string;
  heat: HeatLevel;
  price: string;
  priorPeak: string;
  gap: string;
  gapPct: number;
}

const ROWS: ScanRow[] = [
  { symbol: "RELIANCE.NS", name: "Reliance Industries", market: "NSE",    heat: "breakout",  price: "₹2,847", priorPeak: "₹2,830", gap: "+0.6%", gapPct: 0 },
  { symbol: "NVDA",        name: "NVIDIA Corporation", market: "NASDAQ",  heat: "breakout",  price: "$134.20", priorPeak: "$132.88", gap: "+0.9%", gapPct: 0 },
  { symbol: "TCS.NS",      name: "TCS",                market: "NSE",    heat: "boiling",   price: "₹3,412", priorPeak: "₹3,480", gap: "-2.0%", gapPct: 35 },
  { symbol: "AAPL",        name: "Apple Inc.",          market: "NASDAQ",  heat: "boiling",   price: "$187.40", priorPeak: "$191.10", gap: "-1.9%", gapPct: 37 },
  { symbol: "HDFC.NS",     name: "HDFC Bank",           market: "NSE",    heat: "simmering", price: "₹1,623", priorPeak: "₹1,705", gap: "-4.8%", gapPct: 65 },
  { symbol: "INFY.NS",     name: "Infosys",             market: "NSE",    heat: "warming",   price: "₹1,487", priorPeak: "₹1,680", gap: "-11.5%", gapPct: 78 },
  { symbol: "WIPRO.NS",    name: "Wipro",               market: "NSE",    heat: "simmering", price: "₹582",  priorPeak: "₹608",  gap: "-4.3%", gapPct: 60 },
  { symbol: "MSFT",        name: "Microsoft Corp.",     market: "NASDAQ",  heat: "warming",   price: "$388.60", priorPeak: "$435.00", gap: "-10.7%", gapPct: 75 },
];

const HEAT_COLORS: Record<HeatLevel, string> = {
  breakout:  THEME.heat.breakout,
  boiling:   THEME.heat.boiling,
  simmering: THEME.heat.simmering,
  warming:   THEME.heat.warming,
};

interface ScannerTableProps {
  visibleRows?: number;
  stagger?: boolean;
  highlightRow?: number;
}

export const ScannerTable: React.FC<ScannerTableProps> = ({
  visibleRows = 8,
  stagger = true,
  highlightRow = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ fontFamily: "monospace", width: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1.2fr 1fr 1fr 1.5fr",
          padding: "8px 16px",
          borderBottom: `1px solid ${THEME.border}`,
          backgroundColor: THEME.surface,
        }}
      >
        {["Symbol", "Market", "Heat", "Price", "Prior Peak", "Gap to Peak"].map((h) => (
          <span key={h} style={{ fontSize: 11, color: THEME.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {ROWS.slice(0, visibleRows).map((row, i) => {
        const delay = stagger ? i * Math.round(fps * 0.15) : 0;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { stiffness: 180, damping: 24 },
        });
        const isHighlighted = i === highlightRow;

        return (
          <div
            key={row.symbol}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1.2fr 1fr 1fr 1.5fr",
              padding: "11px 16px",
              borderBottom: `1px solid ${THEME.border}40`,
              borderLeft: `3px solid ${HEAT_COLORS[row.heat]}`,
              backgroundColor: isHighlighted ? `${HEAT_COLORS[row.heat]}10` : "transparent",
              opacity: progress,
              transform: `translateX(${(1 - progress) * -20}px)`,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: THEME.foreground }}>{row.symbol}</div>
              <div style={{ fontSize: 10, color: THEME.muted, marginTop: 2 }}>{row.name}</div>
            </div>
            <span
              style={{
                fontSize: 11,
                color: THEME.muted,
                backgroundColor: THEME.surface,
                padding: "2px 8px",
                borderRadius: 4,
                border: `1px solid ${THEME.border}`,
                width: "fit-content",
              }}
            >
              {row.market}
            </span>
            <HeatBadge heat={row.heat} size="sm" />
            <span style={{ fontSize: 13, color: THEME.foreground }}>{row.price}</span>
            <span style={{ fontSize: 12, color: THEME.muted }}>{row.priorPeak}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  height: 4,
                  width: 80,
                  backgroundColor: THEME.border,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${row.gapPct}%`,
                    backgroundColor: HEAT_COLORS[row.heat],
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: row.gapPct === 0 ? THEME.heat.breakout : THEME.heat[row.heat],
                  fontWeight: 600,
                }}
              >
                {row.gap}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
