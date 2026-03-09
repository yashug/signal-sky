import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const VALID_CATEGORIES = ["bug", "feature", "general"] as const

/**
 * POST /api/feedback — Submit feedback
 */
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const category = body.category
  const message = (body.message ?? "").trim()

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 })
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ error: "Message too short" }, { status: 400 })
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 })
  }

  const feedback = await prisma.feedback.create({
    data: {
      userId: session.user.id,
      category,
      message,
    },
  })

  return NextResponse.json({ id: feedback.id }, { status: 201 })
}

/**
 * GET /api/feedback — Admin: list feedback
 * Query params: ?unreadOnly=1&limit=50&offset=0
 */
export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = req.nextUrl
  const unreadOnly = searchParams.get("unreadOnly") === "1"
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100)
  const offset = parseInt(searchParams.get("offset") ?? "0")

  const where = unreadOnly ? { isRead: false } : {}

  const [items, total, unreadCount] = await Promise.all([
    prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        user: { select: { email: true, name: true, image: true } },
      },
    }),
    prisma.feedback.count({ where }),
    prisma.feedback.count({ where: { isRead: false } }),
  ])

  return NextResponse.json({ items, total, unreadCount })
}

/**
 * PATCH /api/feedback — Admin: mark feedback as read
 * Body: { id: string } or { ids: string[] }
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const ids: string[] = body.ids ?? (body.id ? [body.id] : [])

  if (ids.length === 0) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 })
  }

  await prisma.feedback.updateMany({
    where: { id: { in: ids } },
    data: { isRead: true },
  })

  return NextResponse.json({ status: "ok" })
}
