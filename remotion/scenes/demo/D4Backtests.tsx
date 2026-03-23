import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";
import { BacktestChart } from "../../components/BacktestChart";
import { AnimatedCursor, CursorKeyframe } from "../../components/AnimatedCursor";
import { ClickSound } from "../../components/ClickSound";

const VARIANTS = [
  { label: "No filter", hash: "v2-ath-ema220"     },
  { label: "≤30d",      hash: "v2-ath-ema220-s30" },
  { label: "≤60d",      hash: "v2-ath-ema220-s60" },
  { label: "≤90d",      hash: "v2-ath-ema220-s90" },
];

const BACKTEST_LIST = [
  { symbol: "RELIANCE.NS", winRate: 72, trades: 47, avgReturn: "+18.4%", heat: "breakout"  as const },
  { symbol: "TCS.NS",      winRate: 68, trades: 38, avgReturn: "+14.2%", heat: "boiling"   as const },
  { symbol: "NVDA",        winRate: 81, trades: 29, avgReturn: "+32.1%", heat: "breakout"  as const },
  { symbol: "HDFCBANK.NS", winRate: 61, trades: 44, avgReturn: "+11.8%", heat: "simmering" as const },
  { symbol: "AAPL",        winRate: 70, trades: 33, avgReturn: "+22.5%", heat: "boiling"   as const },
];

const HEAT_COLORS = {
  breakout:  LIGHT.heat.breakout,
  boiling:   LIGHT.heat.boiling,
  simmering: LIGHT.heat.simmering,
  cooling:   LIGHT.heat.cooling,
};

const STATS_BASELINE = [
  { label: "Win Rate",   value: "68%",    color: LIGHT.bull       },
  { label: "Avg Return", value: "+16.2%", color: LIGHT.bull       },
  { label: "Sharpe",     value: "1.62",   color: LIGHT.primary    },
  { label: "Max DD",     value: "-14.1%", color: LIGHT.bear       },
  { label: "Trades",     value: "47",     color: LIGHT.foreground },
  { label: "Data (yrs)", value: "20",     color: LIGHT.foreground },
];

const STATS_S30 = [
  { label: "Win Rate",   value: "72%",    color: LIGHT.bull       },
  { label: "Avg Return", value: "+18.4%", color: LIGHT.bull       },
  { label: "Sharpe",     value: "1.82",   color: LIGHT.primary    },
  { label: "Max DD",     value: "-12.3%", color: LIGHT.bear       },
  { label: "Trades",     value: "31",     color: LIGHT.foreground },
  { label: "Data (yrs)", value: "20",     color: LIGHT.foreground },
];

// Timing (16s = 480 frames)
const CARD_CLICK_FRAME = 100; // 3.3s
const CHIP_CLICK_FRAME = 310; // 10.3s

