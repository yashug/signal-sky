import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../config/theme";
import { Callout } from "./Callout";

export type ChartPhase = 0 | 1 | 2 | 3 | 4;

interface StrategyChartProps {
  phase: ChartPhase;
  width?: number;
  height?: number;
}

// ----- mock data (30 bars) -----
const N = 30;
const PRICE_DATA = [
  40, 45, 50, 55, 58, 62, 66, 70, 74, 77, 80, 83, 85,
  74, 60, 46, 37, 35, 35, 37,
  40, 42, 47, 52, 57, 62, 66, 70, 74, 80,
];
const EMA_DATA = [
  35, 36, 37, 38, 39, 40, 42, 44, 45, 47, 48, 49, 50,
  50, 49, 48, 47, 46, 45, 44,
  44, 44, 44, 45, 46, 47, 48, 49, 51, 52,
];

// Chart area
const SVG_W = 600;
const SVG_H = 280;
const PAD_L = 50;
const PAD_R = 30;
const PAD_T = 20;
const PAD_B = 30;
const CHART_W = SVG_W - PAD_L - PAD_R; // 520
const CHART_H = SVG_H - PAD_T - PAD_B; // 230
const DATA_MIN = 28;
const DATA_MAX = 93;

// Scale helpers
function xScale(i: number) {
  return PAD_L + (i / (N - 1)) * CHART_W;
}
function yScale(v: number) {
  return PAD_T + (1 - (v - DATA_MIN) / (DATA_MAX - DATA_MIN)) * CHART_H;
}
function pointsStr(data: number[]) {
  return data.map((v, i) => `${xScale(i).toFixed(1)},${yScale(v).toFixed(1)}`).join(" ");
}

// Key indices / coordinates
const PRIOR_PEAK_IDX = 12; // price = 85 (highest point)
const BREAK_IDX = 15;      // first index where price < EMA
const RECLAIM_IDX = 22;    // first index where price > EMA again
const PRIOR_PEAK_Y = yScale(85);
const RECLAIM_X = xScale(RECLAIM_IDX);
const RECLAIM_Y = yScale(PRICE_DATA[RECLAIM_IDX]); // y(47) ≈ 159

// Reset zone x bounds
const RESET_X_START = xScale(BREAK_IDX - 0.5);
const RESET_X_END = xScale(RECLAIM_IDX);
const RESET_ZONE_W = RESET_X_END - RESET_X_START;

