import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

interface BackgroundMusicProps {
  totalFrames: number;
  duck?: boolean;
  duckVolume?: number;
  fullVolume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  totalFrames,
  duck = false,
  duckVolume = 0.2,
  fullVolume = 0.5,
  fadeInFrames = 30,
  fadeOutFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const baseVolume = duck ? duckVolume : fullVolume;

  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, baseVolume], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [totalFrames - fadeOutFrames, totalFrames],
    [baseVolume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const volume = frame >= totalFrames - fadeOutFrames ? fadeOut : fadeIn;

  return (
    <Audio
      src={staticFile("audio/bg-music.mp3")}
      volume={volume}
      loop
    />
  );
};
