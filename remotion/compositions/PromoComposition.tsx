import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { CompositionConfig, f, FPS, SCENE_TIMING } from "../config/compositions";
import { AUDIO_FILES } from "../config/voiceover";
import { Scene1Hook } from "../scenes/Scene1Hook";
import { Scene2Problem } from "../scenes/Scene2Problem";
import { Scene3Solution } from "../scenes/Scene3Solution";
import { Scene4Scanner } from "../scenes/Scene4Scanner";
import { Scene5MarketHealth } from "../scenes/Scene5MarketHealth";
import { Scene6Alerts } from "../scenes/Scene6Alerts";
import { Scene7JournalBacktest } from "../scenes/Scene7JournalBacktest";
import { Scene8CTA } from "../scenes/Scene8CTA";

interface PromoCompositionProps {
  config: CompositionConfig;
  audioVariant?: "30s" | "60s" | "90s";
}

export const PromoComposition: React.FC<PromoCompositionProps> = ({
  config,
  audioVariant,
}) => {
  const { width, height, timingScale } = config;
  const isVertical = height > width;
  const is30s = config.durationInSeconds === 30;

  // Helper: convert scene timing (in seconds at 60s base) → frames with scale
  const frame = (seconds: number) => f(seconds, timingScale);
  const dur = (seconds: number) => f(seconds, timingScale);

  const T = SCENE_TIMING;

  // Determine audio file based on variant
  const resolvedVariant = audioVariant ?? (is30s ? "30s" : config.durationInSeconds === 90 ? "90s" : "60s");
  const audioFile = AUDIO_FILES[resolvedVariant];

  // Check if audio file path is defined (will be a no-op if the MP3 hasn't been generated yet)
  const hasAudio = typeof audioFile === "string";

  return (
    <>
      {/* Voiceover audio — only rendered after running remotion:voiceover */}
      {hasAudio && (
        <Audio
          src={staticFile(audioFile)}
          volume={0.85}
          // Remotion will show a yellow warning in Studio if the file doesn't exist — that's OK
        />
      )}

      {/* Scene 1 — Hook */}
      <Sequence from={frame(T.hook.start)} durationInFrames={dur(T.hook.duration)}>
        <Scene1Hook isVertical={isVertical} />
      </Sequence>

      {/* Scene 2 — Problem */}
      <Sequence from={frame(T.problem.start)} durationInFrames={dur(T.problem.duration)}>
        <Scene2Problem isVertical={isVertical} />
      </Sequence>

      {/* Scene 3 — Solution */}
      <Sequence from={frame(T.solution.start)} durationInFrames={dur(T.solution.duration)}>
        <Scene3Solution isVertical={isVertical} />
      </Sequence>

      {/* Scene 4 — Scanner */}
      <Sequence from={frame(T.scanner.start)} durationInFrames={dur(T.scanner.duration)}>
        <Scene4Scanner isVertical={isVertical} skip30s={is30s} />
      </Sequence>

      {/* Scene 5 — Market Health */}
      <Sequence from={frame(T.marketHealth.start)} durationInFrames={dur(T.marketHealth.duration)}>
        <Scene5MarketHealth isVertical={isVertical} />
      </Sequence>

      {/* Scene 6 — Alerts */}
      <Sequence from={frame(T.alerts.start)} durationInFrames={dur(T.alerts.duration)}>
        <Scene6Alerts isVertical={isVertical} />
      </Sequence>

      {/* Scene 7 — Journal + Backtests */}
      <Sequence from={frame(T.journalBt.start)} durationInFrames={dur(T.journalBt.duration)}>
        <Scene7JournalBacktest isVertical={isVertical} />
      </Sequence>

      {/* Scene 8 — CTA */}
      <Sequence from={frame(T.cta.start)} durationInFrames={dur(T.cta.duration)}>
        <Scene8CTA isVertical={isVertical} />
      </Sequence>
    </>
  );
};
