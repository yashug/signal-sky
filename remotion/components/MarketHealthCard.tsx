import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";

interface MarketHealthCardProps {
  index: string;
  pct: number;
  status: "BULLISH" | "NEUTRAL" | "BEARISH";
  above: number;
  total: number;
  startFrame?: number;
}

const STATUS_COLORS = {
  BULLISH: THEME.bull,
  NEUTRAL: THEME.simmering,
  BEARISH: THEME.bear,
};

export const MarketHealthCard: React.FC<MarketHealthCardProps> = ({
  index,
  pct,
  status,
  above,
  total,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = STATUS_COLORS[status];

  const animatedPct = interpolate(
    frame - startFrame,
    [0, fps * 1.2],
    [0, pct],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const animatedNum = Math.round(
    interpolate(frame - startFrame, [0, fps * 1.0], [0, above], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        backgroundColor: THEME.card,
        border: `1px solid ${THEME.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        minWidth: 200,
      }}
    >
      <div style={{ fontSize: 13, color: THEME.muted, fontFamily: "sans-serif", marginBottom: 8 }}>
        {index}
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "monospace",
          color,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {animatedPct.toFixed(1)}%
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          backgroundColor: `${color}20`,
          color,
          borderRadius: 999,
          padding: "3px 10px",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "sans-serif",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: color,
            display: "inline-block",
          }}
        />
        {status}
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 6,
          width: "100%",
          backgroundColor: THEME.border,
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${animatedPct}%`,
            backgroundColor: color,
            borderRadius: 3,
            transition: "width 0.1s",
          }}
        />
      </div>

      <div style={{ fontSize: 11, color: THEME.muted, fontFamily: "monospace" }}>
        {animatedNum} above · {total - animatedNum} below · {total} total
      </div>
    </div>
  );
};
