import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface ScanLineProps {
  startFrame?: number;
  color?: string;
  verticalPosition?: string;
  durationFrames?: number;
}

export const ScanLine: React.FC<ScanLineProps> = ({
  startFrame = 0,
  color = "#4f9de0",
  verticalPosition = "40%",
  durationFrames = 45,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const xProgress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [-width, width],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 6, startFrame + durationFrames - 6, startFrame + durationFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: verticalPosition,
        left: 0,
        right: 0,
        height: 2,
        opacity,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: xProgress,
          width: 300,
          height: "100%",
          background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`,
          boxShadow: `0 0 12px ${color}80`,
        }}
      />
    </div>
  );
};