export const StrategyChart: React.FC<StrategyChartProps> = ({
  phase,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 0: price line draws left→right (only animates when phase === 0)
  const priceReveal =
    phase === 0
      ? interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" })
      : 1;

  // Phase 1: EMA line draws in
  const emaReveal =
    phase === 1
      ? interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" })
      : phase > 1
      ? 1
      : 0;
  const emaLabelOpacity =
    phase === 1
      ? interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" })
      : phase > 1
      ? 1
      : 0;

  // Phase 2: prior peak line draws in
  const peakReveal =
    phase === 2
      ? interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" })
      : phase > 2
      ? 1
      : 0;

  // Phase 3: reset zone fades in
  const resetOpacity =
    phase === 3
      ? interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" })
      : phase > 3
      ? 1
      : 0;

  // Phase 4: reclaim marker springs in
  const reclaimScale =
    phase === 4
      ? spring({ frame, fps, config: { stiffness: 220, damping: 20 } })
      : phase > 4
      ? 1
      : 0;

  const clipId = `price-clip-${phase}`;
  const emaClipId = `ema-clip-${phase}`;
  const peakClipId = `peak-clip-${phase}`;

  const containerStyle: React.CSSProperties = width && height
    ? { width, height }
    : { width: "100%", height: "100%" };

  return (
    <div style={containerStyle}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Clip for price reveal */}
          <clipPath id={clipId}>
            <rect
              x={PAD_L}
              y={0}
              width={priceReveal * CHART_W}
              height={SVG_H}
            />
          </clipPath>
          {/* Clip for EMA reveal */}
          <clipPath id={emaClipId}>
            <rect
              x={PAD_L}
              y={0}
              width={emaReveal * CHART_W}
              height={SVG_H}
            />
          </clipPath>
          {/* Clip for prior peak line reveal */}
          <clipPath id={peakClipId}>
            <rect
              x={PAD_L}
              y={0}
              width={peakReveal * CHART_W}
              height={SVG_H}
            />
          </clipPath>
        </defs>

        {/* Grid lines (subtle) */}
        {[40, 60, 80].map((v) => (
          <line
            key={v}
            x1={PAD_L}
            y1={yScale(v)}
            x2={PAD_L + CHART_W}
            y2={yScale(v)}
            stroke={THEME.border}
            strokeWidth={0.5}
            strokeDasharray="4 6"
          />
        ))}

        {/* Y-axis labels */}
        {[40, 60, 80].map((v) => (
          <text
            key={v}
            x={PAD_L - 6}
            y={yScale(v) + 4}
            fill={THEME.muted}
            fontSize={10}
            textAnchor="end"
            fontFamily="monospace"
          >
            {v}
          </text>
        ))}

        {/* ----- Phase 3: Reset zone shading ----- */}
        {phase >= 3 && (
          <rect
            x={RESET_X_START}
            y={PAD_T}
            width={RESET_ZONE_W}
            height={CHART_H}
            fill={THEME.bear}
            opacity={resetOpacity * 0.12}
          />
        )}

        {/* ----- Phase 2: Prior Peak horizontal line ----- */}
        {phase >= 2 && (
          <g clipPath={`url(#${peakClipId})`}>
            <line
              x1={PAD_L}
              y1={PRIOR_PEAK_Y}
              x2={PAD_L + CHART_W}
              y2={PRIOR_PEAK_Y}
              stroke={THEME.simmering}
              strokeWidth={1.5}
              strokeDasharray="6 5"
            />
          </g>
        )}
        {phase >= 2 && peakReveal > 0.6 && (
          <text
            x={PAD_L + CHART_W - 2}
            y={PRIOR_PEAK_Y - 7}
            fill={THEME.simmering}
            fontSize={11}
            textAnchor="end"
            fontFamily="sans-serif"
            fontWeight={600}
            opacity={interpolate(peakReveal, [0.6, 1], [0, 1], {
              extrapolateRight: "clamp",
            })}
          >
            📍 Prior Peak
          </text>
        )}

        {/* ----- Phase 1: EMA 200 line ----- */}
        {phase >= 1 && (
          <g clipPath={`url(#${emaClipId})`}>
            <polyline
              points={pointsStr(EMA_DATA)}
              fill="none"
              stroke={THEME.primary}
              strokeWidth={2}
              strokeDasharray="7 4"
            />
          </g>
        )}
        {phase >= 1 && emaLabelOpacity > 0 && (
          <g opacity={emaLabelOpacity}>
            <rect
              x={PAD_L + 6}
              y={yScale(EMA_DATA[4]) - 22}
              width={148}
              height={20}
              rx={4}
              fill={THEME.primary + "22"}
              stroke={THEME.primary}
              strokeWidth={0.8}
            />
            <text
              x={PAD_L + 80}
              y={yScale(EMA_DATA[4]) - 8}
              fill={THEME.primary}
              fontSize={11}
              textAnchor="middle"
              fontFamily="sans-serif"
              fontWeight={600}
            >
              EMA 200 — The Trend Line
            </text>
          </g>
        )}

        {/* ----- Phase 0: Price line ----- */}
        <g clipPath={`url(#${clipId})`}>
          <polyline
            points={pointsStr(PRICE_DATA)}
            fill="none"
            stroke={THEME.foreground}
            strokeWidth={2.5}
          />
        </g>

        {/* ----- Phase 3: RESET callout ----- */}
        {phase >= 3 && resetOpacity > 0 && (
          <Callout
            text="↓ RESET"
            subtext="Losing momentum"
            color={THEME.bear}
            x={xScale(17)}
            y={yScale(35) + 20}
            direction="down"
            startFrame={5}
          />
        )}

        {/* ----- Phase 4: Reclaim marker + callout ----- */}
        {phase >= 4 && (
          <g transform={`translate(${RECLAIM_X}, ${RECLAIM_Y})`}>
            <g transform={`scale(${reclaimScale})`}>
              {/* Circle glow */}
              <circle r={18} fill={THEME.bull + "25"} />
              {/* Circle border */}
              <circle r={10} fill="none" stroke={THEME.bull} strokeWidth={2.5} />
              {/* Center dot */}
              <circle r={3} fill={THEME.bull} />
            </g>
          </g>
        )}
        {phase >= 4 && reclaimScale > 0.4 && (
          <Callout
            text="✓ RECLAIM"
            subtext="Back above the trend"
            color={THEME.bull}
            x={RECLAIM_X}
            y={RECLAIM_Y}
            direction="up"
            startFrame={8}
          />
        )}

        {/* Chart border */}
        <rect
          x={PAD_L}
          y={PAD_T}
          width={CHART_W}
          height={CHART_H}
          fill="none"
          stroke={THEME.border}
          strokeWidth={1}
        />
      </svg>
    </div>
  );
};
