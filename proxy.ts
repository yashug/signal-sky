import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|api/payments/webhook|api/telegram/webhook|api/email/unsubscribe|auth/callback).*)",
  ],
}
