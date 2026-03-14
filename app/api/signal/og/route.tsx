import { ImageResponse } from "next/og"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const HEAT_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  breakout: { label: "Breakout", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  boiling:  { label: "Boiling",  color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  simmering:{ label: "Simmering",color: "#eab308", bg: "rgba(234,179,8,0.12)"  },
  cooling:  { label: "Warming",  color: "#94a3b8", bg: "rgba(148,163,184,0.12)"},
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const symbol = searchParams.get("symbol")

  if (!symbol) {
    return new Response("Missing symbol", { status: 400 })
  }

  const signal = await prisma.signal.findFirst({
    where: { symbol, isActive: true },
    orderBy: { signalDate: "desc" },
  })

  const name = signal
    ? ((await prisma.universeMember.findFirst({ where: { symbol }, select: { name: true } }))?.name ?? symbol.replace(".NS", ""))
    : symbol.replace(".NS", "")

  const ticker = symbol.replace(".NS", "")
  const exchange = signal?.exchange ?? (symbol.endsWith(".NS") ? "NSE" : "US")
  const currency = exchange === "NSE" ? "₹" : "$"
  const price = signal ? Number(signal.price) : 0
  const ath = signal ? Number(signal.ath) : 0
  const distancePct = signal ? Number(signal.distancePct) : 0
  const heat = (signal?.heat ?? "cooling") as string
  const heatCfg = HEAT_CONFIG[heat] ?? HEAT_CONFIG.cooling

  const distLabel = distancePct <= 0
    ? `${Math.abs(distancePct).toFixed(1)}% above prior peak`
    : `${distancePct.toFixed(1)}% from prior peak`

  const priceStr = price > 0
    ? `${currency}${price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : "—"

  const athStr = ath > 0
    ? `${currency}${ath.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : "—"

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "48px 56px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          display: "flex",
        }} />

        {/* Header — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(59,130,246,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 18, height: 18, background: "#3b82f6", borderRadius: 3, display: "flex" }} />
          </div>
          <span style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" }}>
            SIGNALSKY
          </span>
          <span style={{ color: "#334155", fontSize: 14, marginLeft: 4 }}>·</span>
          <span style={{ color: "#475569", fontSize: 13 }}>Reset &amp; Reclaim Signal</span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "16px" }}>
          {/* Symbol + name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
              <span style={{ color: "#f1f5f9", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "monospace" }}>
                {ticker}
              </span>
              <span style={{
                background: heatCfg.bg, color: heatCfg.color,
                border: `1px solid ${heatCfg.color}40`,
                borderRadius: 999, padding: "6px 16px",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex", alignItems: "center",
              }}>
                {heatCfg.label}
              </span>
            </div>
            <span style={{ color: "#64748b", fontSize: 20 }}>{name}</span>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", marginTop: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Price
              </span>
              <span style={{ color: "#f1f5f9", fontSize: 32, fontWeight: 700, fontFamily: "monospace" }}>
                {priceStr}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Prior Peak
              </span>
              <span style={{ color: "#94a3b8", fontSize: 32, fontWeight: 700, fontFamily: "monospace" }}>
                {athStr}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Gap to Peak
              </span>
              <span style={{ color: heatCfg.color, fontSize: 32, fontWeight: 700, fontFamily: "monospace" }}>
                {distLabel}
              </span>
            </div>
          </div>

          {/* Strategy badge */}
          <div style={{
            marginTop: "auto",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 8, padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ color: "#3b82f6", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {exchange}
              </span>
            </div>
            <span style={{ color: "#334155", fontSize: 13 }}>
              signalsky.app/scanner/{encodeURIComponent(symbol)}
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
