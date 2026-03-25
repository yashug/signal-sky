import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { THEME } from "../config/theme";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { GlowOrb } from "../components/GlowOrb";

// ─── Timing ───────────────────────────────────────────────────────────────────
const FPS = 30;
const rf = (s: number) => Math.round(s * FPS);

// Scene start frames
const S1_START = rf(0);   // Hook           0–3s
const S2_START = rf(3);   // Product Intro  3–6s
const S3_START = rf(6);   // Demo           6–14s
const S4_START = rf(14);  // Showcase       14–19s
const S5_START = rf(19);  // Features       19–24s
const S6_START = rf(24);  // CTA            24–30s
const TOTAL    = rf(30);

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG   = THEME.background;  // #181921
const FG   = THEME.foreground;  // #e5e7ee
const MFG  = THEME.mutedFg;     // #9097b8
const PRI  = THEME.primary;     // #4f9de0
const BULL = THEME.bull;        // #23c475
const CARD = THEME.card;        // #1d1e29
const BRD  = THEME.border;      // #2d2f40
const BEAR = THEME.bear;        // #e05c22
const SIM  = THEME.simmering;   // #d4a32a

// Safe zone (px from edges)
const ST = 150;  // top
const SB = 170;  // bottom
const SS = 72;   // sides

// ─── Shared shell ─────────────────────────────────────────────────────────────
const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: BG,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: "hidden",
    }}
  >
    {children}
  </AbsoluteFill>
);

// ─── SCENE 1 — Hook (0–3s) ────────────────────────────────────────────────────
// "Still missing breakouts every day?" slams in, holds, fades out.
const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slamSpring = spring({ frame, fps, config: { stiffness: 360, damping: 28 } });
  const scale = interpolate(slamSpring, [0, 1], [2, 1]);

  // Fade out last 20f
  const opacity = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Shell>
      <AnimatedBackground
        baseColor={BG}
        accentColor={PRI}
        secondaryColor={BULL}
        particleCount={10}
        speed={0.7}
      />
      {/* Central radial glow */}
      <GlowOrb color={PRI} size={900} x="50%" y="48%" breatheSpeed={0.6} baseOpacity={0.38} pulseAmount={0.12} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${ST}px ${SS}px ${SB}px`,
          opacity,
        }}
      >
        <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: FG,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
            }}
          >
            Still missing
            <br />
            <span style={{ color: PRI }}>breakouts</span>
            <br />
            every day?
          </div>
        </div>
      </AbsoluteFill>
    </Shell>
  );
};

// ─── SCENE 2 — Product Intro (3–6s) ──────────────────────────────────────────
// Logo scales 3→1, tagline slides up, 20 particles burst from logo.
const S2Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo: spring from scale=3 → 1
  const rawLogo = spring({ frame, fps, config: { stiffness: 220, damping: 26 } });
  const logoScale = interpolate(rawLogo, [0, 1], [3, 1]);

  // Tagline slides up below logo
  const rawTag = spring({ frame: frame - 18, fps, config: { stiffness: 180, damping: 24 } });
  const tagY = interpolate(rawTag, [0, 1], [50, 0]);
  const tagOpacity = interpolate(frame - 18, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 20-particle burst behind logo
  const burstSpring = spring({ frame: frame - 2, fps, config: { stiffness: 90, damping: 35 } });
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const dist  = burstSpring * (180 + (i % 5) * 60);
    const size  = 5 + (i % 4) * 3;
    const col   = i % 3 === 0 ? PRI : i % 3 === 1 ? BULL : "#ffffff";
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size, col, opacity: (1 - burstSpring) * 0.85 };
  });

  return (
    <Shell>
      <AnimatedBackground baseColor={BG} accentColor={PRI} secondaryColor={BULL} particleCount={6} speed={0.5} />

      {/* Particle burst — centred in canvas */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ position: "relative", width: 0, height: 0 }}>
          {particles.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: p.col,
                left: p.x - p.size / 2,
                top: p.y - p.size / 2,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${ST}px ${SS}px ${SB}px`,
          gap: 0,
          zIndex: 1,
        }}
      >
        {/* Logo icon + wordmark */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${PRI} 0%, #2e5fad 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 16px 56px ${PRI}55`,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: FG, letterSpacing: "-0.04em" }}>
            SignalSky
          </div>
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: rawLogo * 280,
            height: 4,
            backgroundColor: PRI,
            borderRadius: 2,
            marginBottom: 40,
            opacity: rawLogo,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            transform: `translateY(${tagY}px)`,
            opacity: tagOpacity,
            textAlign: "center",
            fontSize: 52,
            fontWeight: 800,
            color: FG,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          Catch breakouts
          <br />
          <span style={{ color: PRI }}>before they run.</span>
        </div>
      </AbsoluteFill>
    </Shell>
  );
};

