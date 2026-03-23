import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";
import { PhoneMockup } from "../../components/PhoneMockup";
import { TelegramNotif } from "../../components/TelegramNotif";
import { AnimatedCursor, CursorKeyframe } from "../../components/AnimatedCursor";
import { ClickSound } from "../../components/ClickSound";

const HEAT_TOGGLES = [
  { label: "Breakout",  color: LIGHT.heat.breakout,  active: true  },
  { label: "Boiling",   color: LIGHT.heat.boiling,   active: true  },
  { label: "Simmering", color: LIGHT.heat.simmering, active: false },
  { label: "Cooling",   color: LIGHT.heat.cooling,   active: false },
];

const CONNECT_CLICK = 100;
const TOGGLE_BASE_START = 200;

export const D8Alerts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: compWidth, height: compHeight } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // Phone slides in from right
  const phoneSlide = spring({ frame: frame - 40, fps, config: { stiffness: 180, damping: 24 } });
  const phoneX = interpolate(phoneSlide, [0, 1], [220, 0]);

  // Connected state switches after cursor clicks the Connect button
  const isConnected = frame >= CONNECT_CLICK;

  const appWidth  = 1160;
  const appHeight = 600;

  const cursorKfs: CursorKeyframe[] = [
    { frame: 0,              x: 0.5,  y: 0.5,  action: "idle" },
    { frame: CONNECT_CLICK - 12, x: 0.55, y: 0.41, action: "hover" },
    { frame: CONNECT_CLICK,      x: 0.55, y: 0.41, action: "click" },
    { frame: CONNECT_CLICK + 30, x: 0.55, y: 0.52, action: "idle" },
    // Move to toggle breakout
    { frame: TOGGLE_BASE_START - 10, x: 0.43, y: 0.56, action: "hover" },
    { frame: TOGGLE_BASE_START,      x: 0.43, y: 0.56, action: "click" },
    { frame: TOGGLE_BASE_START + 30, x: 0.50, y: 0.60, action: "idle" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: LIGHT.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      <ClickSound clickFrames={[CONNECT_CLICK, TOGGLE_BASE_START]} volume={0.4} />

      <div
        style={{
          transform: `scale(${chromeScale * 1.3})`,
          opacity: chromeScale,
        }}
      >
        <AppShell
          activePage="settings"
          width={appWidth}
          height={appHeight}
          sidebarWidth={188}
          signalCount={28}
        >
          <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
            {/* Settings content */}
            <div
              style={{
                flex: 1,
                padding: "20px 24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Page title */}
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: LIGHT.foreground,
                    letterSpacing: "-0.04em",
                  }}
                >
                  Alerts &amp; Notifications
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: LIGHT.mutedFg,
                    marginTop: 3,
                  }}
                >
                  Get notified when new signals are detected
                </div>
              </div>

              {/* Telegram card */}
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: 10,
                  border: `1px solid ${LIGHT.border}`,
                  backgroundColor: LIGHT.card,
                  marginBottom: 14,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Telegram icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={LIGHT.primary}>
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.036 9.594c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.24 14.566l-2.94-.916c-.64-.197-.653-.64.136-.948l11.494-4.432c.532-.19 1.001.13.632.978z"/>
                    </svg>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: LIGHT.foreground,
                      }}
                    >
                      Telegram
                    </div>
                  </div>

                  {/* Connected badge / Connect button */}
                  {isConnected ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 12px",
                        borderRadius: 20,
                        backgroundColor: `${LIGHT.bull}12`,
                        border: `1px solid ${LIGHT.bull}35`,
                        fontSize: 11,
                        color: LIGHT.bull,
                        fontWeight: 600,
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={LIGHT.bull} strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Connected
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 6,
                        backgroundColor: LIGHT.primary,
                        fontSize: 11,
                        color: "white",
                        fontWeight: 600,
                        boxShadow: `0 2px 8px ${LIGHT.primary}35`,
                      }}
                    >
                      Connect Telegram
                    </div>
                  )}
                </div>

                {/* Heat filter row */}
                <div
                  style={{
                    fontSize: 11,
                    color: LIGHT.mutedFg,
                    marginBottom: 10,
                  }}
                >
                  Alert heat levels:
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {HEAT_TOGGLES.map((t, i) => {
                    const toggleProgress = spring({
                      frame: frame - (TOGGLE_BASE_START + i * 8),
                      fps,
                      config: { stiffness: 300, damping: 20 },
                    });
                    const isAnimated = frame > TOGGLE_BASE_START + i * 8;
                    return (
                      <div
                        key={t.label}
                        style={{
                          padding: "5px 14px",
                          borderRadius: 20,
                          border: `1px solid ${t.active ? t.color : LIGHT.border}`,
                          backgroundColor: t.active ? `${t.color}15` : "transparent",
                          fontSize: 11,
                          color: t.active ? t.color : LIGHT.mutedFg,
                          fontWeight: t.active ? 600 : 400,
                          transform: isAnimated
                            ? `scale(${1 + toggleProgress * 0.04})`
                            : "scale(1)",
                        }}
                      >
                        {t.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Email digest card */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: 10,
                  border: `1px solid ${LIGHT.border}`,
                  backgroundColor: LIGHT.card,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Mail icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={LIGHT.mutedFg}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: LIGHT.foreground,
                      }}
                    >
                      Email Digest
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: LIGHT.mutedFg,
                        marginTop: 1,
                      }}
                    >
                      Daily summary at 7 AM IST
                    </div>
                  </div>
                </div>
                {/* Toggle on */}
                <div
                  style={{
                    width: 38,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: LIGHT.bull,
                    position: "relative",
                    boxShadow: `0 0 0 2px ${LIGHT.bull}25`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: 3,
                      top: 3,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div
              style={{
                width: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderLeft: `1px solid ${LIGHT.border}`,
                transform: `translateX(${phoneX}px)`,
                opacity: phoneSlide,
                backgroundColor: LIGHT.surface,
              }}
            >
              <PhoneMockup height={420}>
                <TelegramNotif
                  symbol="RELIANCE.NS"
                  heat="breakout"
                  price="₹2,547"
                  peak="₹2,531"
                  market="NSE"
                  startFrame={45}
                />
              </PhoneMockup>
            </div>
          </div>
        </AppShell>
      </div>

      {/* Cursor */}
      <AnimatedCursor
        keyframes={cursorKfs}
        compositionWidth={compWidth}
        compositionHeight={compHeight}
        size={28}
      />
    </div>
  );
};
