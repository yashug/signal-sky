import React from "react";
import { interpolate, spring, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../config/theme";

// ─────────────────────────────────────────────────
//  Reel: 1080×1920 portrait, 40s = 1200 frames @ 30fps
//  Scenes:
//    R1 Intro         0–5s   (0–150)
//    R2 Scanner       5–18s  (150–540)
//    R3 Performance   18–27s (540–810)
//    R4 Signal Detail 27–36s (810–1080)
//    R5 Alerts        36–43s (1080–1290)
//    R6 CTA           43–40s wait — actually 43–45s not needed, do 38–40s
// Revised 40s: R1=5s R2=13s R3=9s R4=9s R5=8s R6=3s (but let's do 45 for quality)
// Actually keeping at 40s since user said "shorter version"
// ─────────────────────────────────────────────────

const FPS = 30;
const rf = (s: number) => Math.round(s * FPS);

// ─── Shared design tokens ───
const BG    = LIGHT.background;
const FG    = LIGHT.foreground;
const MFG   = LIGHT.mutedFg;
const PRI   = LIGHT.primary;
const BULL  = LIGHT.bull;
const CARD  = LIGHT.card;
const BRD   = LIGHT.border;

// ─── Reusable: App Browser Bar ───
const BrowserBar: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      height: 44,
      backgroundColor: CARD,
      borderBottom: `1px solid ${BRD}`,
      display: "flex",
      alignItems: "center",
      paddingLeft: 16,
      paddingRight: 16,
      gap: 8,
      flexShrink: 0,
    }}
  >
    {/* Traffic lights */}
    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
      <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }} />
    ))}
    <div
      style={{
        flex: 1,
        marginLeft: 8,
        height: 24,
        borderRadius: 6,
        backgroundColor: LIGHT.surface,
        border: `1px solid ${BRD}`,
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        fontSize: 10,
        color: MFG,
        fontFamily: "monospace",
        letterSpacing: "0.01em",
      }}
    >
      signalsky.app/scanner
    </div>
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: PRI,
        marginLeft: 4,
        padding: "2px 8px",
        borderRadius: 4,
        backgroundColor: `${PRI}12`,
        border: `1px solid ${PRI}25`,
      }}
    >
      {title}
    </div>
  </div>
);

// ─── Reel frame container ───
const ReelFrame: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = BG }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

