import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getResend } from "@/lib/email/resend"
import { randomUUID } from "crypto"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"

/**
 * POST /api/admin/alerts/broadcast
 * Send a promotional/marketing email to all active/trial users.
 * Body: { subject, heading, body, ctaLabel, ctaUrl }
 *
 * Uses plain conversational HTML to land in Gmail Primary (not Promotions).
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { subject, heading, body: bodyText, ctaLabel, ctaUrl } = await req.json()
  if (!subject || !heading || !bodyText) {
    return NextResponse.json({ error: "subject, heading, and body are required" }, { status: 400 })
  }

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
    select: { id: true, email: true, name: true, emailUnsubscribeToken: true },
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
    const firstName = user.name?.split(" ")[0] ?? "there"

    // Paragraphs from bodyText (split on double newline)
    const paragraphs = bodyText.split(/\n\n+/).map((p: string) => p.trim()).filter(Boolean)
    const paragraphsHtml = paragraphs.map((p: string) =>
      `<p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7">${p.replace(/\n/g, "<br>")}</p>`
    ).join("")
    const paragraphsText = paragraphs.join("\n\n")

    const ctaHtml = ctaLabel && ctaUrl
      ? `<p style="margin:0 0 16px"><a href="${ctaUrl}" style="color:#2563eb;font-size:15px;font-weight:600;text-decoration:underline">${ctaLabel} →</a></p>`
      : ""
    const ctaText = ctaLabel && ctaUrl ? `\n\n${ctaLabel}: ${ctaUrl}` : ""

    // Minimal conversational HTML — no big headers, no buttons, no columns
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,'Times New Roman',serif">
<div style="max-width:520px;margin:0 auto;padding:40px 24px">
  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#111827;font-family:'Segoe UI',Arial,sans-serif;letter-spacing:-.01em">SignalSky</p>
  <hr style="border:none;border-top:2px solid #2563eb;width:32px;margin:0 0 28px;text-align:left">
  <p style="margin:0 0 20px;font-size:17px;font-weight:700;color:#111827;font-family:'Segoe UI',Arial,sans-serif;line-height:1.3">${heading}</p>
  <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7">Hi ${firstName},</p>
  ${paragraphsHtml}
  ${ctaHtml}
  <p style="margin:24px 0 0;color:#374151;font-size:15px;line-height:1.7">— Yaswanth<br><span style="color:#6b7280;font-size:13px">SignalSky</span></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 16px">
  <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif">
    You're receiving this because you signed up for SignalSky.<br>
    <a href="${unsubUrl}" style="color:#9ca3af">Unsubscribe</a> · YG IT Global Solutions, Hyderabad, Telangana 502300, India
  </p>
</div>
</body></html>`

    const text = `Hi ${firstName},\n\n${paragraphsText}${ctaText}\n\n— Yaswanth\nSignalSky\n\n---\nYou're receiving this because you signed up for SignalSky.\nUnsubscribe: ${unsubUrl}\nYG IT Global Solutions, Hyderabad, Telangana 502300, India`

    try {
      await resend.emails.send({
        from: "Yaswanth from SignalSky <hi@signalsky.app>",
        to: user.email,
        replyTo: "hi@signalsky.app",
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
        },
      })
      sent++
    } catch (e: any) {
      errors++
      console.error(`[admin/broadcast] Failed to send to ${user.email}: ${e.message}`)
    }

    if (sent % 10 === 0) await new Promise((r) => setTimeout(r, 200))
  }

  return NextResponse.json({ ok: true, sent, errors, total: users.length })
}

export const maxDuration = 300
