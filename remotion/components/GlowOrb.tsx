import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface GlowOrbProps {
  color?: string;
  size?: number;
  x?: string | number;
  y?: string | number;
  breatheSpeed?: number;
  baseOpacity?: number;
  pulseAmount?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  color = "#4f9de0",
  size = 400,
  x = "50%",
  y = "50%",
  breatheSpeed = 1.2,
  baseOpacity = 0.5,
  pulseAmount = 0.2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = (frame / fps) * breatheSpeed;
  const opacity = baseOpacity + Math.sin(t * Math.PI * 2) * pulseAmount;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}45 0%, ${color}18 40%, transparent 70%)`,
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />
  );
};
