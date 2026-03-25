"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { InitialUser } from "@/lib/auth"

export type UserSettings = {
  defaultCapitalINR?: number
  defaultCapitalUSD?: number
  defaultRiskPct?: number
  hasSeenOnboarding?: boolean
}

export type AuthUser = {
  id: string
  email: string | undefined
  name: string | null
  image: string | null
  tier: string
  trialEndsAt: string | null
  isAdmin: boolean
  settings: UserSettings
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refresh: async () => {},
})

// RECORDING_MODE: skip Supabase auth, use initialUser only — remove before deploying to prod
const RECORDING_MODE = process.env.NEXT_PUBLIC_RECORDING_MODE === "true"

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser?: InitialUser | null
}) {
  const [user, setUser] = useState<AuthUser | null>(
    initialUser
      ? {
          id: initialUser.id,
          email: initialUser.email,
          name: initialUser.name,
          image: initialUser.image,
          tier: initialUser.tier,
          trialEndsAt: initialUser.trialEndsAt,
          isAdmin: initialUser.isAdmin,
          settings: (initialUser.settings as UserSettings) ?? {},
        }
      : null
  )
  const [loading, setLoading] = useState(!initialUser)
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null)

  const getSupabase = useCallback(() => {
    if (!supabaseRef.current) supabaseRef.current = createClient()
    return supabaseRef.current
  }, [])

  const fetchUser = useCallback(async () => {
    // RECORDING_MODE: fetch profile directly (no Supabase auth check)
    if (RECORDING_MODE) {
      try {
        const res = await fetch("/api/user/profile")
        const profile = res.ok ? await res.json() : null
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            image: profile.image,
            tier: profile.tier ?? "PRO",
            trialEndsAt: profile.trialEndsAt ?? null,
            isAdmin: profile.isAdmin === true,
            settings: (profile.settings as UserSettings) ?? {},
          })
        }
      } catch {}
      setLoading(false)
      return
    }

    const supabase = getSupabase()
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
        trialEndsAt: profile?.trialEndsAt ?? null,
        isAdmin: profile?.isAdmin === true,
        settings: (profile?.settings as UserSettings) ?? {},
      })
    } catch {
      setUser({
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.full_name ?? null,
        image: authUser.user_metadata?.avatar_url ?? null,
        tier: "FREE",
        trialEndsAt: null,
        isAdmin: false,
        settings: {},
      })
    }
    setLoading(false)
  }, [getSupabase])

  useEffect(() => {
    if (RECORDING_MODE) {
      if (!initialUser) fetchUser()
      return
    }

    if (!initialUser) {
      fetchUser()
    }

    const supabase = getSupabase()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (initialUser) {
        if (event === "SIGNED_OUT") {
          setUser(null)
          setLoading(false)
        }
        return
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        fetchUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchUser, getSupabase, initialUser])

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
