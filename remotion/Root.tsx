import React from "react";
import { Composition } from "remotion";
import { COMPOSITIONS, FPS } from "./config/compositions";
import { PromoComposition } from "./compositions/PromoComposition";
import { ExplainerComposition } from "./compositions/ExplainerComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Explainer: 90s educational video */}
      <Composition
        id="Explainer90H"
        component={ExplainerComposition as React.ComponentType<Record<string, unknown>>}
        durationInFrames={90 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {COMPOSITIONS.map((config) => {
        const durationInFrames = config.durationInSeconds * FPS;
        const audioVariant =
          config.durationInSeconds === 30 ? "30s"
          : config.durationInSeconds === 60 ? "60s"
          : "90s";

        return (
          <Composition
            key={config.id}
            id={config.id}
            component={PromoComposition as unknown as React.ComponentType<Record<string, unknown>>}
            durationInFrames={durationInFrames}
            fps={FPS}
            width={config.width}
            height={config.height}
            defaultProps={{ config, audioVariant } as Record<string, unknown>}
          />
        );
      })}
    </>
  );
};
