import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/**
 * POST /api/alerts/telegram/disconnect
 * Clears the user's Telegram chat ID.
 */
export async function POST() {
  const session = await getSessionForApi()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      telegramChatId: null,
      telegramVerifyToken: null,
      telegramVerifyTokenExpiry: null,
    },
  })

  // Also deactivate any telegram alert preference
  await prisma.alertPreference.updateMany({
    where: { userId: session.userId, channel: "telegram" },
    data: { isActive: false },
  })

  return NextResponse.json({ ok: true })
}
