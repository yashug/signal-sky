"use client";
import { useRef, useState } from "react";
import { PlayIcon } from "lucide-react";

export function ExplainerPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-border/30 shadow-2xl shadow-black/30 bg-background">
      <video
        ref={videoRef}
        src="/videos/explainer-90s.mp4"
        controls={playing}
        onEnded={() => setPlaying(false)}
        className="w-full block"
        style={{ aspectRatio: "16/9" }}
        preload="metadata"
      />
      {!playing && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer
            bg-background/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handlePlay}
        >
          <div className="group flex size-20 items-center justify-center rounded-full
            border-2 border-primary/60 bg-primary/10 transition-all hover:border-primary hover:bg-primary/20">
            <PlayIcon className="size-8 text-primary ml-1" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground/80">Watch the 90-second walkthrough</p>
        </div>
      )}
    </div>
  );
}
