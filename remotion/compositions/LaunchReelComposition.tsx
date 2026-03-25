/**
 * SignalSky — LaunchReel30V
 *
 * 30-second portrait reel (1080×1920) using real app screenshots.
 * Designed for Instagram Reels / TikTok / YouTube Shorts.
 *
 * 6 scenes, bg music at low volume, click-zoom + cursor ripple on key interactions.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BackgroundMusic } from "../components/BackgroundMusic";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const TOTAL = f(30);

// ── Colors ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#0B0C12",
  primary: "#3B82F6",
  accent: "#6EE7B7",
  gold: "#F59E0B",
  green: "#22C55E",
  red: "#EF4444",
  orange: "#F97316",
  text: "#F0F4FF",
  muted: "#6B7280",
  card: "#13151F",
  border: "#ffffff14",
};

// ── Scene timings ──────────────────────────────────────────────────────────
const S1 = { start: 0,  dur: 4  };   // Hook
const S2 = { start: 4,  dur: 8  };   // Scanner
const S3 = { start: 12, dur: 6  };   // Signal Detail
const S4 = { start: 18, dur: 4  };   // Backtests
const S5 = { start: 22, dur: 4  };   // Market Health + Alerts
const S6 = { start: 26, dur: 4  };   // CTA

// ── Helpers ────────────────────────────────────────────────────────────────
function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

// ── Gradient orb background ────────────────────────────────────────────────
const BgOrbs: React.FC<{ frame: number }> = ({ frame }) => {
  const shift = Math.sin(frame * 0.02) * 30;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -200 + shift, left: -150,
        width: 900, height: 900, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}20 0%, transparent 65%)`,
      }} />
      <div style={{
        position: "absolute", bottom: -200 - shift * 0.5, right: -100,
        width: 700, height: 700, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.accent}14 0%, transparent 65%)`,
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "20%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, #7C3AED0a 0%, transparent 70%)`,
        transform: `translateY(${shift}px)`,
      }} />
    </div>
  );
};

// ── Browser-frame screenshot card ─────────────────────────────────────────
// Portrait-optimised: 960px wide, proportional height
interface ScreenCardProps {
  src: string;
  sceneFrame: number;
  sceneDurS: number;
  kbDir?: "in" | "out";
  /** click zoom event */
  click?: { atFrame: number; cx: number; cy: number; scale?: number; hold?: number };
  /** y offset from center (px) */
  offsetY?: number;
}

