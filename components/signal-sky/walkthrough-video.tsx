"use client"

import { useRef, useState } from "react"
import { Volume2Icon, VolumeXIcon } from "lucide-react"

export function WalkthroughVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleSound() {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src="https://wdqcbbelmds6ipi3.public.blob.vercel-storage.com/walkthrough-110s.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full block"
        style={{ aspectRatio: "16/9" }}
      />
      <button
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
      >
        {muted ? (
          <>
            <VolumeXIcon className="size-3.5" />
            <span>Sound off</span>
          </>
        ) : (
          <>
            <Volume2Icon className="size-3.5" />
            <span>Sound on</span>
          </>
        )}
      </button>
    </div>
  )
}