// ─── SCENE 3 — Simulated Demo (6–14s, 240 local frames) ──────────────────────
// Animated cursor moves: appears → input field (types RELIANCE) → Scan button
// (click ripple + depress) → spinner → 3 signal cards spring in staggered.
const TYPED_WORD = "RELIANCE";

// Absolute Y positions inside 1920-tall canvas (local frame is also full-canvas)
const INPUT_TOP   = ST + 160;   // top of input box
const INPUT_H     = 80;
const INPUT_CY    = INPUT_TOP + INPUT_H / 2;

const BTN_TOP     = INPUT_TOP + INPUT_H + 24;
const BTN_H       = 72;
const BTN_CY      = BTN_TOP + BTN_H / 2;

const CARD_TOP    = BTN_TOP + BTN_H + 48;
const CARD_H      = 220;

// Phase local frames
const PH_CURSOR_ARRIVE = 0;   // cursor appears & moves to input (0→25f)
const PH_CLICK_INPUT   = 22;  // ripple on input
const PH_TYPE_START    = 32;  // typing begins
const PH_TYPE_END      = 32 + TYPED_WORD.length * 5; // 72f
const PH_MOVE_BTN      = 80;  // cursor moves to scan button
const PH_CLICK_BTN     = 95;  // ripple + depress
const PH_SPINNER       = 110; // show spinner
const PH_CARDS         = 130; // cards start animating in