export const D4Backtests: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: compWidth, height: compHeight } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  const cardStart   = 20;
  const cardStagger = 12;

  const detailProgress = spring({
    frame: frame - CARD_CLICK_FRAME,
    fps,
    config: { stiffness: 200, damping: 24 },
  });

  const s30Active = frame >= CHIP_CLICK_FRAME;
  const chipPulse = spring({ frame: frame - CHIP_CLICK_FRAME, fps, config: { stiffness: 300, damping: 20 } });

  const currentStats = s30Active ? STATS_S30 : STATS_BASELINE;
  const statStart    = CHIP_CLICK_FRAME + 10;

  const appWidth  = 1160;
  const appHeight = 600;

  const cursorKfs: CursorKeyframe[] = [
    { frame: 0,                        x: 0.5,  y: 0.5,  action: "idle"  },
    { frame: CARD_CLICK_FRAME - 15,    x: 0.29, y: 0.48, action: "hover" },
    { frame: CARD_CLICK_FRAME,         x: 0.29, y: 0.48, action: "click" },
    { frame: CARD_CLICK_FRAME + 80,    x: 0.55, y: 0.42, action: "idle"  },
    { frame: CHIP_CLICK_FRAME - 15,    x: 0.55, y: 0.38, action: "hover" },
    { frame: CHIP_CLICK_FRAME,         x: 0.55, y: 0.38, action: "click" },
    { frame: CHIP_CLICK_FRAME + 60,    x: 0.62, y: 0.58, action: "idle"  },
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
      <ClickSound clickFrames={[CARD_CLICK_FRAME, CHIP_CLICK_FRAME]} volume={0.4} />

      <div style={{ transform: `scale(${chromeScale * 1.3})`, opacity: chromeScale }}>
        <AppShell activePage="backtests" width={appWidth} height={appHeight} sidebarWidth={188} signalCount={28}>
          <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
            {/* Card list */}
            <div
              style={{
                width: 250,
                borderRight: `1px solid ${LIGHT.border}`,
                overflow: "hidden",
                flexShrink: 0,
                backgroundColor: LIGHT.card,
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
                <span style={{ fontSize: 11, fontWeight: 700, color: LIGHT.mutedFg, textTransform: "uppercase", letterSpacing: "0.07em" }}>Backtests</span>
                <span style={{ fontSize: 10, color: LIGHT.mutedFg, fontFamily: "monospace" }}>234 symbols</span>
              </div>

              {BACKTEST_LIST.map((card, i) => {
                const cardProgress = spring({ frame: frame - (cardStart + i * cardStagger), fps, config: { stiffness: 200, damping: 24 } });
                const isActive   = i === 0 && frame >= CARD_CLICK_FRAME;
                const heatColor  = HEAT_COLORS[card.heat];

                return (
                  <div
                    key={card.symbol}
                    style={{
                      padding: "11px 14px",
                      borderBottom: `1px solid ${LIGHT.border}`,
                      borderLeft: `3px solid ${isActive ? LIGHT.primary : "transparent"}`,
                      backgroundColor: isActive ? `${LIGHT.primary}08` : "transparent",
                      opacity: cardProgress,
                      transform: `translateY(${(1 - cardProgress) * 14}px)`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: LIGHT.foreground, fontFamily: "monospace", letterSpacing: "-0.01em" }}>
                        {card.symbol}
                      </div>
                      <div style={{ fontSize: 11, color: LIGHT.bull, fontFamily: "monospace", fontWeight: 700 }}>
                        {card.winRate}% WR
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontSize: 9, color: LIGHT.mutedFg }}>{card.trades} trades · {card.avgReturn}</div>
                      <div style={{ padding: "1px 5px", borderRadius: 3, backgroundColor: `${heatColor}15`, fontSize: 9, color: heatColor, fontWeight: 700 }}>
                        {card.heat}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail view */}
            <div
              style={{
                flex: 1,
                opacity: detailProgress,
                transform: `translateX(${(1 - detailProgress) * 28}px)`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Header + variant chips */}
              <div style={{ padding: "12px 20px", borderBottom: `1px solid ${LIGHT.border}`, flexShrink: 0, backgroundColor: LIGHT.card }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: LIGHT.foreground, letterSpacing: "-0.03em", fontFamily: "monospace" }}>
                    RELIANCE.NS
                  </div>
                  <div style={{ fontSize: 11, color: LIGHT.mutedFg }}>Backtest · 20 years</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {VARIANTS.map((v) => {
                    const isActive = s30Active ? v.hash === "v2-ath-ema220-s30" : v.hash === "v2-ath-ema220";
                    return (
                      <div
                        key={v.hash}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 20,
                          border: `1px solid ${isActive ? LIGHT.primary : LIGHT.border}`,
                          backgroundColor: isActive ? `${LIGHT.primary}18` : "transparent",
                          fontSize: 11,
                          color: isActive ? LIGHT.primary : LIGHT.mutedFg,
                          fontWeight: isActive ? 600 : 400,
                          transform: s30Active && v.hash === "v2-ath-ema220-s30" ? `scale(${1 + chipPulse * 0.03})` : "scale(1)",
                        }}
                      >
                        {v.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart + stats */}
              <div style={{ flex: 1, display: "flex", padding: "16px 20px", gap: 20, overflow: "hidden" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 10, color: LIGHT.mutedFg, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>
                    Equity Curve · 20 years
                  </div>
                  <div style={{ flex: 1 }}>
                    <BacktestChart startFrame={CARD_CLICK_FRAME + 15} />
                  </div>
                </div>

                {/* Stats */}
                <div style={{ width: 155, display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
                  {currentStats.map((stat, i) => {
                    const statP = spring({ frame: frame - (statStart + i * 8), fps, config: { stiffness: 220, damping: 22 } });
                    return (
                      <div key={stat.label} style={{ opacity: statP, transform: `translateY(${(1 - statP) * 10}px)` }}>
                        <div style={{ fontSize: 9, color: LIGHT.mutedFg, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>{stat.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, fontFamily: "monospace", letterSpacing: "-0.03em" }}>{stat.value}</div>
                      </div>
                    );
                  })}

                  {s30Active && (
                    <div
                      style={{
                        opacity: interpolate(frame - CHIP_CLICK_FRAME, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                        padding: "8px 10px",
                        borderRadius: 7,
                        border: `1px solid ${LIGHT.bull}40`,
                        backgroundColor: `${LIGHT.bull}08`,
                      }}
                    >
                      <div style={{ fontSize: 10, color: LIGHT.bull, fontWeight: 600, lineHeight: 1.4 }}>↑ +4pp win rate vs baseline</div>
                    </div>
                  )}
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
