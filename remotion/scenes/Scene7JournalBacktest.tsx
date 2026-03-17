import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { JournalTable } from "../components/JournalTable";
import { BacktestChart } from "../components/BacktestChart";

interface Scene7Props {
  isVertical?: boolean;
}

export const Scene7JournalBacktest: React.FC<Scene7Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { stiffness: 200, damping: 28 } });
  const journalProgress = spring({ frame: frame - 10, fps, config: { stiffness: 160, damping: 24 } });
  const chartProgress = spring({ frame: frame - 20, fps, config: { stiffness: 160, damping: 24 } });

  // Stat cards
  const stats = [
    { label: "Win Rate", value: "80%", color: THEME.bull },
    { label: "Avg Win", value: "+19.7%", color: THEME.bull },
    { label: "Avg Loss", value: "-3.6%", color: THEME.bear },
    { label: "P&L (₹)", value: "+₹4.2L", color: THEME.bull },
  ];

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
        padding: isVertical ? "40px 30px" : "30px 60px",
        gap: isVertical ? 24 : 28,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${(1 - headerProgress) * 20}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: isVertical ? 28 : 36,
            fontWeight: 800,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Journal + Backtests
        </div>
        <div style={{ fontSize: 16, color: THEME.muted, fontFamily: "sans-serif", marginTop: 6 }}>
          Track every trade. Validate every setup. 20 years of data.
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map((stat, i) => {
          const p = spring({ frame: frame - 15 - i * 8, fps, config: { stiffness: 200, damping: 26 } });
          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: THEME.card,
                border: `1px solid ${THEME.border}`,
                borderRadius: 10,
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 100,
                opacity: p,
                transform: `translateY(${(1 - p) * 20}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: THEME.muted, fontFamily: "sans-serif", marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: 24,
          width: "100%",
          maxWidth: isVertical ? 600 : 1100,
          alignItems: "flex-start",
        }}
      >
        {/* Journal table */}
        <div
          style={{
            flex: isVertical ? "none" : "1.2",
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
            borderRadius: 12,
            overflow: "hidden",
            opacity: journalProgress,
            transform: `translateX(${(1 - journalProgress) * -30}px)`,
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              borderBottom: `1px solid ${THEME.border}`,
              fontSize: 13,
              fontWeight: 600,
              color: THEME.foreground,
              fontFamily: "sans-serif",
            }}
          >
            📊 Trade Journal
          </div>
          <JournalTable stagger={true} />
        </div>

        {/* Backtest chart */}
        <div
          style={{
            flex: 1,
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
            borderRadius: 12,
            padding: 20,
            opacity: chartProgress,
            transform: `translateX(${(1 - chartProgress) * 30}px)`,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: THEME.foreground,
              fontFamily: "sans-serif",
              marginBottom: 8,
            }}
          >
            📈 Equity Curve — RELIANCE (20Y)
          </div>
          <div style={{ fontSize: 11, color: THEME.muted, fontFamily: "sans-serif", marginBottom: 16 }}>
            Win Rate: 71% · Profit Factor: 3.2x · Max DD: -12%
          </div>
          <BacktestChart startFrame={20} />
        </div>
      </div>
    </div>
  );
};
