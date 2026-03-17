import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { THEME } from "../config/theme";

interface Scene2Props {
  isVertical?: boolean;
}

// Simulate a cluttered chart with random candles
const CANDLES = Array.from({ length: 40 }, (_, i) => ({
  x: i * 24,
  open: 50 + Math.sin(i * 0.8) * 20 + Math.random() * 10,
  close: 50 + Math.sin(i * 0.8 + 0.2) * 20 + Math.random() * 10,
  high: 80 - Math.random() * 15,
  low: 25 + Math.random() * 15,
}));

// Fake indicator lines
const INDICATORS = [
  { color: "#e05c22", label: "RSI(14)" },
  { color: "#4f9de0", label: "MACD" },
  { color: "#d4a32a", label: "BB(20)" },
  { color: "#6487d4", label: "STO(14)" },
  { color: "#23c475", label: "ATR" },
];

export const Scene2Problem: React.FC<Scene2Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const noiseOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const captionProgress = spring({ frame: frame - 30, fps, config: { stiffness: 200, damping: 28 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: THEME.background,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 40 : 60,
        padding: isVertical ? "60px 40px" : "40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cluttered chart mockup */}
      <div
        style={{
          opacity: noiseOpacity,
          flex: 1,
          backgroundColor: THEME.card,
          border: `1px solid ${THEME.border}`,
          borderRadius: 12,
          padding: 20,
          maxWidth: isVertical ? "100%" : 600,
          position: "relative",
        }}
      >
        {/* Chart title bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {INDICATORS.map((ind) => (
            <span
              key={ind.label}
              style={{
                fontSize: 10,
                color: ind.color,
                backgroundColor: `${ind.color}20`,
                border: `1px solid ${ind.color}40`,
                borderRadius: 4,
                padding: "2px 6px",
                fontFamily: "monospace",
              }}
            >
              {ind.label}
            </span>
          ))}
        </div>

        {/* SVG candle chart */}
        <svg width="100%" height={isVertical ? 200 : 160} viewBox="0 0 960 160" style={{ overflow: "visible" }}>
          {/* Multiple crossing indicator lines */}
          {INDICATORS.map((ind, li) => (
            <polyline
              key={li}
              points={CANDLES.map((c, i) => `${c.x + 8},${50 + Math.sin(i * 0.6 + li) * 30 + li * 8}`).join(" ")}
              stroke={ind.color}
              strokeWidth={1.5}
              fill="none"
              opacity={0.6}
            />
          ))}

          {/* Candles */}
          {CANDLES.map((c, i) => {
            const isGreen = c.close > c.open;
            const color = isGreen ? THEME.bull : THEME.bear;
            return (
              <g key={i} transform={`translate(${c.x}, 0)`}>
                <line x1={8} y1={c.high} x2={8} y2={c.low} stroke={color} strokeWidth={1} />
                <rect
                  x={2}
                  y={Math.min(c.open, c.close)}
                  width={12}
                  height={Math.max(2, Math.abs(c.close - c.open))}
                  fill={color}
                  opacity={0.8}
                />
              </g>
            );
          })}
        </svg>

        {/* Noise overlay text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(24, 25, 33, 0.7)",
            borderRadius: 12,
            fontSize: 28,
            fontWeight: 800,
            color: THEME.bear,
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          TOO MUCH NOISE
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          flex: isVertical ? "none" : 1,
          opacity: captionProgress,
          transform: `translateX(${(1 - captionProgress) * 30}px)`,
          maxWidth: isVertical ? "100%" : 380,
        }}
      >
        <div
          style={{
            fontSize: isVertical ? 36 : 44,
            fontWeight: 800,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          17 tabs.
          <br />
          Dozens of charts.
          <br />
          Zero clarity.
        </div>
        <div style={{ fontSize: 18, color: THEME.muted, fontFamily: "sans-serif", lineHeight: 1.5 }}>
          By the time you figure it out, the move is already done.
        </div>
      </div>
    </div>
  );
};
