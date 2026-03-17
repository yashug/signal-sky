import React from "react";
import { THEME } from "../config/theme";

type HeatLevel = "breakout" | "boiling" | "simmering" | "warming";

const HEAT_CONFIG: Record<HeatLevel, { label: string; icon: string; bg: string; color: string }> = {
  breakout: { label: "Breakout", icon: "🚀", bg: "#23c47520", color: THEME.heat.breakout },
  boiling:  { label: "Boiling",  icon: "🔥", bg: "#e05c2220", color: THEME.heat.boiling  },
  simmering:{ label: "Simmering",icon: "🌡️", bg: "#d4a32a20", color: THEME.heat.simmering},
  warming:  { label: "Warming",  icon: "📈", bg: "#6487d420", color: THEME.heat.warming  },
};

interface HeatBadgeProps {
  heat: HeatLevel;
  size?: "sm" | "md" | "lg";
}

export const HeatBadge: React.FC<HeatBadgeProps> = ({ heat, size = "md" }) => {
  const cfg = HEAT_CONFIG[heat];
  const fontSize = size === "sm" ? 11 : size === "md" ? 13 : 16;
  const px = size === "sm" ? 8 : size === "md" ? 12 : 16;
  const py = size === "sm" ? 3 : size === "md" ? 5 : 8;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        backgroundColor: cfg.bg,
        color: cfg.color,
        borderRadius: 999,
        border: `1px solid ${cfg.color}40`,
        padding: `${py}px ${px}px`,
        fontSize,
        fontWeight: 600,
        fontFamily: "sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      <span>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </span>
  );
};
