import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

interface ClickSoundProps {
  clickFrames: number[];
  volume?: number;
}

export const ClickSound: React.FC<ClickSoundProps> = ({ clickFrames, volume = 0.5 }) => {
  return (
    <>
      {clickFrames.map((frame, i) => (
        <Sequence key={i} from={frame} durationInFrames={15}>
          <Audio src={staticFile("audio/click.wav")} volume={volume} />
        </Sequence>
      ))}
    </>
  );
};
