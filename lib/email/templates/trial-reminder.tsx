import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type TrialReminderEmailProps = {
  userName?: string
  daysLeft: number
  pricingUrl: string
  unsubscribeUrl: string
}

export default function TrialReminderEmail({
  userName,
  daysLeft,
  pricingUrl,
  unsubscribeUrl,
}: TrialReminderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Your SignalSky trial ends in ${daysLeft} day${daysLeft !== 1 ? "s" : ""} — don't lose access`}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              Your trial ends in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `Hey ${userName}, ` : ""}don&apos;t miss out on the signals.
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>What you&apos;ll lose after trial</Text>
            {[
              "Reset & Reclaim signal scanner",
              "Nifty 50, 100, 200, Midcap + US markets",
              "Signal alerts (Telegram + Email)",
              "Unlimited backtests",
              "Trade journal with P&L tracking",
            ].map((f) => (
              <Text key={f} style={{ color: "#cbd5e1", fontSize: "12px", margin: "0 0 6px" }}>
                ✕ {f}
              </Text>
            ))}
          </Section>

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
            <Text style={{ color: "#93c5fd", fontSize: "13px", margin: "0 0 4px", fontWeight: "600" }}>Plans start at ₹299/month</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>Monthly · Yearly · Lifetime — cancel anytime</Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={pricingUrl}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
            >
              View Plans →
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
            YG IT Global Solutions · Hyderabad, Telangana 502300, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
