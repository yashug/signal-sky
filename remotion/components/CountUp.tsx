import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface CountUpProps {
  from?: number;
  to: number;
  startFrame?: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
  decimals?: number;
  fontFamily?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  startFrame = 0,
  durationFrames = 60,
  prefix = "",
  suffix = "",
  fontSize = 48,
  color = "#e5e7ee",
  decimals = 0,
  fontFamily = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 80, damping: 22, mass: 1 },
  });

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const value = from + (to - from) * clampedProgress;

  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  // Entrance opacity
  const opacity = interpolate(frame - startFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        fontFamily,
        fontSize,
        fontWeight: 800,
        color,
        opacity,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        display: "inline-block",
      }}
    >
      {prefix}{displayValue}{suffix}
    </span>
  );
};
