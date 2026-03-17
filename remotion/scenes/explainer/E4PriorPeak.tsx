import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { StrategyChart } from "../../components/StrategyChart";

export const E4PriorPeak: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

  const line1Opacity = interpolate(frame, [15, 38], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [45, 68], [0, 1], {
    extrapolateRight: "clamp",
  });
  const noteReveal = spring({
    frame: frame - 80,
    fps,
    config: { stiffness: 180, damping: 22 },
  });

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
      {/* Left: Chart with prior peak revealed */}
      <div
        style={{
          flex: "0 0 55%",
          padding: "40px 20px 40px 50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StrategyChart phase={2} />
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
        }}
      >
        <div
          style={{
            opacity: titleReveal,
            transform: `translateY(${(1 - titleReveal) * 16}px)`,
            alignSelf: "flex-start",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: THEME.simmering,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Step 3
        </div>

        <div
          style={{
            opacity: titleReveal,
            transform: `translateY(${(1 - titleReveal) * 20}px)`,
            fontSize: 38,
            fontWeight: 900,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          The{" "}
          <span style={{ color: THEME.simmering }}>Prior Peak</span>
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
            The dashed{" "}
            <span style={{ color: THEME.simmering, fontWeight: 700 }}>
              orange line 📍
            </span>{" "}
            marks the highest price the stock hit{" "}
            <span style={{ fontWeight: 700 }}>before it pulled back</span>.
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
            This is NOT the all-time high. It's the high that came{" "}
            <span style={{ color: THEME.foreground }}>
              just before the most recent fall below the trend line
            </span>.
          </div>
        </div>

        {/* Key insight box */}
        <div
          style={{
            opacity: noteReveal,
            transform: `translateY(${(1 - noteReveal) * 16}px)`,
            backgroundColor: THEME.simmering + "15",
            border: `1px solid ${THEME.simmering}40`,
            borderRadius: 10,
            padding: "14px 18px",
            marginTop: 4,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: THEME.simmering,
              fontFamily: "sans-serif",
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Why it matters
          </div>
          <div
            style={{
              fontSize: 15,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
            }}
          >
            Once the stock reclaims above the trend line, it targets this prior peak
            as its next destination.
          </div>
        </div>
      </div>
    </div>
  );
};
