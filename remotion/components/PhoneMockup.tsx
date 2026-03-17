import React from "react";
import { THEME } from "../config/theme";

interface PhoneMockupProps {
  children?: React.ReactNode;
  rotateY?: number;
  translateX?: number;
  height?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  rotateY = 0,
  translateX = 0,
  height = 560,
}) => {
  const width = height * 0.46;

  return (
    <div
      style={{
        width,
        height,
        transform: `perspective(800px) rotateY(${rotateY}deg) translateX(${translateX}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* Outer bezel */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a2e",
          borderRadius: height * 0.085,
          border: `2px solid ${THEME.border}`,
          boxShadow: "0 24px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Notch / Dynamic Island */}
        <div
          style={{
            width: 80,
            height: 24,
            backgroundColor: "#0a0a0f",
            borderRadius: 12,
            zIndex: 10,
            flexShrink: 0,
          }}
        />

        {/* Screen content */}
        <div
          style={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
            borderRadius: height * 0.04,
            backgroundColor: THEME.background,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: THEME.border,
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};
