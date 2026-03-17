import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { StrategyChart } from "../../components/StrategyChart";

export const E3TrendLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

  const line1Opacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagReveal = spring({
    frame: frame - 75,
    fps,
    config: { stiffness: 200, damping: 22 },
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
      {/* Left: Chart with EMA revealed */}
      <div
        style={{
          flex: "0 0 55%",
          padding: "40px 20px 40px 50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StrategyChart phase={1} />
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
            color: THEME.primary,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Step 2
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
          <span style={{ color: THEME.primary }}>Trend Line</span>
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
            The blue dashed line is the{" "}
            <span style={{ color: THEME.primary, fontWeight: 700 }}>
              EMA 200
            </span>{" "}
            — the stock's average price over the last{" "}
            <span style={{ fontWeight: 700 }}>200 trading days</span>.
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
            Think of it as the runner's{" "}
            <span style={{ color: THEME.foreground }}>natural pace</span>.
            When the stock is <em>above</em> this line, it's healthy.
            When it falls <em>below</em> — it's struggling.
          </div>
        </div>

        {/* Inline pill */}
        <div
          style={{
            opacity: tagReveal,
            transform: `scale(${0.85 + tagReveal * 0.15})`,
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: THEME.primary + "18",
            border: `1px solid ${THEME.primary}50`,
            borderRadius: 8,
            padding: "8px 16px",
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: 20,
              height: 2,
              background: THEME.primary,
              borderRadius: 1,
              borderBottom: `2px dashed ${THEME.primary}`,
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: THEME.primary,
              fontFamily: "sans-serif",
            }}
          >
            EMA 200 = The Trend Line
          </span>
        </div>
      </div>
    </div>
  );
};
