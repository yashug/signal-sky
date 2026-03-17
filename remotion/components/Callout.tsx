import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";

interface CalloutProps {
  text: string;
  subtext?: string;
  color: string;
  x: number;
  y: number;
  direction: "up" | "down";
  startFrame?: number;
}

// SVG callout annotation with spring-in animation.
// Must be rendered inside an <svg> element.
export const Callout: React.FC<CalloutProps> = ({
  text,
  subtext,
  color,
  x,
  y,
  direction,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 220, damping: 22 },
  });

  const BOX_W = 140;
  const BOX_H = subtext ? 48 : 34;
  const BOX_X = -(BOX_W / 2);
  // For direction='up': box sits above target, arrow points down
  // For direction='down': box sits below target, arrow points up
  const ARROW_H = 22;
  const BOX_Y = direction === "up" ? -(BOX_H + ARROW_H) : ARROW_H;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scale})`}>
        {/* Box */}
        <rect
          x={BOX_X}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx={6}
          fill={color + "22"}
          stroke={color}
          strokeWidth={1.2}
        />
        {/* Main text */}
        <text
          x={0}
          y={BOX_Y + (subtext ? 16 : BOX_H / 2 + 5)}
          textAnchor="middle"
          fill={color}
          fontSize={13}
          fontWeight={700}
          fontFamily="sans-serif"
        >
          {text}
        </text>
        {/* Subtext */}
        {subtext && (
          <text
            x={0}
            y={BOX_Y + 34}
            textAnchor="middle"
            fill={THEME.muted}
            fontSize={10}
            fontFamily="sans-serif"
          >
            {subtext}
          </text>
        )}
        {/* Arrow stem */}
        <line
          x1={0}
          y1={direction === "up" ? BOX_Y + BOX_H : 0}
          x2={0}
          y2={direction === "up" ? -2 : ARROW_H - 4}
          stroke={color}
          strokeWidth={1.5}
        />
        {/* Arrowhead */}
        {direction === "up" ? (
          <polygon points={`-4,-6 4,-6 0,0`} fill={color} />
        ) : (
          <polygon
            points={`-4,${ARROW_H - 2} 4,${ARROW_H - 2} 0,${ARROW_H + 4}`}
            fill={color}
          />
        )}
      </g>
    </g>
  );
};
