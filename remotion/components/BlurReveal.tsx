import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface BlurRevealProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number | string;
  align?: "left" | "center" | "right";
  staggerFrames?: number;
  maxWidth?: string | number;
  lineHeight?: number;
  letterSpacing?: string;
  fontFamily?: string;
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  text,
  startFrame = 0,
  fontSize = 48,
  color = "#e5e7ee",
  fontWeight = 800,
  align = "center",
  staggerFrames = 4,
  maxWidth,
  lineHeight = 1.2,
  letterSpacing = "-0.03em",
  fontFamily = "sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: `${fontSize * 0.28}px`,
        maxWidth,
        textAlign: align,
        lineHeight,
      }}
    >
      {words.map((word, i) => {
        const wordFrame = frame - startFrame - i * staggerFrames;
        const progress = spring({
          frame: wordFrame,
          fps,
          config: { stiffness: 160, damping: 18, mass: 0.6 },
        });

        const opacity = Math.max(0, Math.min(1, progress));
        const translateY = (1 - progress) * 40;
        // Blur: 8px → 0px as progress goes 0 → 1
        const blur = Math.max(0, (1 - progress) * 8);
        // Letter spacing collapse: wide → tight
        const ls =
          letterSpacing !== "normal"
            ? `calc(${letterSpacing} + ${(1 - progress) * 0.2}em)`
            : "normal";

        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${translateY}px)`,
              filter: `blur(${blur}px)`,
              letterSpacing: ls,
              fontSize,
              fontWeight,
              color,
              fontFamily,
              lineHeight,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
