import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

  const existing = await prisma.watchlistItem.findFirst({
    where: { id, userId: session.userId },
  })
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updated = await prisma.watchlistItem.update({
    where: { id },
    data: { notes: body.notes ?? existing.notes },
  })

  return NextResponse.json({ id: updated.id, notes: updated.notes })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const existing = await prisma.watchlistItem.findFirst({
    where: { id, userId: session.userId },
  })
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.watchlistItem.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
