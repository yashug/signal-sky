import { NextRequest, NextResponse } from "next/server"
import { KiteConnect } from "kiteconnect"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/admin/kite/callback?request_token=...&status=success
 * Zerodha redirects here after login. Exchanges request_token for access_token
 * and stores it in the DB for reuse.
 */
export async function GET(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const requestToken = req.nextUrl.searchParams.get("request_token")
  const status = req.nextUrl.searchParams.get("status")

  if (status !== "success" || !requestToken) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    return NextResponse.redirect(
      `${appUrl}/admin/panel?kite_error=Login+cancelled+or+failed`,
    )
  }

  const apiKey = process.env.KITE_API_KEY
  const apiSecret = process.env.KITE_API_SECRET

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "KITE_API_KEY and KITE_API_SECRET must be configured" },
      { status: 500 },
    )
  }

  try {
    const kc = new KiteConnect({ api_key: apiKey })
    const response = await kc.generateSession(requestToken, apiSecret)

    // Store token in DB (singleton row id=1)
    await prisma.kiteToken.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        accessToken: response.access_token,
        publicToken: response.public_token ?? null,
        userId: response.user_id ?? null,
        loginTime: new Date(),
      },
      update: {
        accessToken: response.access_token,
        publicToken: response.public_token ?? null,
        userId: response.user_id ?? null,
        loginTime: new Date(),
      },
    })

    console.log("[kite] Access token refreshed for user:", response.user_id)

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    return NextResponse.redirect(
      `${appUrl}/admin/panel?kite_connected=true`,
    )
  } catch (e: any) {
    console.error("[kite/callback] Error generating session:", e.message)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    return NextResponse.redirect(
      `${appUrl}/admin/panel?kite_error=${encodeURIComponent(e.message)}`,
    )
  }
}
