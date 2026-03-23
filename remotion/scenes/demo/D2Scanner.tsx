import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";
import { AnimatedCursor, CursorKeyframe } from "../../components/AnimatedCursor";
import { ClickSound } from "../../components/ClickSound";

type HeatKey = "breakout" | "boiling" | "simmering" | "cooling";

const HEAT_CONFIG: Record<HeatKey, { label: string; icon: string; color: string }> = {
  breakout:  { label: "Breakout",  icon: "🚀", color: LIGHT.heat.breakout  },
  boiling:   { label: "Boiling",   icon: "🔥", color: LIGHT.heat.boiling   },
  simmering: { label: "Simmering", icon: "🌡️", color: LIGHT.heat.simmering },
  cooling:   { label: "Cooling",   icon: "📈", color: LIGHT.heat.cooling    },
};

interface SignalRow {
  symbol: string;
  company: string;
  exchange: "NSE" | "US";
  heat: HeatKey;
  price: string;
  priorPeak: string;
  gap: string;
  gapPositive: boolean;
  ema: string;
  slingshot: number;
  winRate: number;
}

const ROWS: SignalRow[] = [
  { symbol: "RELIANCE", company: "Reliance Industries",  exchange: "NSE", heat: "breakout",  price: "₹2,547",  priorPeak: "₹2,531", gap: "-0.6%", gapPositive: false, ema: "₹2,298", slingshot: 12, winRate: 72 },
  { symbol: "TCS",      company: "Tata Consultancy",     exchange: "NSE", heat: "boiling",   price: "₹3,312",  priorPeak: "₹3,386", gap: "2.2%",  gapPositive: true,  ema: "₹3,018", slingshot: 8,  winRate: 68 },
  { symbol: "NVDA",     company: "NVIDIA Corporation",   exchange: "US",  heat: "breakout",  price: "$875.20", priorPeak: "$868",   gap: "-0.8%", gapPositive: false, ema: "$791",   slingshot: 5,  winRate: 81 },
  { symbol: "HDFCBANK", company: "HDFC Bank",            exchange: "NSE", heat: "simmering", price: "₹1,892",  priorPeak: "₹1,962", gap: "3.6%",  gapPositive: true,  ema: "₹1,712", slingshot: 25, winRate: 64 },
  { symbol: "AAPL",     company: "Apple Inc.",           exchange: "US",  heat: "boiling",   price: "$182.40", priorPeak: "$185",   gap: "1.4%",  gapPositive: true,  ema: "$168",   slingshot: 15, winRate: 70 },
  { symbol: "INFY",     company: "Infosys Limited",      exchange: "NSE", heat: "simmering", price: "₹1,634",  priorPeak: "₹1,698", gap: "3.8%",  gapPositive: true,  ema: "₹1,521", slingshot: 19, winRate: 60 },
  { symbol: "WIPRO",    company: "Wipro Limited",        exchange: "NSE", heat: "cooling",   price: "₹485",    priorPeak: "₹529",   gap: "8.3%",  gapPositive: true,  ema: "₹441",   slingshot: 41, winRate: 55 },
];

// Timing constants (22s scene = 660 frames @ 30fps)
const CHIP_CLICK_FRAME   = 180; // 6s — cursor clicks slingshot ≤30d chip
const SPOTLIGHT_START    = 340; // 11.3s — spotlight on RELIANCE row
const TOOLTIP_FRAME      = 375; // 12.5s — tooltip appears near slingshot cell
const CALLOUT_START      = 420; // 14s — callout badges animate in

