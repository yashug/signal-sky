import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/email/unsubscribe?token=XXX&type=alerts|digest|all
 * One-click unsubscribe from email alerts.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  const type = req.nextUrl.searchParams.get("type") ?? "alerts"

  if (!token) {
    return new NextResponse(unsubscribeHtml("Invalid link", "This unsubscribe link is invalid or missing a token."), {
      headers: { "Content-Type": "text/html" },
    })
  }

  const user = await prisma.user.findFirst({
    where: { emailUnsubscribeToken: token },
  })

  if (!user) {
    return new NextResponse(unsubscribeHtml("Link not found", "This unsubscribe link was not found. You may have already unsubscribed."), {
      headers: { "Content-Type": "text/html" },
    })
  }

  if (type === "all") {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailDigest: "off", emailMarketing: false },
    })
    // Deactivate all email alert preferences
    await prisma.alertPreference.updateMany({
      where: { userId: user.id, channel: "email" },
      data: { isActive: false },
    })
    return new NextResponse(unsubscribeHtml("Unsubscribed", "You've been unsubscribed from all SignalSky emails."), {
      headers: { "Content-Type": "text/html" },
    })
  }

  if (type === "digest") {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailDigest: "off" },
    })
    return new NextResponse(unsubscribeHtml("Unsubscribed from digest", "You've been unsubscribed from the signal digest emails."), {
      headers: { "Content-Type": "text/html" },
    })
  }

  // Default: unsubscribe from signal alerts
  await prisma.alertPreference.updateMany({
    where: { userId: user.id, channel: "email" },
    data: { isActive: false },
  })

  return new NextResponse(unsubscribeHtml("Unsubscribed from alerts", "You'll no longer receive individual signal alert emails. You can re-enable them in Settings."), {
    headers: { "Content-Type": "text/html" },
  })
}

function unsubscribeHtml(title: string, message: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — SignalSky</title>
  <style>
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #1e293b; border-radius: 12px; padding: 32px; max-width: 400px; text-align: center; }
    h1 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
    p { color: #94a3b8; font-size: 13px; margin: 0 0 20px; }
    a { color: #3b82f6; font-size: 13px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>✓ ${title}</h1>
    <p>${message}</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"}/settings">Manage preferences in Settings →</a>
  </div>
</body>
</html>`
}
