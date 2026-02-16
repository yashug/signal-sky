import { NextResponse } from "next/server"
import { KiteConnect } from "kiteconnect"
import { requireAdmin } from "@/lib/admin"

/**
 * GET /api/admin/kite/login
 * Redirects the admin to the Zerodha Kite login page.
 * After login, Zerodha redirects back to /api/admin/kite/callback with a request_token.
 */
export async function GET() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apiKey = process.env.KITE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "KITE_API_KEY not configured" }, { status: 500 })
  }

  const kc = new KiteConnect({ api_key: apiKey })
  const loginUrl = kc.getLoginURL()

  return NextResponse.redirect(loginUrl)
}
