import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getResend } from "@/lib/email/resend"
import { render } from "@react-email/components"
import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Preview,
} from "@react-email/components"
import * as React from "react"
import { randomUUID } from "crypto"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"

/**
 * POST /api/admin/alerts/broadcast
 * Send a promotional/marketing email to all active/trial users.
 * Body: { subject, heading, body, ctaLabel, ctaUrl }
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { subject, heading, body: bodyText, ctaLabel, ctaUrl } = await req.json()
  if (!subject || !heading || !bodyText) {
    return NextResponse.json({ error: "subject, heading, and body are required" }, { status: 400 })
  }

  // Target: PRO users + users with active trial + emailMarketing = true
  const now = new Date()
  const users = await prisma.user.findMany({
    where: {
      email: { not: null },
      emailMarketing: true,
      OR: [
        { tier: { in: ["PRO", "INSTITUTIONAL"] } },
        { trialEndsAt: { gt: now } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      emailUnsubscribeToken: true,
    },
  })

  const resend = getResend()
  let sent = 0
  let errors = 0

  for (const user of users) {
    if (!user.email) continue

    let unsubToken = user.emailUnsubscribeToken
    if (!unsubToken) {
      unsubToken = randomUUID()
      await prisma.user.update({ where: { id: user.id }, data: { emailUnsubscribeToken: unsubToken } })
    }

    const unsubUrl = `${APP_URL}/api/email/unsubscribe?token=${unsubToken}&type=all`

    const html = await render(
      React.createElement(Html, null,
        React.createElement(Head, null),
        React.createElement(Preview, null, subject),
        React.createElement(Body, { style: { backgroundColor: "#0f172a", fontFamily: "system-ui, sans-serif", margin: 0 } },
          React.createElement(Container, { style: { maxWidth: "480px", margin: "0 auto", padding: "32px 16px" } },
            React.createElement(Section, null,
              React.createElement(Text, { style: { color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" } }, "SignalSky"),
              React.createElement(Text, { style: { color: "#f1f5f9", fontSize: "20px", fontWeight: "700", margin: "0 0 16px" } }, heading),
              React.createElement(Text, { style: { color: "#94a3b8", fontSize: "13px", lineHeight: "1.6", margin: "0 0 24px", whiteSpace: "pre-wrap" } }, bodyText),
              ctaLabel && ctaUrl
                ? React.createElement(Section, { style: { textAlign: "center", marginBottom: "24px" } },
                    React.createElement(Button, {
                      href: ctaUrl,
                      style: { backgroundColor: "#3b82f6", color: "#ffffff", padding: "10px 24px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none" }
                    }, ctaLabel)
                  )
                : null,
              React.createElement(Hr, { style: { borderColor: "#1e293b", margin: "0 0 12px" } }),
              React.createElement(Text, { style: { color: "#475569", fontSize: "10px", textAlign: "center", margin: "0 0 4px" } },
                React.createElement("a", { href: unsubUrl, style: { color: "#475569" } }, "Unsubscribe from all emails")
              ),
              React.createElement(Text, { style: { color: "#334155", fontSize: "10px", textAlign: "center", margin: 0 } },
                "YG IT Global Solutions · Hyderabad, Telangana 500081, India"
              )
            )
          )
        )
      )
    )

    try {
      await resend.emails.send({
        from: "SignalSky <hi@signalsky.app>",
        to: user.email,
        subject,
        replyTo: "support@signalsky.app",
        html,
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[admin/broadcast] Failed to send to ${user.email}: ${e.message}`)
    }

    // Small delay to avoid rate limits
    if (sent % 10 === 0) await new Promise((r) => setTimeout(r, 200))
  }

  return NextResponse.json({ ok: true, sent, errors, total: users.length })
}

export const maxDuration = 300
