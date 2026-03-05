import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/** Allow only relative app paths to prevent open redirect. */
function safeNext(next: string | null): string {
  if (!next || typeof next !== "string") return "/scanner"
  const path = next.startsWith("/") ? next : `/${next}`
  if (path.includes("//") || path.startsWith("/http")) return "/scanner"
  return path
}

/**
 * OAuth callback: exchange code for session and redirect to the page the user came from.
 * Redirect URL includes ?next= so user returns to the path they requested (e.g. /scanner, /journal).
 * In Supabase Auth → URL Configuration → Redirect URLs, use wildcards e.g.:
 *   https://signalsky.app/auth/callback*
 *   http://localhost:3000/auth/callback*
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const next = safeNext(searchParams.get("next"))

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    new URL(request.url).origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=auth`)
}
