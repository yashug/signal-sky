import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { MarketHealthCard } from "../components/MarketHealthCard";

interface Scene5Props {
  isVertical?: boolean;
}

const CARDS = [
  { index: "Nifty 50",    pct: 73.2, status: "BULLISH" as const, above: 37, total: 50  },
  { index: "Bank Nifty",  pct: 58.4, status: "BULLISH" as const, above: 7,  total: 12  },
  { index: "S&P 100",     pct: 44.1, status: "NEUTRAL" as const, above: 44, total: 100 },
  { index: "NASDAQ 100",  pct: 38.7, status: "BEARISH" as const, above: 39, total: 100 },
];

export const Scene5MarketHealth: React.FC<Scene5Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { stiffness: 200, damping: 28 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "60px 40px" : "40px 60px",
        gap: 40,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: headerProgress,
          transform: `translateY(${(1 - headerProgress) * 20}px)`,
        }}
      >
        <span style={{ fontSize: 28 }}>💓</span>
        <div>
          <div
            style={{
              fontSize: isVertical ? 32 : 40,
              fontWeight: 800,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Market Health
          </div>
          <div style={{ fontSize: 16, color: THEME.muted, fontFamily: "sans-serif" }}>
            % of stocks above EMA200 — before you trade
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isVertical ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 20,
          width: "100%",
          maxWidth: isVertical ? 600 : 960,
        }}
      >
        {CARDS.map((card, i) => {
          const startFrame = i * Math.round(fps * 0.2);
          const progress = spring({
            frame: frame - startFrame - 15,
            fps,
            config: { stiffness: 160, damping: 22 },
          });

          return (
            <div
              key={card.index}
              style={{
                opacity: progress,
                transform: `translateY(${(1 - progress) * 30}px)`,
              }}
            >
              <MarketHealthCard
                {...card}
                startFrame={startFrame + 15}
              />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 24,
          opacity: spring({ frame: frame - 30, fps, config: { stiffness: 180, damping: 26 } }),
        }}
      >
        {[
          { color: THEME.bull, label: "Bullish ≥60%" },
          { color: THEME.simmering, label: "Neutral 40-60%" },
          { color: THEME.bear, label: "Bearish <40%" },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "sans-serif", fontSize: 13, color: THEME.muted }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