// ─── R1 Intro (0-5s) ───
const R1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale   = spring({ frame, fps, config: { stiffness: 200, damping: 26 } });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const tagProgress = spring({ frame: frame - 20, fps, config: { stiffness: 180, damping: 24 } });
  const subProgress = spring({ frame: frame - 45, fps, config: { stiffness: 180, damping: 24 } });

  const TICKERS = ["RELIANCE", "TCS", "NVDA", "AAPL", "HDFC", "INFY", "WIPRO", "MSFT"];

  return (
    <ReelFrame>
      {/* Floating tickers */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.06 }}>
        {TICKERS.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: `${(i * 28 + 5) % 85}%`,
              top: `${(i * 19 + 8) % 85}%`,
              fontSize: 18,
              fontFamily: "monospace",
              fontWeight: 700,
              color: FG,
              transform: `rotate(${(i % 3 - 1) * 8}deg)`,
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${BRD}60 1px, transparent 1px), linear-gradient(90deg, ${BRD}60 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          opacity: 0.25,
        }}
      />

      {/* Center content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              background: `linear-gradient(135deg, ${PRI} 0%, #5a9fe8 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 12px 40px ${PRI}35`,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: FG, letterSpacing: "-0.04em" }}>
            SignalSky
          </div>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: `${logoScale * 220}px`,
            height: 3,
            backgroundColor: PRI,
            borderRadius: 2,
            marginBottom: 36,
            opacity: logoScale,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: FG,
            letterSpacing: "-0.04em",
            textAlign: "center",
            lineHeight: 1.2,
            opacity: tagProgress,
            transform: `translateY(${(1 - tagProgress) * 20}px)`,
            marginBottom: 20,
          }}
        >
          Smart signals.{"\n"}Every morning.
        </div>

        <div
          style={{
            fontSize: 20,
            color: MFG,
            textAlign: "center",
            opacity: subProgress,
            transform: `translateY(${(1 - subProgress) * 12}px)`,
            letterSpacing: "0.01em",
            lineHeight: 1.6,
          }}
        >
          Reset & Reclaim strategy for{"\n"}NSE · NASDAQ · S&P 500
        </div>

        {/* Bottom badges */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 48,
            opacity: subProgress,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["234 symbols", "20yr backtests", "Telegram alerts"].map((b) => (
            <div
              key={b}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid ${BRD}`,
                backgroundColor: CARD,
                fontSize: 14,
                color: MFG,
                fontWeight: 500,
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </ReelFrame>
  );
};

// ─── R2 Scanner (5-18s, 390 local frames) ───
type HeatK = "breakout" | "boiling" | "simmering" | "cooling";
const HEAT_C: Record<HeatK, { label: string; icon: string; color: string }> = {
  breakout:  { label: "Breakout",  icon: "🚀", color: LIGHT.heat.breakout  },
  boiling:   { label: "Boiling",   icon: "🔥", color: LIGHT.heat.boiling   },
  simmering: { label: "Simmering", icon: "🌡️", color: LIGHT.heat.simmering },
  cooling:   { label: "Cooling",   icon: "📈", color: LIGHT.heat.cooling   },
};
const SCANNER_ROWS = [
  { symbol: "RELIANCE", exchange: "NSE", heat: "breakout"  as HeatK, price: "₹2,547", gap: "-0.6%", slingshot: 12, winRate: 72 },
  { symbol: "TCS",      exchange: "NSE", heat: "boiling"   as HeatK, price: "₹3,312", gap: "2.2%",  slingshot: 8,  winRate: 68 },
  { symbol: "NVDA",     exchange: "US",  heat: "breakout"  as HeatK, price: "$875",   gap: "-0.8%", slingshot: 5,  winRate: 81 },
  { symbol: "HDFCBANK", exchange: "NSE", heat: "simmering" as HeatK, price: "₹1,892", gap: "3.6%",  slingshot: 25, winRate: 64 },
  { symbol: "AAPL",     exchange: "US",  heat: "boiling"   as HeatK, price: "$182",   gap: "1.4%",  slingshot: 15, winRate: 70 },
  { symbol: "INFY",     exchange: "NSE", heat: "simmering" as HeatK, price: "₹1,634", gap: "3.8%",  slingshot: 19, winRate: 60 },
];

const CHIP_CLICK = 180; // 6s local

const R2Scanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeProg  = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });
  const slingshotOn = frame >= CHIP_CLICK;
  const chipPulse   = spring({ frame: frame - CHIP_CLICK, fps, config: { stiffness: 300, damping: 20 } });
  const rows        = slingshotOn ? SCANNER_ROWS.filter((r) => r.slingshot <= 30) : SCANNER_ROWS;

  const calloutP = spring({ frame: frame - 260, fps, config: { stiffness: 220, damping: 22 } });

  return (
    <ReelFrame>
      {/* Top: app window */}
      <div
        style={{
          flex: 1,
          opacity: chromeProg,
          transform: `scale(${0.88 + chromeProg * 0.12})`,
          transformOrigin: "top center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserBar title="Scanner" />

        {/* Toolbar */}
        <div
          style={{
            height: 42,
            backgroundColor: CARD,
            borderBottom: `1px solid ${BRD}`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Universe */}
          <div style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${BRD}`, fontSize: 13, color: FG, backgroundColor: LIGHT.surface }}>
            Nifty 50
          </div>
          {/* Slingshot chips */}
          {["All", "≤30d", "≤60d"].map((l, i) => {
            const isA = slingshotOn ? i === 1 : i === 0;
            return (
              <div
                key={l}
                style={{
                  padding: "4px 14px",
                  borderRadius: 20,
                  border: `1px solid ${isA ? PRI : BRD}`,
                  backgroundColor: isA ? `${PRI}18` : "transparent",
                  fontSize: 13,
                  color: isA ? PRI : MFG,
                  fontWeight: isA ? 600 : 400,
                  transform: slingshotOn && i === 1 ? `scale(${1 + chipPulse * 0.04})` : "scale(1)",
                }}
              >
                {l}
              </div>
            );
          })}
          <div style={{ marginLeft: "auto", fontSize: 13, color: MFG, paddingRight: 12, fontFamily: "monospace" }}>
            {slingshotOn ? "28" : "47"} signals
          </div>
        </div>

        {/* Table header */}
        <div
          style={{
            display: "flex",
            paddingLeft: 12,
            paddingRight: 12,
            height: 32,
            backgroundColor: LIGHT.surface,
            borderBottom: `1px solid ${BRD}`,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {["Symbol", "Status", "Price", "Gap to Peak", "Slingshot"].map((h) => (
            <div key={h} style={{ flex: 1, fontSize: 10, fontWeight: 700, color: MFG, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {rows.map((row, i) => {
            const rowP    = spring({ frame: frame - (i * 14 + 8), fps, config: { stiffness: 200, damping: 24 } });
            const heatColor = HEAT_C[row.heat].color;
            return (
              <div
                key={row.symbol}
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                  paddingRight: 12,
                  height: 56,
                  borderBottom: `1px solid ${BRD}`,
                  borderLeft: `4px solid ${heatColor}`,
                  backgroundColor: `${heatColor}05`,
                  opacity: rowP,
                  transform: `translateX(${(1 - rowP) * -16}px)`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: FG, fontFamily: "monospace" }}>{row.symbol}</div>
                  <div style={{ fontSize: 11, color: MFG, marginTop: 1 }}>{row.exchange}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 999, backgroundColor: `${heatColor}15`, border: `1px solid ${heatColor}35`, fontSize: 12, fontWeight: 700, color: heatColor }}>
                    <span style={{ fontSize: 14 }}>{HEAT_C[row.heat].icon}</span>
                    {HEAT_C[row.heat].label}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: FG, fontFamily: "monospace" }}>{row.price}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: row.gap.startsWith("-") ? BULL : LIGHT.bear }}>{row.gap}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 6, backgroundColor: row.slingshot <= 30 ? `${PRI}10` : LIGHT.surface, border: `1px solid ${row.slingshot <= 30 ? `${PRI}25` : BRD}`, fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: row.slingshot <= 30 ? PRI : MFG }}>
                    {row.slingshot}d
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom: callout text */}
      <div
        style={{
          padding: "28px 32px 40px",
          backgroundColor: CARD,
          borderTop: `1px solid ${BRD}`,
          opacity: calloutP,
          transform: `translateY(${(1 - calloutP) * 20}px)`,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800, color: FG, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>
          {slingshotOn ? "Slingshot ≤30d." : "The entire market."}
          <br />
          <span style={{ color: PRI }}>{slingshotOn ? "Only the sharpest setups." : "Ranked daily."}</span>
        </div>
        <div style={{ fontSize: 16, color: MFG, lineHeight: 1.5 }}>
          {slingshotOn
            ? "Filter to stocks that broke ATH within 30 days of EMA reclaim — tighter window, higher conviction."
            : "Reset & Reclaim strategy. Every morning, before market open."}
        </div>
      </div>
    </ReelFrame>
  );
};

// ─── R3 Performance (18-27s, 270 local frames) ───
const PERF_BASELINE = [
  { label: "Win Rate",   value: 68,  suffix: "%", color: BULL    },
  { label: "Avg Return", value: 16,  suffix: "%", color: BULL    },
  { label: "Sharpe",     value: 1.6, suffix: "",  color: PRI, decimals: 1 },
  { label: "Symbols",    value: 234, suffix: "",  color: FG      },
];
const PERF_S30 = [
  { label: "Win Rate",   value: 76,  suffix: "%", color: BULL    },
  { label: "Avg Return", value: 22,  suffix: "%", color: BULL    },
  { label: "Sharpe",     value: 2.1, suffix: "",  color: PRI, decimals: 1 },
  { label: "Symbols",    value: 234, suffix: "",  color: FG      },
];

const R3Performance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeProg = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });
  const s30Active  = frame >= 180;
  const switchP    = spring({ frame: frame - 180, fps, config: { stiffness: 300, damping: 20 } });
  const statP      = interpolate(frame, [20, fps * 2.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const statP2     = interpolate(frame - 190, [0, fps * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stats      = s30Active ? PERF_S30 : PERF_BASELINE;
  const progress   = s30Active ? statP2 : statP;

  return (
    <ReelFrame>
      <div style={{ opacity: chromeProg, transform: `scale(${0.92 + chromeProg * 0.08})`, transformOrigin: "top center", flex: 1, display: "flex", flexDirection: "column" }}>
        <BrowserBar title="Performance" />

        {/* Filter chips */}
        <div style={{ padding: "12px 16px", display: "flex", gap: 8, backgroundColor: CARD, borderBottom: `1px solid ${BRD}`, flexShrink: 0 }}>
          {["No filter", "≤30d", "≤60d", "≤90d"].map((l, i) => {
            const isA = s30Active ? i === 1 : i === 0;
            return (
              <div
                key={l}
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  border: `1px solid ${isA ? PRI : BRD}`,
                  backgroundColor: isA ? `${PRI}18` : "transparent",
                  fontSize: 14,
                  color: isA ? PRI : MFG,
                  fontWeight: isA ? 600 : 400,
                  transform: s30Active && i === 1 ? `scale(${1 + switchP * 0.04})` : "scale(1)",
                }}
              >
                {l}
              </div>
            );
          })}
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px", flex: 1, alignContent: "start" }}>
          {stats.map((stat, i) => {
            const cardP = spring({ frame: frame - (i * 10 + 15), fps, config: { stiffness: 200, damping: 24 } });
            const raw   = stat.value * progress;
            const disp  = "decimals" in stat && stat.decimals ? raw.toFixed(1) : Math.round(raw).toString();
            return (
              <div
                key={stat.label}
                style={{
                  padding: "22px 20px",
                  borderRadius: 14,
                  border: `1px solid ${BRD}`,
                  backgroundColor: CARD,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 16}px)`,
                }}
              >
                <div style={{ fontSize: 12, color: MFG, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontWeight: 600 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 48, fontWeight: 800, color: stat.color, fontFamily: "monospace", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {disp}{stat.suffix}
                </div>
                {s30Active && i > 0 && i < 3 && (
                  <div style={{ marginTop: 8, fontSize: 13, color: BULL, fontWeight: 600, opacity: switchP }}>↑ vs baseline</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom text */}
      <div style={{ padding: "24px 32px 40px", backgroundColor: CARD, borderTop: `1px solid ${BRD}` }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: FG, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
          {s30Active ? (
            <><span style={{ color: BULL }}>76% win rate</span> with Slingshot ≤30d</>
          ) : (
            <>234 symbols. 20 years. <span style={{ color: BULL }}>68% avg win rate.</span></>
          )}
        </div>
        <div style={{ fontSize: 15, color: MFG }}>
          {s30Active ? "Tighter breakout window → sharper edge." : "Every backtest. Every variant. Aggregated."}
        </div>
      </div>
    </ReelFrame>
  );
};

// ─── R4 Signal Detail (27-36s, 270 local frames) ───
const R4SignalDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeProg = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Why triggered cards stagger
  const whyProgress = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Position calc typewriter
  const typeStart = 140;
  const typeP = interpolate(frame - typeStart, [0, fps * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stopLoss = Math.round(2435 * typeP);
  const qty      = Math.round(61 * typeP);
  const riskDisp = (1.5 * typeP).toFixed(1) + "%";

  // Chart phases
  const chartPhase = Math.min(4, Math.floor((frame / fps) * 0.6)) as 0 | 1 | 2 | 3 | 4;

  // Simple chart visual (mini bars)
  const chartBars = [40, 42, 38, 45, 43, 50, 48, 55, 52, 58, 62, 64, 68, 65, 70, 73, 72, 76, 74, 79];
  const visibleBars = Math.round(chartBars.length * Math.min(1, frame / 90));

  return (
    <ReelFrame>
      <div
        style={{
          opacity: chromeProg,
          transform: `scale(${0.9 + chromeProg * 0.1})`,
          transformOrigin: "top center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserBar title="Signal Detail" />

        {/* Header */}
        <div
          style={{
            padding: "16px 16px 12px",
            backgroundColor: CARD,
            borderBottom: `1px solid ${BRD}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: FG, letterSpacing: "-0.04em", fontFamily: "monospace" }}>RELIANCE</div>
              <div style={{ padding: "4px 12px", borderRadius: 999, backgroundColor: `${LIGHT.heat.breakout}15`, border: `1px solid ${LIGHT.heat.breakout}35`, fontSize: 13, fontWeight: 700, color: LIGHT.heat.breakout }}>
                🚀 Breakout
              </div>
            </div>
            <div style={{ fontSize: 13, color: MFG }}>Reliance Industries Ltd. · NSE</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: FG, fontFamily: "monospace", letterSpacing: "-0.03em" }}>₹2,547</div>
            <div style={{ fontSize: 14, color: BULL, fontFamily: "monospace", fontWeight: 700 }}>↑ +2.14%</div>
          </div>
        </div>

        {/* Chart area */}
        <div style={{ padding: "14px 16px 10px", backgroundColor: BG, borderBottom: `1px solid ${BRD}`, flexShrink: 0 }}>
          <div style={{ height: 160, display: "flex", alignItems: "flex-end", gap: 3, paddingBottom: 4 }}>
            {chartBars.slice(0, visibleBars).map((v, i) => {
              const isRecent = i >= 14;
              const isPeak   = i === 15;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${(v / 80) * 140}px`,
                    borderRadius: "3px 3px 0 0",
                    backgroundColor: isPeak
                      ? LIGHT.heat.breakout
                      : isRecent
                      ? `${PRI}90`
                      : `${PRI}40`,
                    minWidth: 0,
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            {[
              { dot: LIGHT.bear, label: "Break date: Nov 14" },
              { dot: BULL,       label: "Reclaim: Jan 22"    },
              { dot: LIGHT.heat.breakout, label: "Breakout!" },
            ].map(({ dot, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: MFG }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: dot }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Why triggered */}
        <div
          style={{
            padding: "12px 16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            opacity: whyProgress,
            transform: `translateY(${(1 - whyProgress) * 12}px)`,
            flexShrink: 0,
          }}
        >
          {[
            { label: "Pre-set ATH",  value: "₹2,531", color: PRI   },
            { label: "Slingshot",    value: "12d",     color: PRI   },
            { label: "Win Rate",     value: "72%",     color: BULL  },
            { label: "R:R Target",   value: "1 : 4.0", color: BULL  },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${item.color}25`,
                backgroundColor: `${item.color}08`,
              }}
            >
              <div style={{ fontSize: 10, color: MFG, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: item.color, fontFamily: "monospace" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Position calculator */}
        {frame > typeStart - 20 && (
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: CARD,
              borderTop: `1px solid ${BRD}`,
              opacity: interpolate(frame, [typeStart - 20, typeStart], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: MFG, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Position Calculator</div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: MFG, marginBottom: 3 }}>Risk %</div>
                <div style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${PRI}`, backgroundColor: LIGHT.surface, fontSize: 15, fontWeight: 600, color: FG, fontFamily: "monospace", boxShadow: `0 0 0 3px ${PRI}15` }}>
                  {riskDisp}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: MFG, marginBottom: 3 }}>Stop Loss</div>
                <div style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${BRD}`, backgroundColor: LIGHT.surface, fontSize: 15, fontWeight: 600, color: LIGHT.bear, fontFamily: "monospace" }}>
                  {stopLoss > 0 ? `₹${stopLoss.toLocaleString("en-IN")}` : "—"}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: MFG, marginBottom: 3 }}>Qty</div>
                <div style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${BRD}`, backgroundColor: LIGHT.surface, fontSize: 15, fontWeight: 600, color: FG, fontFamily: "monospace" }}>
                  {qty > 0 ? `${qty} sh` : "—"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom text */}
      <div style={{ padding: "20px 32px 40px", backgroundColor: CARD, borderTop: `1px solid ${BRD}` }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: FG, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
          Chart marks the <span style={{ color: PRI }}>exact breakout.</span>
        </div>
        <div style={{ fontSize: 15, color: MFG }}>
          Pre-set ATH, break date, reclaim date, slingshot days — all annotated. Position calculator included.
        </div>
      </div>
    </ReelFrame>
  );
};

// ─── R5 Alerts (36-43s, 210 local frames) ───
const R5Alerts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeProg = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Phone slides up from bottom
  const phoneSlide = spring({ frame: frame - 20, fps, config: { stiffness: 180, damping: 24 } });
  const phoneY     = interpolate(phoneSlide, [0, 1], [200, 0]);

  // Notification pops
  const notifProg = spring({ frame: frame - 60, fps, config: { stiffness: 200, damping: 22 } });

  return (
    <ReelFrame>
      {/* Phone mockup in center */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
          opacity: chromeProg,
          transform: `translateY(${phoneY}px)`,
        }}
      >
        {/* Phone */}
        <div
          style={{
            width: 320,
            height: 560,
            borderRadius: 36,
            backgroundColor: LIGHT.foreground,
            boxShadow: `0 24px 80px rgba(0,0,0,0.22)`,
            overflow: "hidden",
            border: `8px solid ${LIGHT.foreground}`,
            position: "relative",
          }}
        >
          {/* Phone screen */}
          <div style={{ width: "100%", height: "100%", backgroundColor: "#1a1a2e", display: "flex", flexDirection: "column" }}>
            {/* Status bar */}
            <div style={{ height: 24, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", marginTop: 4 }}>
              <div style={{ fontSize: 11, color: "white", fontWeight: 600 }}>9:41</div>
              <div style={{ display: "flex", gap: 4 }}>
                {[20, 14, 10].map((w) => (
                  <div key={w} style={{ width: w, height: 6, borderRadius: 2, backgroundColor: "white", opacity: 0.7 }} />
                ))}
              </div>
            </div>

            {/* App icon row */}
            <div style={{ padding: "8px 16px", display: "flex", gap: 12, alignItems: "center", opacity: 0.6 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${PRI} 0%, #5a9fe8 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "white", fontWeight: 700 }}>SignalSky</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>now</div>
              </div>
            </div>

            {/* Notification */}
            <div
              style={{
                margin: "4px 12px",
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                padding: "14px 16px",
                opacity: notifProg,
                transform: `scale(${0.95 + notifProg * 0.05}) translateY(${(1 - notifProg) * 20}px)`,
                boxShadow: `0 4px 24px rgba(29, 143, 82, 0.3)`,
                border: `1px solid rgba(29, 143, 82, 0.4)`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: BULL }} />
                  <span style={{ fontSize: 13, color: "white", fontWeight: 800, fontFamily: "monospace" }}>🚀 BREAKOUT</span>
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>NSE</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "white", fontFamily: "monospace", marginBottom: 4 }}>RELIANCE.NS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Price</div>
                  <div style={{ fontSize: 14, color: "white", fontFamily: "monospace", fontWeight: 700 }}>₹2,547</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Prior Peak</div>
                  <div style={{ fontSize: 14, color: BULL, fontFamily: "monospace", fontWeight: 700 }}>₹2,531</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Slingshot</div>
                  <div style={{ fontSize: 14, color: PRI, fontFamily: "monospace", fontWeight: 700 }}>12d</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Win Rate</div>
                  <div style={{ fontSize: 14, color: BULL, fontFamily: "monospace", fontWeight: 700 }}>72%</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                ⚡ Stock at/above Prior Peak. EMA reclaimed 12 days ago.
              </div>
            </div>

            {/* Second notification (dimmed) */}
            <div style={{ margin: "4px 12px", borderRadius: 14, backgroundColor: "rgba(255,255,255,0.07)", padding: "10px 14px", opacity: notifProg * 0.4 }}>
              <div style={{ fontSize: 12, color: "white", fontWeight: 700, fontFamily: "monospace" }}>🔥 TCS.NS — BOILING</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>₹3,312 · 8d slingshot</div>
            </div>
          </div>
        </div>

        {/* Telegram branding */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: notifProg,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={PRI}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.036 9.594c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.24 14.566l-2.94-.916c-.64-.197-.653-.64.136-.948l11.494-4.432c.532-.19 1.001.13.632.978z"/></svg>
          <span style={{ fontSize: 16, color: MFG, fontWeight: 600 }}>via Telegram · Instant delivery</span>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{ padding: "20px 32px 40px", backgroundColor: CARD, borderTop: `1px solid ${BRD}` }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: FG, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
          Your edge <span style={{ color: PRI }}>delivered instantly.</span>
        </div>
        <div style={{ fontSize: 15, color: MFG }}>
          Connect Telegram in 30 seconds. Get Breakout alerts the moment they fire.
        </div>
      </div>
    </ReelFrame>
  );
};

// ─── R6 CTA (43-46s, 90 local frames) ───
const R6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { stiffness: 200, damping: 26 } });
  const urlPulse = 1 + interpolate(Math.sin((frame / fps) * Math.PI * 1.5), [-1, 1], [0, 0.02], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ReelFrame>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px",
          gap: 0,
          opacity: progress,
          transform: `scale(${0.94 + progress * 0.06})`,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: `linear-gradient(135deg, ${PRI} 0%, #5a9fe8 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 32px ${PRI}35` }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: FG, letterSpacing: "-0.04em" }}>SignalSky</div>
        </div>

        <div style={{ width: 180, height: 3, backgroundColor: PRI, borderRadius: 2, marginBottom: 40 }} />

        <div style={{ fontSize: 36, fontWeight: 800, color: FG, textAlign: "center", letterSpacing: "-0.04em", lineHeight: 1.2, marginBottom: 16 }}>
          Your edge starts<br /><span style={{ color: PRI }}>tomorrow morning.</span>
        </div>

        <div style={{ fontSize: 17, color: MFG, marginBottom: 40, textAlign: "center" }}>
          7-day free trial · No card required
        </div>

        {/* Pricing cards */}
        <div style={{ display: "flex", gap: 14, marginBottom: 40 }}>
          {[
            { label: "Monthly", price: "₹299", interval: "/mo", highlight: false },
            { label: "Yearly",  price: "₹2,999", interval: "/yr", highlight: true  },
            { label: "Lifetime",price: "₹4,999", interval: "/once", highlight: false },
          ].map((p, i) => {
            const cardP = spring({ frame: frame - i * 10, fps, config: { stiffness: 200, damping: 24 } });
            return (
              <div
                key={p.label}
                style={{
                  width: 120,
                  padding: "16px 14px",
                  borderRadius: 12,
                  border: p.highlight ? `2px solid ${PRI}` : `1px solid ${BRD}`,
                  backgroundColor: p.highlight ? `${PRI}08` : CARD,
                  textAlign: "center",
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 16}px)`,
                  position: "relative",
                }}
              >
                {p.highlight && (
                  <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", padding: "2px 10px", borderRadius: 999, backgroundColor: PRI, fontSize: 9, fontWeight: 700, color: "white", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                    BEST VALUE
                  </div>
                )}
                <div style={{ fontSize: 10, fontWeight: 600, color: MFG, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{p.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: p.highlight ? PRI : FG, fontFamily: "monospace", letterSpacing: "-0.04em" }}>{p.price}</div>
                <div style={{ fontSize: 10, color: MFG }}>{p.interval}</div>
              </div>
            );
          })}
        </div>

        {/* URL */}
        <div style={{ fontSize: 32, fontWeight: 800, color: PRI, fontFamily: "monospace", letterSpacing: "-0.02em", transform: `scale(${urlPulse})` }}>
          signalsky.app
        </div>
      </div>
    </ReelFrame>
  );
};

// ─── Reel Composition ───
export const DemoReelComposition: React.FC = () => {
  return (
    <>
      <Sequence from={0}            durationInFrames={rf(5)}>  <R1Intro />       </Sequence>
      <Sequence from={rf(5)}        durationInFrames={rf(13)}> <R2Scanner />     </Sequence>
      <Sequence from={rf(18)}       durationInFrames={rf(9)}>  <R3Performance /> </Sequence>
      <Sequence from={rf(27)}       durationInFrames={rf(9)}>  <R4SignalDetail /></Sequence>
      <Sequence from={rf(36)}       durationInFrames={rf(7)}>  <R5Alerts />      </Sequence>
      <Sequence from={rf(43)}       durationInFrames={rf(3)}>  <R6CTA />         </Sequence>
    </>
  );
};
