import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/**
 * PUT /api/watchlist/[id]/alert
 * Set or clear a price alert on a watchlist item.
 * Body: { alertPrice: number | null, alertDirection: "above" | "below" | null }
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { alertPrice, alertDirection } = body as {
    alertPrice: number | null
    alertDirection: "above" | "below" | null
  }

  // Verify ownership
  const item = await prisma.watchlistItem.findUnique({
    where: { id },
    select: { userId: true },
  })

  if (!item || item.userId !== session.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updated = await prisma.watchlistItem.update({
    where: { id },
    data: {
      alertPrice: alertPrice ?? null,
      alertDirection: alertDirection ?? null,
      // Reset triggered state when alert is modified
      alertTriggeredAt: alertPrice == null ? null : undefined,
    },
    select: { id: true, alertPrice: true, alertDirection: true, alertTriggeredAt: true },
  })

  return NextResponse.json({
    id: updated.id,
    alertPrice: updated.alertPrice ? Number(updated.alertPrice) : null,
    alertDirection: updated.alertDirection,
    alertTriggeredAt: updated.alertTriggeredAt?.toISOString() ?? null,
  })
}

/**
 * DELETE /api/watchlist/[id]/alert
 * Clear the price alert on a watchlist item.
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const item = await prisma.watchlistItem.findUnique({
    where: { id },
    select: { userId: true },
  })

  if (!item || item.userId !== session.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.watchlistItem.update({
    where: { id },
    data: { alertPrice: null, alertDirection: null, alertTriggeredAt: null },
  })

  return NextResponse.json({ ok: true })
}
