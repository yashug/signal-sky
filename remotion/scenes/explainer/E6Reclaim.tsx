import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { StrategyChart } from "../../components/StrategyChart";

export const E6Reclaim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

  const line1Opacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bigLabelReveal = spring({
    frame: frame - 90,
    fps,
    config: { stiffness: 160, damping: 20 },
  });

  // Pulsing glow on the "RECLAIM" text
  const glowPulse = interpolate(
    frame,
    [90, 120, 150, 180, 210, 240],
    [1, 1.4, 1, 1.4, 1, 1.4],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: THEME.background,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      {/* Left: Chart with reclaim revealed */}
      <div
        style={{
          flex: "0 0 55%",
          padding: "40px 20px 40px 50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StrategyChart phase={4} />
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          alignSelf: "stretch",
          margin: "60px 0",
          background: THEME.border,
          opacity: 0.5,
        }}
      />

      {/* Right: Text */}
      <div
        style={{
          flex: 1,
          padding: "60px 50px 60px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bull green glow */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: "50%",
            transform: "translateY(-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${THEME.bull}15 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            opacity: titleReveal,
            transform: `translateY(${(1 - titleReveal) * 16}px)`,
            alignSelf: "flex-start",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: THEME.bull,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Step 5 — The Signal
        </div>

        <div
          style={{
            opacity: titleReveal,
            transform: `translateY(${(1 - titleReveal) * 20}px)`,
            fontSize: 40,
            fontWeight: 900,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          The{" "}
          <span style={{ color: THEME.bull }}>Reclaim ✓</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateX(${(1 - line1Opacity) * 20}px)`,
              fontSize: 19,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
            }}
          >
            The stock{" "}
            <span style={{ color: THEME.bull, fontWeight: 700 }}>
              crosses back above the EMA 200
            </span>{" "}
            — near its old peak. This is the moment that matters.
          </div>

          <div
            style={{
              opacity: line2Opacity,
              transform: `translateX(${(1 - line2Opacity) * 20}px)`,
              fontSize: 18,
              color: THEME.muted,
              fontFamily: "sans-serif",
              lineHeight: 1.55,
            }}
          >
            The stock has <span style={{ color: THEME.foreground }}>reset its momentum</span> and is
            now heading back toward that prior high. This is the{" "}
            <em>Reset & Reclaim</em> setup.
          </div>
        </div>

        {/* Big RECLAIM badge */}
        <div
          style={{
            opacity: bigLabelReveal,
            transform: `scale(${0.8 + bigLabelReveal * 0.2})`,
            alignSelf: "flex-start",
            marginTop: 8,
            backgroundColor: THEME.bull + "20",
            border: `2px solid ${THEME.bull}`,
            borderRadius: 12,
            padding: "12px 24px",
            boxShadow: `0 0 ${32 * glowPulse}px ${THEME.bull}30`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: THEME.bull,
              fontFamily: "sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            ✓ RECLAIM — Back above the trend
          </div>
        </div>
      </div>
    </div>
  );
};
