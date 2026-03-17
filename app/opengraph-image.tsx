import { ImageResponse } from "next/og"

export const alt = "SignalSky — Stock Signal Scanner for India & US Markets"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Dark trading terminal theme — matches actual app dark mode colors
const c = {
  bg: "#181921",
  card: "#1d1e29",
  surface: "#1a1b24",
  primary: "#4fa0e2",
  bull: "#23c475",
  boiling: "#e05c22",
  simmering: "#d4a32a",
  cooling: "#6487d4",
  breakout: "#23c475",
  border: "#2d2f40",
  borderLight: "rgba(255,255,255,0.06)",
  mutedFg: "#767a96",
  fg: "#e5e7ee",
  fgDim: "rgba(229,231,238,0.45)",
  primaryBg: "rgba(79,160,226,0.10)",
  primaryBorder: "rgba(79,160,226,0.20)",
}

const rows = [
  { symbol: "INDUSTOWER", name: "Indus Towers Ltd", mkt: "NSE", price: "₹437", peak: "₹426", dist: "+2.5%", heat: "breakout" as const, bar: 100 },
  { symbol: "LT", name: "Larsen & Toubro", mkt: "NSE", price: "₹3,648", peak: "₹3,666", dist: "0.5%", heat: "boiling" as const, bar: 96 },
  { symbol: "POLYCAB", name: "Polycab India", mkt: "NSE", price: "₹5,780", peak: "₹6,015", dist: "3.9%", heat: "simmering" as const, bar: 74 },
  { symbol: "NVDA", name: "NVIDIA Corp", mkt: "US", price: "$875", peak: "$920", dist: "4.9%", heat: "cooling" as const, bar: 67 },
]

const heatColor = (h: string) =>
  h === "breakout" ? c.breakout : h === "boiling" ? c.boiling : h === "simmering" ? c.simmering : c.cooling

