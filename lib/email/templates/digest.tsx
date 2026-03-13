import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview, Row, Column,
} from "@react-email/components"

type DigestSignal = {
  symbol: string
  exchange: "NSE" | "US"
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  distancePct: number
  url: string
}

type DigestEmailProps = {
  userName?: string
  cadence: "daily" | "weekly"
  signals: DigestSignal[]
  date: string
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

export default function DigestEmail({
  userName,
  cadence,
  signals,
  date,
  unsubscribeUrl,
}: DigestEmailProps) {
  const title = cadence === "weekly" ? "Weekly Signal Digest" : "Daily Signal Digest"

  return (
    <Html>
      <Head />
      <Preview>{`${title} — ${signals.length} active signals on ${date}`}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>{title}</Text>
            <Text style={{ color: "#64748b", fontSize: "12px", margin: "0 0 24px" }}>{date} · {signals.length} signals</Text>
          </Section>

          {signals.length === 0 ? (
            <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "24px", textAlign: "center" }}>
              <Text style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>No signals matching your filters today.</Text>
            </Section>
          ) : (
            signals.map((sig, i) => {
              const currency = sig.exchange === "NSE" ? "₹" : "$"
              const heatColor = HEAT_COLOR[sig.heat] ?? "#64748b"
              const distLabel = sig.distancePct <= 0
                ? `${Math.abs(sig.distancePct).toFixed(1)}% above ATH`
                : `${sig.distancePct.toFixed(1)}% below ATH`

              return (
                <Section
                  key={i}
                  style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "12px 16px", marginBottom: "8px" }}
                >
                  <Row>
                    <Column style={{ width: "60%" }}>
                      <Text style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: "600", margin: "0 0 2px" }}>{sig.symbol}</Text>
                      <Text style={{ color: "#64748b", fontSize: "10px", margin: 0 }}>{sig.exchange} · {currency}{sig.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</Text>
                    </Column>
                    <Column style={{ width: "40%", textAlign: "right" }}>
                      <Text style={{ color: heatColor, fontSize: "11px", fontWeight: "600", margin: "0 0 2px" }}>{HEAT_LABEL[sig.heat]}</Text>
                      <Text style={{ color: heatColor, fontSize: "11px", fontFamily: "monospace", margin: 0 }}>{distLabel}</Text>
                    </Column>
                  </Row>
                </Section>
              )
            })
          )}

          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"}/scanner`}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "10px 24px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}
            >
              Open Scanner →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            You&apos;re receiving this {cadence} digest from SignalSky.
          </Text>
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from digest</a>
            {" · "}
            <a href={`${unsubscribeUrl}&type=all`} style={{ color: "#475569" }}>Unsubscribe from all</a>
          </Text>
          <Text style={{ color: "#334155", fontSize: "10px", textAlign: "center", margin: 0 }}>
            YG IT Global Solutions · Hyderabad, Telangana 502300, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
