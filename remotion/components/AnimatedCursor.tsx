import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CursorKeyframe {
  frame: number;
  x: number;       // 0–1 relative to composition width
  y: number;       // 0–1 relative to composition height
  action?: "idle" | "click" | "hover";
}

interface AnimatedCursorProps {
  keyframes: CursorKeyframe[];
  size?: number;
  compositionWidth: number;
  compositionHeight: number;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  keyframes,
  size = 28,
  compositionWidth,
  compositionHeight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (keyframes.length === 0) return null;

  // Find current and next keyframe segment
  let fromKf = keyframes[0];
  let toKf = keyframes[0];
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame) {
      fromKf = keyframes[i];
      toKf = keyframes[i + 1];
    }
  }

  const segmentDuration = Math.max(1, toKf.frame - fromKf.frame);
  const segmentFrame = Math.max(0, frame - fromKf.frame);

  const progress = spring({
    frame: segmentFrame,
    fps,
    durationInFrames: segmentDuration,
    config: { stiffness: 80, damping: 16 },
  });

  const cursorX = interpolate(progress, [0, 1], [fromKf.x * compositionWidth, toKf.x * compositionWidth]);
  const cursorY = interpolate(progress, [0, 1], [fromKf.y * compositionHeight, toKf.y * compositionHeight]);

  // Find most recent click within 35f window
  const recentClick = [...keyframes]
    .reverse()
    .find((kf) => kf.action === "click" && frame >= kf.frame && frame < kf.frame + 35);

  const clickAge = recentClick ? frame - recentClick.frame : -1;

  const cursorScale =
    clickAge >= 0
      ? interpolate(clickAge, [0, 6, 18, 30], [1, 0.65, 0.9, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // Two expanding rings on click
  const ring1Opacity =
    clickAge >= 0
      ? interpolate(clickAge, [0, 5, 30], [0.8, 0.6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const ring1Scale =
    clickAge >= 0
      ? interpolate(clickAge, [0, 30], [0.5, 2.8], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const ring2Opacity =
    clickAge >= 0
      ? interpolate(clickAge, [0, 8, 35], [0, 0.5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const ring2Scale =
    clickAge >= 0
      ? interpolate(clickAge, [5, 35], [0.5, 3.5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // Hover: slightly larger cursor
  const isHovering = fromKf.action === "hover" || toKf.action === "hover";
  const hoverScale = isHovering ? 1.15 : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {/* Ring 1 */}
      {ring1Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: cursorX - size * 0.8,
            top: cursorY - size * 0.8,
            width: size * 1.6,
            height: size * 1.6,
            borderRadius: "50%",
            border: `2.5px solid rgba(42, 115, 204, ${ring1Opacity})`,
            transform: `scale(${ring1Scale})`,
            pointerEvents: "none",
          }}
        />
      )}
      {/* Ring 2 */}
      {ring2Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: cursorX - size * 0.8,
            top: cursorY - size * 0.8,
            width: size * 1.6,
            height: size * 1.6,
            borderRadius: "50%",
            border: `2px solid rgba(42, 115, 204, ${ring2Opacity})`,
            transform: `scale(${ring2Scale})`,
            pointerEvents: "none",
          }}
        />
      )}
      {/* Cursor SVG */}
      <svg
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          transform: `scale(${cursorScale * hoverScale})`,
          transformOrigin: "top left",
          filter:
            "drop-shadow(1px 2px 5px rgba(0,0,0,0.35)) drop-shadow(0 0 1px rgba(0,0,0,0.2))",
        }}
        width={size}
        height={size * 1.2}
        viewBox="0 0 24 29"
        fill="none"
      >
        <path
          d="M5 2L5 24L10.5 18.5L14 27.5L17 26.5L13.5 17.5L20 17.5L5 2Z"
          fill="white"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