export const D2Scanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: compWidth, height: compHeight } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Slingshot chip state
  const slingshotActive = frame >= CHIP_CLICK_FRAME;
  const chipPulse = spring({ frame: frame - CHIP_CLICK_FRAME, fps, config: { stiffness: 300, damping: 20 } });

  const visibleRows = slingshotActive ? ROWS.filter((r) => r.slingshot <= 30) : ROWS;

  // Spotlight on RELIANCE
  const spotlightProgress = spring({ frame: frame - SPOTLIGHT_START, fps, config: { stiffness: 160, damping: 22 } });
  const spotlightOut = spring({ frame: frame - 580, fps, config: { stiffness: 120, damping: 20 } });
  const spotlightOpacity = Math.max(0, spotlightProgress - spotlightOut) * 0.08;

  // Tooltip popover
  const tooltipProgress = spring({ frame: frame - TOOLTIP_FRAME, fps, config: { stiffness: 280, damping: 22 } });

  // Callout badges
  const calloutProgress = spring({ frame: frame - CALLOUT_START, fps, config: { stiffness: 220, damping: 22 } });

  // Row highlight ring opacity
  const ringOpacity = interpolate(
    frame,
    [SPOTLIGHT_START, SPOTLIGHT_START + 20, 575, 595],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const appWidth  = 1140;
  const appHeight = 580;

  const cursorKfs: CursorKeyframe[] = [
    { frame: 0,                  x: 0.50, y: 0.50, action: "idle"  },
    { frame: 120,                x: 0.44, y: 0.37, action: "hover" },
    { frame: CHIP_CLICK_FRAME,   x: 0.44, y: 0.37, action: "click" },
    { frame: 250,                x: 0.55, y: 0.55, action: "idle"  },
    { frame: SPOTLIGHT_START - 20, x: 0.38, y: 0.48, action: "hover" },
    { frame: SPOTLIGHT_START + 5,  x: 0.38, y: 0.48, action: "click" },
    { frame: TOOLTIP_FRAME,      x: 0.80, y: 0.48, action: "hover" },
    { frame: 600,                x: 0.60, y: 0.60, action: "idle"  },
  ];

  const COL_HEADERS = [
    { label: "Symbol",      w: "22%" },
    { label: "Mkt",         w: "7%"  },
    { label: "Status",      w: "13%" },
    { label: "Price",       w: "11%" },
    { label: "Prior Peak",  w: "12%" },
    { label: "Gap to Peak", w: "11%" },
    { label: "EMA 220",     w: "11%" },
    { label: "Slingshot",   w: "13%" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: LIGHT.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      <ClickSound clickFrames={[CHIP_CLICK_FRAME, SPOTLIGHT_START + 5]} volume={0.45} />

      {/* Clip-path reveal on entry */}
      <div
        style={{
          transform: `scale(${chromeScale * 1.3})`,
          transformOrigin: "center center",
          opacity: chromeScale,
          position: "relative",
        }}
      >
        {/* Spotlight glow behind RELIANCE row (rendered over app) */}
        {spotlightOpacity > 0.001 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, transparent 46%, ${LIGHT.heat.breakout}${Math.round(spotlightOpacity * 1200).toString(16).padStart(2, "0")} 50%, transparent 55%)`,
              pointerEvents: "none",
              zIndex: 20,
              borderRadius: 12,
            }}
          />
        )}

        <AppShell
          activePage="scanner"
          width={appWidth}
          height={appHeight}
          sidebarWidth={200}
          signalCount={slingshotActive ? 28 : 47}
        >
          <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            {/* Toolbar */}
            <div
              style={{
                height: 46,
                borderBottom: `1px solid ${LIGHT.border}`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
                gap: 10,
                flexShrink: 0,
                backgroundColor: LIGHT.card,
              }}
            >
              {/* Universe dropdown */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: `1px solid ${LIGHT.border}`,
                  backgroundColor: LIGHT.surface,
                  fontSize: 11,
                  color: LIGHT.foreground,
                  fontWeight: 500,
                }}
              >
                <span>Nifty 50</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={LIGHT.mutedFg} strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Slingshot chips */}
              {["All", "≤30d", "≤60d", "≤90d"].map((label, i) => {
                const isActive = slingshotActive ? i === 1 : i === 0;
                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 12px",
                      borderRadius: 20,
                      border: `1px solid ${isActive ? LIGHT.primary : LIGHT.border}`,
                      backgroundColor: isActive ? `${LIGHT.primary}18` : "transparent",
                      fontSize: 11,
                      color: isActive ? LIGHT.primary : LIGHT.mutedFg,
                      fontWeight: isActive ? 600 : 400,
                      transform: slingshotActive && i === 1 ? `scale(${1 + chipPulse * 0.03})` : "scale(1)",
                    }}
                  >
                    {i === 0 ? (
                      <>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        Slingshot
                      </>
                    ) : label}
                  </div>
                );
              })}

              {/* Heat tabs */}
              <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                {(["All", "Breakout", "Boiling", "Simmering"] as const).map((tab, i) => (
                  <div
                    key={tab}
                    style={{
                      padding: "4px 10px",
                      fontSize: 11,
                      borderRadius: 5,
                      backgroundColor: i === 0 ? `${LIGHT.primary}12` : "transparent",
                      color: i === 0 ? LIGHT.primary : LIGHT.mutedFg,
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {/* Table header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
                height: 34,
                borderBottom: `1px solid ${LIGHT.border}`,
                backgroundColor: LIGHT.surface,
                flexShrink: 0,
              }}
            >
              {COL_HEADERS.map((col) => (
                <div
                  key={col.label}
                  style={{
                    width: col.w,
                    fontSize: 10,
                    fontWeight: 600,
                    color: LIGHT.mutedFg,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                  }}
                >
                  {col.label}
                </div>
              ))}
            </div>

            {/* Table rows */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              {visibleRows.map((row, i) => {
                const rowProgress = spring({
                  frame: frame - (i * 15 + 8),
                  fps,
                  config: { stiffness: 200, damping: 24 },
                });

                const heatColor = LIGHT.heat[row.heat];
                const isSpotlit = i === 0 && frame > SPOTLIGHT_START;

                return (
                  <div
                    key={row.symbol}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 16,
                      paddingRight: 16,
                      height: 54,
                      borderBottom: `1px solid ${LIGHT.border}`,
                      borderLeft: `3px solid ${heatColor}`,
                      backgroundColor: isSpotlit
                        ? `${heatColor}10`
                        : `${heatColor}04`,
                      opacity: rowProgress,
                      transform: `translateY(${(1 - rowProgress) * 12}px)`,
                      position: "relative",
                      flexShrink: 0,
                      transition: "background-color 0.3s",
                    }}
                  >
                    {/* Spotlight ring */}
                    {isSpotlit && ringOpacity > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          border: `2px solid ${heatColor}80`,
                          borderRadius: 2,
                          opacity: ringOpacity,
                          pointerEvents: "none",
                          boxShadow: `inset 0 0 12px ${heatColor}20`,
                        }}
                      />
                    )}

                    {/* Tooltip popover on slingshot cell */}
                    {isSpotlit && tooltipProgress > 0.05 && (
                      <div
                        style={{
                          position: "absolute",
                          right: 14,
                          top: -46,
                          zIndex: 30,
                          opacity: tooltipProgress,
                          transform: `scale(${0.85 + tooltipProgress * 0.15}) translateY(${(1 - tooltipProgress) * 8}px)`,
                          transformOrigin: "bottom right",
                          padding: "7px 12px",
                          borderRadius: 8,
                          backgroundColor: LIGHT.foreground,
                          color: "white",
                          fontSize: 10,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                          letterSpacing: "0.01em",
                          lineHeight: 1.5,
                        }}
                      >
                        ⚡ 12 days from EMA reclaim → still inside breakout window
                        {/* Caret */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: -5,
                            right: 20,
                            width: 10,
                            height: 10,
                            backgroundColor: LIGHT.foreground,
                            transform: "rotate(45deg)",
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    )}

                    {/* Symbol column */}
                    <div style={{ width: "22%", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: LIGHT.foreground, fontFamily: "monospace", letterSpacing: "-0.01em" }}>
                          {row.symbol}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: LIGHT.bull, backgroundColor: `${LIGHT.bull}15`, padding: "1px 5px", borderRadius: 3, fontFamily: "monospace" }}>
                          {row.winRate}%
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: LIGHT.mutedFg, marginTop: 1 }}>{row.company}</div>
                    </div>

                    {/* Market column */}
                    <div style={{ width: "7%", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "2px 6px",
                          borderRadius: 4,
                          backgroundColor: row.exchange === "NSE" ? `${LIGHT.primary}10` : `${LIGHT.simmering}10`,
                          border: `1px solid ${row.exchange === "NSE" ? `${LIGHT.primary}30` : `${LIGHT.simmering}30`}`,
                          fontSize: 9,
                          fontWeight: 700,
                          color: row.exchange === "NSE" ? LIGHT.primary : LIGHT.simmering,
                          fontFamily: "monospace",
                        }}
                      >
                        {row.exchange}
                      </div>
                    </div>

                    {/* Heat badge */}
                    <div style={{ width: "13%", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "3px 8px",
                          borderRadius: 999,
                          backgroundColor: `${heatColor}15`,
                          border: `1px solid ${heatColor}35`,
                          fontSize: 10,
                          fontWeight: 600,
                          color: heatColor,
                        }}
                      >
                        <span style={{ fontSize: 11 }}>{HEAT_CONFIG[row.heat].icon}</span>
                        <span>{HEAT_CONFIG[row.heat].label}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ width: "11%", flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: LIGHT.foreground, fontFamily: "monospace" }}>{row.price}</div>
                      <div style={{ fontSize: 10, color: LIGHT.bull, fontFamily: "monospace", marginTop: 1 }}>↑ +1.2%</div>
                    </div>

                    {/* Prior Peak */}
                    <div style={{ width: "12%", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: LIGHT.foreground, fontFamily: "monospace" }}>{row.priorPeak}</div>
                    </div>

                    {/* Gap */}
                    <div style={{ width: "11%", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: row.gapPositive ? LIGHT.bear : LIGHT.bull }}>{row.gap}</div>
                    </div>

                    {/* EMA 220 */}
                    <div style={{ width: "11%", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: LIGHT.mutedFg, fontFamily: "monospace" }}>{row.ema}</div>
                    </div>

                    {/* Slingshot */}
                    <div style={{ width: "13%", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "3px 8px",
                          borderRadius: 6,
                          backgroundColor: row.slingshot <= 30 ? `${LIGHT.primary}10` : LIGHT.surface,
                          border: `1px solid ${row.slingshot <= 30 ? `${LIGHT.primary}25` : LIGHT.border}`,
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "monospace",
                          color: row.slingshot <= 30 ? LIGHT.primary : LIGHT.mutedFg,
                          boxShadow: isSpotlit && i === 0 && tooltipProgress > 0.2
                            ? `0 0 0 2px ${LIGHT.primary}40`
                            : "none",
                        }}
                      >
                        {row.slingshot}d
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AppShell>
      </div>

      {/* Callout badges */}
      {calloutProgress > 0.05 && (
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 60,
            display: "flex",
            gap: 12,
            opacity: calloutProgress,
            transform: `translateY(${(1 - calloutProgress) * 12}px)`,
          }}
        >
          {[
            { icon: "🚀", text: "At / above Prior Peak", color: LIGHT.heat.breakout },
            { icon: "⚡", text: "12d since EMA reclaim",  color: LIGHT.primary      },
            { icon: "📊", text: "72% historical win rate", color: LIGHT.bull         },
          ].map(({ icon, text, color }) => (
            <div
              key={text}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${color}50`,
                backgroundColor: `${color}10`,
                fontSize: 12,
                color,
                fontWeight: 600,
              }}
            >
              {icon} {text}
            </div>
          ))}
        </div>
      )}

      <AnimatedCursor keyframes={cursorKfs} compositionWidth={compWidth} compositionHeight={compHeight} size={28} />
    </div>
  );
};
