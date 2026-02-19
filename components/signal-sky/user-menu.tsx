"use client"

import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  LogOutIcon,
  CreditCardIcon,
  UserIcon,
  SparklesIcon,
} from "lucide-react"

export function UserMenu() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" nativeButton={false} render={<Link href="/sign-in" />}>
        <UserIcon className="size-3" />
        Sign In
      </Button>
    )
  }

  const isPro = user.tier === "PRO" || user.tier === "INSTITUTIONAL"
  const trialEndsAt = user.trialEndsAt ? new Date(user.trialEndsAt) : null
  const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
  const daysRemaining = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)))
    : 0

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/sign-in")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors w-full text-left" />
        }
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="size-7 rounded-full"
            />
          ) : (
            <span className="text-xs font-semibold">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
          <span className="text-xs font-medium truncate">
            {user.name ?? user.email}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            {isPro ? (
              <>
                <SparklesIcon className="size-2.5 text-primary" />
                Pro
              </>
            ) : isTrialActive ? (
              `Trial — ${daysRemaining}d left`
            ) : (
              "Expired"
            )}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {!isPro && (
          <DropdownMenuItem render={<Link href="/pricing" />} className="gap-2 text-primary">
            <SparklesIcon className="size-3.5" />
            Subscribe
          </DropdownMenuItem>
        )}
        <DropdownMenuItem render={<Link href="/settings" />} className="gap-2">
          <CreditCardIcon className="size-3.5" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 text-bear"
          onClick={handleSignOut}
        >
          <LogOutIcon className="size-3.5" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
