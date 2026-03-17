import React from "react";
import { THEME } from "../config/theme";

interface SignalSkyLogoProps {
  size?: number;
  color?: string;
  showWordmark?: boolean;
}

export const SignalSkyLogo: React.FC<SignalSkyLogoProps> = ({
  size = 48,
  color = THEME.primary,
  showWordmark = true,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.3 }}>
      {/* Zap icon SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: size * 0.75,
            fontWeight: 700,
            color: THEME.foreground,
            letterSpacing: "-0.03em",
          }}
        >
          Signal
          <span style={{ color }}> Sky</span>
        </span>
      )}
    </div>
  );
};
