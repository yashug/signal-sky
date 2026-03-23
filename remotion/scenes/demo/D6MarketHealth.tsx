import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";

interface MarketCard {
  index: string;
  universe: string;
  pct: number;
  above: number;
  total: number;
  status: "BULLISH" | "NEUTRAL" | "BEARISH";
  startFrame: number;
}

const CARDS: MarketCard[] = [
  { index: "Nifty 50",    universe: "NSE",    pct: 76, above: 38,  total: 50,  status: "BULLISH", startFrame: 20  },
  { index: "Bank Nifty",  universe: "NSE",    pct: 58, above: 7,   total: 12,  status: "NEUTRAL", startFrame: 50  },
  { index: "S&P 100",     universe: "US",     pct: 71, above: 71,  total: 100, status: "BULLISH", startFrame: 80  },
  { index: "NASDAQ 100",  universe: "US",     pct: 64, above: 64,  total: 100, status: "NEUTRAL", startFrame: 110 },
];

const STATUS_COLOR = {
  BULLISH: LIGHT.bull,
  NEUTRAL: LIGHT.simmering,
  BEARISH: LIGHT.bear,
};

// Mini history bars for the sparkline
const HISTORY_DATA: Record<string, number[]> = {
  "Nifty 50":   [58, 61, 63, 67, 70, 72, 74, 76],
  "Bank Nifty": [44, 47, 50, 53, 55, 57, 58, 58],
  "S&P 100":    [52, 56, 60, 63, 66, 68, 70, 71],
  "NASDAQ 100": [48, 52, 55, 58, 60, 62, 63, 64],
};

function MarketHealthCard({
  card,
  frame,
  fps,
}: {
  card: MarketCard;
  frame: number;
  fps: number;
}) {
  const cardProgress = spring({
    frame: frame - card.startFrame,
    fps,
    config: { stiffness: 180, damping: 22 },
  });

  // Animate the bar fill
  const barProgress = interpolate(frame - card.startFrame - 5, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const statusColor = STATUS_COLOR[card.status];
  const history = HISTORY_DATA[card.index] || [];

  return (
    <div
      style={{
        padding: "18px",
        borderRadius: 10,
        border: `1px solid ${LIGHT.border}`,
        backgroundColor: LIGHT.card,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        opacity: cardProgress,
        transform: `translateY(${(1 - cardProgress) * 16}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: LIGHT.foreground,
              letterSpacing: "-0.02em",
            }}
          >
            {card.index}
          </div>
          <div
            style={{
              fontSize: 10,
              color: LIGHT.mutedFg,
              marginTop: 2,
            }}
          >
            {card.universe} · {card.total} stocks
          </div>
        </div>
        <div
          style={{
            padding: "3px 9px",
            borderRadius: 999,
            backgroundColor: `${statusColor}15`,
            border: `1px solid ${statusColor}35`,
            fontSize: 9,
            fontWeight: 700,
            color: statusColor,
            letterSpacing: "0.05em",
          }}
        >
          {card.status}
        </div>
      </div>

      {/* Big percentage */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: statusColor,
          fontFamily: "monospace",
          letterSpacing: "-0.05em",
          lineHeight: 1,
        }}
      >
        {Math.round(card.pct * barProgress)}%
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 6,
          borderRadius: 3,
          backgroundColor: LIGHT.muted,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${card.pct * barProgress}%`,
            borderRadius: 3,
            backgroundColor: statusColor,
            transition: "width 0.1s",
          }}
        />
      </div>

      {/* Count */}
      <div
        style={{
          fontSize: 11,
          color: LIGHT.mutedFg,
          fontFamily: "monospace",
        }}
      >
        {Math.round(card.above * barProgress)} of {card.total} above EMA 220
      </div>

      {/* Sparkline */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 3,
          height: 28,
        }}
      >
        {history.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(v / 100) * 28}px`,
              borderRadius: "2px 2px 0 0",
              backgroundColor: i === history.length - 1
                ? statusColor
                : `${statusColor}40`,
              opacity: barProgress,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export const D6MarketHealth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Callout after cards load
  const calloutStart = 210;
  const calloutProgress = spring({
    frame: frame - calloutStart,
    fps,
    config: { stiffness: 220, damping: 22 },
  });

  const appWidth = 1160;
  const appHeight = 600;

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
      <div
        style={{
          transform: `scale(${chromeScale * 1.3})`,
          opacity: chromeScale,
        }}
      >
        <AppShell
          activePage="market-health"
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
            {/* Header */}
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
                Market Health
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: LIGHT.mutedFg,
                  marginTop: 4,
                }}
              >
                % of stocks above EMA 220 · Updated daily after market close
              </div>
            </div>

            {/* Cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 14,
                marginBottom: 22,
              }}
            >
              {CARDS.map((card) => (
                <MarketHealthCard
                  key={card.index}
                  card={card}
                  frame={frame}
                  fps={fps}
                />
              ))}
            </div>

            {/* Callout */}
            <div
              style={{
                opacity: calloutProgress,
                transform: `translateY(${(1 - calloutProgress) * 12}px)`,
                display: "flex",
                gap: 14,
                alignItems: "stretch",
              }}
            >
              {/* Warning rule */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 18px",
                  borderRadius: 10,
                  border: `1px solid ${LIGHT.simmering}40`,
                  backgroundColor: `${LIGHT.simmering}08`,
                  flex: 1,
                  maxWidth: 460,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={LIGHT.simmering}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span
                  style={{
                    fontSize: 12,
                    color: LIGHT.simmering,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  Rule of thumb: below 40% above EMA 220 → wait for conditions to improve
                </span>
              </div>

              {/* Bullish note */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 18px",
                  borderRadius: 10,
                  border: `1px solid ${LIGHT.bull}40`,
                  backgroundColor: `${LIGHT.bull}08`,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={LIGHT.bull}
                  strokeWidth="2.5"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: LIGHT.bull,
                      marginBottom: 1,
                    }}
                  >
                    Nifty 50 at 76% — Bullish
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: LIGHT.mutedFg,
                    }}
                  >
                    Favourable conditions for new entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppShell>
      </div>
    </div>
  );
};
