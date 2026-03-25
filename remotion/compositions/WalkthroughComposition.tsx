/**
 * SignalSky — Cinematic Product Walkthrough
 *
 * Motion design video using real screenshots + ElevenLabs female voice.
 * 9 scenes × smooth transitions = ~90 seconds @ 30fps
 *
 * Layout: 1920×1080 landscape
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BackgroundMusic } from "../components/BackgroundMusic";

const FPS = 30;

// ── Scene timing (seconds → frames) ───────────────────────────────────────
const f = (s: number) => Math.round(s * FPS);

const SCENES = [
  { id: "s1-hook",        start: 0,   dur: 9,   label: "01 — Hook",           voFile: "vo-s1-hook.mp3" },
  { id: "s2-scanner",     start: 9,   dur: 20,  label: "02 — Scanner",        voFile: "vo-s2-scanner.mp3" },
  { id: "s3-signal",      start: 29,  dur: 18,  label: "03 — Signal Detail",  voFile: "vo-s3-signal.mp3" },
  { id: "s4-backtests",   start: 47,  dur: 13,  label: "04 — Backtests",      voFile: "vo-s4-backtests.mp3" },
  { id: "s5-performance", start: 60,  dur: 9,   label: "05 — Performance",    voFile: "vo-s5-performance.mp3" },
  { id: "s6-health",      start: 69,  dur: 9,   label: "06 — Market Health",  voFile: "vo-s6-market-health.mp3" },
  { id: "s7-journal",     start: 78,  dur: 7,   label: "07 — Journal",        voFile: "vo-s7-journal.mp3" },
  { id: "s8-alerts",      start: 85,  dur: 9,   label: "08 — Alerts",         voFile: "vo-s8-alerts.mp3" },
  { id: "s9-cta",         start: 94,  dur: 16,  label: "09 — CTA",            voFile: "vo-s9-cta.mp3" },
];

const TOTAL_FRAMES = f(110); // 110s with tail

// ── Colors ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#0B0C12",
  bgGradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #0f111a 0%, #0B0C12 60%)",
  primary: "#3B82F6",
  primaryGlow: "#3B82F620",
  accent: "#6EE7B7",
  gold: "#F59E0B",
  text: "#F0F4FF",
  textMuted: "#6B7280",
  cardBg: "#13151F",
  cardBorder: "#ffffff14",
  green: "#22C55E",
  red: "#EF4444",
  orange: "#F97316",
};

// ── Helpers ────────────────────────────────────────────────────────────────
function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

// ── Click zoom definition ──────────────────────────────────────────────────
interface ClickZoomDef {
  /** frame (relative to sceneFrame) when click + zoom fires */
  atFrame: number;
  /** click target as % of card: 0–100 */
  cx: number;
  cy: number;
  /** how much to zoom in (default 1.45) */
  zoomScale?: number;
  /** how many frames to stay zoomed before easing back (default 50) */
  holdFrames?: number;
}

