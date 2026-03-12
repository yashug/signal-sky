import * as React from "react"
import {
  Html, Head, Body, Container, Section, Text, Hr, Preview,
} from "@react-email/components"

type InvoiceEmailProps = {
  userName?: string
  userEmail: string
  planName: string
  amount: number
  currency: "INR"
  transactionId: string
  date: string
}

export default function InvoiceEmail({
  userName,
  userEmail,
  planName,
  amount,
  currency,
  transactionId,
  date,
}: InvoiceEmailProps) {
  const currencySymbol = currency === "INR" ? "₹" : "$"
  const formattedAmount = `${currencySymbol}${amount.toLocaleString("en-IN")}`

  return (
    <Html>
      <Head />
      <Preview>Payment receipt for {planName} — {formattedAmount}</Preview>
      <Body style={{ backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 16px" }}>
          <Section>
            <Text style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>SignalSky</Text>
            <Text style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>Payment Receipt</Text>
            <Text style={{ color: "#64748b", fontSize: "12px", margin: "0 0 24px" }}>Thank you for subscribing{userName ? `, ${userName}` : ""}!</Text>
          </Section>

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px", paddingBottom: "10px" }}>Plan</td>
                  <td style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: "600", textAlign: "right", paddingBottom: "10px" }}>{planName}</td>
                </tr>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px", paddingBottom: "10px" }}>Amount Paid</td>
                  <td style={{ color: "#22c55e", fontSize: "16px", fontWeight: "700", fontFamily: "monospace", textAlign: "right", paddingBottom: "10px" }}>{formattedAmount}</td>
                </tr>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px", paddingBottom: "10px" }}>Date</td>
                  <td style={{ color: "#f1f5f9", fontSize: "13px", fontFamily: "monospace", textAlign: "right", paddingBottom: "10px" }}>{date}</td>
                </tr>
                <tr>
                  <td style={{ color: "#94a3b8", fontSize: "11px" }}>Transaction ID</td>
                  <td style={{ color: "#64748b", fontSize: "11px", fontFamily: "monospace", textAlign: "right" }}>{transactionId}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={{ borderColor: "#1e293b", margin: "0 0 16px" }} />

          <Section style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
            <Text style={{ color: "#94a3b8", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>Business Details</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: "0 0 2px" }}>YG IT Global Solutions (Sole Proprietorship)</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: "0 0 2px" }}>GSTIN: 36BKTPG1266J1ZS</Text>
            <Text style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>support@signalsky.app</Text>
          </Section>

          <Text style={{ color: "#475569", fontSize: "10px", textAlign: "center", margin: 0 }}>
            Questions? Reply to this email or contact support@signalsky.app
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
