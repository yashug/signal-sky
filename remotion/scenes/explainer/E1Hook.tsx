import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../../config/theme";
import { FloatingTicker } from "../../components/FloatingTicker";
import { WordReveal } from "../../components/WordReveal";

export const E1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 160, damping: 24 },
  });

  const subOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateRight: "clamp",
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
        padding: "60px 120px",
        gap: 32,
      }}
    >
      <FloatingTicker count={14} opacity={0.035} />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.primary}12 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Main question */}
      <div
        style={{
          fontSize: 58,
          fontWeight: 900,
          color: THEME.foreground,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        <WordReveal
          text="Have you ever wondered why some stocks suddenly shoot up after pulling back?"
          staggerFrames={4}
          startFrame={0}
        />
      </div>

      {/* Accent line */}
      <div
        style={{
          width: `${lineProgress * 180}px`,
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.bull})`,
        }}
      />

      {/* Subtext */}
      <div
        style={{
          opacity: subOpacity,
          fontSize: 24,
          color: THEME.muted,
          fontFamily: "sans-serif",
          textAlign: "center",
          letterSpacing: "0.01em",
        }}
      >
        There's a pattern behind it. Once you see it, you can't unsee it.
      </div>
    </div>
  );
};
