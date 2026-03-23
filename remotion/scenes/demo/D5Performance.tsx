import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";
import { AnimatedCursor, CursorKeyframe } from "../../components/AnimatedCursor";
import { ClickSound } from "../../components/ClickSound";

const CHIPS = [
  { label: "No filter", hash: "v2-ath-ema220" },
  { label: "≤30d",      hash: "s30" },
  { label: "≤60d",      hash: "s60" },
  { label: "≤90d",      hash: "s90" },
];

const STATS_BASELINE = [
  { label: "Symbols",    value: 234, suffix: "",  decimals: 0, color: LIGHT.foreground },
  { label: "Win Rate",   value: 68,  suffix: "%", decimals: 0, color: LIGHT.bull },
  { label: "Avg Return", value: 16,  suffix: "%", decimals: 0, color: LIGHT.bull },
  { label: "Avg Sharpe", value: 1.6, suffix: "",  decimals: 1, color: LIGHT.primary },
];

const STATS_S30 = [
  { label: "Symbols",    value: 234, suffix: "",  decimals: 0, color: LIGHT.foreground },
  { label: "Win Rate",   value: 76,  suffix: "%", decimals: 0, color: LIGHT.bull },
  { label: "Avg Return", value: 22,  suffix: "%", decimals: 0, color: LIGHT.bull },
  { label: "Avg Sharpe", value: 2.1, suffix: "",  decimals: 1, color: LIGHT.primary },
];

// Mini sparkline bars for each stat (just visual flair)
const SPARKLINE_VALS = [
  [55, 60, 62, 65, 67, 68, 68],
  [10, 11, 12, 13, 14, 15, 16],
  [1.2, 1.3, 1.4, 1.5, 1.55, 1.58, 1.6],
  [234, 234, 234, 234, 234, 234, 234],
];

const CHIP_CLICK_FRAME = 240; // 8s into the 14s scene

function animateValue(
  target: number,
  start: number,
  progress: number,
  decimals = 0
) {
  const val = start + (target - start) * progress;
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
}

export const D5Performance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: compWidth, height: compHeight } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  const statsStart = 20;
  const statsProgress = interpolate(frame - statsStart, [0, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s30Active = frame >= CHIP_CLICK_FRAME;
  const chipPulse = spring({
    frame: frame - CHIP_CLICK_FRAME,
    fps,
    config: { stiffness: 300, damping: 20 },
  });

  const statsProgress2 = interpolate(
    frame - CHIP_CLICK_FRAME - 10,
    [0, fps * 1.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const currentStats = s30Active ? STATS_S30 : STATS_BASELINE;

  const appWidth = 1160;
  const appHeight = 600;

  const cursorKfs: CursorKeyframe[] = [
    { frame: 0,               x: 0.5,  y: 0.5, action: "idle" },
    { frame: CHIP_CLICK_FRAME - 14, x: 0.42, y: 0.38, action: "hover" },
    { frame: CHIP_CLICK_FRAME,      x: 0.42, y: 0.38, action: "click" },
    { frame: CHIP_CLICK_FRAME + 50, x: 0.55, y: 0.55, action: "idle" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: LIGHT.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      <ClickSound clickFrames={[CHIP_CLICK_FRAME]} volume={0.4} />

      <div
        style={{
          transform: `scale(${chromeScale * 1.3})`,
          opacity: chromeScale,
        }}
      >
        <AppShell
          activePage="performance"
          width={appWidth}
          height={appHeight}
          sidebarWidth={188}
          signalCount={28}
        >
          <div
            style={{
              flex: 1,
              padding: "22px 26px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Page header */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: LIGHT.foreground,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Performance
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: LIGHT.mutedFg,
                  marginTop: 4,
                }}
              >
                Aggregate backtest results across all 234 symbols · Nifty 50 + S&amp;P 100
              </div>
            </div>

            {/* Slingshot filter chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {CHIPS.map((chip) => {
                const isActive = s30Active
                  ? chip.hash === "s30"
                  : chip.hash === "v2-ath-ema220";
                return (
                  <div
                    key={chip.hash}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 20,
                      border: `1px solid ${isActive ? LIGHT.primary : LIGHT.border}`,
                      backgroundColor: isActive
                        ? `${LIGHT.primary}18`
                        : "transparent",
                      fontSize: 12,
                      color: isActive ? LIGHT.primary : LIGHT.mutedFg,
                      fontWeight: isActive ? 600 : 400,
                      transform:
                        s30Active && chip.hash === "s30"
                          ? `scale(${1 + chipPulse * 0.03})`
                          : "scale(1)",
                    }}
                  >
                    {chip.label}
                  </div>
                );
              })}
            </div>

            {/* Stats cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 14,
                marginBottom: 22,
              }}
            >
              {currentStats.map((stat, i) => {
                const cardP = spring({
                  frame: frame - (statsStart + i * 8),
                  fps,
                  config: { stiffness: 200, damping: 24 },
                });
                const p = s30Active ? statsProgress2 : statsProgress;
                const prevVal = s30Active ? STATS_BASELINE[i].value : 0;
                const displayVal = animateValue(stat.value, prevVal, p, stat.decimals);

                return (
                  <div
                    key={stat.label}
                    style={{
                      padding: "18px 20px",
                      borderRadius: 10,
                      border: `1px solid ${LIGHT.border}`,
                      backgroundColor: LIGHT.card,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      opacity: cardP,
                      transform: `translateY(${(1 - cardP) * 14}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: LIGHT.mutedFg,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        color: stat.color,
                        fontFamily: "monospace",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {displayVal}{stat.suffix}
                    </div>
                    {s30Active && i > 0 && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 10,
                          color: LIGHT.bull,
                          fontWeight: 600,
                          opacity: interpolate(
                            frame - CHIP_CLICK_FRAME,
                            [10, 30],
                            [0, 1],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                          ),
                        }}
                      >
                        ↑ vs baseline
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Insight banner */}
            {s30Active && (
              <div
                style={{
                  opacity: interpolate(
                    frame - CHIP_CLICK_FRAME,
                    [10, 35],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  transform: `translateY(${interpolate(
                    frame - CHIP_CLICK_FRAME,
                    [10, 35],
                    [10, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )}px)`,
                  padding: "14px 18px",
                  borderRadius: 10,
                  border: `1px solid ${LIGHT.bull}40`,
                  backgroundColor: `${LIGHT.bull}08`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  maxWidth: 640,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={LIGHT.bull}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: LIGHT.bull,
                      marginBottom: 2,
                    }}
                  >
                    Slingshot ≤30d filter: +8pp win rate lift
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: LIGHT.mutedFg,
                    }}
                  >
                    Tighter breakout window → sharper edge · Fewer but higher-quality trades
                  </div>
                </div>
              </div>
            )}
          </div>
        </AppShell>
      </div>

      {/* Cursor */}
      <AnimatedCursor
        keyframes={cursorKfs}
        compositionWidth={compWidth}
        compositionHeight={compHeight}
        size={28}
      />
    </div>
  );
};
