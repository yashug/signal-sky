import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTelegramMessage } from "@/lib/telegram"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET

/**
 * POST /api/telegram/webhook
 * Receives updates from Telegram Bot API.
 * Handles /start TOKEN to link a chat_id to a user.
 */
export async function POST(req: NextRequest) {
  // Verify secret token header
  if (WEBHOOK_SECRET) {
    const secret = req.headers.get("x-telegram-bot-api-secret-token")
    if (secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  try {
    const update = await req.json()
    const message = update?.message
    if (!message) return NextResponse.json({ ok: true })

    const chatId = String(message.chat?.id)
    const text: string = message.text ?? ""

    // Handle /start TOKEN
    if (text.startsWith("/start")) {
      const parts = text.split(" ")
      const token = parts[1]?.trim()

      if (!token) {
        await sendTelegramMessage(chatId,
          "👋 Welcome to SignalSky!\n\nTo connect your account, go to <b>Settings → Alerts</b> in the app and click <b>Connect Telegram</b>."
        )
        return NextResponse.json({ ok: true })
      }

      // Look up user by verify token
      const user = await prisma.user.findFirst({
        where: {
          telegramVerifyToken: token,
          telegramVerifyTokenExpiry: { gt: new Date() },
        },
      })

      if (!user) {
        await sendTelegramMessage(chatId,
          "❌ This link has expired or is invalid.\n\nPlease go back to SignalSky Settings and generate a new link."
        )
        return NextResponse.json({ ok: true })
      }

      // Link chat_id to user, clear token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          telegramChatId: chatId,
          telegramVerifyToken: null,
          telegramVerifyTokenExpiry: null,
        },
      })

      // Ensure a telegram alert preference exists
      const existing = await prisma.alertPreference.findFirst({
        where: { userId: user.id, channel: "telegram" },
      })
      if (!existing) {
        await prisma.alertPreference.create({
          data: {
            userId: user.id,
            channel: "telegram",
            heatFilter: [],
            universes: [],
            isActive: true,
          },
        })
      } else if (!existing.isActive) {
        await prisma.alertPreference.update({
          where: { id: existing.id },
          data: { isActive: true },
        })
      }

      await sendTelegramMessage(chatId,
        `✅ <b>Connected!</b>\n\nYou'll now receive SignalSky signal alerts here.\n\nTo manage your alert filters, go to <b>Settings → Alerts</b> in the app.`
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("[telegram/webhook] Error:", e.message)
    return NextResponse.json({ ok: true }) // Always 200 to Telegram
  }
}
