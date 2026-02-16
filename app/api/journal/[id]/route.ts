import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  // Verify ownership
  const existing = await prisma.journalTrade.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updateData: any = {}
  if (body.notes !== undefined) updateData.notes = body.notes
  if (body.stopLoss !== undefined) updateData.stopLoss = body.stopLoss
  if (body.targetPrice !== undefined) updateData.targetPrice = body.targetPrice

  // Close trade
  if (body.exitPrice !== undefined && body.exitDate) {
    updateData.exitPrice = body.exitPrice
    updateData.exitDate = new Date(body.exitDate)
    updateData.exitReason = body.exitReason ?? "manual"

    const entryPrice = Number(existing.entryPrice)
    const exitPrice = body.exitPrice
    const qty = existing.quantity
    const pnl = (exitPrice - entryPrice) * qty * (existing.side === "SHORT" ? -1 : 1)
    const pnlPercent = ((exitPrice - entryPrice) / entryPrice) * 100 * (existing.side === "SHORT" ? -1 : 1)

    updateData.pnl = pnl
    updateData.pnlPercent = pnlPercent
    updateData.status = body.exitReason === "stop" ? "STOPPED_OUT" : "CLOSED"
  }

  if (body.status) {
    updateData.status = body.status.toUpperCase()
  }

  const updated = await prisma.journalTrade.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json({ id: updated.id, status: updated.status })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const existing = await prisma.journalTrade.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.journalTrade.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
