import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface AnimatedBackgroundProps {
  baseColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  particleCount?: number;
  speed?: number;
}

// Golden ratio for evenly distributed seed positions
const PHI = 1.6180339887;

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  baseColor = "#181921",
  accentColor = "#4f9de0",
  secondaryColor = "#23c475",
  particleCount = 6,
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = (frame / fps) * speed;

  // Blob 1: primary accent color — slow orbit
  const b1x = 50 + Math.sin(t * 0.31) * 25;
  const b1y = 50 + Math.cos(t * 0.27) * 20;

  // Blob 2: secondary color — counter-orbit
  const b2x = 50 + Math.sin(t * 0.19 + 2.1) * 30;
  const b2y = 50 + Math.cos(t * 0.23 + 1.4) * 25;

  // Particles: deterministic positions via golden ratio
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const seed = i * PHI;
    const baseX = ((seed * 37.5) % 100);
    const baseY = ((seed * 61.8) % 100);
    const phase = seed * 2.4;
    const speed2 = 0.15 + (i % 3) * 0.08;
    return {
      x: baseX + Math.sin(t * speed2 + phase) * 4,
      y: baseY + Math.cos(t * speed2 * 0.7 + phase * 1.3) * 4,
      size: 3 + (i % 4) * 2,
      opacity: 0.12 + (i % 3) * 0.06,
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: baseColor,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Blob 1 */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 65%)`,
          left: `${b1x}%`,
          top: `${b1y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Blob 2 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${secondaryColor}12 0%, transparent 60%)`,
          left: `${b2x}%`,
          top: `${b2y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.6,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? accentColor : secondaryColor,
            opacity: p.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};
