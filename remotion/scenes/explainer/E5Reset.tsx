import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { StrategyChart } from "../../components/StrategyChart";

export const E5Reset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

  const line1Opacity = interpolate(frame, [18, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [50, 72], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagReveal = spring({
    frame: frame - 85,
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
      {/* Left: Chart with reset zone */}
      <div
        style={{
          flex: "0 0 55%",
          padding: "40px 20px 40px 50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StrategyChart phase={3} />
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
            color: THEME.bear,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Step 4
        </div>

        <div
          style={{
            opacity: titleReveal,
            transform: `translateY(${(1 - titleReveal) * 20}px)`,
            fontSize: 44,
            fontWeight: 900,
            color: THEME.bear,
            fontFamily: "sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          The Reset ↓
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
            <span style={{ color: THEME.bear, fontWeight: 700 }}>
              drops below the EMA 200
            </span>
            . Maybe the whole market sold off. Maybe there was bad news.
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
            The red zone is the <em>reset period</em>. The stock is{" "}
            <span style={{ color: THEME.foreground }}>
              catching its breath
            </span>{" "}
            — momentum is rebuilding underneath.
          </div>
        </div>

        {/* Analogy box */}
        <div
          style={{
            opacity: tagReveal,
            transform: `translateY(${(1 - tagReveal) * 16}px)`,
            backgroundColor: THEME.bear + "12",
            border: `1px solid ${THEME.bear}35`,
            borderRadius: 10,
            padding: "14px 18px",
            marginTop: 4,
          }}
        >
          <div
            style={{
              fontSize: 15,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              lineHeight: 1.55,
              fontStyle: "italic",
            }}
          >
            "Like a runner who slows down to save energy before a final sprint."
          </div>
        </div>
      </div>
    </div>
  );
};