// ── Cursor ripple drawn on top of the card ────────────────────────────────
const CursorRipple: React.FC<{
  cx: number; cy: number;
  atFrame: number;
  sceneFrame: number;
}> = ({ cx, cy, atFrame, sceneFrame }) => {
  const rel = sceneFrame - atFrame;
  // cursor visible from 5 frames before the click
  const cursorOpacity = interpolate(rel, [-5, 0, 35, 45], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // ripple: 0→1 scale over 18 frames, fades out
  const rippleScale = interpolate(rel, [0, 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(rel, [0, 6, 18], [0.9, 0.6, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  if (cursorOpacity <= 0) return null;

  return (
    <>
      {/* Cursor dot */}
      <div style={{
        position: "absolute",
        left: `${cx}%`, top: `${cy}%`,
        transform: "translate(-50%, -50%)",
        width: 16, height: 16,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        opacity: cursorOpacity,
        pointerEvents: "none",
        zIndex: 20,
      }} />
      {/* Ripple ring */}
      <div style={{
        position: "absolute",
        left: `${cx}%`, top: `${cy}%`,
        transform: `translate(-50%, -50%) scale(${rippleScale})`,
        width: 52, height: 52,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.7)",
        opacity: rippleOpacity,
        pointerEvents: "none",
        zIndex: 19,
      }} />
    </>
  );
};

// ── Screenshot slide component ─────────────────────────────────────────────
interface ScreenshotCardProps {
  src: string;
  sceneFrame: number;
  sceneDur: number;
  kbDir?: "in" | "out";
  kbPan?: "left" | "right" | "none";
  /** click-zoom events within this card */
  clicks?: ClickZoomDef[];
  cardScale?: number;
}

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  src, sceneFrame, sceneDur,
  kbDir = "in", kbPan = "none",
  clicks = [],
  cardScale = 1,
}) => {
  const enterSpring = spring({ frame: sceneFrame, fps: FPS, config: { damping: 18, stiffness: 100 } });

  // Ken Burns baseline (slow ambient zoom)
  const progress = clamp(sceneFrame / (sceneDur * FPS), 0, 1);
  const kbZoom = kbDir === "in"
    ? interpolate(progress, [0, 1], [1.0, 1.06])
    : interpolate(progress, [0, 1], [1.06, 1.0]);
  const kbPanX = kbPan === "left" ? interpolate(progress, [0, 1], [0, -1.5])
    : kbPan === "right" ? interpolate(progress, [0, 1], [0, 1.5])
    : 0;

  // Determine active click zoom (the most recent one whose atFrame has passed)
  let activeZoom = 1.0;
  let activeOriginX = 50;
  let activeOriginY = 50;

  for (const click of clicks) {
    const scale = click.zoomScale ?? 1.45;
    const hold = click.holdFrames ?? 50;
    const rel = sceneFrame - click.atFrame;

    if (rel < -5) continue; // not started yet

    const zoomIn = spring({
      frame: Math.max(0, rel),
      fps: FPS,
      config: { damping: 22, stiffness: 80 },
    });
    const zoomOut = spring({
      frame: Math.max(0, rel - hold),
      fps: FPS,
      config: { damping: 20, stiffness: 70 },
    });

    const zoomedVal = interpolate(zoomIn, [0, 1], [1.0, scale]);
    const zoomBackVal = interpolate(zoomOut, [0, 1], [scale, 1.0]);
    const currentScale = rel >= hold ? zoomBackVal : zoomedVal;

    if (currentScale > activeZoom) {
      activeZoom = currentScale;
      activeOriginX = click.cx;
      activeOriginY = click.cy;
    }
  }

  // Combine: if zoomed in, override Ken Burns with click zoom
  const finalScale = activeZoom > 1.02 ? activeZoom : kbZoom;
  const finalOriginX = activeZoom > 1.02 ? activeOriginX : 50;
  const finalOriginY = activeZoom > 1.02 ? activeOriginY : 50;
  const finalPanX = activeZoom > 1.02 ? 0 : kbPanX;

  const baseW = 1100 * cardScale;
  const baseH = 688 * cardScale;

  return (
    <div
      style={{
        position: "absolute",
        right: 48,
        top: "50%",
        transform: `translateY(-50%) translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px) scale(${interpolate(enterSpring, [0, 1], [0.93, 1])})`,
        opacity: enterSpring,
        width: baseW,
        height: baseH,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: `0 0 0 1px ${C.cardBorder}, 0 24px 80px #00000066`,
        willChange: "transform",
      }}
    >
      {/* Screenshot with zoom */}
      <div style={{
        width: "100%", height: "100%",
        overflow: "hidden",
        transform: `scale(${finalScale}) translateX(${finalPanX}%)`,
        transformOrigin: `${finalOriginX}% ${finalOriginY}%`,
        transition: "transform-origin 0s",
      }}>
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      {/* macOS window dots */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 32,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        display: "flex", alignItems: "center",
        padding: "0 12px", gap: 6,
        pointerEvents: "none",
      }}>
        {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
      </div>

      {/* Cursor + ripple overlays */}
      {clicks.map((click, i) => (
        <CursorRipple
          key={i}
          cx={click.cx}
          cy={click.cy}
          atFrame={click.atFrame}
          sceneFrame={sceneFrame}
        />
      ))}
    </div>
  );
};

// ── Left panel: scene title + narration text ───────────────────────────────
interface LeftPanelProps {
  sceneFrame: number;
  label: string;
  headline: string;
  bullets: string[];
  accentColor?: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  sceneFrame, label, headline, bullets, accentColor = C.primary,
}) => {
  const enter = spring({ frame: sceneFrame, fps: FPS, config: { damping: 16, stiffness: 90 } });

  return (
    <div style={{
      position: "absolute",
      left: 72, top: "50%",
      transform: `translateY(-50%) translateX(${interpolate(enter, [0, 1], [-30, 0])}px)`,
      opacity: enter,
      width: 640,
      display: "flex", flexDirection: "column", gap: 24,
    }}>
      {/* Label pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 14px",
        background: `${accentColor}18`,
        border: `1px solid ${accentColor}40`,
        borderRadius: 999, width: "fit-content",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: accentColor }} />
        <span style={{
          fontSize: 11, fontWeight: 700, color: accentColor,
          letterSpacing: "0.12em", textTransform: "uppercase",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>{label}</span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 48, fontWeight: 800, lineHeight: 1.08,
        color: C.text, margin: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "-0.03em",
      }}>
        {headline.split(" ").map((word, i) => (
          <Word key={i} word={word} index={i} baseFrame={sceneFrame} accentColor={accentColor} />
        ))}
      </h1>

      {/* Bullet points */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {bullets.map((b, i) => (
          <BulletItem key={i} text={b} index={i} sceneFrame={sceneFrame} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
};

// Word-by-word reveal
const Word: React.FC<{ word: string; index: number; baseFrame: number; accentColor: string }> = ({
  word, index, baseFrame, accentColor,
}) => {
  const delay = index * 2;
  const s = spring({ frame: Math.max(0, baseFrame - delay), fps: FPS, config: { damping: 20, stiffness: 150 } });
  return (
    <span style={{
      display: "inline-block",
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [8, 0])}px)`,
      marginRight: "0.25em",
    }}>{word}</span>
  );
};

// Bullet item
const BulletItem: React.FC<{ text: string; index: number; sceneFrame: number; accentColor: string }> = ({
  text, index, sceneFrame, accentColor,
}) => {
  const delay = 10 + index * 5;
  const s = spring({ frame: Math.max(0, sceneFrame - delay), fps: FPS, config: { damping: 18, stiffness: 110 } });
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      opacity: s,
      transform: `translateX(${interpolate(s, [0, 1], [-12, 0])}px)`,
    }}>
      <div style={{
        width: 5, height: 5, borderRadius: "50%",
        background: accentColor, marginTop: 8, flexShrink: 0,
      }} />
      <span style={{
        fontSize: 17, color: "#9CA3AF", lineHeight: 1.6,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 400,
      }}>{text}</span>
    </div>
  );
};

// ── Scene badge (bottom-right counter) ────────────────────────────────────
const SceneBadge: React.FC<{ current: number; total: number; sceneFrame: number }> = ({
  current, total, sceneFrame,
}) => {
  const s = spring({ frame: sceneFrame, fps: FPS, config: { damping: 20, stiffness: 140 } });
  return (
    <div style={{
      position: "absolute", bottom: 40, right: 52,
      display: "flex", gap: 5, alignItems: "center",
      opacity: s,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current - 1 ? 22 : 6,
          height: 6, borderRadius: 3,
          background: i === current - 1 ? C.primary : "#ffffff20",
          transition: "width 0.3s",
        }} />
      ))}
    </div>
  );
};

// ── Logo watermark ─────────────────────────────────────────────────────────
const Logo: React.FC<{ frame: number }> = ({ frame }) => {
  const s = spring({ frame: Math.max(0, frame - 5), fps: FPS, config: { damping: 20, stiffness: 120 } });
  return (
    <div style={{
      position: "absolute", top: 36, left: 52,
      display: "flex", alignItems: "center", gap: 8,
      opacity: interpolate(s, [0, 1], [0, 0.7]),
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 7,
        background: `linear-gradient(135deg, ${C.primary}, #7C3AED)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "system-ui" }}>⚡</span>
      </div>
      <span style={{
        fontSize: 15, fontWeight: 700, color: "#ffffff80",
        fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "-0.01em",
      }}>SignalSky</span>
    </div>
  );
};

// ── Particle background ────────────────────────────────────────────────────
const ParticleField: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: ((i * 137.5) % 100),
    y: ((i * 67.3) % 100),
    size: 1 + (i % 3),
    speed: 0.008 + (i % 5) * 0.003,
    phase: i * 0.4,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const yPos = (p.y + frame * p.speed) % 100;
        const opacity = interpolate(Math.sin(frame * 0.02 + p.phase), [-1, 1], [0.03, 0.18]);
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${p.x}%`, top: `${yPos}%`,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: i % 4 === 0 ? C.primary : i % 4 === 1 ? C.accent : "#ffffff",
            opacity,
          }} />
        );
      })}
    </div>
  );
};

// ── Animated gradient orbs ─────────────────────────────────────────────────
const GradientOrbs: React.FC<{ frame: number }> = ({ frame }) => {
  const shift = Math.sin(frame * 0.015) * 5;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Top-left blue orb */}
      <div style={{
        position: "absolute",
        top: -200 + shift, left: -100,
        width: 600, height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}22 0%, transparent 65%)`,
      }} />
      {/* Bottom-right teal orb */}
      <div style={{
        position: "absolute",
        bottom: -150 - shift, right: -100,
        width: 500, height: 500,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C.accent}14 0%, transparent 65%)`,
      }} />
      {/* Center purple */}
      <div style={{
        position: "absolute",
        top: "30%", left: "45%",
        width: 400, height: 400,
        borderRadius: "50%",
        background: `radial-gradient(circle, #7C3AED0a 0%, transparent 70%)`,
        transform: `translateY(${shift * 2}px)`,
      }} />
    </div>
  );
};

// ── Scene transition flash ─────────────────────────────────────────────────
const TransitionFlash: React.FC<{ sceneFrame: number }> = ({ sceneFrame }) => {
  const opacity = interpolate(sceneFrame, [0, 6], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(135deg, ${C.primary}40, ${C.accent}20)`,
      opacity,
      pointerEvents: "none",
    }} />
  );
};

// ── Callout overlay ────────────────────────────────────────────────────────
interface CalloutProps {
  x: number; y: number;
  text: string;
  sceneFrame: number;
  delay?: number;
  dir?: "left" | "right" | "up" | "down";
  color?: string;
}

const Callout: React.FC<CalloutProps> = ({
  x, y, text, sceneFrame, delay = 0,
  dir = "left", color = C.primary,
}) => {
  const s = spring({ frame: Math.max(0, sceneFrame - delay), fps: FPS, config: { damping: 16, stiffness: 100 } });
  const dx = dir === "left" ? -10 : dir === "right" ? 10 : 0;
  const dy = dir === "up" ? -10 : dir === "down" ? 10 : 0;

  return (
    <div style={{
      position: "absolute",
      left: `${x}%`, top: `${y}%`,
      opacity: s,
      transform: `translate(${interpolate(s, [0, 1], [dx, 0])}px, ${interpolate(s, [0, 1], [dy, 0])}px)`,
      pointerEvents: "none",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <div style={{
        padding: "5px 10px",
        background: `${color}18`,
        border: `1px solid ${color}60`,
        borderRadius: 6,
        backdropFilter: "blur(4px)",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "0.04em",
        }}>{text}</span>
      </div>
    </div>
  );
};

// ── Stat counter (for CTA scene) ───────────────────────────────────────────
const AnimatedStat: React.FC<{
  value: string; label: string; sceneFrame: number; delay?: number; color?: string;
}> = ({ value, label, sceneFrame, delay = 0, color = C.primary }) => {
  const s = spring({ frame: Math.max(0, sceneFrame - delay), fps: FPS, config: { damping: 18, stiffness: 100 } });
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
    }}>
      <span style={{
        fontSize: 36, fontWeight: 800, color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "-0.04em",
      }}>{value}</span>
      <span style={{
        fontSize: 11, color: C.textMuted, fontWeight: 600,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>{label}</span>
    </div>
  );
};

// ── Full-width center scene (CTA) ──────────────────────────────────────────
const CTAScene: React.FC<{ sceneFrame: number; sceneDur: number }> = ({ sceneFrame, sceneDur }) => {
  const enter = spring({ frame: sceneFrame, fps: FPS, config: { damping: 16, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Main CTA text */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
        opacity: enter,
        transform: `scale(${interpolate(enter, [0, 1], [0.92, 1])})`,
      }}>
        {/* URL badge */}
        <div style={{
          padding: "8px 20px",
          background: `${C.primary}20`,
          border: `1px solid ${C.primary}50`,
          borderRadius: 999,
        }}>
          <span style={{
            fontSize: 14, fontWeight: 700, color: C.primary,
            fontFamily: "system-ui", letterSpacing: "0.06em",
          }}>signalsky.app</span>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", maxWidth: 900 }}>
          <h1 style={{
            fontSize: 72, fontWeight: 900, color: C.text, margin: 0,
            lineHeight: 1.0, letterSpacing: "-0.04em",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}>
            Stop scanning manually.
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Start trading smarter.
            </span>
          </h1>
        </div>

        {/* Sub */}
        <p style={{
          fontSize: 20, color: "#9CA3AF", margin: 0,
          fontFamily: "system-ui", textAlign: "center",
          fontWeight: 400,
        }}>
          7-day free trial · No card required · Monthly / Yearly / Lifetime
        </p>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 60, marginTop: 12,
          padding: "24px 48px",
          background: `${C.cardBg}cc`,
          border: `1px solid ${C.cardBorder}`,
          borderRadius: 16,
        }}>
          <AnimatedStat value="20yr" label="Backtest data" sceneFrame={sceneFrame} delay={10} color={C.primary} />
          <div style={{ width: 1, background: C.cardBorder }} />
          <AnimatedStat value="68%+" label="Avg win rate" sceneFrame={sceneFrame} delay={15} color={C.green} />
          <div style={{ width: 1, background: C.cardBorder }} />
          <AnimatedStat value="₹299" label="Per month" sceneFrame={sceneFrame} delay={20} color={C.gold} />
          <div style={{ width: 1, background: C.cardBorder }} />
          <AnimatedStat value="4 mkt" label="Universes" sceneFrame={sceneFrame} delay={25} color={C.accent} />
        </div>
      </div>

      {/* Pricing screenshot inset */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 220,
        opacity: interpolate(sceneFrame, [20, 40], [0, 0.25], { extrapolateRight: "clamp" }),
        overflow: "hidden",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
      }}>
        <Img
          src={staticFile("screenshots/24-pricing-full.png")}
          style={{ width: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Heat badge for scanner scene ───────────────────────────────────────────
const HeatPill: React.FC<{ label: string; color: string; sceneFrame: number; delay: number }> = ({
  label, color, sceneFrame, delay,
}) => {
  const s = spring({ frame: Math.max(0, sceneFrame - delay), fps: FPS, config: { damping: 16, stiffness: 120 } });
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px",
      background: `${color}18`, border: `1px solid ${color}50`,
      borderRadius: 999,
      opacity: s,
      transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: "system-ui", letterSpacing: "0.05em" }}>{label}</span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPOSITION
// ─────────────────────────────────────────────────────────────────────────────
export const WalkthroughComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>

      {/* ── Ambient layers ── */}
      <GradientOrbs frame={frame} />
      <ParticleField frame={frame} />

      {/* ── Background music — ducked under VO ── */}
      <BackgroundMusic
        totalFrames={TOTAL_FRAMES}
        duck={true}
        duckVolume={0.08}
        fullVolume={0.08}
        fadeInFrames={45}
        fadeOutFrames={60}
      />

      {/* ── Logo always visible ── */}
      <Logo frame={frame} />

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 1 — Hook
          Duration: 9s (frames 0–270)
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(0)} durationInFrames={f(9)}>
        {(() => {
          const sf = frame - f(0);
          return (
            <>
              <Audio src={staticFile("audio/vo-s1-hook.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="01 · Hook"
                headline="Your signal scanner."
                bullets={[
                  "Reset & Reclaim across Nifty 50, Bank Nifty, S&P 100, Nasdaq 100",
                  "Ranked by strength. Ready before markets open.",
                  "Real data. Real edge.",
                ]}
                accentColor={C.primary}
              />

              <ScreenshotCard
                src="screenshots/01-landing-hero.png"
                sceneFrame={sf}
                sceneDur={9}
                kbDir="in" kbPan="right"
              />

              <SceneBadge current={1} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 2 — Scanner
          Duration: 20s (frames 270–870)
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(9)} durationInFrames={f(20)}>
        {(() => {
          const sf = frame - f(9);
          return (
            <>
              <Audio src={staticFile("audio/vo-s2-scanner.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="02 · Scanner"
                headline="Find the breakout before it happens."
                bullets={[
                  "Heat badges: Breakout → Boiling → Simmering → Cooling",
                  "Slingshot filter: reclaimed EMA 220 within 30 days",
                  "Instantly filter to any universe — Nifty 50, S&P 100…",
                ]}
                accentColor={C.orange}
              />

              {/* Scanner with slingshot active */}
              <ScreenshotCard
                src="screenshots/07-scanner-slingshot-30d.png"
                sceneFrame={sf}
                sceneDur={20}
                kbDir="in" kbPan="left"
                clicks={[
                  { atFrame: 18, cx: 28, cy: 8, zoomScale: 1.5, holdFrames: 55 },
                  { atFrame: 85, cx: 50, cy: 22, zoomScale: 1.4, holdFrames: 40 },
                ]}
              />

              {/* Heat pills floating over */}
              <div style={{
                position: "absolute", right: 1190, bottom: 120,
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <HeatPill label="Breakout ≤0%" color={C.green} sceneFrame={sf} delay={12} />
                <HeatPill label="Boiling 0–2%" color={C.orange} sceneFrame={sf} delay={16} />
                <HeatPill label="Simmering 2–5%" color={C.gold} sceneFrame={sf} delay={20} />
              </div>

              {/* Slingshot callout */}
              <Callout
                x={55} y={16} text="Slingshot ≤30d active"
                sceneFrame={sf} delay={20}
                dir="down" color={C.primary}
              />

              <SceneBadge current={2} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 3 — Signal Detail (TITAN)
          Duration: 18s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(29)} durationInFrames={f(18)}>
        {(() => {
          const sf = frame - f(29);
          // alternate between chart and position calc
          const showCalc = sf > f(10);
          return (
            <>
              <Audio src={staticFile("audio/vo-s3-signal.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="03 · Signal Detail — TITAN"
                headline="Three moments. One setup."
                bullets={[
                  "Pre-set ATH → Break below EMA 220 → Reclaim",
                  "Chart annotated with exact dates",
                  "Position calculator: stop loss + size auto-computed",
                ]}
                accentColor={C.accent}
              />

              {/* Transition between chart and position calc */}
              <ScreenshotCard
                src={showCalc ? "screenshots/12-signal-detail-position-calc.png" : "screenshots/10-signal-detail-chart.png"}
                sceneFrame={showCalc ? sf - f(10) : sf}
                sceneDur={showCalc ? 8 : 10}
                kbDir={showCalc ? "out" : "in"}
                clicks={showCalc
                  ? [{ atFrame: 8, cx: 35, cy: 60, zoomScale: 1.4, holdFrames: 40 }]
                  : [
                    { atFrame: 10, cx: 50, cy: 38, zoomScale: 1.45, holdFrames: 50 },
                    { atFrame: 72, cx: 50, cy: 62, zoomScale: 1.4, holdFrames: 30 },
                  ]
                }
              />

              {/* Chart callouts */}
              {!showCalc && (
                <>
                  <Callout x={58} y={30} text="Pre-set ATH" sceneFrame={sf} delay={8} color={C.green} dir="down" />
                  <Callout x={58} y={48} text="Break below EMA 220" sceneFrame={sf} delay={12} color={C.red} dir="down" />
                  <Callout x={58} y={65} text="Reclaim date ✓" sceneFrame={sf} delay={16} color={C.primary} dir="up" />
                </>
              )}

              {showCalc && (
                <Callout x={38} y={62} text="Auto-calculated stop & size" sceneFrame={sf - f(10)} delay={5} color={C.gold} dir="up" />
              )}

              <SceneBadge current={3} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 4 — Backtests
          Duration: 13s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(47)} durationInFrames={f(13)}>
        {(() => {
          const sf = frame - f(47);
          const showChip = sf > f(7);
          return (
            <>
              <Audio src={staticFile("audio/vo-s4-backtests.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="04 · Backtests"
                headline="20 years of edge. Proven."
                bullets={[
                  "Every symbol backtested with full 20yr daily data",
                  "Baseline vs Slingshot variants side-by-side",
                  "Equity curve · Win rate · Sharpe ratio",
                ]}
                accentColor={C.gold}
              />

              <ScreenshotCard
                src={showChip ? "screenshots/15-backtest-detail-slingshot30.png" : "screenshots/14-backtest-detail-baseline.png"}
                sceneFrame={showChip ? sf - f(7) : sf}
                sceneDur={showChip ? 6 : 7}
                kbDir="in"
                clicks={showChip
                  ? [{ atFrame: 3, cx: 22, cy: 7, zoomScale: 1.5, holdFrames: 50 }]
                  : [{ atFrame: 12, cx: 50, cy: 50, zoomScale: 1.3, holdFrames: 40 }]
                }
              />

              {showChip && (
                <Callout x={38} y={14} text="Slingshot ≤30d — higher win rate" sceneFrame={sf - f(7)} delay={3} color={C.gold} dir="down" />
              )}

              <SceneBadge current={4} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 5 — Performance
          Duration: 9s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(60)} durationInFrames={f(9)}>
        {(() => {
          const sf = frame - f(60);
          return (
            <>
              <Audio src={staticFile("audio/vo-s5-performance.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="05 · Performance"
                headline="Universe-wide stats."
                bullets={[
                  "Aggregated win rate across all symbols",
                  "Slingshot filter lifts average win rate",
                  "One click — entire universe re-scored",
                ]}
                accentColor={C.green}
              />

              <ScreenshotCard
                src="screenshots/16-performance-baseline.png"
                sceneFrame={sf}
                sceneDur={9}
                kbDir="in" kbPan="right"
                clicks={[
                  { atFrame: 15, cx: 28, cy: 15, zoomScale: 1.5, holdFrames: 60 },
                ]}
              />

              <SceneBadge current={5} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 6 — Market Health
          Duration: 9s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(69)} durationInFrames={f(9)}>
        {(() => {
          const sf = frame - f(69);
          return (
            <>
              <Audio src={staticFile("audio/vo-s6-market-health.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="06 · Market Health"
                headline="Check conditions before every trade."
                bullets={[
                  "% of each universe above EMA 220",
                  "Below 40%? Wait. Don't trade into distribution.",
                  "4 universes: Nifty 50, Bank Nifty, S&P 100, Nasdaq",
                ]}
                accentColor={C.accent}
              />

              <ScreenshotCard
                src="screenshots/19-market-health-cards.png"
                sceneFrame={sf}
                sceneDur={9}
                kbDir="out" kbPan="left"
              />

              <Callout x={38} y={72} text="< 40% = wait" sceneFrame={sf} delay={12} color={C.red} dir="up" />

              <SceneBadge current={6} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 7 — Journal
          Duration: 7s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(78)} durationInFrames={f(7)}>
        {(() => {
          const sf = frame - f(78);
          return (
            <>
              <Audio src={staticFile("audio/vo-s7-journal.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="07 · Trade Journal"
                headline="Your real performance log."
                bullets={[
                  "India P&L in ₹ · US P&L in $",
                  "Log entries directly from the scanner",
                  "Closed & open trades tracked separately",
                ]}
                accentColor={C.primary}
              />

              <ScreenshotCard
                src="screenshots/20-journal-overview.png"
                sceneFrame={sf}
                sceneDur={7}
                kbDir="in"
              />

              <SceneBadge current={7} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 8 — Alerts
          Duration: 9s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(85)} durationInFrames={f(9)}>
        {(() => {
          const sf = frame - f(85);
          return (
            <>
              <Audio src={staticFile("audio/vo-s8-alerts.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />

              <LeftPanel
                sceneFrame={sf}
                label="08 · Alerts"
                headline="Never miss a signal."
                bullets={[
                  "Telegram alerts — connect in 30 seconds",
                  "Filter by heat level: Breakout only, or all",
                  "Daily email digest at 7 AM IST",
                ]}
                accentColor={C.gold}
              />

              <ScreenshotCard
                src="screenshots/22-settings-alerts-telegram.png"
                sceneFrame={sf}
                sceneDur={9}
                kbDir="in" kbPan="left"
                clicks={[
                  { atFrame: 12, cx: 35, cy: 38, zoomScale: 1.45, holdFrames: 55 },
                ]}
              />

              <Callout x={38} y={62} text="30-second setup" sceneFrame={sf} delay={10} color={C.gold} dir="up" />

              <SceneBadge current={8} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 9 — CTA
          Duration: 16s
      ══════════════════════════════════════════════════════════════════════ */}
      <Sequence from={f(94)} durationInFrames={f(16)}>
        {(() => {
          const sf = frame - f(94);
          return (
            <>
              <Audio src={staticFile("audio/vo-s9-cta.mp3")} volume={1} />
              <TransitionFlash sceneFrame={sf} />
              <CTAScene sceneFrame={sf} sceneDur={16} />
              <SceneBadge current={9} total={9} sceneFrame={sf} />
            </>
          );
        })()}
      </Sequence>

      {/* ── Global vignette ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
      }} />
    </AbsoluteFill>
  );
};
