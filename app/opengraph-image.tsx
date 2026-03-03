import { ImageResponse } from "next/og"

export const alt = "SignalSky — Market Signal Scanner for India & US"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a12 0%, #111128 50%, #0a0a12 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            width: 500,
            height: 500,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Icon + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.5 6L10 18h5.5l-1 8L22 14h-5.5l1-8z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            SignalSky
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: 0,
          }}
        >
          Breakout signal scanner for India &amp; US markets.
          <br />
          Find Reset &amp; Reclaim setups before the move.
        </p>

        {/* Pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 36,
          }}
        >
          {["NSE", "S&P 100", "NASDAQ 100", "Nifty 50"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid rgba(37,99,235,0.3)",
                background: "rgba(37,99,235,0.08)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <p
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 16,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          signalsky.app
        </p>
      </div>
    ),
    { ...size }
  )
}
