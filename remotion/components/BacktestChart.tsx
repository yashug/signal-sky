import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";

const WIDTH = 400;
const HEIGHT = 200;

// Sample equity curve points (normalized 0-1 y-axis)
const POINTS: [number, number][] = [
  [0, 0.5], [0.05, 0.52], [0.1, 0.48], [0.15, 0.55], [0.2, 0.60],
  [0.25, 0.57], [0.3, 0.65], [0.35, 0.70], [0.4, 0.68], [0.45, 0.75],
  [0.5, 0.72], [0.55, 0.80], [0.6, 0.85], [0.65, 0.82], [0.7, 0.90],
  [0.75, 0.88], [0.8, 0.94], [0.85, 0.92], [0.9, 0.97], [0.95, 0.95], [1, 1.0],
];

function pointsToPath(pts: [number, number][], w: number, h: number): string {
  const mapped = pts.map(([x, y]) => [x * w, h - y * h * 0.85 - h * 0.05] as [number, number]);
  return mapped
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");
}

interface BacktestChartProps {
  startFrame?: number;
}

export const BacktestChart: React.FC<BacktestChartProps> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pathD = pointsToPath(POINTS, WIDTH, HEIGHT);

  // Estimate path length (rough calculation for stroke-dashoffset animation)
  const PATH_LENGTH = 600;

  const drawProgress = interpolate(
    frame - startFrame,
    [0, fps * 2],
    [PATH_LENGTH, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(frame - startFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      <svg width={WIDTH} height={HEIGHT} style={{ overflow: "visible" }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((y) => (
          <line
            key={y}
            x1={0}
            y1={HEIGHT - y * HEIGHT * 0.85 - HEIGHT * 0.05}
            x2={WIDTH}
            y2={HEIGHT - y * HEIGHT * 0.85 - HEIGHT * 0.05}
            stroke={THEME.border}
            strokeDasharray="4 4"
            strokeWidth={1}
          />
        ))}

        {/* Area fill */}
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={THEME.bull} stopOpacity={0.3} />
            <stop offset="100%" stopColor={THEME.bull} stopOpacity={0} />
          </linearGradient>
          <clipPath id="chartClip">
            <rect
              x={0}
              y={0}
              width={WIDTH * interpolate(frame - startFrame, [0, fps * 2], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              height={HEIGHT}
            />
          </clipPath>
        </defs>

        <path
          d={`${pathD} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`}
          fill="url(#chartGradient)"
          clipPath="url(#chartClip)"
        />

        {/* Main line */}
        <path
          d={pathD}
          stroke={THEME.bull}
          strokeWidth={2.5}
          fill="none"
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={drawProgress}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Endpoint dot */}
        {drawProgress < 10 && (
          <circle
            cx={WIDTH}
            cy={HEIGHT - 1.0 * HEIGHT * 0.85 - HEIGHT * 0.05}
            r={5}
            fill={THEME.bull}
          />
        )}
      </svg>
    </div>
  );
};
