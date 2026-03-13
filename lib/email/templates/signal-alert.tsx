import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type SignalAlertProps = {
  userName?: string
  symbol: string
  exchange: "NSE" | "US"
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  ath: number
  ema200: number
  distancePct: number
  signalUrl: string
  unsubscribeUrl: string
}

const HEAT_LABEL: Record<string, string> = {
  breakout: "🚀 Breakout",
  boiling: "🔥 Boiling",
  simmering: "🌡️ Simmering",
  cooling: "❄️ Cooling",
}

const HEAT_COLOR: Record<string, string> = {
  breakout: "#22c55e",
  boiling: "#f97316",
  simmering: "#eab308",
  cooling: "#64748b",
}

export default function SignalAlertEmail({
  userName,
  symbol,
  exchange,
  heat,
  price,
  ath,
  ema200,
  distancePct,
  signalUrl,
  unsubscribeUrl,
}: SignalAlertProps) {
  const currency = exchange === "NSE" ? "₹" : "$"
  const heatLabel = HEAT_LABEL[heat] ?? heat
  const heatColor = HEAT_COLOR[heat] ?? "#64748b"
  const distLabel = distancePct <= 0
    ? `${Math.abs(distancePct).toFixed(1)}% above ATH`
    : `${distancePct.toFixed(1)}% below ATH`

  return (
    <Html>
      <Head />
      <Preview>New signal: {symbol} ({exchange}) — {heatLabel}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          {/* Header */}
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
              SignalSky Alert
            </Text>
            <Text style={{ color: "#f1f5f9", fontSize: "22px", fontWeight: "700", margin: "0 0 4px" }}>
              {symbol}
            </Text>
            <Text style={{ color: "#64748b", fontSize: "12px", margin: "0 0 20px" }}>
              {exchange === "NSE" ? "National Stock Exchange" : "US Markets"}
            </Text>
          </Section>

          {/* Heat badge */}
          <Section style={{ marginBottom: "20px" }}>
            <span style={{
              backgroundColor: `${heatColor}20`,
              color: heatColor,
              border: `1px solid ${heatColor}40`,
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "12px",
              fontWeight: "600",
            }}>
              {heatLabel}
            </span>
          </Section>

          {/* Stats */}
          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px", paddingBottom: "8px" }}>Price</td>
                  <td style={{ color: "#f1f5f9", fontSize: "13px", fontFamily: "monospace", fontWeight: "600", textAlign: "right", paddingBottom: "8px" }}>{currency}{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px", paddingBottom: "8px" }}>Pre-set ATH</td>
                  <td style={{ color: "#f1f5f9", fontSize: "13px", fontFamily: "monospace", textAlign: "right", paddingBottom: "8px" }}>{currency}{ath.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px", paddingBottom: "8px" }}>EMA200</td>
                  <td style={{ color: "#f1f5f9", fontSize: "13px", fontFamily: "monospace", textAlign: "right", paddingBottom: "8px" }}>{currency}{ema200.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px" }}>Distance from ATH</td>
                  <td style={{ color: heatColor, fontSize: "13px", fontFamily: "monospace", fontWeight: "600", textAlign: "right" }}>{distLabel}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={signalUrl}
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                padding: "10px 24px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Signal →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />

          {/* Footer */}
          <Section>
            <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
              You&apos;re receiving this because you have signal alerts enabled on SignalSky.
            </Text>
            <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
              <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from signal alerts</a>
              {" · "}
              <a href={`${unsubscribeUrl}&type=all`} style={{ color: "#475569" }}>Unsubscribe from all</a>
            </Text>
            <Text style={{ color: "#334155", fontSize: "10px", textAlign: "center", margin: 0 }}>
              YG IT Global Solutions · Hyderabad, Telangana 502300, India
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
