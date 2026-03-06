import { ImageResponse } from "next/og"

export const alt = "SignalSky — Stock Signal Scanner for India & US Markets"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const signals = [
  { symbol: "RELIANCE", exchange: "NSE", pct: "+4.2%", heat: "BREAKOUT", color: "#10b981" },
  { symbol: "NVDA", exchange: "US", pct: "+3.8%", heat: "BOILING", color: "#f59e0b" },
  { symbol: "INFY", exchange: "NSE", pct: "+2.1%", heat: "RECLAIM", color: "#3b82f6" },
]

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#060b14",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Left glow */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Right glow */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: 200,
            width: 360,
            height: 360,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Vertical divider */}
        <div
          style={{
            position: "absolute",
            left: 660,
            top: 0,
            width: 1,
            height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.2) 30%, rgba(59,130,246,0.2) 70%, transparent)",
            display: "flex",
          }}
        />

        {/* ── LEFT PANEL ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 56px 56px 64px",
            width: 660,
            position: "relative",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 32 32">
                <path
                  d="M17.5 6L10 18h5.5l-1 8L22 14h-5.5l1-8z"
                  fill="#fff"
                  strokeWidth="0.5"
                  stroke="#fff"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
              SignalSky
            </span>
            <div
              style={{
                marginLeft: 8,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.3)",
                fontSize: 11,
                fontWeight: 700,
                color: "#10b981",
                letterSpacing: "0.08em",
              }}
            >
              LIVE
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Catch Breakouts</span>
            <span style={{ color: "#3b82f6" }}>Before the Move.</span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.55,
              marginBottom: 36,
              display: "flex",
            }}
          >
            Reset &amp; Reclaim scanner across Nifty 50, S&amp;P 100 &amp; NASDAQ 100 — with EMA200 signals, backtests &amp; trade journal.
          </div>

          {/* CTA Button */}
          <div style={{ display: "flex", marginBottom: 36 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                fontSize: 18,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              <span>Start 7-Day Free Trial</span>
              <span style={{ fontSize: 20 }}>→</span>
            </div>
          </div>

          {/* Exchange pills */}
          <div style={{ display: "flex", gap: 8 }}>
            {["NSE", "S&P 100", "NASDAQ 100", "Nifty 50"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "5px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 48px",
            gap: 16,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
              marginBottom: 8,
              display: "flex",
            }}
          >
            LIVE SIGNALS
          </div>

          {signals.map((s) => (
            <div
              key={s.symbol}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    {s.symbol}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.3)",
                      padding: "2px 7px",
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.1)",
                      letterSpacing: "0.06em",
                      display: "flex",
                    }}
                  >
                    {s.exchange}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.02em" }}>
                  EMA200 Reset &amp; Reclaim
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: s.color,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.pct}
                </span>
                <div
                  style={{
                    padding: "5px 12px",
                    borderRadius: 8,
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}40`,
                    fontSize: 11,
                    fontWeight: 700,
                    color: s.color,
                    letterSpacing: "0.07em",
                    display: "flex",
                  }}
                >
                  {s.heat}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom URL */}
          <div
            style={{
              marginTop: 16,
              fontSize: 13,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.06em",
              display: "flex",
            }}
          >
            signalsky.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
