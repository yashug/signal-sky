import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type WelcomeEmailProps = {
  userName?: string
  trialDays: number
  scannerUrl: string
  unsubscribeUrl: string
}

export default function WelcomeEmail({
  userName,
  trialDays,
  scannerUrl,
  unsubscribeUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Welcome to SignalSky — your ${trialDays}-day trial has started`}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "22px", fontWeight: "700", margin: "0 0 4px" }}>
              Welcome{userName ? `, ${userName}` : ""}!
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              Your {trialDays}-day free trial has started. Here&apos;s what you can do.
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
            {[
              ["🎯", "Signal Scanner", "Reset & Reclaim breakout setups for Nifty + US stocks"],
              ["📊", "Backtests", "See how each signal has performed historically"],
              ["📓", "Trade Journal", "Track your entries, exits, and P&L"],
              ["🔔", "Alerts", "Get Telegram + email notifications for new signals"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ marginBottom: "12px" }}>
                <Text style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: "600", margin: "0 0 2px" }}>{icon} {title}</Text>
                <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>{desc}</Text>
              </div>
            ))}
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
            <a href={`${unsubscribeUrl}&type=all`} style={{ color: "#475569" }}>Unsubscribe from all emails</a>
          </Text>
          <Text style={{ color: "#334155", fontSize: "10px", textAlign: "center", margin: 0 }}>
            YG IT Global Solutions · Hyderabad, Telangana 500081, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
