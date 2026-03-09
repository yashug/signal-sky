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

  // Close/exit trade
  if (body.exitPrice !== undefined && body.exitDate) {
    const entryPrice = Number(existing.entryPrice)
    const exitPrice = body.exitPrice
    const exitQty = body.exitQuantity ?? existing.quantity
    const totalQty = existing.quantity
    const isPartial = exitQty < totalQty
    const exitReason = body.exitReason ?? "manual"
    const sideMultiplier = existing.side === "SHORT" ? -1 : 1

    const pnl = (exitPrice - entryPrice) * exitQty * sideMultiplier
    const pnlPercent = ((exitPrice - entryPrice) / entryPrice) * 100 * sideMultiplier
    const closedStatus = exitReason === "stop" ? "STOPPED_OUT" : "CLOSED"

    if (isPartial) {
      // Partial exit: reduce open trade qty, create a closed trade for exited portion
      await prisma.journalTrade.update({
        where: { id },
        data: {
          quantity: totalQty - exitQty,
          notes: existing.notes
            ? `${existing.notes}\nPartial exit: ${exitQty} shares @ ${exitPrice}`
            : `Partial exit: ${exitQty} shares @ ${exitPrice}`,
        },
      })

      const closedTrade = await prisma.journalTrade.create({
        data: {
          userId: session.user.id,
          symbol: existing.symbol,
          exchange: existing.exchange,
          side: existing.side,
          entryDate: existing.entryDate,
          entryPrice: existing.entryPrice,
          quantity: exitQty,
          stopLoss: existing.stopLoss,
          targetPrice: existing.targetPrice,
          exitDate: new Date(body.exitDate),
          exitPrice,
          exitReason,
          pnl,
          pnlPercent,
          notes: `Partial exit from ${totalQty} shares`,
          linkedSignalId: existing.linkedSignalId,
          status: closedStatus,
        },
      })

      return NextResponse.json({
        id: closedTrade.id,
        status: closedTrade.status,
        partial: true,
        exitedQty: exitQty,
        remainingQty: totalQty - exitQty,
      })
    }

    // Full exit
    updateData.exitPrice = exitPrice
    updateData.exitDate = new Date(body.exitDate)
    updateData.exitReason = exitReason
    updateData.pnl = pnl
    updateData.pnlPercent = pnlPercent
    updateData.status = closedStatus
    updateData.quantity = exitQty
  }

  if (body.status && !updateData.status) {
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
