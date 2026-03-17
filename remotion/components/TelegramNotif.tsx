import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";

interface TelegramNotifProps {
  symbol: string;
  heat: string;
  price: string;
  peak: string;
  market: string;
  startFrame?: number;
}

const HEAT_COLORS: Record<string, string> = {
  breakout: THEME.heat.breakout,
  boiling: THEME.heat.boiling,
  simmering: THEME.heat.simmering,
  warming: THEME.heat.warming,
};

const HEAT_ICONS: Record<string, string> = {
  breakout: "🚀",
  boiling: "🔥",
  simmering: "🌡️",
  warming: "📈",
};

export const TelegramNotif: React.FC<TelegramNotifProps> = ({
  symbol,
  heat,
  price,
  peak,
  market,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = HEAT_COLORS[heat] ?? THEME.primary;
  const icon = HEAT_ICONS[heat] ?? "📊";

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 200, damping: 22 },
  });

  return (
    <div
      style={{
        backgroundColor: "#1f2c34",
        borderRadius: 12,
        padding: "12px 14px",
        maxWidth: 280,
        transform: `translateY(${(1 - progress) * 40}px)`,
        opacity: progress,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: THEME.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#e9e9ea", fontFamily: "sans-serif" }}>
            SignalSky
          </div>
          <div style={{ fontSize: 10, color: "#8a9bac", fontFamily: "sans-serif" }}>
            {market} · just now
          </div>
        </div>
      </div>

      {/* Message */}
      <div
        style={{
          fontSize: 13,
          color: "#e9e9ea",
          fontFamily: "sans-serif",
          lineHeight: 1.5,
        }}
      >
        <span style={{ marginRight: 4 }}>{icon}</span>
        <strong style={{ color }}>{symbol}</strong> is{" "}
        <strong style={{ color }}>{heat.charAt(0).toUpperCase() + heat.slice(1)}</strong>
        {"\n"}
        <div style={{ marginTop: 6, fontSize: 12, color: "#8a9bac" }}>
          Price: <span style={{ color: "#e9e9ea" }}>{price}</span> · Peak:{" "}
          <span style={{ color: "#e9e9ea" }}>{peak}</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              backgroundColor: `${THEME.primary}20`,
              color: THEME.primary,
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            View Signal →
          </span>
        </div>
      </div>
    </div>
  );
};
