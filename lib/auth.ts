import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export type SessionUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  tier: "FREE" | "PRO" | "INSTITUTIONAL"
  trialEndsAt: string | null
  isAdmin: boolean
}

export type InitialUser = {
  id: string
  email: string | undefined
  name: string | null
  image: string | null
  tier: string
  trialEndsAt: string | null
  isAdmin: boolean
  settings: Record<string, any>
}

/**
 * Lightweight server-side session reader for initial render.
 * Reads auth from cookies and user profile from DB (no upsert).
 */
export async function getInitialUser(): Promise<InitialUser | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id || !user?.email) return null

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { tier: true, name: true, image: true, trialEndsAt: true, settings: true, isAdmin: true },
    })

    if (!dbUser) return null

    return {
      id: user.id,
      email: user.email,
      name: dbUser.name ?? user.user_metadata?.full_name ?? null,
      image: dbUser.image ?? user.user_metadata?.avatar_url ?? null,
      tier: (dbUser.tier as string) ?? "FREE",
      trialEndsAt: dbUser.trialEndsAt?.toISOString() ?? null,
      isAdmin: dbUser.isAdmin,
      settings: (dbUser.settings as Record<string, any>) ?? {},
    }
  } catch {
    return null
  }
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id || !user?.email) return null

  // Upsert user — sets trialEndsAt on first creation
  let dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name ?? null,
      image: user.user_metadata?.avatar_url ?? null,
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: { tier: true, name: true, image: true, trialEndsAt: true, isAdmin: true },
  })

  // If user was auto-created by Supabase Auth trigger without trialEndsAt, set it now
  if (!dbUser.trialEndsAt && dbUser.tier === "FREE") {
    dbUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        name: dbUser.name ?? user.user_metadata?.full_name ?? null,
        image: dbUser.image ?? user.user_metadata?.avatar_url ?? null,
      },
      select: { tier: true, name: true, image: true, trialEndsAt: true, isAdmin: true },
    })
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: dbUser?.name ?? user.user_metadata?.full_name ?? null,
      image: dbUser?.image ?? user.user_metadata?.avatar_url ?? null,
      tier: (dbUser?.tier as "FREE" | "PRO" | "INSTITUTIONAL") ?? "FREE",
      trialEndsAt: dbUser?.trialEndsAt?.toISOString() ?? null,
      isAdmin: dbUser.isAdmin,
    },
  }
}
