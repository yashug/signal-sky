import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { WordReveal } from "../../components/WordReveal";

const TICKERS = [
  "RELIANCE",
  "TCS",
  "NVDA",
  "AAPL",
  "HDFC",
  "INFY",
  "WIPRO",
  "MSFT",
  "BAJFINANCE",
  "ICICIBANK",
  "HDFCBANK",
  "GOOGL",
  "META",
  "TITAN",
  "ADANIENT",
];

export const D1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { stiffness: 180, damping: 24 } });
  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line under logo
  const lineWidth = spring({ frame: frame - 10, fps, config: { stiffness: 200, damping: 26 } });

  const taglineOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [30, 48], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [55, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Floating ticker symbols in background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 0.055,
        }}
      >
        {TICKERS.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: `${(i * 17 + 5) % 90}%`,
              top: `${(i * 23 + 10) % 80}%`,
              fontSize: 14,
              fontFamily: "monospace",
              fontWeight: 700,
              color: LIGHT.foreground,
              transform: `rotate(${(i % 3 - 1) * 7}deg)`,
              userSelect: "none",
              letterSpacing: "0.05em",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${LIGHT.border}50 1px, transparent 1px), linear-gradient(90deg, ${LIGHT.border}50 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
          opacity: 0.35,
        }}
      />

      {/* Soft radial highlight in center */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${LIGHT.primary}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 8,
        }}
      >
        {/* Zap icon in blue rounded square */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${LIGHT.primary} 0%, #5a9fe8 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 28px ${LIGHT.primary}35`,
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: LIGHT.foreground,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            SignalSky
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: LIGHT.mutedFg,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginTop: 3,
            }}
          >
            India · US Markets
          </div>
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{
          width: `${lineWidth * 130}px`,
          height: 2.5,
          backgroundColor: LIGHT.primary,
          borderRadius: 2,
          marginBottom: 32,
          opacity: lineWidth,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
          maxWidth: 620,
          padding: "0 32px",
        }}
      >
        <WordReveal
          text="Built for one strategy that works"
          startFrame={32}
          staggerFrames={3}
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: LIGHT.foreground,
            letterSpacing: "-0.03em",
            textAlign: "center",
          }}
        />
      </div>

      {/* Sub text */}
      <div
        style={{
          marginTop: 18,
          opacity: subOpacity,
          fontSize: 13,
          color: LIGHT.mutedFg,
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        Reset &amp; Reclaim · EMA 220 · NSE · NASDAQ · S&amp;P
      </div>

      {/* Bottom badge row */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          display: "flex",
          gap: 12,
          opacity: subOpacity,
        }}
      >
        {[
          { label: "47 Signals Today", color: LIGHT.bull },
          { label: "Nifty 50 · S&P 100", color: LIGHT.primary },
          { label: "7-day Free Trial", color: LIGHT.mutedFg },
        ].map((badge) => (
          <div
            key={badge.label}
            style={{
              padding: "5px 14px",
              borderRadius: 20,
              border: `1px solid ${badge.color}40`,
              backgroundColor: `${badge.color}0d`,
              fontSize: 11,
              fontWeight: 600,
              color: badge.color,
              letterSpacing: "0.01em",
            }}
          >
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
};
