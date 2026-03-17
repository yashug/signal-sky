import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { FloatingTicker } from "../../components/FloatingTicker";

const BULLETS = [
  {
    icon: "🏦",
    title: "Big institutions missed the first run",
    body: "Hedge funds and mutual funds couldn't buy during the run-up — position sizes are too large.",
  },
  {
    icon: "📥",
    title: "They load in right here",
    body: "After the reset, near the prior peak, institutions start accumulating — quietly.",
  },
  {
    icon: "🚀",
    title: "When institutions buy, stocks move",
    body: "Their buying pressure drives the breakout above the prior peak. That's the real opportunity.",
  },
];

export const E7WhyWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 26 },
  });

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
        padding: "50px 120px",
        gap: 36,
      }}
    >
      <FloatingTicker count={8} opacity={0.025} />

      {/* Title */}
      <div
        style={{
          opacity: titleReveal,
          transform: `translateY(${(1 - titleReveal) * 20}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: THEME.primary,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            marginBottom: 12,
          }}
        >
          Why does this work?
        </div>
        <div
          style={{
            fontSize: 46,
            fontWeight: 900,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Institutional money{" "}
          <span style={{ color: THEME.primary }}>drives breakouts</span>
        </div>
      </div>

      {/* Bullets */}
      <div
        style={{
          display: "flex",
          gap: 24,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {BULLETS.map((b, i) => {
          const bulletReveal = spring({
            frame: frame - (i * 18 + 25),
            fps,
            config: { stiffness: 160, damping: 22 },
          });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: bulletReveal,
                transform: `translateY(${(1 - bulletReveal) * 28}px)`,
                backgroundColor: THEME.card,
                border: `1px solid ${THEME.border}`,
                borderRadius: 14,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 32 }}>{b.icon}</div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: THEME.foreground,
                  fontFamily: "sans-serif",
                  lineHeight: 1.3,
                }}
              >
                {b.title}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: THEME.muted,
                  fontFamily: "sans-serif",
                  lineHeight: 1.55,
                }}
              >
                {b.body}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
