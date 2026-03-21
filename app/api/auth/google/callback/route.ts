import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

/** Allow only relative app paths to prevent open redirect. */
function safeNext(next: string | null): string {
  if (!next || typeof next !== "string") return "/scanner"
  const path = next.startsWith("/") ? next : `/${next}`
  if (path.includes("//") || path.startsWith("/http")) return "/scanner"
  return path
}

/**
 * Google OAuth callback — receives the authorization code from Google,
 * exchanges it for an ID token, and signs the user into Supabase.
 *
 * Using this route (signalsky.app) instead of Supabase's built-in OAuth
 * means Google shows "Continue to signalsky.app" on the consent screen.
 */
export async function GET(request: NextRequest) {
  const origin = new URL(request.url).origin
  const { searchParams } = new URL(request.url)

  const code = searchParams.get("code")
  const stateParam = searchParams.get("state")
  const googleError = searchParams.get("error")

  if (googleError || !code || !stateParam) {
    return NextResponse.redirect(`${origin}/sign-in?error=auth`)
  }

  // Decode and verify CSRF state
  let next = "/scanner"
  try {
    const { csrf, next: nextPath } = JSON.parse(
      Buffer.from(stateParam, "base64").toString()
    )
    const cookieStore = await cookies()
    const storedCsrf = cookieStore.get("oauth_state")?.value
    if (!storedCsrf || storedCsrf !== csrf) {
      return NextResponse.redirect(`${origin}/sign-in?error=auth`)
    }
    next = safeNext(nextPath)
    cookieStore.delete("oauth_state")
  } catch {
    return NextResponse.redirect(`${origin}/sign-in?error=auth`)
  }

  // Exchange authorization code for Google tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${origin}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  })

  if (!tokenRes.ok) {
    console.error("[google/callback] token exchange failed:", await tokenRes.text())
    return NextResponse.redirect(`${origin}/sign-in?error=auth`)
  }

  const { id_token } = await tokenRes.json()
  if (!id_token) {
    return NextResponse.redirect(`${origin}/sign-in?error=auth`)
  }

  // Sign in to Supabase using the Google ID token
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: id_token,
  })

  if (error) {
    console.error("[google/callback] signInWithIdToken error:", error.message)
    return NextResponse.redirect(`${origin}/sign-in?error=auth`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