const heatLabel = (h: string) =>
  h === "breakout" ? "Breakout" : h === "boiling" ? "Boiling" : h === "simmering" ? "Simmering" : "Warming"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: c.bg,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${c.border}55 1px, transparent 1px), linear-gradient(90deg, ${c.border}55 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: 0.35,
            display: "flex",
          }}
        />

        {/* Top-center blue glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(79,160,226,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Bottom-right green glow */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: 120,
            width: 320,
            height: 320,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(35,196,117,0.08) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* ── LEFT PANEL ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "52px 48px 52px 60px",
            width: 520,
            position: "relative",
            gap: 0,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: c.primaryBg,
                border: `1px solid ${c.primaryBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* ZapIcon approximation */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
                  fill={c.primary}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: c.fg, letterSpacing: "-0.025em" }}>
              SignalSky
            </span>
            {/* Live badge */}
            <div
              style={{
                marginLeft: 6,
                padding: "3px 9px",
                borderRadius: 999,
                background: "rgba(35,196,117,0.12)",
                border: "1px solid rgba(35,196,117,0.25)",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 99,
                  background: c.bull,
                  display: "flex",
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 700, color: c.bull, letterSpacing: "0.1em" }}>
                LIVE
              </span>
            </div>
          </div>

          {/* Live scanning badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 999,
              border: `1px solid ${c.primaryBorder}`,
              background: c.primaryBg,
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, letterSpacing: "0.12em" }}>
              LIVE MARKET SCANNING
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.07,
              letterSpacing: "-0.035em",
              marginBottom: 18,
              color: c.fg,
            }}
          >
            <span>Catch breakouts</span>
            <span
              style={{
                background: `linear-gradient(90deg, ${c.primary}, ${c.bull})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              before they run
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 15,
              color: c.fgDim,
              lineHeight: 1.6,
              marginBottom: 32,
              display: "flex",
            }}
          >
            Reset &amp; Reclaim scanner for India &amp; US markets. EMA200 signals, Telegram alerts, backtests &amp; trade journal.
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { value: "2", label: "Markets" },
              { value: "1,000+", label: "Signals/day" },
              { value: "20Y", label: "Backtest data" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: c.fg, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                  <span style={{ color: c.primary }}>{s.value}</span>
                </span>
                <span style={{ fontSize: 10, fontWeight: 600, color: c.mutedFg, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            position: "absolute",
            left: 520,
            top: 0,
            width: 1,
            height: "100%",
            background: `linear-gradient(to bottom, transparent, ${c.border} 25%, ${c.border} 75%, transparent)`,
            display: "flex",
          }}
        />

        {/* ── RIGHT PANEL — Scanner UI ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "40px 40px 40px 44px",
            position: "relative",
          }}
        >
          {/* Terminal window */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 14,
              border: `1px solid ${c.border}`,
              background: c.card,
              overflow: "hidden",
              flex: 1,
            }}
          >
            {/* Terminal chrome */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 16px",
                borderBottom: `1px solid ${c.border}`,
                background: c.surface,
              }}
            >
              <div style={{ display: "flex", gap: 5 }}>
                <div style={{ width: 9, height: 9, borderRadius: 99, background: "#e85555", display: "flex" }} />
                <div style={{ width: 9, height: 9, borderRadius: 99, background: "#d4a320", display: "flex" }} />
                <div style={{ width: 9, height: 9, borderRadius: 99, background: "#23c475", display: "flex" }} />
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <span style={{ fontSize: 10, color: c.mutedFg, letterSpacing: "0.06em", fontFamily: "monospace" }}>
                  signalsky.app/scanner
                </span>
              </div>
            </div>

            {/* Scanner header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderBottom: `1px solid ${c.borderLight}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Crosshair icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.primary} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.fg }}>Signal Scanner</span>
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: c.mutedFg,
                    background: c.surface,
                    padding: "1px 7px",
                    borderRadius: 5,
                    display: "flex",
                  }}
                >
                  23 signals
                </span>
              </div>
              <span style={{ fontSize: 9, color: c.mutedFg }}>All Markets</span>
            </div>

            {/* Heat filter tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "7px 14px",
                borderBottom: `1px solid ${c.borderLight}`,
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <span style={{ padding: "3px 10px", borderRadius: 6, background: c.primaryBg, color: c.primary, fontSize: 10, fontWeight: 600, display: "flex" }}>All</span>
              {[
                { label: "Breakout", color: c.breakout },
                { label: "Boiling", color: c.boiling },
                { label: "Simmering", color: c.simmering },
                { label: "Warming", color: c.cooling },
              ].map((t) => (
                <span key={t.label} style={{ padding: "3px 10px", borderRadius: 6, color: c.mutedFg, fontSize: 10, fontWeight: 500, display: "flex" }}>
                  {t.label}
                </span>
              ))}
            </div>

            {/* Table header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px 6px 18px",
                borderBottom: `1px solid ${c.borderLight}`,
              }}
            >
              {[
                { label: "Symbol", w: 160 },
                { label: "Mkt", w: 50 },
                { label: "Status", w: 90 },
                { label: "Price", w: 85 },
                { label: "Prior Peak", w: 85 },
                { label: "Gap to Peak", w: 110 },
              ].map((col) => (
                <span
                  key={col.label}
                  style={{
                    width: col.w,
                    fontSize: 9,
                    fontWeight: 700,
                    color: c.mutedFg,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  {col.label}
                </span>
              ))}
            </div>

            {/* Table rows */}
            {rows.map((row, i) => {
              const color = heatColor(row.heat)
              const label = heatLabel(row.heat)
              return (
                <div
                  key={row.symbol}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "9px 14px 9px 14px",
                    borderBottom: i < rows.length - 1 ? `1px solid ${c.borderLight}` : "none",
                    borderLeft: `2px solid ${color}`,
                    opacity: i >= 3 ? 0.55 : 1,
                    background: i === 0 ? `${color}06` : "transparent",
                  }}
                >
                  {/* Symbol */}
                  <div style={{ width: 160, display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: c.fg, letterSpacing: "-0.01em", fontFamily: "monospace" }}>
                      {row.symbol}
                    </span>
                    <span style={{ fontSize: 9, color: c.mutedFg }}>{row.name}</span>
                  </div>

                  {/* Market */}
                  <div style={{ width: 50, display: "flex", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        color: row.mkt === "NSE" ? c.primary : c.mutedFg,
                        background: row.mkt === "NSE" ? c.primaryBg : c.surface,
                        padding: "2px 6px",
                        borderRadius: 4,
                        display: "flex",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {row.mkt}
                    </span>
                  </div>

                  {/* Heat status */}
                  <div style={{ width: 90, display: "flex", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        color: color,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        padding: "2px 7px",
                        borderRadius: 999,
                        display: "flex",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {label}
                    </span>
                  </div>

                  {/* Price */}
                  <span style={{ width: 85, fontSize: 12, fontWeight: 600, color: c.bull, fontFamily: "monospace", display: "flex", flexShrink: 0 }}>
                    {row.price}
                  </span>

                  {/* Prior Peak */}
                  <span style={{ width: 85, fontSize: 11, color: c.mutedFg, fontFamily: "monospace", display: "flex", flexShrink: 0 }}>
                    {row.peak}
                  </span>

                  {/* Gap to Peak */}
                  <div style={{ width: 110, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <div style={{ width: 48, height: 4, borderRadius: 99, background: c.surface, overflow: "hidden", display: "flex" }}>
                      <div style={{ width: `${row.bar}%`, height: "100%", borderRadius: 99, background: color, display: "flex" }} />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: row.heat === "breakout" ? c.bull : row.heat === "boiling" ? c.boiling : row.heat === "simmering" ? c.simmering : c.mutedFg,
                        fontFamily: "monospace",
                        display: "flex",
                      }}
                    >
                      {row.dist}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Fade overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 520,
                right: 0,
                height: 60,
                background: `linear-gradient(to top, ${c.card}, transparent)`,
                display: "flex",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Bottom URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <span style={{ fontSize: 11, color: "rgba(118,122,150,0.4)", letterSpacing: "0.06em" }}>
              signalsky.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
