"use server"

import { cookies, headers } from "next/headers"

/** Allow only relative app paths to prevent open redirect. */
function safeNext(next: string | null): string {
  if (!next || typeof next !== "string") return "/scanner"
  const path = next.startsWith("/") ? next : `/${next}`
  if (path.includes("//") || path.startsWith("/http")) return "/scanner"
  return path
}

/**
 * Generates a Google OAuth URL that redirects through signalsky.app
 * instead of Supabase's domain — so Google shows "Continue to signalsky.app".
 */
export async function getGoogleOAuthUrl(next: string | null): Promise<string> {
  const csrf = crypto.randomUUID()

  // Store CSRF as httpOnly cookie — verified on callback
  const cookieStore = await cookies()
  cookieStore.set("oauth_state", csrf, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 min
    path: "/",
  })

  const state = Buffer.from(
    JSON.stringify({ csrf, next: safeNext(next) })
  ).toString("base64")

  // Derive origin from request headers so localhost works in dev
  const headersList = await headers()
  const host = headersList.get("host") ?? "localhost:3000"
  const protocol = host.startsWith("localhost") ? "http" : "https"
  const origin = `${protocol}://${host}`

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${origin}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "select_account",
  })

  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}