const ScreenCard: React.FC<ScreenCardProps> = ({
  src, sceneFrame, sceneDurS,
  kbDir = "in",
  click,
  offsetY = 0,
}) => {
  const enter = spring({ frame: sceneFrame, fps: FPS, config: { damping: 18, stiffness: 90 } });

  // Ken Burns
  const progress = clamp(sceneFrame / (sceneDurS * FPS), 0, 1);
  const kbScale = kbDir === "in"
    ? interpolate(progress, [0, 1], [1.0, 1.07])
    : interpolate(progress, [0, 1], [1.07, 1.0]);

  // Click zoom
  let zoomScale = kbScale;
  let zoomOriginX = 50;
  let zoomOriginY = 50;

  if (click) {
    const scale = click.scale ?? 1.5;
    const hold = click.hold ?? 55;
    const rel = sceneFrame - click.atFrame;
    if (rel > -3) {
      const zoomIn = spring({ frame: Math.max(0, rel), fps: FPS, config: { damping: 22, stiffness: 75 } });
      const zoomOut = spring({ frame: Math.max(0, rel - hold), fps: FPS, config: { damping: 20, stiffness: 65 } });
      const zoomed = interpolate(zoomIn, [0, 1], [1.0, scale]);
      const back = interpolate(zoomOut, [0, 1], [scale, 1.0]);
      const cs = rel >= hold ? back : zoomed;
      if (cs > 1.05) {
        zoomScale = cs;
        zoomOriginX = click.cx;
        zoomOriginY = click.cy;
      }
    }
  }

  // Cursor ripple
  const showCursor = click && sceneFrame >= click.atFrame - 4 && sceneFrame <= click.atFrame + 50;
  const rippleRel = click ? sceneFrame - click.atFrame : -99;
  const rippleScale = interpolate(rippleRel, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rippleOpacity = interpolate(rippleRel, [0, 5, 20], [0.8, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursorOpacity = interpolate(rippleRel, [-4, 0, 40, 50], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cardW = 960;
  const cardH = 600; // matches 1440×900 screenshots at 960/1440*900

  return (
    <div style={{
      position: "absolute",
      left: (1080 - cardW) / 2,
      top: "50%",
      marginTop: -cardH / 2 + offsetY,
      width: cardW, height: cardH,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 100px rgba(0,0,0,0.7)",
      opacity: enter,
      transform: `translateY(${interpolate(enter, [0, 1], [50, 0])}px) scale(${interpolate(enter, [0, 1], [0.94, 1])})`,
    }}>
      {/* Screenshot with zoom */}
      <div style={{
        width: "100%", height: "100%",
        transform: `scale(${zoomScale})`,
        transformOrigin: `${zoomOriginX}% ${zoomOriginY}%`,
        overflow: "hidden",
      }}>
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      {/* Browser chrome */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 30,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
        display: "flex", alignItems: "center", gap: 6, padding: "0 12px",
      }}>
        {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
        ))}
      </div>

      {/* Cursor dot */}
      {showCursor && click && (
        <>
          <div style={{
            position: "absolute",
            left: `${click.cx}%`, top: `${click.cy}%`,
            transform: "translate(-50%, -50%)",
            width: 14, height: 14, borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            opacity: cursorOpacity, zIndex: 20,
          }} />
          <div style={{
            position: "absolute",
            left: `${click.cx}%`, top: `${click.cy}%`,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            width: 48, height: 48, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.75)",
            opacity: rippleOpacity, zIndex: 19,
          }} />
        </>
      )}
    </div>
  );
};

// ── Floating text label ────────────────────────────────────────────────────
const Tag: React.FC<{
  text: string; sceneFrame: number; delay?: number;
  x: number; y: number; color?: string;
}> = ({ text, sceneFrame, delay = 0, x, y, color = C.primary }) => {
  const s = spring({ frame: Math.max(0, sceneFrame - delay), fps: FPS, config: { damping: 16, stiffness: 110 } });
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      display: "flex", alignItems: "center", gap: 7,
      padding: "6px 14px",
      background: `${color}1a`, border: `1px solid ${color}55`,
      borderRadius: 999,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      <span style={{
        fontSize: 24, fontWeight: 700, color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "0.03em",
      }}>{text}</span>
    </div>
  );
};

// ── Scene label pill (top) ─────────────────────────────────────────────────
const SceneLabel: React.FC<{ text: string; sceneFrame: number; color?: string }> = ({
  text, sceneFrame, color = C.primary,
}) => {
  const s = spring({ frame: sceneFrame, fps: FPS, config: { damping: 18, stiffness: 120 } });
  return (
    <div style={{
      position: "absolute", top: 130, left: 60,
      display: "flex", alignItems: "center", gap: 8,
      opacity: s, transform: `translateX(${interpolate(s, [0, 1], [-20, 0])}px)`,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      <span style={{
        fontSize: 22, fontWeight: 700, color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>{text}</span>
    </div>
  );
};

// ── Headline text ──────────────────────────────────────────────────────────
const Headline: React.FC<{
  lines: string[]; sceneFrame: number; size?: number;
  bottomY: number; color?: string; accentColor?: string; accentLine?: number;
}> = ({ lines, sceneFrame, size = 72, bottomY, color = C.text, accentColor = C.primary, accentLine = -1 }) => {
  return (
    <div style={{
      position: "absolute", bottom: bottomY, left: 60, right: 60,
    }}>
      {lines.map((line, i) => {
        const s = spring({ frame: Math.max(0, sceneFrame - i * 5), fps: FPS, config: { damping: 18, stiffness: 100 } });
        return (
          <div key={i} style={{
            fontSize: size, fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: i === accentLine ? accentColor : color,
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: s,
            transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
          }}>{line}</div>
        );
      })}
    </div>
  );
};

// ── Progress dots ──────────────────────────────────────────────────────────
const Dots: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div style={{
    position: "absolute", bottom: 80, left: "50%",
    transform: "translateX(-50%)",
    display: "flex", gap: 8,
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i === current ? 24 : 8, height: 8, borderRadius: 4,
        background: i === current ? C.primary : "rgba(255,255,255,0.2)",
      }} />
    ))}
  </div>
);

