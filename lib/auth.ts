import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

export type SessionUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  tier: "FREE" | "PRO" | "INSTITUTIONAL"
  isAdmin: boolean
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id || !user?.email) return null

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { tier: true, name: true, image: true },
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      name: dbUser?.name ?? user.user_metadata?.full_name ?? null,
      image: dbUser?.image ?? user.user_metadata?.avatar_url ?? null,
      tier: (dbUser?.tier as "FREE" | "PRO" | "INSTITUTIONAL") ?? "FREE",
      isAdmin: ADMIN_EMAILS.includes(user.email.toLowerCase()),
    },
  }
}
