export const FPS = 30;

export interface CompositionConfig {
  id: string;
  durationInSeconds: number;
  width: number;
  height: number;
  timingScale: number;
}

export const COMPOSITIONS: CompositionConfig[] = [
  { id: "Promo30H", durationInSeconds: 30,  width: 1920, height: 1080, timingScale: 0.5 },
  { id: "Promo60H", durationInSeconds: 60,  width: 1920, height: 1080, timingScale: 1.0 },
  { id: "Promo90H", durationInSeconds: 90,  width: 1920, height: 1080, timingScale: 1.5 },
  { id: "Promo30V", durationInSeconds: 30,  width: 1080, height: 1920, timingScale: 0.5 },
  { id: "Promo60V", durationInSeconds: 60,  width: 1080, height: 1920, timingScale: 1.0 },
  { id: "Promo90V", durationInSeconds: 90,  width: 1080, height: 1920, timingScale: 1.5 },
];

// Scene timing in seconds for the 60s base (timingScale=1.0)
export const SCENE_TIMING = {
  hook:          { start: 0,  duration: 4  },  // "Most traders miss the breakout"
  problem:       { start: 4,  duration: 4  },  // Cluttered charts, noise
  solution:      { start: 8,  duration: 5  },  // Logo reveal
  scanner:       { start: 13, duration: 14 },  // App chrome → table → zoom
  marketHealth:  { start: 27, duration: 7  },  // Index cards
  alerts:        { start: 34, duration: 9  },  // Phone + Telegram/email
  journalBt:     { start: 43, duration: 9  },  // P&L + SVG chart
  cta:           { start: 52, duration: 8  },  // Trial + URL + pricing
};

/** Convert seconds to frame number scaled by timingScale */
export function f(seconds: number, timingScale: number): number {
  return Math.round(seconds * FPS * timingScale);
}
