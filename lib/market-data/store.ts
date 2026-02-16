/**
 * Persistence layer — stores normalized daily candles into DailyBar via Prisma.
 */

import { prisma } from "@/lib/prisma"
import type { DailyCandle } from "./types"
import { candlesToPrismaPayload } from "./normalize"

const BATCH_SIZE = 500

/**
 * Upsert daily bars into Postgres.
 * Uses createMany with skipDuplicates for idempotent inserts.
 */
export async function upsertDailyBars(params: {
  symbol: string
  exchange: string
  candles: DailyCandle[]
  source: "kite" | "yahoo" | "csv"
}): Promise<{ inserted: number; skipped: number }> {
  const payload = candlesToPrismaPayload(params.candles, {
    symbol: params.symbol,
    exchange: params.exchange,
    source: params.source,
  })

  if (payload.length === 0) {
    return { inserted: 0, skipped: 0 }
  }

  let inserted = 0
  for (let i = 0; i < payload.length; i += BATCH_SIZE) {
    const batch = payload.slice(i, i + BATCH_SIZE)
    const result = await prisma.dailyBar.createMany({
      data: batch,
      skipDuplicates: true,
    })
    inserted += result.count
  }

  return {
    inserted,
    skipped: payload.length - inserted,
  }
}

/**
 * Get the last stored date for a symbol+exchange pair.
 * Returns null if no bars exist.
 */
export async function getLastBarDate(
  symbol: string,
  exchange: string,
): Promise<Date | null> {
  const bar = await prisma.dailyBar.findFirst({
    where: { symbol, exchange },
    orderBy: { date: "desc" },
    select: { date: true },
  })
  return bar?.date ?? null
}
