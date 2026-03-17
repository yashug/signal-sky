import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../config/compositions";
import { AUDIO_FILES } from "../config/voiceover";
import { E1Hook } from "../scenes/explainer/E1Hook";
import { E2StockPrice } from "../scenes/explainer/E2StockPrice";
import { E3TrendLine } from "../scenes/explainer/E3TrendLine";
import { E4PriorPeak } from "../scenes/explainer/E4PriorPeak";
import { E5Reset } from "../scenes/explainer/E5Reset";
import { E6Reclaim } from "../scenes/explainer/E6Reclaim";
import { E7WhyWorks } from "../scenes/explainer/E7WhyWorks";
import { E8CTA } from "../scenes/explainer/E8CTA";

// Scene timings at 30fps:
// E1 Hook:        0s–6s    → frames 0–180
// E2 StockPrice:  6s–18s   → frames 180–540  (12s)
// E3 TrendLine:   18s–32s  → frames 540–960  (14s)
// E4 PriorPeak:   32s–44s  → frames 960–1320 (12s)
// E5 Reset:       44s–58s  → frames 1320–1740 (14s)
// E6 Reclaim:     58s–74s  → frames 1740–2220 (16s)
// E7 WhyWorks:    74s–82s  → frames 2220–2460 (8s)
// E8 CTA:         82s–90s  → frames 2460–2700 (8s)

const f = (s: number) => Math.round(s * FPS);

const SCENES = [
  { from: f(0),  duration: f(6),  Component: E1Hook },
  { from: f(6),  duration: f(12), Component: E2StockPrice },
  { from: f(18), duration: f(14), Component: E3TrendLine },
  { from: f(32), duration: f(12), Component: E4PriorPeak },
  { from: f(44), duration: f(14), Component: E5Reset },
  { from: f(58), duration: f(16), Component: E6Reclaim },
  { from: f(74), duration: f(8),  Component: E7WhyWorks },
  { from: f(82), duration: f(8),  Component: E8CTA },
] as const;

export const ExplainerComposition: React.FC = () => {
  const audioFile = AUDIO_FILES["explainer"];

  return (
    <>
      {/* Voiceover audio */}
      {audioFile && (
        <Audio src={staticFile(audioFile)} />
      )}

      {/* Scenes */}
      {SCENES.map(({ from, duration, Component }) => (
        <Sequence key={from} from={from} durationInFrames={duration}>
          <Component />
        </Sequence>
      ))}
    </>
  );
};
