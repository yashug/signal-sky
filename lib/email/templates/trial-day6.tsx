import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type TrialDay6EmailProps = {
  userName?: string
  watchlistCount: number
  journalCount: number
  openTrades: number
  pricingUrl: string
  unsubscribeUrl: string
}

export default function TrialDay6Email({
  userName,
  watchlistCount,
  journalCount,
  openTrades,
  pricingUrl,
  unsubscribeUrl,
}: TrialDay6EmailProps) {
  const hasData = watchlistCount > 0 || journalCount > 0 || openTrades > 0

  return (
    <Html>
      <Head />
      <Preview>Last day — your SignalSky progress disappears at midnight</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#f97316", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky · Last day</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              Your trial ends tomorrow
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `${userName}, ` : ""}subscribe today to keep your data and continue tracking signals.
            </Text>
          </Section>

          {hasData && (
            <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Your progress during trial</Text>
              {watchlistCount > 0 && (
                <Text style={{ color: "#cbd5e1", fontSize: "12px", margin: "0 0 6px" }}>
                  ⭐ {watchlistCount} stock{watchlistCount !== 1 ? "s" : ""} on your watchlist
                </Text>
              )}
              {journalCount > 0 && (
                <Text style={{ color: "#cbd5e1", fontSize: "12px", margin: "0 0 6px" }}>
                  📓 {journalCount} trade{journalCount !== 1 ? "s" : ""} logged in your journal
                </Text>
              )}
              {openTrades > 0 && (
                <Text style={{ color: "#fbbf24", fontSize: "12px", margin: "0 0 6px" }}>
                  📈 {openTrades} open position{openTrades !== 1 ? "s" : ""} still running
                </Text>
              )}
            </Section>
          )}

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
            <Text style={{ color: "#93c5fd", fontSize: "13px", margin: "0 0 4px", fontWeight: "600" }}>Subscribe now from ₹299/month</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>Monthly · Yearly (save 58%) · Lifetime — UPI, cards, net banking</Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={pricingUrl}
              style={{ backgroundColor: "#f97316", color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
            >
              Subscribe Now →
            </Button>
          </Section>

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "16px 20px", marginBottom: "20px" }}>
            <Text style={{ color: "#4ade80", fontSize: "11px", margin: "0 0 4px", fontWeight: "600" }}>7-day money-back guarantee</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>
              Not happy within 7 days? Email support@signalsky.app for a full refund, no questions asked.
            </Text>
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
