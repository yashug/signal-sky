import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";

interface PricingBadgeProps {
  label: string;
  price: string;
  interval: string;
  highlight?: boolean;
  startFrame?: number;
}

export const PricingBadge: React.FC<PricingBadgeProps> = ({
  label,
  price,
  interval,
  highlight = false,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 180, damping: 22 },
  });

  return (
    <div
      style={{
        backgroundColor: highlight ? `${THEME.primary}15` : THEME.card,
        border: `1px solid ${highlight ? THEME.primary : THEME.border}`,
        borderRadius: 12,
        padding: "16px 20px",
        minWidth: 150,
        opacity: progress,
        transform: `scale(${0.8 + progress * 0.2}) translateY(${(1 - progress) * 20}px)`,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 12, color: THEME.muted, fontFamily: "sans-serif", marginBottom: 6 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "monospace",
          color: highlight ? THEME.primary : THEME.foreground,
          lineHeight: 1,
        }}
      >
        {price}
      </div>
      <div style={{ fontSize: 11, color: THEME.muted, fontFamily: "sans-serif", marginTop: 4 }}>
        {interval}
      </div>
    </div>
  );
};
