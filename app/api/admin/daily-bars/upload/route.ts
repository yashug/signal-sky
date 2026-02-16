import { NextRequest, NextResponse } from "next/server"
import Papa from "papaparse"
import { z } from "zod/v4"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"

const REQUIRED_HEADERS = ["symbol", "date", "open", "high", "low", "close", "volume"]
const MAX_ERRORS = 20
const BATCH_SIZE = 500

const barRowSchema = z.object({
  symbol: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  open: z.coerce.number().finite(),
  high: z.coerce.number().finite(),
  low: z.coerce.number().finite(),
  close: z.coerce.number().finite(),
  volume: z.coerce.number().int().min(0),
  adjFactor: z.coerce.number().finite().positive().optional(),
})

function parseUTCDate(dateStr: string): Date | null {
  const [y, m, d] = dateStr.split("-").map(Number)
  if (!y || !m || !d) return null
  const dt = new Date(Date.UTC(y, m - 1, d))
  if (isNaN(dt.getTime())) return null
  return dt
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const exchange = ((formData.get("exchange") as string) ?? "NSE").trim().toUpperCase()
  const source = ((formData.get("source") as string) ?? "csv").trim()

  if (!file) {
    return NextResponse.json({ error: "Missing required field: file" }, { status: 400 })
  }

  const csvText = await file.text()
  const { data: rows, errors: parseErrors } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/adj_factor|adjfactor/, "adjFactor"),
  })

  if (parseErrors.length > 0 && rows.length === 0) {
    return NextResponse.json(
      { error: "CSV parse failed", details: parseErrors.slice(0, MAX_ERRORS) },
      { status: 400 },
    )
  }

  // Validate headers
  const headers = rows.length > 0 ? Object.keys(rows[0]) : []
  const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h))
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Missing required CSV columns: ${missing.join(", ")}. Expected: symbol,date,open,high,low,close,volume[,adjFactor]`,
      },
      { status: 400 },
    )
  }

  const validRows: {
    symbol: string
    exchange: string
    date: Date
    open: number
    high: number
    low: number
    close: number
    volume: bigint
    adjFactor: number
    source: string
  }[] = []
  const errors: { line: number; reason: string }[] = []

  for (let i = 0; i < rows.length; i++) {
    const line = i + 2
    const raw = rows[i]

    const parsed = barRowSchema.safeParse({
      symbol: raw.symbol?.trim().toUpperCase(),
      date: raw.date?.trim(),
      open: raw.open,
      high: raw.high,
      low: raw.low,
      close: raw.close,
      volume: raw.volume,
      adjFactor: raw.adjFactor || raw.adjfactor || raw.adj_factor || undefined,
    })

    if (!parsed.success) {
      if (errors.length < MAX_ERRORS) {
        const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
        errors.push({ line, reason: issues })
      }
      continue
    }

    const dt = parseUTCDate(parsed.data.date)
    if (!dt) {
      if (errors.length < MAX_ERRORS) errors.push({ line, reason: "Invalid date" })
      continue
    }

    validRows.push({
      symbol: parsed.data.symbol,
      exchange,
      date: dt,
      open: parsed.data.open,
      high: parsed.data.high,
      low: parsed.data.low,
      close: parsed.data.close,
      volume: BigInt(parsed.data.volume),
      adjFactor: parsed.data.adjFactor ?? 1.0,
      source,
    })
  }

  // Bulk insert in batches with skipDuplicates
  let inserted = 0
  let skippedDuplicates = 0

  for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
    const batch = validRows.slice(i, i + BATCH_SIZE)
    try {
      const result = await prisma.dailyBar.createMany({
        data: batch,
        skipDuplicates: true,
      })
      inserted += result.count
      skippedDuplicates += batch.length - result.count
    } catch (e: any) {
      // If batch fails, try row-by-row for better error reporting
      for (let j = 0; j < batch.length; j++) {
        try {
          await prisma.dailyBar.create({ data: batch[j] })
          inserted++
        } catch (rowErr: any) {
          if (rowErr.code === "P2002") {
            skippedDuplicates++
          } else if (errors.length < MAX_ERRORS) {
            errors.push({
              line: i + j + 2,
              reason: rowErr.message?.slice(0, 120) ?? "Unknown error",
            })
          }
        }
      }
    }
  }

  return NextResponse.json({
    inserted,
    skippedDuplicates,
    total: validRows.length,
    errors,
  })
}
