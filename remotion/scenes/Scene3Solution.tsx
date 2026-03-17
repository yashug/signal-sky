import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { THEME } from "../config/theme";
import { SignalSkyLogo } from "../components/SignalSkyLogo";

interface Scene3Props {
  isVertical?: boolean;
}

export const Scene3Solution: React.FC<Scene3Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { stiffness: 150, damping: 18 },
  });

  const glowOpacity = interpolate(frame, [0, 30, 60, 90], [0, 0.8, 1, 0.8], {
    extrapolateRight: "clamp",
  });

  const taglineProgress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

  const featuresProgress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 160, damping: 24 },
  });

  const features = [
    "Reset & Reclaim Strategy",
    "India + US Markets",
    "Real-time Alerts",
    "20-year Backtests",
  ];

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.primary}20 0%, transparent 70%)`,
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Meet SignalSky label */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: THEME.primary,
          fontFamily: "sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: 32,
          opacity: taglineProgress,
          transform: `translateY(${(1 - taglineProgress) * 20}px)`,
        }}
      >
        Meet SignalSky
      </div>

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoScale,
          marginBottom: 40,
        }}
      >
        <SignalSkyLogo size={isVertical ? 72 : 80} showWordmark={true} />
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: isVertical ? 24 : 28,
          color: THEME.muted,
          fontFamily: "sans-serif",
          textAlign: "center",
          maxWidth: 600,
          lineHeight: 1.5,
          opacity: taglineProgress,
          transform: `translateY(${(1 - taglineProgress) * 20}px)`,
          marginBottom: 48,
        }}
      >
        One scan. Every morning. Every breakout you need.
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: featuresProgress,
          transform: `translateY(${(1 - featuresProgress) * 20}px)`,
        }}
      >
        {features.map((f) => (
          <div
            key={f}
            style={{
              backgroundColor: THEME.surface,
              border: `1px solid ${THEME.border}`,
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 13,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color: THEME.primary }}>✓</span> {f}
          </div>
        ))}
      </div>
    </div>
  );
};
