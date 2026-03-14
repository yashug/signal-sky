import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type ReactivationDay0EmailProps = {
  userName?: string
  topSignal?: {
    symbol: string
    exchange: "NSE" | "US"
    heat: string
    price: number
    distancePct: number
  }
  pricingUrl: string
  unsubscribeUrl: string
}

export default function ReactivationDay0Email({
  userName,
  topSignal,
  pricingUrl,
  unsubscribeUrl,
}: ReactivationDay0EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your trial ended — here's what you missed today</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              Your trial ended today
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `${userName}, ` : ""}the scanner is still running — here&apos;s what you missed.
            </Text>
          </Section>

          {topSignal && (
            <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Today&apos;s top signal (subscribers only)</Text>
              <Text style={{ color: "#f1f5f9", fontSize: "22px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 4px" }}>
                {topSignal.symbol.replace(".NS", "")}
              </Text>
              <Text style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 8px" }}>{topSignal.exchange === "NSE" ? "NSE · India" : "US Markets"}</Text>
              <Text style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
                {topSignal.distancePct.toFixed(1)}% from pre-set ATH · Price: {topSignal.exchange === "NSE" ? "₹" : "$"}{topSignal.price.toLocaleString()}
              </Text>
            </Section>
          )}

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
            <Text style={{ color: "#93c5fd", fontSize: "13px", margin: "0 0 4px", fontWeight: "600" }}>Reactivate from ₹299/month</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: "0 0 8px" }}>Your watchlist and journal are still saved.</Text>
            <Text style={{ color: "#4ade80", fontSize: "11px", margin: 0 }}>✓ 7-day money-back guarantee on all plans</Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={pricingUrl}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
            >
              Reactivate Access →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            SignalSky — YG IT Global Solutions · Hyderabad, India
          </Text>
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from all emails</a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
