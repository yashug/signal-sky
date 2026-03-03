"use client"

import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/hooks/use-auth"
import type { InitialUser } from "@/lib/auth"

export function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser?: InitialUser | null
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider initialUser={initialUser}>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}
