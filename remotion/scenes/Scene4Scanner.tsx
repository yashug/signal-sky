import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { THEME } from "../config/theme";
import { AppChrome } from "../components/AppChrome";
import { ScannerTable } from "../components/ScannerTable";
import { HeatBadge } from "../components/HeatBadge";

interface Scene4Props {
  isVertical?: boolean;
  skip30s?: boolean; // 30s variant: skip stagger reveal, jump to zoom
}

export const Scene4Scanner: React.FC<Scene4Props> = ({ isVertical = false, skip30s = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: App chrome appears (0-15 frames)
  const chromeScale = spring({ frame, fps, config: { stiffness: 120, damping: 18 } });

  // Phase B: Table rows stagger in (15 - fps*5 frames) — skipped for 30s
  // Phase C: Auto-zoom on Breakout row (Phase B end + 10 frames)
  const phaseC_start = skip30s ? 10 : fps * 5 + 10;

  const zoomProgress = interpolate(
    frame - phaseC_start,
    [0, fps * 1.5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const scale = interpolate(zoomProgress, [0, 1], [1, isVertical ? 1.8 : 2.2]);
  const translateX = interpolate(zoomProgress, [0, 1], [0, isVertical ? -60 : -180]);
  const translateY = interpolate(zoomProgress, [0, 1], [0, isVertical ? -100 : -60]);

  // Heat badge pulse after zoom
  const pulseFrame = frame - phaseC_start - fps * 1.5;
  const pulseScale = 1 + interpolate(pulseFrame % (fps * 0.8), [0, fps * 0.4, fps * 0.8], [0, 0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeVisible = pulseFrame > 0;

  const appWidth = isVertical ? 680 : 1100;
  const appHeight = isVertical ? 500 : 640;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header label */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? 40 : 30,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: isVertical ? 18 : 16,
          fontWeight: 600,
          color: THEME.muted,
          fontFamily: "sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          opacity: spring({ frame, fps, config: { stiffness: 200, damping: 28 } }),
        }}
      >
        Signal Scanner
      </div>

      {/* App chrome with zoom transform */}
      <div
        style={{
          transform: `scale(${chromeScale}) scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`,
          transformOrigin: "top left",
          opacity: chromeScale,
          marginTop: isVertical ? 60 : 20,
        }}
      >
        <AppChrome
          width={appWidth}
          height={appHeight}
          title="SignalSky — Signal Scanner"
        >
          {/* Sidebar strip */}
          <div style={{ display: "flex", height: "100%" }}>
            <div
              style={{
                width: 48,
                backgroundColor: "#111219",
                borderRight: `1px solid ${THEME.border}`,
                flexShrink: 0,
              }}
            />
            {/* Main content */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              {/* Top bar */}
              <div
                style={{
                  height: 44,
                  borderBottom: `1px solid ${THEME.border}`,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 16,
                  gap: 24,
                }}
              >
                {["All", "Breakout", "Boiling", "Simmering", "Warming"].map((tab, i) => (
                  <span
                    key={tab}
                    style={{
                      fontSize: 12,
                      color: i === 0 ? THEME.primary : THEME.muted,
                      borderBottom: i === 0 ? `2px solid ${THEME.primary}` : "none",
                      paddingBottom: 4,
                      fontFamily: "sans-serif",
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Scanner table */}
              <ScannerTable
                visibleRows={8}
                stagger={!skip30s}
                highlightRow={0}
              />
            </div>
          </div>
        </AppChrome>
      </div>

      {/* Heat badge callout after zoom */}
      {badgeVisible && (
        <div
          style={{
            position: "absolute",
            bottom: isVertical ? 60 : 40,
            right: isVertical ? 40 : 80,
            transform: `scale(${pulseScale})`,
          }}
        >
          <HeatBadge heat="breakout" size="lg" />
        </div>
      )}
    </div>
  );
};
