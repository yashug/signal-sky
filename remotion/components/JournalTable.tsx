import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";

const TRADES = [
  { symbol: "RELIANCE.NS", entry: "₹2,210", exit: "₹2,720", pnl: "+23.2%", win: true },
  { symbol: "NVDA",        entry: "$98.40",  exit: "$134.50", pnl: "+36.7%", win: true },
  { symbol: "TCS.NS",      entry: "₹3,100", exit: "₹3,414", pnl: "+10.1%", win: true },
  { symbol: "INFY.NS",     entry: "₹1,540", exit: "₹1,484", pnl: "-3.6%",  win: false },
  { symbol: "AAPL",        entry: "$171.20", exit: "$187.50", pnl: "+9.5%",  win: true },
];

interface JournalTableProps {
  stagger?: boolean;
}

export const JournalTable: React.FC<JournalTableProps> = ({ stagger = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ fontFamily: "monospace", width: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          padding: "8px 16px",
          borderBottom: `1px solid ${THEME.border}`,
          backgroundColor: THEME.surface,
        }}
      >
        {["Symbol", "Entry", "Exit", "P&L"].map((h) => (
          <span key={h} style={{ fontSize: 11, color: THEME.muted, textTransform: "uppercase" }}>
            {h}
          </span>
        ))}
      </div>

      {TRADES.map((trade, i) => {
        const delay = stagger ? i * Math.round(fps * 0.18) : 0;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { stiffness: 180, damping: 24 },
        });

        return (
          <div
            key={trade.symbol}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              padding: "10px 16px",
              borderBottom: `1px solid ${THEME.border}40`,
              borderLeft: `3px solid ${trade.win ? THEME.bull : THEME.bear}`,
              opacity: progress,
              transform: `translateX(${(1 - progress) * -20}px)`,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: THEME.foreground }}>
              {trade.symbol}
            </span>
            <span style={{ fontSize: 12, color: THEME.muted }}>{trade.entry}</span>
            <span style={{ fontSize: 12, color: THEME.muted }}>{trade.exit}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: trade.win ? THEME.bull : THEME.bear,
              }}
            >
              {trade.pnl}
            </span>
          </div>
        );
      })}
    </div>
  );
};
