import { FPS } from "./compositions";

// Demo video timing — 120 seconds total at 30fps = 3600 frames
// All times in seconds (absolute, not scaled)

export const DEMO = {
  intro:        { start: 0,   duration: 8  },
  scanner:      { start: 8,   duration: 22 },
  signalDetail: { start: 30,  duration: 18 },
  backtests:    { start: 48,  duration: 16 },
  performance:  { start: 64,  duration: 14 },
  marketHealth: { start: 78,  duration: 12 },
  journal:      { start: 90,  duration: 12 },
  alerts:       { start: 102, duration: 10 },
  cta:          { start: 112, duration: 8  },
} as const;

/** Convert seconds to frames (no timing scale — demo is fixed 120s) */
export function df(seconds: number): number {
  return Math.round(seconds * FPS);
}
