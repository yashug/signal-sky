import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { BlurReveal } from "../components/BlurReveal";
import { ScanLine } from "../components/ScanLine";

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: isVertical ? "60px 40px" : "40px 80px",
      }}
    >
      {/* Animated gradient background */}
      <AnimatedBackground
        baseColor={THEME.background}
        accentColor={THEME.primary}
        secondaryColor={THEME.bear}
        particleCount={6}
        speed={0.7}
      />

      {/* Scan line sweep */}
      <ScanLine
        startFrame={5}
        color={THEME.primary}
        verticalPosition="40%"
        durationFrames={45}
      />

      {/* Accent line */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: 48,
          height: 4,
          backgroundColor: THEME.bear,
          borderRadius: 2,
          marginBottom: 32,
          transform: `scaleX(${lineProgress})`,
          transformOrigin: "left center",
        }}
      />

      {/* Title — BlurReveal */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <BlurReveal
          text="Most traders miss the breakout."
          startFrame={0}
          fontSize={isVertical ? 52 : 64}
          fontWeight={800}
          color={THEME.foreground}
          align="center"
          staggerFrames={4}
          letterSpacing="-0.03em"
          lineHeight={1.1}
          maxWidth={isVertical ? 600 : 900}
        />
      </div>

      <div style={{ height: 20 }} />

      {/* Subtitle — BlurReveal */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <BlurReveal
          text="Not because they weren't watching — because the signal was buried in noise."
          startFrame={30}
          fontSize={isVertical ? 22 : 26}
          fontWeight={400}
          color={THEME.muted}
          align="center"
          staggerFrames={3}
          letterSpacing="normal"
          lineHeight={1.5}
          maxWidth={isVertical ? 550 : 800}
        />
      </div>
    </div>
  );
};