const S3Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Cursor position ──────────────────────────────────────────────────────
  const toInput = spring({ frame, fps, config: { stiffness: 180, damping: 22 } });
  const toBtn   = spring({ frame: frame - PH_MOVE_BTN, fps, config: { stiffness: 180, damping: 22 } });

  const cursorX = 540;
  const cursorY = frame < PH_MOVE_BTN
    ? interpolate(toInput, [0, 1], [900, INPUT_CY])
    : interpolate(toBtn, [0, 1], [INPUT_CY, BTN_CY]);

  const cursorOpacity = frame < PH_CARDS
    ? 1
    : interpolate(frame, [PH_CARDS, PH_CARDS + 20], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  // ── Typed text ────────────────────────────────────────────────────────────
  const charsTyped =
    frame >= PH_TYPE_START
      ? Math.min(TYPED_WORD.length, Math.floor((frame - PH_TYPE_START) / 5))
      : 0;

  // ── Input focus ────────────────────────────────────────────────────────────
  const inputFocused = frame >= PH_CLICK_INPUT && frame < PH_MOVE_BTN;

  // Input ripple
  const inRipple   = spring({ frame: frame - PH_CLICK_INPUT, fps, config: { stiffness: 400, damping: 28 } });
  const inRippleOp = interpolate(frame - PH_CLICK_INPUT, [0, 24], [0.55, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Button ────────────────────────────────────────────────────────────────
  const btnDepressRaw = spring({ frame: frame - PH_CLICK_BTN, fps, config: { stiffness: 500, damping: 22 } });
  // depress then snap back
  const btnScale = frame >= PH_CLICK_BTN && frame < PH_SPINNER
    ? interpolate(btnDepressRaw, [0, 1], [1, 0.94])
    : frame >= PH_SPINNER
    ? interpolate(spring({ frame: frame - PH_SPINNER, fps, config: { stiffness: 300, damping: 24 } }), [0, 1], [0.94, 1])
    : 1;

  const btnRipple   = spring({ frame: frame - PH_CLICK_BTN, fps, config: { stiffness: 400, damping: 28 } });
  const btnRippleOp = interpolate(frame - PH_CLICK_BTN, [0, 30], [0.55, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Spinner rotation
  const spinnerRot = ((frame - PH_SPINNER) / fps) * 360;

  // ── UI entrance ───────────────────────────────────────────────────────────
  const uiIn = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // ── Signal cards ──────────────────────────────────────────────────────────
  const cards = [
    { symbol: "RELIANCE", exchange: "NSE", heat: "🚀 Breakout",  col: BULL, price: "₹2,547", change: "+2.1%", wr: "72%", sl: "12d", ath: "₹2,531" },
    { symbol: "TCS",      exchange: "NSE", heat: "🔥 Boiling",   col: BEAR, price: "₹3,312", change: "+1.4%", wr: "68%", sl: "8d",  ath: "₹3,280" },
    { symbol: "HDFCBANK", exchange: "NSE", heat: "🌡 Simmering", col: SIM,  price: "₹1,892", change: "+0.7%", wr: "64%", sl: "25d", ath: "₹1,860" },
  ];

  return (
    <Shell>
      {/* UI — full canvas */}
      <AbsoluteFill
        style={{
          opacity: uiIn,
          transform: `translateY(${interpolate(uiIn, [0, 1], [30, 0])}px)`,
        }}
      >
        {/* Header bar */}
        <div
          style={{
            position: "absolute",
            top: ST,
            left: SS,
            right: SS,
            height: 80,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${PRI} 0%, #2e5fad 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: FG, letterSpacing: "-0.04em" }}>Scanner</div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 30,
              color: frame >= PH_CARDS ? BULL : MFG,
              fontFamily: "monospace",
              fontWeight: 700,
              opacity: frame >= PH_CARDS ? 1 : 0.3,
            }}
          >
            {frame >= PH_CARDS ? "3 signals found" : "scanning..."}
          </div>
        </div>

        {/* Input field */}
        <div
          style={{
            position: "absolute",
            top: INPUT_TOP,
            left: SS,
            right: SS,
            height: INPUT_H,
            borderRadius: 18,
            border: `2.5px solid ${inputFocused ? PRI : BRD}`,
            backgroundColor: CARD,
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
            paddingRight: 32,
            boxShadow: inputFocused
              ? `0 0 0 5px ${PRI}22, 0 6px 30px ${PRI}18`
              : "none",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontSize: 40,
              color: charsTyped > 0 ? FG : MFG,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.06em",
              flex: 1,
            }}
          >
            {charsTyped > 0 ? TYPED_WORD.slice(0, charsTyped) : "Search symbol..."}
          </span>
          {/* Blinking cursor */}
          {inputFocused && (
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: 40,
                backgroundColor: PRI,
                marginLeft: 2,
                opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
              }}
            />
          )}
        </div>

        {/* Input click ripple */}
        {frame >= PH_CLICK_INPUT && frame < PH_CLICK_INPUT + 30 && (
          <div
            style={{
              position: "absolute",
              left: 540,
              top: INPUT_CY,
              width: inRipple * 600,
              height: inRipple * 600,
              borderRadius: "50%",
              border: `2px solid ${PRI}`,
              transform: "translate(-50%, -50%)",
              opacity: inRippleOp,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Scan button */}
        <div
          style={{
            position: "absolute",
            top: BTN_TOP,
            left: SS,
            right: SS,
            height: BTN_H,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 18,
              background: `linear-gradient(135deg, ${PRI} 0%, #2e5fad 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${btnScale})`,
              boxShadow: `0 10px 40px ${PRI}45`,
            }}
          >
            {frame >= PH_SPINNER && frame < PH_CARDS ? (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: `4px solid rgba(255,255,255,0.3)`,
                  borderTopColor: "white",
                  transform: `rotate(${spinnerRot}deg)`,
                }}
              />
            ) : (
              <span style={{ fontSize: 40, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                Scan Markets
              </span>
            )}
          </div>

          {/* Button click ripple */}
          {frame >= PH_CLICK_BTN && frame < PH_CLICK_BTN + 40 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: btnRipple * 800,
                height: btnRipple * 800,
                borderRadius: "50%",
                border: `2px solid ${PRI}80`,
                transform: "translate(-50%, -50%)",
                opacity: btnRippleOp,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Signal cards */}
        {frame >= PH_CARDS &&
          cards.map((card, i) => {
            const cf = frame - PH_CARDS - i * 18;
            const cp = spring({ frame: cf, fps, config: { stiffness: 200, damping: 24 } });
            return (
              <div
                key={card.symbol}
                style={{
                  position: "absolute",
                  top: CARD_TOP + i * (CARD_H + 20),
                  left: SS,
                  right: SS,
                  height: CARD_H,
                  borderRadius: 22,
                  backgroundColor: CARD,
                  border: `1px solid ${BRD}`,
                  borderLeft: `7px solid ${card.col}`,
                  padding: "24px 28px",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
                  opacity: cp,
                  transform: `translateX(${interpolate(cp, [0, 1], [-40, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Row 1 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 40, fontWeight: 800, color: FG, fontFamily: "monospace", letterSpacing: "-0.02em" }}>
                      {card.symbol}
                    </div>
                    <div style={{ fontSize: 28, color: card.col, fontWeight: 700, marginTop: 4 }}>{card.heat}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: FG, fontFamily: "monospace" }}>{card.price}</div>
                    <div style={{ fontSize: 28, color: BULL, fontFamily: "monospace", fontWeight: 600 }}>↑ {card.change}</div>
                  </div>
                </div>
                {/* Row 2: badges */}
                <div style={{ display: "flex", gap: 16 }}>
                  {[
                    { k: "Win Rate", v: card.wr, c: card.col },
                    { k: "Slingshot", v: card.sl, c: PRI },
                    { k: "Prior ATH", v: card.ath, c: BULL },
                  ].map(({ k, v, c }) => (
                    <div
                      key={k}
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 12,
                        backgroundColor: `${c}12`,
                        border: `1px solid ${c}28`,
                      }}
                    >
                      <div style={{ fontSize: 22, color: MFG }}>{k}</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: c, fontFamily: "monospace" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </AbsoluteFill>

      {/* ── Animated cursor ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: cursorX - 14,
          top: cursorY - 14,
          width: 28,
          height: 28,
          pointerEvents: "none",
          zIndex: 999,
          opacity: cursorOpacity,
        }}
      >
        {/* Glow halo */}
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: 0.18,
          }}
        />
        {/* Main dot */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: 0.88,
            boxShadow: "0 0 16px rgba(255,255,255,0.6)",
          }}
        />
      </div>
    </Shell>
  );
};

// ─── SCENE 4 — Product Image Showcase (14–19s, 150 local frames) ─────────────
// Downloaded OG image displayed large, crossfades between 3 feature headlines.
const SHOWCASE_LABELS = [
  "Signal Scanner · 470+ stocks daily",
  "20-Year Backtested Strategy · Proven Edge",
  "Instant Telegram & Email Alerts",
];

const S4Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image entrance
  const imgSpring = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });
  const imgScale  = interpolate(imgSpring, [0, 1], [0.88, 1]);
  const imgOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Cycling headline — change every 50 frames
  const labelFade = (idx: number) => {
    const s = idx * 50;
    return interpolate(frame, [s, s + 12, s + 38, s + 50], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const subOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Shell>
      <AnimatedBackground baseColor={BG} accentColor={PRI} secondaryColor={BULL} particleCount={5} speed={0.4} />
      <GlowOrb color={PRI} size={700} x="50%" y="50%" breatheSpeed={0.7} baseOpacity={0.25} pulseAmount={0.08} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${ST}px ${SS}px ${SB}px`,
          gap: 36,
          zIndex: 1,
        }}
      >
        {/* Cycling feature headline */}
        <div style={{ height: 72, position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {SHOWCASE_LABELS.map((label, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                fontSize: 38,
                fontWeight: 700,
                color: PRI,
                textAlign: "center",
                letterSpacing: "-0.02em",
                opacity: labelFade(i),
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Product image — large, centered */}
        <div
          style={{
            width: "100%",
            maxWidth: 960,
            transform: `scale(${imgScale})`,
            opacity: imgOpacity,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: `0 32px 100px rgba(0,0,0,0.6), 0 0 0 1.5px ${BRD}`,
          }}
        >
          <Img
            src={staticFile("product-1.png")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Sub caption */}
        <div
          style={{
            fontSize: 30,
            color: MFG,
            textAlign: "center",
            opacity: subOpacity,
            letterSpacing: "-0.01em",
          }}
        >
          NSE · NASDAQ · S&amp;P 500 · All in one place
        </div>
      </AbsoluteFill>
    </Shell>
  );
};

// ─── SCENE 5 — Feature Callouts (19–24s, 150 local frames) ───────────────────
// OG image shrinks to 38% and drifts to top. Three feature lines spring in below.
const FEATURES = [
  { icon: "✓", text: "Reset & Reclaim strategy · 470+ stocks scanned daily", color: BULL   },
  { icon: "⚡", text: "Telegram & email alerts   · Real-time delivery",       color: PRI    },
  { icon: "★", text: "20-year backtests          · 50% win rate proven",      color: SIM    },
] as const;

const S5Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image animates from large→small and moves to top
  const transitionSpring = spring({ frame, fps, config: { stiffness: 140, damping: 22 } });
  const imgScale = interpolate(transitionSpring, [0, 1], [1, 0.38]);
  const imgTopOffset = interpolate(transitionSpring, [0, 1], [600, ST + 10]);

  return (
    <Shell>
      {/* Product image — floats to top */}
      <div
        style={{
          position: "absolute",
          top: imgTopOffset,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: `${imgScale * 100}%`,
            maxWidth: 960 * 0.38,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            opacity: 0.85,
          }}
        >
          <Img src={staticFile("product-1.png")} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>

      {/* Feature lines */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: SB + 40,
          paddingLeft: SS,
          paddingRight: SS,
          gap: 48,
          zIndex: 1,
        }}
      >
        {FEATURES.map((f, i) => {
          const fp = spring({ frame: frame - (i * 14 + 38), fps, config: { stiffness: 220, damping: 24 } });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                opacity: fp,
                transform: `translateX(${interpolate(fp, [0, 1], [80, 0])}px)`,
              }}
            >
              {/* Icon chip */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  flexShrink: 0,
                  borderRadius: 20,
                  backgroundColor: `${f.color}18`,
                  border: `2px solid ${f.color}38`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: FG,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  fontFamily: "monospace",
                }}
              >
                {f.text}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </Shell>
  );
};

// ─── SCENE 6 — Social Proof + CTA (24–30s, 180 local frames) ─────────────────
// Stats count up, logo + tagline, URL pulses.
const STATS = [
  { to: 150, suffix: "+", label: "Active Traders",  color: PRI  },
  { to: 470, suffix: "+", label: "Stocks Scanned",  color: BULL },
  { to: 50,  suffix: "%", label: "Backtest Win Rate", color: SIM  },
] as const;

const S6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Gentle URL pulse
  const urlPulse = 1 + Math.sin((frame / fps) * Math.PI * 1.4) * 0.016;

  // Fade to black last 20f
  const fadeOut = interpolate(frame, [160, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Shell>
      <GlowOrb color={PRI}  size={800} x="50%" y="38%" breatheSpeed={0.9} baseOpacity={0.32} pulseAmount={0.12} />
      <GlowOrb color={BULL} size={450} x="80%" y="72%" breatheSpeed={0.6} baseOpacity={0.18} pulseAmount={0.08} />

      {/* Fade to black overlay */}
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: fadeOut, zIndex: 99, pointerEvents: "none" }} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${ST}px ${SS}px ${SB}px`,
          gap: 0,
          opacity: entrySpring,
          transform: `scale(${interpolate(entrySpring, [0, 1], [0.93, 1])})`,
          zIndex: 1,
        }}
      >
        {/* Social proof counters */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginBottom: 72,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {STATS.map((stat, i) => {
            const statSpring = spring({ frame: frame - i * 14, fps, config: { stiffness: 120, damping: 22 } });
            const rawValue   = stat.to * Math.min(1, statSpring);
            const displayVal = Math.round(rawValue);
            const cardP = spring({ frame: frame - i * 14, fps, config: { stiffness: 200, damping: 24 } });

            return (
              <div
                key={stat.label}
                style={{
                  textAlign: "center",
                  opacity: cardP,
                  transform: `translateY(${interpolate(cardP, [0, 1], [24, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 90,
                    fontWeight: 800,
                    color: stat.color,
                    fontFamily: "monospace",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {displayVal}{stat.suffix}
                </div>
                <div style={{ fontSize: 30, color: MFG, marginTop: 10, fontWeight: 500 }}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${PRI} 0%, #2e5fad 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 12px 44px ${PRI}55`,
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, color: FG, letterSpacing: "-0.04em" }}>SignalSky</div>
        </div>

        {/* CTA headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: FG,
            textAlign: "center",
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Your edge starts
          <br />
          <span style={{ color: PRI }}>tomorrow morning.</span>
        </div>

        <div style={{ fontSize: 34, color: MFG, marginBottom: 64, textAlign: "center", fontWeight: 500 }}>
          7-day free trial · No card required
        </div>

        {/* Pulsing URL */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: PRI,
            fontFamily: "monospace",
            letterSpacing: "-0.02em",
            transform: `scale(${urlPulse})`,
            padding: "22px 56px",
            borderRadius: 22,
            border: `2px solid ${PRI}38`,
            backgroundColor: `${PRI}12`,
          }}
        >
          signalsky.app
        </div>
      </AbsoluteFill>
    </Shell>
  );
};

// ─── ROOT COMPOSITION ─────────────────────────────────────────────────────────
export const LaunchReelComposition: React.FC = () => (
  <>
    <BackgroundMusic totalFrames={TOTAL} duck={false} fullVolume={0.42} />

    <Sequence from={S1_START} durationInFrames={rf(3)}>
      <S1Hook />
    </Sequence>

    <Sequence from={S2_START} durationInFrames={rf(3)}>
      <S2Intro />
    </Sequence>

    <Sequence from={S3_START} durationInFrames={rf(8)}>
      <S3Demo />
    </Sequence>

    <Sequence from={S4_START} durationInFrames={rf(5)}>
      <S4Showcase />
    </Sequence>

    <Sequence from={S5_START} durationInFrames={rf(5)}>
      <S5Features />
    </Sequence>

    <Sequence from={S6_START} durationInFrames={rf(6)}>
      <S6CTA />
    </Sequence>
  </>
);
