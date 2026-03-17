import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../config/theme";

const TICKERS = [
  "RELIANCE", "TCS", "NVDA", "AAPL", "HDFC", "INFY", "MSFT", "GOOGL",
  "WIPRO", "META", "AMZN", "TSLA", "BAJFINANCE", "ICICIBANK", "SBIN",
  "HCLTECH", "ASIANPAINT", "MARUTI", "TITAN", "ADANIPORTS",
];

interface FloatingTickerProps {
  count?: number;
  opacity?: number;
}

export const FloatingTicker: React.FC<FloatingTickerProps> = ({
  count = 12,
  opacity = 0.06,
}) => {
  const frame = useCurrentFrame();

  const items = Array.from({ length: count }, (_, i) => {
    const ticker = TICKERS[i % TICKERS.length];
    const seedX = (i * 137.5) % 100; // golden ratio distribution
    const seedY = (i * 251.3) % 100;
    const speed = 0.3 + (i % 4) * 0.15;
    const y = ((seedY + frame * speed) % 120) - 10;

    return { ticker, x: seedX, y, size: 12 + (i % 3) * 3 };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontFamily: "monospace",
            fontSize: item.size,
            color: THEME.foreground,
            opacity,
            whiteSpace: "nowrap",
          }}
        >
          {item.ticker}
        </div>
      ))}
    </div>
  );
};