// ── Logo badge (top-right) ─────────────────────────────────────────────────
const LogoBadge: React.FC<{ frame: number }> = ({ frame }) => {
  const s = spring({ frame: Math.max(0, frame - 5), fps: FPS, config: { damping: 20, stiffness: 120 } });
  return (
    <div style={{
      position: "absolute", top: 120, right: 60,
      display: "flex", alignItems: "center", gap: 8,
      opacity: interpolate(s, [0, 1], [0, 0.75]),
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: `linear-gradient(135deg, ${C.primary}, #7C3AED)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>⚡</span>
      </div>
      <span style={{
        fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.7)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}>SignalSky</span>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 1 — Hook (0–4s)
// Bold headline + landing screenshot as blurred background
// ══════════════════════════════════════════════════════════════════════════════
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const slamS = spring({ frame, fps: FPS, config: { stiffness: 280, damping: 28 } });
  const subS  = spring({ frame: Math.max(0, frame - 20), fps: FPS, config: { damping: 18, stiffness: 100 } });

  return (
    <AbsoluteFill>
      {/* Blurred landing screenshot as bg */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile("screenshots/01-landing-hero.png")}
          style={{
            width: "120%", height: "120%",
            objectFit: "cover", objectPosition: "top",
            marginLeft: "-10%", marginTop: "-5%",
            filter: "blur(18px) brightness(0.25)",
          }}
        />
      </div>

      <BgOrbs frame={frame} />

      {/* Central headline */}
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
        <div style={{
          textAlign: "center",
          transform: `scale(${interpolate(slamS, [0, 1], [0.7, 1])})`,
          opacity: slamS,
        }}>
          <div style={{
            fontSize: 96, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "-0.04em", color: C.text,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}>
            Still scanning
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>manually?</span>
          </div>
        </div>

        <div style={{
          opacity: subS,
          transform: `translateY(${interpolate(subS, [0, 1], [16, 0])}px)`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 36, color: C.muted, fontWeight: 500,
            fontFamily: "system-ui", letterSpacing: "-0.01em",
          }}>
            Reset & Reclaim · automated.
          </div>
        </div>
      </AbsoluteFill>

      <Dots current={0} total={6} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 2 — Scanner (4–12s)
// Real scanner screenshot with slingshot filter click zoom + heat badge tags
// ══════════════════════════════════════════════════════════════════════════════
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const sf = frame;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BgOrbs frame={frame} />
      <LogoBadge frame={frame} />
      <SceneLabel text="Scanner" sceneFrame={sf} color={C.orange} />

      <ScreenCard
        src="screenshots/07-scanner-slingshot-30d.png"
        sceneFrame={sf}
        sceneDurS={8}
        kbDir="in"
        click={{ atFrame: 35, cx: 27, cy: 8, scale: 1.6, hold: 70 }}
        offsetY={-60}
      />

      {/* Heat badge tags */}
      <Tag text="🟢 Breakout" sceneFrame={sf} delay={18} x={60} y={820} color={C.green} />
      <Tag text="🔥 Boiling" sceneFrame={sf} delay={24} x={60} y={880} color={C.orange} />
      <Tag text="Slingshot ≤30d ✓" sceneFrame={sf} delay={30} x={60} y={940} color={C.primary} />

      <Headline
        lines={["Find the setup", "before it breaks out."]}
        sceneFrame={sf} size={64}
        bottomY={200} accentColor={C.orange} accentLine={1}
      />

      <Dots current={1} total={6} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 3 — Signal Detail (12–18s)
// TITAN chart + position calculator with click zoom
// ══════════════════════════════════════════════════════════════════════════════
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const sf = frame;
  const showCalc = sf > f(3);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BgOrbs frame={frame} />
      <LogoBadge frame={frame} />
      <SceneLabel text="Signal Detail — TITAN" sceneFrame={sf} color={C.accent} />

      <ScreenCard
        src={showCalc ? "screenshots/12-signal-detail-position-calc.png" : "screenshots/10-signal-detail-chart.png"}
        sceneFrame={showCalc ? sf - f(3) : sf}
        sceneDurS={showCalc ? 3 : 3}
        kbDir={showCalc ? "out" : "in"}
        click={showCalc
          ? { atFrame: 5, cx: 35, cy: 58, scale: 1.45, hold: 50 }
          : { atFrame: 18, cx: 50, cy: 42, scale: 1.4, hold: 40 }
        }
        offsetY={-60}
      />

      {!showCalc && (
        <>
          <Tag text="Pre-set ATH" sceneFrame={sf} delay={10} x={60} y={820} color={C.green} />
          <Tag text="Reclaim date ✓" sceneFrame={sf} delay={16} x={60} y={880} color={C.primary} />
        </>
      )}
      {showCalc && (
        <Tag text="Auto stop loss + size" sceneFrame={sf - f(3)} delay={8} x={60} y={850} color={C.gold} />
      )}

      <Headline
        lines={["Three moments.", "One trade setup."]}
        sceneFrame={sf} size={64}
        bottomY={200} accentColor={C.accent} accentLine={1}
      />

      <Dots current={2} total={6} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 4 — Backtests (18–22s)
// Chip switch from baseline → slingshot 30d
// ══════════════════════════════════════════════════════════════════════════════
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const sf = frame;
  const showChip = sf > f(2);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BgOrbs frame={frame} />
      <LogoBadge frame={frame} />
      <SceneLabel text="Backtests" sceneFrame={sf} color={C.gold} />

      <ScreenCard
        src={showChip ? "screenshots/15-backtest-detail-slingshot30.png" : "screenshots/14-backtest-detail-baseline.png"}
        sceneFrame={showChip ? sf - f(2) : sf}
        sceneDurS={showChip ? 2 : 2}
        kbDir="in"
        click={showChip
          ? { atFrame: 3, cx: 22, cy: 7, scale: 1.55, hold: 55 }
          : undefined
        }
        offsetY={-60}
      />

      <Tag text="20yr backtest data" sceneFrame={sf} delay={10} x={60} y={840} color={C.gold} />
      <Tag text="Slingshot ≤30d edge ↑" sceneFrame={sf} delay={18} x={60} y={900} color={C.green} />

      <Headline
        lines={["Historical edge.", "Proven."]}
        sceneFrame={sf} size={72}
        bottomY={200} accentColor={C.gold} accentLine={1}
      />

      <Dots current={3} total={6} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 5 — Market Health + Alerts (22–26s)
// Split: first half market health, second half alerts
// ══════════════════════════════════════════════════════════════════════════════
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const sf = frame;
  const showAlerts = sf > f(2);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BgOrbs frame={frame} />
      <LogoBadge frame={frame} />
      <SceneLabel
        text={showAlerts ? "Alerts" : "Market Health"}
        sceneFrame={showAlerts ? sf - f(2) : sf}
        color={showAlerts ? C.gold : C.accent}
      />

      <ScreenCard
        src={showAlerts ? "screenshots/22-settings-alerts-telegram.png" : "screenshots/19-market-health-cards.png"}
        sceneFrame={showAlerts ? sf - f(2) : sf}
        sceneDurS={2}
        kbDir="in"
        click={showAlerts
          ? { atFrame: 10, cx: 35, cy: 38, scale: 1.5, hold: 45 }
          : undefined
        }
        offsetY={-60}
      />

      {!showAlerts && (
        <Tag text="76% Nifty 50 above EMA 220" sceneFrame={sf} delay={12} x={60} y={860} color={C.accent} />
      )}
      {showAlerts && (
        <Tag text="Telegram alert in 30s" sceneFrame={sf - f(2)} delay={8} x={60} y={860} color={C.gold} />
      )}

      <Headline
        lines={["Know when to trade.", "Never miss a signal."]}
        sceneFrame={sf} size={58}
        bottomY={200} accentColor={C.accent} accentLine={1}
      />

      <Dots current={4} total={6} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 6 — CTA (26–30s)
// Pricing screenshot + URL + stats
// ══════════════════════════════════════════════════════════════════════════════
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const sf = frame;
  const enter = spring({ frame: sf, fps: FPS, config: { damping: 16, stiffness: 80 } });

  // Fade to black last 18 frames
  const fadeOut = interpolate(sf, [f(3) + 10, f(4)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BgOrbs frame={frame} />

      {/* Pricing screenshot faded at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 500,
        opacity: interpolate(enter, [0, 1], [0, 0.22]),
        overflow: "hidden",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
      }}>
        <Img
          src={staticFile("screenshots/24-pricing-full.png")}
          style={{ width: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      {/* Center content */}
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 40, padding: "0 60px",
        opacity: enter,
        transform: `scale(${interpolate(enter, [0, 1], [0.93, 1])})`,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: `linear-gradient(135deg, ${C.primary}, #7C3AED)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 26, fontWeight: 800 }}>⚡</span>
          </div>
          <span style={{
            fontSize: 52, fontWeight: 800, color: C.text,
            fontFamily: "system-ui", letterSpacing: "-0.03em",
          }}>SignalSky</span>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 76, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "-0.04em", color: C.text,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}>
            Stop scanning.
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Start trading.</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 0,
          background: `${C.card}cc`, border: `1px solid ${C.border}`,
          borderRadius: 20, overflow: "hidden", width: "100%",
        }}>
          {[
            { v: "20yr", l: "Backtests", c: C.primary },
            { v: "68%+", l: "Win rate", c: C.green },
            { v: "₹299", l: "/ month", c: C.gold },
          ].map((s, i) => {
            const ss = spring({ frame: Math.max(0, sf - 8 - i * 6), fps: FPS, config: { damping: 18, stiffness: 100 } });
            return (
              <div key={i} style={{
                flex: 1, padding: "24px 0", textAlign: "center",
                borderRight: i < 2 ? `1px solid ${C.border}` : "none",
                opacity: ss, transform: `translateY(${interpolate(ss, [0, 1], [12, 0])}px)`,
              }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: s.c, fontFamily: "system-ui", letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontSize: 18, color: C.muted, fontWeight: 500, fontFamily: "system-ui", marginTop: 4 }}>{s.l}</div>
              </div>
            );
          })}
        </div>

        {/* Sub */}
        <div style={{ fontSize: 28, color: C.muted, textAlign: "center", fontFamily: "system-ui", fontWeight: 400 }}>
          7-day free trial · No card required
        </div>

        {/* URL pill */}
        <div style={{
          padding: "16px 48px",
          background: `${C.primary}1a`, border: `1px solid ${C.primary}55`,
          borderRadius: 999,
        }}>
          <span style={{
            fontSize: 42, fontWeight: 800, color: C.primary,
            fontFamily: "system-ui", letterSpacing: "0.02em",
          }}>signalsky.app</span>
        </div>
      </AbsoluteFill>

      {/* Fade to black */}
      <AbsoluteFill style={{ background: "#000", opacity: fadeOut, pointerEvents: "none" }} />

      <Dots current={5} total={6} />
    </AbsoluteFill>
  );
};

// ── ROOT ───────────────────────────────────────────────────────────────────
export const LaunchReelComposition: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <BackgroundMusic
        totalFrames={TOTAL}
        duck={true}
        duckVolume={0.08}
        fullVolume={0.08}
        fadeInFrames={30}
        fadeOutFrames={45}
      />

      <Sequence from={f(S1.start)} durationInFrames={f(S1.dur)}><Scene1 /></Sequence>
      <Sequence from={f(S2.start)} durationInFrames={f(S2.dur)}><Scene2 /></Sequence>
      <Sequence from={f(S3.start)} durationInFrames={f(S3.dur)}><Scene3 /></Sequence>
      <Sequence from={f(S4.start)} durationInFrames={f(S4.dur)}><Scene4 /></Sequence>
      <Sequence from={f(S5.start)} durationInFrames={f(S5.dur)}><Scene5 /></Sequence>
      <Sequence from={f(S6.start)} durationInFrames={f(S6.dur)}><Scene6 /></Sequence>
    </AbsoluteFill>
  );
};
