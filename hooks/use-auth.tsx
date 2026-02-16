"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"

export type AuthUser = {
  id: string
  email: string | undefined
  name: string | null
  image: string | null
  tier: string
  isAdmin: boolean
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  refresh: () => Promise<void>
}

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refresh: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabaseRef = useRef(createClient())

  const fetchUser = useCallback(async () => {
    const supabase = supabaseRef.current
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (!authUser) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/user/profile")
      const profile = res.ok ? await res.json() : null

      setUser({
        id: authUser.id,
        email: authUser.email,
        name: profile?.name ?? authUser.user_metadata?.full_name ?? null,
        image: profile?.image ?? authUser.user_metadata?.avatar_url ?? null,
        tier: profile?.tier ?? "FREE",
        isAdmin: ADMIN_EMAILS.includes(
          authUser.email?.toLowerCase() ?? ""
        ),
      })
    } catch {
      setUser({
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.full_name ?? null,
        image: authUser.user_metadata?.avatar_url ?? null,
        tier: "FREE",
        isAdmin: ADMIN_EMAILS.includes(
          authUser.email?.toLowerCase() ?? ""
        ),
      })
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchUser()

    const supabase = supabaseRef.current
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) fetchUser()
      else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchUser])

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
