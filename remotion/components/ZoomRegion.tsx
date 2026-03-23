import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ZoomRegionProps {
  children: React.ReactNode;
  targetX: number;        // 0–1, horizontal center of zoom target within the element
  targetY: number;        // 0–1, vertical center of zoom target within the element
  targetScale: number;    // e.g. 2.2
  zoomStartFrame: number;
  holdFrames?: number;    // frames at full zoom before zoom-out (default 90)
  zoomFrames?: number;    // frames to reach full zoom (default 45)
  width?: number;         // element width (for offset calculation)
  height?: number;        // element height (for offset calculation)
}

export const ZoomRegion: React.FC<ZoomRegionProps> = ({
  children,
  targetX,
  targetY,
  targetScale,
  zoomStartFrame,
  holdFrames = 90,
  zoomFrames = 45,
  width = 1000,
  height = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom in phase
  const zoomInProgress = spring({
    frame: frame - zoomStartFrame,
    fps,
    config: { stiffness: 120, damping: 18 },
  });

  // Zoom out phase
  const zoomOutProgress = spring({
    frame: frame - zoomStartFrame - zoomFrames - holdFrames,
    fps,
    config: { stiffness: 120, damping: 18 },
  });

  const currentScale = 1 + (targetScale - 1) * zoomInProgress - (targetScale - 1) * zoomOutProgress;

  // Translate to keep the target point centered
  // When zooming, we need to shift so the target stays in the same visual position
  // Origin is top-left, so we offset by -(targetX * width * (scale-1)) and -(targetY * height * (scale-1))
  const translateX = -(targetX * width * (currentScale - 1));
  const translateY = -(targetY * height * (currentScale - 1));

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${currentScale}) translate(${translateX / currentScale}px, ${translateY / currentScale}px)`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};
