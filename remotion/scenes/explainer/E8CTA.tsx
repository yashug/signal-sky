import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { FloatingTicker } from "../../components/FloatingTicker";
import { SignalSkyLogo } from "../../components/SignalSkyLogo";

export const E8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgGlow = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoReveal = spring({
    frame,
    fps,
    config: { stiffness: 150, damping: 20 },
  });
  const headlineReveal = spring({
    frame: frame - 12,
    fps,
    config: { stiffness: 180, damping: 24 },
  });
  const subReveal = spring({
    frame: frame - 22,
    fps,
    config: { stiffness: 180, damping: 24 },
  });
  const btnReveal = spring({
    frame: frame - 34,
    fps,
    config: { stiffness: 200, damping: 26 },
  });
  const urlReveal = spring({
    frame: frame - 48,
    fps,
    config: { stiffness: 180, damping: 24 },
  });

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
        gap: 24,
        padding: "40px 80px",
      }}
    >
      <FloatingTicker count={12} opacity={0.04} />

      {/* Background radial */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.primary}12 0%, transparent 60%)`,
          opacity: bgGlow,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoReveal,
          transform: `scale(${0.8 + logoReveal * 0.2})`,
        }}
      >
        <SignalSkyLogo size={64} showWordmark={true} />
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: headlineReveal,
          transform: `translateY(${(1 - headlineReveal) * 20}px)`,
          textAlign: "center",
          fontSize: 58,
          fontWeight: 900,
          color: THEME.foreground,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
        }}
      >
        Find the next{" "}
        <span style={{ color: THEME.bull }}>Reset & Reclaim</span>
        <br />
        <span style={{ color: THEME.primary }}>before it breaks out.</span>
      </div>

      {/* Sub-line */}
      <div
        style={{
          opacity: subReveal,
          transform: `translateY(${(1 - subReveal) * 16}px)`,
          textAlign: "center",
          fontSize: 20,
          color: THEME.muted,
          fontFamily: "sans-serif",
          maxWidth: 640,
          lineHeight: 1.5,
        }}
      >
        SignalSky scans 1,000+ stocks across India and the US every morning.
        Free 7-day trial — no card needed.
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: btnReveal,
          transform: `scale(${0.9 + btnReveal * 0.1})`,
          backgroundColor: THEME.primary,
          borderRadius: 14,
          padding: "18px 48px",
          fontSize: 22,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "sans-serif",
          textAlign: "center",
          boxShadow: `0 8px 40px ${THEME.primary}45`,
          marginTop: 4,
        }}
      >
        Start free trial →
        <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.85, marginTop: 4 }}>
          No credit card required · Cancel anytime
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlReveal,
          transform: `translateY(${(1 - urlReveal) * 10}px)`,
          fontFamily: "monospace",
          fontSize: 26,
          fontWeight: 700,
          color: THEME.muted,
          letterSpacing: "0.02em",
        }}
      >
        signalsky.app
      </div>
    </div>
  );
};
