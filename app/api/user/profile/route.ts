import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// RECORDING_MODE: return demo user without DB lookup — remove before deploying to prod
if (process.env.RECORDING_MODE === "true") {
  // module-level flag so the handler below can short-circuit
}

export async function GET() {
  if (process.env.RECORDING_MODE === "true") {
    return NextResponse.json({
      id: "463f30d6-775e-4606-a795-82c1bc6e66cc",
      name: "Tanvika Gosula",
      email: "gosulayaswanth2@gmail.com",
      image: null,
      tier: "PRO",
      trialEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      isAdmin: false,
      settings: { defaultCapitalINR: 500000, defaultCapitalUSD: 10000, defaultRiskPct: 1.5, hasSeenOnboarding: true },
    })
  }
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, image: true, tier: true, trialEndsAt: true, settings: true, isAdmin: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(req: Request) {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const data: Record<string, unknown> = {}

  if (typeof body.name === "string") {
    const name = body.name.trim()
    if (name.length > 100) {
      return NextResponse.json({ error: "Name too long" }, { status: 400 })
    }
    data.name = name || null
  }

  if (typeof body.image === "string") {
    const image = body.image.trim()
    if (image && image.length > 500) {
      return NextResponse.json({ error: "Image URL too long" }, { status: 400 })
    }
    data.image = image || null
  }

  if (body.settings != null && typeof body.settings === "object") {
    const existing = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { settings: true },
    })
    const current = (existing?.settings as Record<string, unknown>) ?? {}
    data.settings = { ...current, ...body.settings }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id: session.userId },
    data,
    select: { id: true, name: true, email: true, image: true, settings: true },
  })

  return NextResponse.json(updated)
}
