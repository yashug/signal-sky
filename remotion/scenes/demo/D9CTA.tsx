import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { WordReveal } from "../../components/WordReveal";

const TICKERS = [
  "RELIANCE", "TCS", "NVDA", "AAPL", "HDFC", "INFY",
  "WIPRO", "MSFT", "BAJFINANCE", "ICICIBANK", "GOOGL", "META",
];

const PRICING = [
  {
    label: "Monthly",
    price: "₹299",
    interval: "/mo",
    highlight: false,
    startFrame: 80,
    desc: "Billed monthly",
  },
  {
    label: "Yearly",
    price: "₹2,999",
    interval: "/yr",
    highlight: true,
    startFrame: 120,
    desc: "Save 16% vs monthly",
  },
  {
    label: "Lifetime",
    price: "₹4,999",
    interval: " one-time",
    highlight: false,
    startFrame: 160,
    desc: "Pay once, use forever",
  },
];

export const D9CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { stiffness: 200, damping: 26 } });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [18, 38], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [35, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL pulse
  const urlPulse =
    1 +
    interpolate(Math.sin((frame / fps) * Math.PI * 1.2), [-1, 1], [0, 0.025], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const urlOpacity = interpolate(frame, [195, 215], [0, 1], {
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
      {/* Floating tickers background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 0.05,
        }}
      >
        {TICKERS.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: `${(i * 17 + 5) % 90}%`,
              top: `${(i * 23 + 10) % 80}%`,
              fontSize: 13,
              fontFamily: "monospace",
              fontWeight: 700,
              color: LIGHT.foreground,
              transform: `rotate(${(i % 3 - 1) * 7}deg)`,
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
          backgroundImage: `linear-gradient(${LIGHT.border}50 1px, transparent 1px), linear-gradient(90deg, ${LIGHT.border}50 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
          opacity: 0.3,
        }}
      />

      {/* Radial center glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${LIGHT.primary}06 0%, transparent 68%)`,
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
          gap: 14,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${LIGHT.primary} 0%, #5a9fe8 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 24px ${LIGHT.primary}35`,
          }}
        >
          <svg
            width="26"
            height="26"
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
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: LIGHT.foreground,
            letterSpacing: "-0.04em",
          }}
        >
          SignalSky
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{
          width: `${logoScale * 110}px`,
          height: 2,
          backgroundColor: LIGHT.primary,
          borderRadius: 1,
          marginBottom: 24,
          opacity: logoScale,
        }}
      />

      {/* Headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        <WordReveal
          text="Your edge starts tomorrow morning."
          startFrame={20}
          staggerFrames={3}
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: LIGHT.foreground,
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
            textAlign: "center",
          }}
        />
      </div>

      {/* Sub */}
      <div
        style={{
          opacity: subOpacity,
          fontSize: 14,
          color: LIGHT.mutedFg,
          marginBottom: 36,
          textAlign: "center",
          letterSpacing: "0.01em",
        }}
      >
        7-day free trial · No card required · Cancel anytime
      </div>

      {/* Pricing cards */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 36,
        }}
      >
        {PRICING.map((plan) => {
          const cardP = spring({
            frame: frame - plan.startFrame,
            fps,
            config: { stiffness: 200, damping: 24 },
          });

          return (
            <div
              key={plan.label}
              style={{
                width: 175,
                padding: "20px 18px",
                borderRadius: 12,
                border: plan.highlight
                  ? `2px solid ${LIGHT.primary}`
                  : `1px solid ${LIGHT.border}`,
                backgroundColor: plan.highlight
                  ? `${LIGHT.primary}08`
                  : LIGHT.card,
                boxShadow: plan.highlight
                  ? `0 4px 20px ${LIGHT.primary}20`
                  : "0 1px 4px rgba(0,0,0,0.05)",
                opacity: cardP,
                transform: `translateY(${(1 - cardP) * 20}px) scale(${
                  0.97 + cardP * 0.03
                })`,
                position: "relative",
                textAlign: "center",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "3px 12px",
                    borderRadius: 999,
                    backgroundColor: LIGHT.primary,
                    fontSize: 9,
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  BEST VALUE
                </div>
              )}

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: LIGHT.mutedFg,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                {plan.label}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: plan.highlight ? LIGHT.primary : LIGHT.foreground,
                  fontFamily: "monospace",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {plan.price}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: LIGHT.mutedFg,
                  marginBottom: 12,
                }}
              >
                {plan.interval}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: plan.highlight ? LIGHT.primary : LIGHT.mutedFg,
                  fontWeight: plan.highlight ? 600 : 400,
                }}
              >
                {plan.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `scale(${urlPulse})`,
          fontSize: 24,
          fontWeight: 800,
          color: LIGHT.primary,
          fontFamily: "monospace",
          letterSpacing: "-0.02em",
        }}
      >
        signalsky.app
      </div>

      {/* Feature pills */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          display: "flex",
          gap: 10,
          opacity: subOpacity,
        }}
      >
        {[
          "Reset & Reclaim strategy",
          "NSE + NASDAQ + S&P",
          "Backtests · Journal · Alerts",
          "Slingshot Filter",
        ].map((feat) => (
          <div
            key={feat}
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              border: `1px solid ${LIGHT.border}`,
              backgroundColor: LIGHT.card,
              fontSize: 10,
              color: LIGHT.mutedFg,
              fontWeight: 500,
            }}
          >
            {feat}
          </div>
        ))}
      </div>
    </div>
  );
};
