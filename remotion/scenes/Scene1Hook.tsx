import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { FloatingTicker } from "../components/FloatingTicker";
import { WordReveal } from "../components/WordReveal";

interface Scene1Props {
  isVertical?: boolean;
}

export const Scene1Hook: React.FC<Scene1Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = spring({
    frame: frame - 8,
    fps,
    config: { stiffness: 200, damping: 30 },
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
        padding: isVertical ? "60px 40px" : "40px 80px",
      }}
    >
      <FloatingTicker count={16} opacity={0.05} />

      {/* Accent line */}
      <div
        style={{
          width: 48,
          height: 4,
          backgroundColor: THEME.bear,
          borderRadius: 2,
          marginBottom: 32,
          transform: `scaleX(${lineProgress})`,
          transformOrigin: "left center",
        }}
      />

      <WordReveal
        text="Most traders miss the breakout."
        style={{
          fontFamily: "sans-serif",
          fontSize: isVertical ? 52 : 64,
          fontWeight: 800,
          color: THEME.foreground,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          display: "block",
          maxWidth: isVertical ? 600 : 900,
        }}
        staggerFrames={4}
        startFrame={0}
      />

      <div style={{ height: 20 }} />

      <WordReveal
        text="Not because they weren't watching — because the signal was buried in noise."
        style={{
          fontFamily: "sans-serif",
          fontSize: isVertical ? 22 : 26,
          color: THEME.muted,
          textAlign: "center",
          lineHeight: 1.5,
          display: "block",
          maxWidth: isVertical ? 550 : 800,
        }}
        staggerFrames={3}
        startFrame={30}
      />
    </div>
  );
};
