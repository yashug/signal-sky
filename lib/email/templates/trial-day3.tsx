import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"

type TrialDay3EmailProps = {
  userName?: string
  winRate?: number
  avgReturn?: number
  symbolCount?: number
  performanceUrl: string
  unsubscribeUrl: string
}

export default function TrialDay3Email({
  userName,
  winRate,
  avgReturn,
  symbolCount,
  performanceUrl,
  unsubscribeUrl,
}: TrialDay3EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>The strategy that found a {winRate ? `${winRate.toFixed(0)}%` : "65%"} win rate across 200+ stocks</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky · Day 3</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>
              The strategy behind the numbers
            </Text>
            <Text style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              {userName ? `Hey ${userName} — ` : ""}here&apos;s the data behind every signal you see in the scanner.
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px" }}>Strategy track record</Text>
            <Section>
              <Section style={{ display: "inline-block", width: "30%", textAlign: "center", backgroundColor: "#0f172a", borderRadius: "6px", padding: "12px 8px", marginRight: "4px" }}>
                <Text style={{ color: "#3b82f6", fontSize: "20px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 2px" }}>{winRate ? `${winRate.toFixed(0)}%` : "65%"}</Text>
                <Text style={{ color: "#64748b", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>Avg win rate</Text>
              </Section>
              <Section style={{ display: "inline-block", width: "30%", textAlign: "center", backgroundColor: "#0f172a", borderRadius: "6px", padding: "12px 8px", marginRight: "4px" }}>
                <Text style={{ color: "#3b82f6", fontSize: "20px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 2px" }}>{avgReturn ? `+${avgReturn.toFixed(1)}%` : "+14%"}</Text>
                <Text style={{ color: "#64748b", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>Avg return</Text>
              </Section>
              <Section style={{ display: "inline-block", width: "30%", textAlign: "center", backgroundColor: "#0f172a", borderRadius: "6px", padding: "12px 8px" }}>
                <Text style={{ color: "#3b82f6", fontSize: "20px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 2px" }}>{symbolCount ? `${symbolCount}+` : "200+"}</Text>
                <Text style={{ color: "#64748b", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>Stocks tested</Text>
              </Section>
            </Section>
          </Section>

          <Section style={{ backgroundColor: "#172554", borderRadius: "8px", padding: "16px 20px", marginBottom: "24px" }}>
            <Text style={{ color: "#93c5fd", fontSize: "12px", fontWeight: "600", margin: "0 0 6px" }}>How is this backtested?</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: "0 0 4px", lineHeight: "1.6" }}>
              Every NSE and US stock is run through the Reset &amp; Reclaim strategy on 20 years of daily data. Entry: reclaim above EMA 220. Exit: close below EMA 220.
            </Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0, lineHeight: "1.6" }}>
              Win rate, average return, max drawdown, and profit factor are computed per symbol. You can see this for every signal on the scanner.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Button
              href={performanceUrl}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
            >
              View Strategy Performance →
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
