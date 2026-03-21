import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type TrialDay1EmailProps = {
  userName?: string
  topSignal?: {
    symbol: string
    exchange: "NSE" | "US"
    heat: "breakout" | "boiling" | "simmering" | "cooling"
    price: number
    distancePct: number
  }
  scannerUrl: string
  unsubscribeUrl: string
}

const HEAT_LABELS: Record<string, string> = {
  breakout: "🔴 Breakout",
  boiling: "🟠 Boiling",
  simmering: "🟡 Simmering",
  cooling: "🔵 Warming",
}

export default function TrialDay1Email({
  userName,
  topSignal,
  scannerUrl,
  unsubscribeUrl,
}: TrialDay1EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your first Reset & Reclaim signal to watch today</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky · Day 1</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              Here&apos;s your first signal to watch
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `Hey ${userName} — ` : ""}welcome to SignalSky. Here&apos;s a live Reset &amp; Reclaim setup to get you started.
            </Text>
          </Section>

          {topSignal && (
            <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Today&apos;s featured signal</Text>
              <Text style={{ color: "#f1f5f9", fontSize: "22px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 4px" }}>
                {topSignal.symbol.replace(".NS", "")}
              </Text>
              <Text style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 12px" }}>{topSignal.exchange === "NSE" ? "NSE · India" : "US Markets"}</Text>
              <Text style={{ color: "#64748b", fontSize: "12px", margin: "0 0 4px" }}>
                Heat: <span style={{ color: "#f1f5f9", fontWeight: "600" }}>{HEAT_LABELS[topSignal.heat] ?? topSignal.heat}</span>
              </Text>
              <Text style={{ color: "#64748b", fontSize: "12px", margin: "0 0 4px" }}>
                Price: <span style={{ color: "#f1f5f9", fontFamily: "monospace" }}>{topSignal.exchange === "NSE" ? "₹" : "$"}{topSignal.price.toLocaleString()}</span>
              </Text>
              <Text style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
                Distance from pre-set ATH: <span style={{ color: "#4ade80", fontFamily: "monospace" }}>{topSignal.distancePct.toFixed(1)}%</span>
              </Text>
            </Section>
          )}

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "16px 20px", marginBottom: "24px" }}>
            <Text style={{ color: "#93c5fd", fontSize: "12px", margin: "0 0 4px", fontWeight: "600" }}>What is Reset &amp; Reclaim?</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0, lineHeight: "1.6" }}>
              A stock hits an ATH → pulls back below EMA 220 (the &ldquo;reset&rdquo;) → reclaims above EMA 220 (the &ldquo;reclaim&rdquo;) → trades near its ATH. That&apos;s the setup.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={scannerUrl}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
            >
              Open Scanner →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            SignalSky — stock signal scanner for India &amp; US markets
          </Text>
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from marketing emails</a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
