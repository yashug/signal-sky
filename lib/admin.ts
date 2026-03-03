import { getSession } from "@/lib/auth"

/**
 * Returns the session if the caller is an admin, or null otherwise.
 * Admin status is determined by the is_admin flag in the database.
 */
export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user?.isAdmin) return null
  return session
}
