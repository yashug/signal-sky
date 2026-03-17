import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { THEME } from "../config/theme";
import { PhoneMockup } from "../components/PhoneMockup";
import { TelegramNotif } from "../components/TelegramNotif";

interface Scene6Props {
  isVertical?: boolean;
}

export const Scene6Alerts: React.FC<Scene6Props> = ({ isVertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone 3D tilt in
  const phoneProgress = spring({ frame, fps, config: { stiffness: 120, damping: 18 } });
  const rotateY = interpolate(phoneProgress, [0, 1], [30, -8]);
  const phoneTranslateX = interpolate(phoneProgress, [0, 1], [200, 0]);

  // Right panel slide in
  const panelProgress = spring({ frame: frame - 20, fps, config: { stiffness: 160, damping: 24 } });

  // Telegram notification appears
  const notif1Progress = spring({ frame: frame - 40, fps, config: { stiffness: 200, damping: 22 } });
  const notif2Progress = spring({ frame: frame - 80, fps, config: { stiffness: 200, damping: 22 } });

  // Email notification appears
  const emailProgress = spring({ frame: frame - 110, fps, config: { stiffness: 180, damping: 24 } });

  const phoneHeight = isVertical ? 440 : 520;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: THEME.background,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "40px 40px" : "40px 80px",
        gap: isVertical ? 32 : 60,
        overflow: "hidden",
      }}
    >
      {/* Left: Phone mockup */}
      <div style={{ opacity: phoneProgress, flexShrink: 0 }}>
        <PhoneMockup
          rotateY={rotateY}
          translateX={phoneTranslateX}
          height={phoneHeight}
        >
          {/* Phone screen content */}
          <div style={{ padding: 12 }}>
            {/* Status bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0 8px",
                fontSize: 10,
                color: THEME.muted,
                fontFamily: "monospace",
              }}
            >
              <span>9:41</span>
              <span>⚡ 87%</span>
            </div>

            {/* Telegram chat header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 0 12px",
                borderBottom: `1px solid ${THEME.border}`,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: THEME.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: THEME.foreground, fontFamily: "sans-serif" }}>
                  SignalSky Bot
                </div>
                <div style={{ fontSize: 10, color: "#4CAF50", fontFamily: "sans-serif" }}>
                  ● online
                </div>
              </div>
            </div>

            {/* Telegram messages */}
            <div style={{ opacity: notif1Progress }}>
              <TelegramNotif
                symbol="RELIANCE.NS"
                heat="breakout"
                price="₹2,847"
                peak="₹2,830"
                market="NSE"
                startFrame={0}
              />
            </div>

            {frame > 80 && (
              <div style={{ marginTop: 12, opacity: notif2Progress }}>
                <TelegramNotif
                  symbol="NVDA"
                  heat="boiling"
                  price="$134.20"
                  peak="$138.50"
                  market="NASDAQ"
                  startFrame={0}
                />
              </div>
            )}
          </div>
        </PhoneMockup>
      </div>

      {/* Right: Feature callouts */}
      <div
        style={{
          flex: 1,
          maxWidth: isVertical ? "100%" : 420,
          opacity: panelProgress,
          transform: `translateX(${(1 - panelProgress) * 40}px)`,
        }}
      >
        <div
          style={{
            fontSize: isVertical ? 32 : 40,
            fontWeight: 800,
            color: THEME.foreground,
            fontFamily: "sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Alerts that
          <br />
          <span style={{ color: THEME.primary }}>actually fire.</span>
        </div>
        <div
          style={{
            fontSize: 18,
            color: THEME.muted,
            fontFamily: "sans-serif",
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Telegram or email — the moment a signal matches your heat filter. No manual chart checking.
        </div>

        {/* Feature list */}
        {[
          { icon: "⚡", text: "Instant Telegram alerts" },
          { icon: "📧", text: "Daily email digest" },
          { icon: "🎯", text: "Filter by heat level" },
          { icon: "🔕", text: "Zero noise — only what matters" },
        ].map((item, i) => {
          const itemProgress = spring({
            frame: frame - 30 - i * 12,
            fps,
            config: { stiffness: 180, damping: 24 },
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                opacity: itemProgress,
                transform: `translateX(${(1 - itemProgress) * 20}px)`,
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 16, color: THEME.foreground, fontFamily: "sans-serif" }}>
                {item.text}
              </span>
            </div>
          );
        })}

        {/* Email badge */}
        {frame > 110 && (
          <div
            style={{
              marginTop: 20,
              opacity: emailProgress,
              transform: `translateY(${(1 - emailProgress) * 20}px)`,
              backgroundColor: THEME.card,
              border: `1px solid ${THEME.border}`,
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 24 }}>📧</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: THEME.foreground, fontFamily: "sans-serif" }}>
                Email digest · 7 AM IST
              </div>
              <div style={{ fontSize: 11, color: THEME.muted, fontFamily: "sans-serif" }}>
                Daily summary · Weekly rollup · Instant alerts
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
