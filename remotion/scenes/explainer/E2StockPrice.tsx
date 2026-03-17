import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { StrategyChart } from "../../components/StrategyChart";

export const E2StockPrice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftReveal = spring({
    frame,
    fps,
    config: { stiffness: 140, damping: 24 },
  });

  const titleReveal = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

  const line1Opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line3Opacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: "clamp",
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
      {/* Left: Chart */}
      <div
        style={{
          flex: "0 0 55%",
          padding: "40px 20px 40px 50px",
          opacity: leftReveal,
          transform: `translateX(${(1 - leftReveal) * -30}px)`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <StrategyChart phase={0} />
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
        {/* Label chip */}
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
          Step 1
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: titleReveal,
            transform: `translateY(${(1 - titleReveal) * 20}px)`,
            fontSize: 40,
            fontWeight: 900,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Stock Price
        </div>

        {/* Lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateX(${(1 - line1Opacity) * 20}px)`,
              fontSize: 20,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
            }}
          >
            A stock's price moves{" "}
            <span style={{ color: THEME.primary, fontWeight: 700 }}>
              up and down every day
            </span>{" "}
            — like a runner on a track.
          </div>

          <div
            style={{
              opacity: line2Opacity,
              transform: `translateX(${(1 - line2Opacity) * 20}px)`,
              fontSize: 18,
              color: THEME.muted,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
            }}
          >
            Sometimes faster. Sometimes slower. But always with a{" "}
            <span style={{ color: THEME.foreground }}>general direction</span>.
          </div>

          <div
            style={{
              opacity: line3Opacity,
              transform: `translateX(${(1 - line3Opacity) * 20}px)`,
              fontSize: 16,
              color: THEME.muted,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
              fontStyle: "italic",
              borderLeft: `3px solid ${THEME.border}`,
              paddingLeft: 14,
              marginTop: 4,
            }}
          >
            The chart on the left shows a stock's journey — peak, pullback, and recovery.
          </div>
        </div>
      </div>
    </div>
  );
};
