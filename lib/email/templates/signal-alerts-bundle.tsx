/**
 * Bundled signal alerts email — all new signals from a single scan in one email.
 * Replaces sending one email per signal.
 */
import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview, Row, Column,
} from "@react-email/components"

type BundleSignal = {
  symbol: string
  exchange: "NSE" | "US"
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  price: number
  ath: number
  ema200: number
  ema220: number
  distancePct: number
  signalUrl: string
}

type Props = {
  userName?: string
  signals: BundleSignal[]
  market: "india" | "us"
  date: string
  unsubscribeUrl: string
}

const HEAT_EMOJI: Record<string, string> = {
  breakout: "🚀",
  boiling:  "🔥",
  simmering:"🌡️",
  cooling:  "❄️",
}
const HEAT_LABEL: Record<string, string> = {
  breakout: "Breakout",
  boiling:  "Boiling",
  simmering:"Simmering",
  cooling:  "Cooling",
}
const HEAT_COLOR: Record<string, string> = {
  breakout: "#22c55e",
  boiling:  "#f97316",
  simmering:"#eab308",
  cooling:  "#64748b",
}

const APP_URL = "https://signalsky.app"

export default function SignalAlertsBundleEmail({ userName, signals, market, date, unsubscribeUrl }: Props) {
  const marketLabel = market === "india" ? "India (NSE)" : "US Markets"
  const count = signals.length
  const subject = `${count} new signal${count !== 1 ? "s" : ""} — ${marketLabel} · ${date}`

  return (
    <Html>
      <Head />
      <Preview>{`${subject}`}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, -apple-system, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 16px" }}>

          {/* Header */}
          <Section style={{ marginBottom: "24px" }}>
            <Text style={{ color: "#94a3b8", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>
              SignalSky · {marketLabel}
            </Text>
            <Text style={{ color: "#f8fafc", fontSize: "22px", fontWeight: "800", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
              {count} New Signal{count !== 1 ? "s" : ""}
            </Text>
            <Text style={{ color: "#475569", fontSize: "12px", margin: 0 }}>
              {userName ? `Hey ${userName} — ` : ""}{date}
            </Text>
          </Section>

          {/* Signal cards */}
          {signals.map((sig, i) => {
            const currency = sig.exchange === "NSE" ? "₹" : "$"
            const heatColor = HEAT_COLOR[sig.heat] ?? "#64748b"
            const distLabel = sig.distancePct <= 0
              ? `${Math.abs(sig.distancePct).toFixed(1)}% above ATH`
              : `${sig.distancePct.toFixed(1)}% below ATH`

            return (
              <Section
                key={i}
                style={{
                  backgroundColor: "#111827",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  border: `1px solid ${heatColor}30`,
                  overflow: "hidden",
                }}
              >
                {/* Card header strip */}
                <div style={{ height: "3px", background: `linear-gradient(90deg, ${heatColor} 0%, ${heatColor}40 100%)` }} />

                <div style={{ padding: "14px 18px" }}>
                  <Row>
                    <Column style={{ width: "55%" }}>
                      {/* Symbol + exchange */}
                      <Text style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: "800", margin: "0 0 2px", letterSpacing: "-0.02em", fontFamily: "monospace" }}>
                        {sig.symbol.replace(".NS", "")}
                      </Text>
                      <Text style={{ color: "#475569", fontSize: "10px", margin: 0, letterSpacing: "0.04em" }}>
                        {sig.exchange === "NSE" ? "NSE · India" : "NASDAQ · US"}
                      </Text>
                    </Column>
                    <Column style={{ width: "45%", textAlign: "right" }}>
                      {/* Heat badge */}
                      <Text style={{
                        color: heatColor,
                        fontSize: "11px",
                        fontWeight: "700",
                        margin: "0 0 2px",
                        backgroundColor: `${heatColor}15`,
                        padding: "3px 10px",
                        borderRadius: "20px",
                        display: "inline-block",
                        letterSpacing: "0.03em",
                      }}>
                        {HEAT_EMOJI[sig.heat]} {HEAT_LABEL[sig.heat]}
                      </Text>
                      <Text style={{ color: heatColor, fontSize: "11px", fontFamily: "monospace", margin: "2px 0 0", fontWeight: "600" }}>
                        {distLabel}
                      </Text>
                    </Column>
                  </Row>

                  {/* Stats row */}
                  <div style={{ height: "1px", background: "rgba(51,65,85,0.5)", margin: "12px 0" }} />
                  <Row>
                    <Column style={{ width: "33%" }}>
                      <Text style={{ color: "#64748b", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>Price</Text>
                      <Text style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "700", fontFamily: "monospace", margin: 0 }}>
                        {currency}{sig.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </Text>
                    </Column>
                    <Column style={{ width: "33%" }}>
                      <Text style={{ color: "#64748b", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>Pre-set ATH</Text>
                      <Text style={{ color: "#94a3b8", fontSize: "13px", fontFamily: "monospace", margin: 0 }}>
                        {currency}{sig.ath.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </Text>
                    </Column>
                    <Column style={{ width: "34%", textAlign: "right" }}>
                      <Text style={{ color: "#64748b", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>EMA220</Text>
                      <Text style={{ color: "#94a3b8", fontSize: "13px", fontFamily: "monospace", margin: 0 }}>
                        {currency}{sig.ema220.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </Text>
                    </Column>
                  </Row>

                  {/* View link */}
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <a
                      href={sig.signalUrl}
                      style={{
                        color: "#60a5fa",
                        fontSize: "11px",
                        fontWeight: "600",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                      }}
                    >
                      View signal →
                    </a>
                  </div>
                </div>
              </Section>
            )
          })}

          {/* CTA */}
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={`${APP_URL}/scanner`}
              style={{
                backgroundColor: "#1d4ed8",
                color: "#ffffff",
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Open Scanner →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            You&apos;re receiving this because you have signal alerts enabled on SignalSky.
          </Text>
          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" }}>
            <a href={unsubscribeUrl} style={{ color: "#475569" }}>Unsubscribe from alerts</a>
            {" · "}
            <a href={`${unsubscribeUrl.split("&type")[0]}&type=all`} style={{ color: "#475569" }}>Unsubscribe from all</a>
          </Text>
          <Text style={{ color: "#1e293b", fontSize: "10px", textAlign: "center", margin: 0 }}>
            YG IT Global Solutions · Hyderabad, Telangana 502300, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
