import { getSession } from "@/lib/auth"

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

/**
 * Returns the session if the caller is an admin, or null otherwise.
 */
export async function requireAdmin() {
  const session = await getSession()
  const email = session?.user?.email?.toLowerCase()
  if (!email || !ADMIN_EMAILS.includes(email)) return null
  return session
}
