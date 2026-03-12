import { NextRequest, NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/alerts/preferences
 * Returns current alert preferences + user-level email settings.
 */
export async function GET() {
  const session = await getSessionForApi()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [prefs, user] = await Promise.all([
    prisma.alertPreference.findMany({
      where: { userId: session.userId },
    }),
    prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        telegramChatId: true,
        emailDigest: true,
        emailMarketing: true,
      },
    }),
  ])

  return NextResponse.json({
    preferences: prefs,
    telegramConnected: !!user?.telegramChatId,
    emailDigest: user?.emailDigest ?? "daily",
    emailMarketing: user?.emailMarketing ?? true,
  })
}

/**
 * PATCH /api/alerts/preferences
 * Upsert an alert preference for a channel.
 * Body: { channel, heatFilter, universes, isActive, emailDigest, emailMarketing }
 */
export async function PATCH(req: NextRequest) {
  const session = await getSessionForApi()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { channel, heatFilter, universes, isActive, emailDigest, emailMarketing } = body

  // Update email-level settings on user
  const userUpdate: Record<string, any> = {}
  if (emailDigest !== undefined) userUpdate.emailDigest = emailDigest
  if (emailMarketing !== undefined) userUpdate.emailMarketing = emailMarketing

  if (Object.keys(userUpdate).length > 0) {
    await prisma.user.update({ where: { id: session.userId }, data: userUpdate })
  }

  // Upsert alert preference for the channel
  if (channel) {
    const existing = await prisma.alertPreference.findFirst({
      where: { userId: session.userId, channel },
    })

    if (existing) {
      await prisma.alertPreference.update({
        where: { id: existing.id },
        data: {
          ...(heatFilter !== undefined && { heatFilter }),
          ...(universes !== undefined && { universes }),
          ...(isActive !== undefined && { isActive }),
        },
      })
    } else {
      await prisma.alertPreference.create({
        data: {
          userId: session.userId,
          channel,
          heatFilter: heatFilter ?? [],
          universes: universes ?? [],
          isActive: isActive ?? true,
        },
      })
    }
  }

  return NextResponse.json({ ok: true })
}
