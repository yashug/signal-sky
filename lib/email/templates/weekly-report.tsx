import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview, Row, Column,
} from "@react-email/components"

type WeeklySignal = {
  symbol: string
  exchange: "NSE" | "US"
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  distancePct: number
  url: string
}

type WeeklyReportEmailProps = {
  userName?: string
  newSignalsCount: number
  totalSignalsCount: number
  topSignals: WeeklySignal[]
  strategyWinRate?: number
  strategyAvgReturn?: number
  weekOf: string
  unsubscribeUrl: string
}

const HEAT_LABEL: Record<string, string> = {
  breakout: "🚀 Breakout",
  boiling: "🔥 Boiling",
  simmering: "🌡️ Simmering",
  cooling: "❄️ Warming",
}

const HEAT_COLOR: Record<string, string> = {
  breakout: "#22c55e",
  boiling: "#f97316",
  simmering: "#eab308",
  cooling: "#64748b",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"

export default function WeeklyReportEmail({
  userName,
  newSignalsCount,
  totalSignalsCount,
  topSignals,
  strategyWinRate,
  strategyAvgReturn,
  weekOf,
  unsubscribeUrl,
}: WeeklyReportEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Week in Review — ${newSignalsCount} new signals, ${totalSignalsCount} total active`}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 16px" }}>
          {/* Header */}
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>
              SignalSky · Weekly Report
            </Text>
            <Text style={{ color: "#f1f5f9", fontSize: "22px", fontWeight: "700", margin: "0 0 4px" }}>
              Week in Review
            </Text>
            <Text style={{ color: "#64748b", fontSize: "12px", margin: "0 0 8px" }}>
              {weekOf}{userName ? ` · Hi ${userName}` : ""}
            </Text>
          </Section>

          {/* Summary stats */}
          <Section style={{ backgroundColor: "#1e293b", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
            <Row>
              <Column style={{ width: "50%", textAlign: "center" }}>
                <Text style={{ color: "#3b82f6", fontSize: "28px", fontWeight: "800", fontFamily: "monospace", margin: "0 0 2px" }}>
                  {newSignalsCount}
                </Text>
                <Text style={{ color: "#94a3b8", fontSize: "11px", margin: 0 }}>New signals this week</Text>
              </Column>
              <Column style={{ width: "50%", textAlign: "center" }}>
                <Text style={{ color: "#f1f5f9", fontSize: "28px", fontWeight: "800", fontFamily: "monospace", margin: "0 0 2px" }}>
                  {totalSignalsCount}
                </Text>
                <Text style={{ color: "#94a3b8", fontSize: "11px", margin: 0 }}>Total active signals</Text>
              </Column>
            </Row>
          </Section>

          {/* Strategy stats */}
          {(strategyWinRate != null || strategyAvgReturn != null) && (
            <Section style={{ backgroundColor: "#0f2846", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px", border: "1px solid #1d4ed830" }}>
              <Text style={{ color: "#3b82f6", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600", margin: "0 0 8px" }}>
                Strategy Track Record
              </Text>
              <Row>
                {strategyWinRate != null && (
                  <Column style={{ width: "50%" }}>
                    <Text style={{ color: strategyWinRate >= 55 ? "#22c55e" : "#f1f5f9", fontSize: "20px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 2px" }}>
                      {strategyWinRate.toFixed(1)}%
                    </Text>
                    <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>Historical win rate</Text>
                  </Column>
                )}
                {strategyAvgReturn != null && (
                  <Column style={{ width: "50%" }}>
                    <Text style={{ color: strategyAvgReturn >= 0 ? "#22c55e" : "#f87171", fontSize: "20px", fontWeight: "700", fontFamily: "monospace", margin: "0 0 2px" }}>
                      {strategyAvgReturn >= 0 ? "+" : ""}{strategyAvgReturn.toFixed(1)}%
                    </Text>
                    <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>Avg return per trade</Text>
                  </Column>
                )}
              </Row>
            </Section>
          )}

          {/* Top signals */}
          {topSignals.length > 0 && (
            <Section>
              <Text style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: "600", margin: "0 0 10px" }}>
                Top Signals Right Now
              </Text>
              {topSignals.map((sig, i) => {
                const currency = sig.exchange === "NSE" ? "₹" : "$"
                const heatColor = HEAT_COLOR[sig.heat] ?? "#64748b"
                const distLabel = sig.distancePct <= 0
                  ? `${Math.abs(sig.distancePct).toFixed(1)}% above ATH`
                  : `${sig.distancePct.toFixed(1)}% from ATH`

                return (
                  <Section
                    key={i}
                    style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "12px 16px", marginBottom: "6px" }}
                  >
                    <Row>
                      <Column style={{ width: "55%" }}>
                        <Text style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: "600", margin: "0 0 2px" }}>
                          {sig.symbol.replace(".NS", "")}
                        </Text>
                        <Text style={{ color: "#64748b", fontSize: "10px", margin: 0 }}>
                          {sig.exchange} · {currency}{sig.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </Text>
                      </Column>
                      <Column style={{ width: "45%", textAlign: "right" }}>
                        <Text style={{ color: heatColor, fontSize: "11px", fontWeight: "600", margin: "0 0 2px" }}>
                          {HEAT_LABEL[sig.heat]}
                        </Text>
                        <Text style={{ color: heatColor, fontSize: "11px", fontFamily: "monospace", margin: 0 }}>
                          {distLabel}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                )
              })}
            </Section>
          )}

          {/* CTA */}
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={`${APP_URL}/scanner`}
              style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "10px 28px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none", marginBottom: "8px" }}
            >
              Open Scanner →
            </Button>
            <Text style={{ color: "#475569", fontSize: "11px", margin: "8px 0 0" }}>
              <a href={`${APP_URL}/performance`} style={{ color: "#3b82f6" }}>
                View full strategy performance →
              </a>
            </Text>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            You&apos;re receiving this weekly report from SignalSky.
          </Text>
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from digest</a>
            {" · "}
            <a href={unsubscribeUrl.replace("type=digest", "type=all")} style={{ color: "#475569" }}>Unsubscribe from all</a>
          </Text>
          <Text style={{ color: "#334155", fontSize: "10px", textAlign: "center", margin: 0 }}>
            YG IT Global Solutions · Hyderabad, Telangana 502300, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
