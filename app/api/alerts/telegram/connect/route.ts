import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { generateVerifyToken, getTelegramDeepLink } from "@/lib/telegram"

/**
 * POST /api/alerts/telegram/connect
 * Generates a short-lived verify token and returns the Telegram deep link.
 */
export async function POST() {
  const session = await getSessionForApi()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const token = await generateVerifyToken(session.userId)
  const deepLink = getTelegramDeepLink(token)

  return NextResponse.json({ deepLink })
}
