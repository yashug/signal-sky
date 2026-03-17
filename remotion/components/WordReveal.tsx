import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface WordRevealProps {
  text: string;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
  staggerFrames?: number;
  startFrame?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  style,
  wordStyle,
  staggerFrames = 5,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((word, i) => {
        const delay = startFrame + i * staggerFrames;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { stiffness: 200, damping: 26 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 20}px)`,
              marginRight: "0.25em",
              ...wordStyle,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
