import { NextRequest, NextResponse } from "next/server"
import Papa from "papaparse"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"

const REQUIRED_HEADERS = ["symbol"]
const MAX_ERRORS = 20

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const universe = (formData.get("universe") as string)?.trim()

  if (!file || !universe) {
    return NextResponse.json(
      { error: "Missing required fields: file, universe" },
      { status: 400 },
    )
  }

  const csvText = await file.text()
  const { data: rows, errors: parseErrors } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
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
        error: `Missing required CSV columns: ${missing.join(", ")}. Expected: symbol,name,sector (name and sector are optional)`,
      },
      { status: 400 },
    )
  }

  let inserted = 0
  let updated = 0
  const errors: { line: number; reason: string }[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const line = i + 2 // 1-indexed + header row
    const symbol = row.symbol?.trim().toUpperCase()

    if (!symbol) {
      if (errors.length < MAX_ERRORS) errors.push({ line, reason: "Missing symbol" })
      continue
    }

    const name = row.name?.trim() || null
    const sector = row.sector?.trim() || null

    try {
      const existing = await prisma.universeMember.findUnique({
        where: { universe_symbol: { universe, symbol } },
      })

      if (existing) {
        await prisma.universeMember.update({
          where: { id: existing.id },
          data: {
            ...(name !== null && { name }),
            ...(sector !== null && { sector }),
          },
        })
        updated++
      } else {
        await prisma.universeMember.create({
          data: { universe, symbol, name, sector },
        })
        inserted++
      }
    } catch (e: any) {
      if (errors.length < MAX_ERRORS) {
        errors.push({ line, reason: e.message?.slice(0, 120) ?? "Unknown error" })
      }
    }
  }

  return NextResponse.json({
    inserted,
    updated,
    total: inserted + updated,
    errors,
  })
}
