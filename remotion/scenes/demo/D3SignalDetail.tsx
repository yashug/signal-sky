import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";
import { StrategyChart } from "../../components/StrategyChart";
import { AnimatedCursor, CursorKeyframe } from "../../components/AnimatedCursor";
import { ClickSound } from "../../components/ClickSound";

const SIGNAL_LIST = [
  { symbol: "RELIANCE", heat: "breakout"  as const, price: "₹2,547", active: true  },
  { symbol: "TCS",      heat: "boiling"   as const, price: "₹3,312", active: false },
  { symbol: "NVDA",     heat: "breakout"  as const, price: "$875",    active: false },
  { symbol: "HDFCBANK", heat: "simmering" as const, price: "₹1,892", active: false },
  { symbol: "AAPL",     heat: "boiling"   as const, price: "$182",    active: false },
];

const HEAT_COLORS = {
  breakout:  LIGHT.heat.breakout,
  boiling:   LIGHT.heat.boiling,
  simmering: LIGHT.heat.simmering,
  cooling:   LIGHT.heat.cooling,
};

// Timing (18s = 540 frames)
const CLICK_FRAME = 30;   // 1s — click RELIANCE row
const TYPE_START  = 270;  // 9s — position calculator typewriter

export const D3SignalDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: compWidth, height: compHeight } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Detail panel slides in from right after row click
  const panelSlide = spring({ frame: frame - CLICK_FRAME, fps, config: { stiffness: 200, damping: 24 } });
  const panelX = interpolate(panelSlide, [0, 1], [360, 0]);

  // Chart phases — spread across the scene
  const chartPhase = Math.min(4, Math.floor((frame / fps) * 0.7)) as 0 | 1 | 2 | 3 | 4;

  // Position calculator typewriter
  const typeProgress = interpolate(frame - TYPE_START, [0, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const riskText = (1.5 * typeProgress).toFixed(1) + "%";
  const stopLoss = interpolate(typeProgress, [0, 1], [0, 2435], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const target   = interpolate(typeProgress, [0, 1], [0, 2980], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shares   = interpolate(typeProgress, [0, 1], [0, 61],   { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "Why This Triggered" section
  const whyOpacity = interpolate(frame, [CLICK_FRAME + 25, CLICK_FRAME + 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calc section glow effect when typewriter is active
  const calcGlow = frame > TYPE_START ? 1 : 0;

  const appWidth  = 1160;
  const appHeight = 600;

  const cursorKfs: CursorKeyframe[] = [
    { frame: 0,                   x: 0.42, y: 0.52, action: "idle"  },
    { frame: 18,                  x: 0.26, y: 0.50, action: "hover" },
    { frame: CLICK_FRAME,         x: 0.26, y: 0.50, action: "click" },
    { frame: 90,                  x: 0.55, y: 0.45, action: "idle"  },
    { frame: 180,                 x: 0.68, y: 0.40, action: "idle"  },
    { frame: TYPE_START - 20,     x: 0.84, y: 0.53, action: "hover" },
    { frame: TYPE_START,          x: 0.84, y: 0.53, action: "click" },
    { frame: TYPE_START + 60,     x: 0.78, y: 0.62, action: "idle"  },
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
      <ClickSound clickFrames={[CLICK_FRAME, TYPE_START]} volume={0.4} />

      <div
        style={{
          transform: `scale(${chromeScale * 1.3})`,
          opacity: chromeScale,
        }}
      >
        <AppShell activePage="scanner" width={appWidth} height={appHeight} sidebarWidth={188} signalCount={28}>
          <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
            {/* Signal list panel */}
            <div
              style={{
                width: 230,
                borderRight: `1px solid ${LIGHT.border}`,
                backgroundColor: LIGHT.card,
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${LIGHT.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: LIGHT.mutedFg, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  28 signals
                </span>
                <span style={{ fontSize: 10, color: LIGHT.mutedFg }}>Nifty 50 · US</span>
              </div>

              {SIGNAL_LIST.map((s, i) => {
                const heatColor = HEAT_COLORS[s.heat];
                const rowP = spring({ frame: frame - i * 8, fps, config: { stiffness: 200, damping: 24 } });
                return (
                  <div
                    key={s.symbol}
                    style={{
                      padding: "11px 14px",
                      borderBottom: `1px solid ${LIGHT.border}`,
                      borderLeft: `3px solid ${s.active ? heatColor : "transparent"}`,
                      backgroundColor: s.active ? `${LIGHT.primary}08` : "transparent",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      opacity: rowP,
                      transform: `translateY(${(1 - rowP) * 10}px)`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: LIGHT.foreground, fontFamily: "monospace", letterSpacing: "-0.01em" }}>{s.symbol}</div>
                      <div style={{ fontSize: 10, color: LIGHT.mutedFg, fontFamily: "monospace", marginTop: 1 }}>{s.price}</div>
                    </div>
                    <div
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        backgroundColor: `${heatColor}15`,
                        color: heatColor,
                        fontSize: 9,
                        fontWeight: 700,
                        border: `1px solid ${heatColor}30`,
                      }}
                    >
                      {s.heat.charAt(0).toUpperCase() + s.heat.slice(1)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail panel */}
            <div
              style={{
                flex: 1,
                transform: `translateX(${panelX}px)`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "12px 20px",
                  borderBottom: `1px solid ${LIGHT.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                  backgroundColor: LIGHT.card,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: LIGHT.foreground, letterSpacing: "-0.04em", fontFamily: "monospace" }}>
                      RELIANCE
                    </div>
                    <div
                      style={{
                        padding: "3px 10px",
                        borderRadius: 999,
                        backgroundColor: `${LIGHT.heat.breakout}15`,
                        border: `1px solid ${LIGHT.heat.breakout}35`,
                        fontSize: 10,
                        fontWeight: 700,
                        color: LIGHT.heat.breakout,
                      }}
                    >
                      🚀 Breakout
                    </div>
                    <div style={{ fontSize: 11, color: LIGHT.mutedFg, padding: "2px 7px", borderRadius: 4, border: `1px solid ${LIGHT.border}`, backgroundColor: LIGHT.surface, fontWeight: 500 }}>
                      NSE
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: LIGHT.mutedFg, marginTop: 3 }}>Reliance Industries Ltd.</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: LIGHT.foreground, fontFamily: "monospace", letterSpacing: "-0.03em" }}>₹2,547.80</div>
                  <div style={{ fontSize: 12, color: LIGHT.bull, fontFamily: "monospace", fontWeight: 700 }}>↑ +2.14% today</div>
                </div>
              </div>

              <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                {/* Chart + Why */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 18px", gap: 12, overflow: "hidden" }}>
                  {/* Chart */}
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <StrategyChart phase={chartPhase} width={480} height={230} />
                  </div>

                  {/* Why This Triggered */}
                  <div style={{ opacity: whyOpacity, display: "flex", gap: 10, flexShrink: 0 }}>
                    {[
                      { label: "Pre-set ATH",  value: "₹2,531", color: LIGHT.primary },
                      { label: "Break Date",   value: "Nov 14",  color: LIGHT.bear    },
                      { label: "Reclaim Date", value: "Jan 22",  color: LIGHT.bull    },
                      { label: "Slingshot",    value: "12d",     color: LIGHT.primary },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: 7,
                          border: `1px solid ${item.color}25`,
                          backgroundColor: `${item.color}08`,
                        }}
                      >
                        <div style={{ fontSize: 9, color: LIGHT.mutedFg, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: "monospace" }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Position calculator */}
                <div
                  style={{
                    width: 200,
                    borderLeft: `1px solid ${LIGHT.border}`,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    flexShrink: 0,
                    backgroundColor: LIGHT.card,
                    boxShadow: calcGlow ? `inset 2px 0 0 ${LIGHT.primary}30` : "none",
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, color: LIGHT.mutedFg, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Position Calculator
                  </div>

                  {/* Capital */}
                  <div>
                    <div style={{ fontSize: 9, color: LIGHT.mutedFg, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Capital (₹)</div>
                    <div style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${LIGHT.border}`, backgroundColor: LIGHT.surface, fontSize: 13, fontWeight: 600, color: LIGHT.foreground, fontFamily: "monospace" }}>
                      1,00,000
                    </div>
                  </div>

                  {/* Risk input */}
                  <div>
                    <div style={{ fontSize: 9, color: LIGHT.mutedFg, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Risk %</div>
                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: `1px solid ${frame > TYPE_START ? LIGHT.primary : LIGHT.border}`,
                        backgroundColor: LIGHT.surface,
                        fontSize: 14,
                        fontWeight: 600,
                        color: LIGHT.foreground,
                        fontFamily: "monospace",
                        boxShadow: frame > TYPE_START ? `0 0 0 3px ${LIGHT.primary}15` : "none",
                      }}
                    >
                      {frame > TYPE_START ? riskText : "—"}
                    </div>
                  </div>

                  <div style={{ height: 1, backgroundColor: LIGHT.border }} />

                  {/* Results */}
                  {[
                    { label: "Stop Loss", value: stopLoss > 0 ? `₹${Math.round(stopLoss).toLocaleString("en-IN")}` : "—", color: LIGHT.bear    },
                    { label: "1st Target",value: target > 0   ? `₹${Math.round(target).toLocaleString("en-IN")}` : "—",    color: LIGHT.bull    },
                    { label: "Qty",       value: shares > 0   ? `${Math.round(shares)} shares` : "—",                        color: LIGHT.foreground },
                    { label: "R:R",       value: shares > 0   ? "1 : 4.0" : "—",                                             color: LIGHT.primary   },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <div style={{ fontSize: 9, color: LIGHT.mutedFg, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "monospace" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AppShell>
      </div>

      <AnimatedCursor keyframes={cursorKfs} compositionWidth={compWidth} compositionHeight={compHeight} size={28} />
    </div>
  );
};
