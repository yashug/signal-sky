import React from "react";
import { THEME } from "../config/theme";

interface AppChromeProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  title?: string;
}

export const AppChrome: React.FC<AppChromeProps> = ({
  children,
  width = 1200,
  height = 700,
  title = "SignalSky — Signal Scanner",
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${THEME.border}`,
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 36,
          backgroundColor: "#111219",
          borderBottom: `1px solid ${THEME.border}`,
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 400,
            marginLeft: 16,
            height: 22,
            borderRadius: 4,
            backgroundColor: THEME.surface,
            border: `1px solid ${THEME.border}`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: THEME.muted,
            }}
          >
            signalsky.app/scanner
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 11,
            color: THEME.muted,
            fontFamily: "sans-serif",
          }}
        >
          {title}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, backgroundColor: THEME.background, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};
