import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { SignalSkyLogo } from "../components/SignalSkyLogo";
import { PricingBadge } from "../components/PricingBadge";
import { FloatingTicker } from "../components/FloatingTicker";

interface Scene8Props {
  isVertical?: boolean;
}

export const Scene8CTA: React.FC<Scene8Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgGlow = interpolate(frame, [0, fps * 2], [0, 1], { extrapolateRight: "clamp" });

  const logoProgress = spring({ frame, fps, config: { stiffness: 150, damping: 20 } });
  const headlineProgress = spring({ frame: frame - 15, fps, config: { stiffness: 180, damping: 24 } });
  const trialProgress = spring({ frame: frame - 30, fps, config: { stiffness: 200, damping: 26 } });
  const urlProgress = spring({ frame: frame - 45, fps, config: { stiffness: 180, damping: 24 } });
  const pricingProgress = spring({ frame: frame - 55, fps, config: { stiffness: 160, damping: 22 } });

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
        gap: 28,
        padding: isVertical ? "60px 40px" : "40px 80px",
      }}
    >
      <FloatingTicker count={12} opacity={0.04} />

      {/* Background radial */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.primary}15 0%, transparent 65%)`,
          opacity: bgGlow,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${0.8 + logoProgress * 0.2})`,
        }}
      >
        <SignalSkyLogo size={isVertical ? 56 : 64} showWordmark={true} />
      </div>

      {/* Headline */}
      <div
        style={{
          textAlign: "center",
          opacity: headlineProgress,
          transform: `translateY(${(1 - headlineProgress) * 20}px)`,
        }}
      >
        <div
          style={{
            fontSize: isVertical ? 44 : 60,
            fontWeight: 900,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
          }}
        >
          Your edge starts
          <br />
          <span style={{ color: THEME.primary }}>tomorrow morning.</span>
        </div>
      </div>

      {/* Trial CTA */}
      <div
        style={{
          opacity: trialProgress,
          transform: `scale(${0.9 + trialProgress * 0.1})`,
          backgroundColor: THEME.primary,
          borderRadius: 14,
          padding: "18px 40px",
          fontSize: isVertical ? 20 : 24,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "sans-serif",
          textAlign: "center",
          boxShadow: `0 8px 40px ${THEME.primary}40`,
        }}
      >
        Start 7-day free trial →
        <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.85, marginTop: 4 }}>
          No credit card required · Cancel anytime
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlProgress,
          transform: `translateY(${(1 - urlProgress) * 10}px)`,
          fontFamily: "monospace",
          fontSize: isVertical ? 22 : 28,
          fontWeight: 700,
          color: THEME.muted,
          letterSpacing: "0.02em",
        }}
      >
        signalsky.app
      </div>

      {/* Pricing badges */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: pricingProgress,
          transform: `translateY(${(1 - pricingProgress) * 20}px)`,
        }}
      >
        <PricingBadge label="Monthly" price="₹299" interval="per month" startFrame={0} />
        <PricingBadge label="Yearly" price="₹2,999" interval="per year · save 16%" highlight startFrame={8} />
        <PricingBadge label="Lifetime" price="₹4,999" interval="one-time · limited seats" startFrame={16} />
      </div>
    </div>
  );
};
