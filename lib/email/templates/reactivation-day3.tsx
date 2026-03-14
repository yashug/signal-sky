import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type ReactivationDay3EmailProps = {
  userName?: string
  watchlistSignals?: {
    symbol: string
    exchange: "NSE" | "US"
    heat: string
    distancePct: number
  }[]
  pricingUrl: string
  unsubscribeUrl: string
}

const HEAT_LABELS: Record<string, string> = {
  breakout: "🔴 Breakout",
  boiling: "🟠 Boiling",
  simmering: "🟡 Simmering",
  cooling: "🔵 Warming",
}

export default function ReactivationDay3Email({
  userName,
  watchlistSignals,
  pricingUrl,
  unsubscribeUrl,
}: ReactivationDay3EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Stocks you were watching have moved since your trial ended</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky · 3 days later</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              Stocks you were watching moved
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `${userName}, ` : ""}here&apos;s what happened to your watchlist since your trial ended.
            </Text>
          </Section>

          {watchlistSignals && watchlistSignals.length > 0 ? (
            <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Your watchlist — current status</Text>
              {watchlistSignals.map((s) => (
                <Section key={s.symbol} style={{ marginBottom: "8px", padding: "8px 12px", backgroundColor: "#0f172a", borderRadius: "6px" }}>
                  <Text style={{ color: "#f1f5f9", fontFamily: "monospace", fontSize: "13px", fontWeight: "600", margin: "0 0 2px" }}>
                    {s.symbol.replace(".NS", "")}
                  </Text>
                  <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>
                    {HEAT_LABELS[s.heat] ?? s.heat} · {s.distancePct.toFixed(1)}% from ATH
                  </Text>
                </Section>
              ))}
            </Section>
          ) : (
            <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <Text style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>
                The scanner is still running. New Reset &amp; Reclaim signals are firing every day — subscribe to see what&apos;s active.
              </Text>
            </Section>
          )}

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
            <Text style={{ color: "#93c5fd", fontSize: "13px", fontWeight: "600", margin: "0 0 4px" }}>Your data is still saved</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>Watchlist, journal, and open positions — all waiting for you. Reactivate from ₹299/month.</Text>
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
