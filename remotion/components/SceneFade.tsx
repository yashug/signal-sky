import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SceneFadeProps {
  children: React.ReactNode;
  durationInFrames: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  label?: string;
  labelColor?: string;
  theme?: "dark" | "light";
}

/**
 * Wraps a scene with smooth fade-in and fade-out transitions
 * and an optional scene label pill at the top.
 */
export const SceneFade: React.FC<SceneFadeProps> = ({
  children,
  durationInFrames,
  fadeInFrames = 18,
  fadeOutFrames = 18,
  label,
  labelColor = "#2a73cc",
  theme = "dark",
}) => {
  const overlayColor = theme === "dark" ? "#181921" : "#f9f8f5";
  const frame = useCurrentFrame();

  const fadeInOpacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - fadeOutFrames, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // White overlay: 1 at start, 0 after fade-in, 0 until fade-out, 1 at end
  const overlayOpacity = Math.max(1 - fadeInOpacity, fadeOutOpacity);

  const labelOpacity = interpolate(
    frame,
    [fadeInFrames, fadeInFrames + 12, durationInFrames - fadeOutFrames - 10, durationInFrames - fadeOutFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const labelY = interpolate(frame, [fadeInFrames, fadeInFrames + 12], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {children}

      {/* Scene label pill */}
      {label && (
        <div
          style={{
            position: "absolute",
            top: 28,
            left: "50%",
            transform: `translateX(-50%) translateY(${labelY}px)`,
            opacity: labelOpacity,
            zIndex: 9990,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 14px",
            borderRadius: 999,
            backgroundColor: `${labelColor}18`,
            border: `1px solid ${labelColor}40`,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: labelColor,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: labelColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Fade transition overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          pointerEvents: "none",
          zIndex: 9997,
        }}
      />
    </div>
  );
};
