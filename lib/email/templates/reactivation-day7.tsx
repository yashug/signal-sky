import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type ReactivationDay7EmailProps = {
  userName?: string
  pricingUrl: string
  unsubscribeUrl: string
}

export default function ReactivationDay7Email({
  userName,
  pricingUrl,
  unsubscribeUrl,
}: ReactivationDay7EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Still thinking? One more thing before we stop following up</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky · Final note</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              Still thinking about it?
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `${userName}, ` : ""}this is the last email we&apos;ll send. We don&apos;t believe in pestering — but we do believe in this strategy.
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>What you get for ₹299/month</Text>
            {[
              "Reset & Reclaim signals across 1,000+ NSE + US stocks",
              "Telegram & email alerts the moment a signal fires",
              "20-year backtest data for every signal",
              "Trade journal with India + US P&L tracking",
              "7-day money-back guarantee — no questions",
            ].map((f) => (
              <Text key={f} style={{ color: "#cbd5e1", fontSize: "12px", margin: "0 0 6px" }}>
                ✓ {f}
              </Text>
            ))}
          </Section>

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
            <Text style={{ color: "#4ade80", fontSize: "12px", fontWeight: "600", margin: "0 0 4px" }}>7-day money-back guarantee</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>
              Subscribe, try it for a week. If you&apos;re not finding value, email support@signalsky.app and we&apos;ll refund you in full.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={pricingUrl}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
            >
              Subscribe Now →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            SignalSky — YG IT Global Solutions · Hyderabad, India
          </Text>
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            This is our last email about your trial. <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from all emails</a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
