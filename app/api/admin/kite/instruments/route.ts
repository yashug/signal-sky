import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { getKiteInstrumentMaster } from "@/lib/market-data/kite"

const BATCH_SIZE = 500

/**
 * POST /api/admin/kite/instruments
 * Refresh Kite instrument master — downloads NSE equities and batch-replaces in DB.
 * Clears old data and inserts fresh in batches for speed.
 */
export async function POST() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const instruments = await getKiteInstrumentMaster()

    if (instruments.length === 0) {
      return NextResponse.json({ error: "Kite returned 0 instruments — token may be expired" }, { status: 400 })
    }

    // Wipe old data and batch insert fresh — much faster than 6000+ individual upserts
    await prisma.kiteInstrument.deleteMany({})

    let inserted = 0
    for (let i = 0; i < instruments.length; i += BATCH_SIZE) {
      const batch = instruments.slice(i, i + BATCH_SIZE)
      const result = await prisma.kiteInstrument.createMany({
        data: batch.map((inst) => ({
          instrumentToken: inst.instrumentToken,
          exchangeToken: inst.exchangeToken,
          tradingsymbol: inst.tradingsymbol,
          name: inst.name || null,
          exchange: inst.exchange,
          segment: inst.segment,
          instrumentType: inst.instrumentType,
          lotSize: inst.lotSize,
        })),
        skipDuplicates: true,
      })
      inserted += result.count
    }

    return NextResponse.json({
      success: true,
      total: instruments.length,
      inserted,
    })
  } catch (e: any) {
    console.error("[kite/instruments] Error:", e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
