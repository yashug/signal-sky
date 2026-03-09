"use client"

import { useMemo, Suspense, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ActivityIcon,
  BookOpenIcon,
  CrosshairIcon,
  BarChart3Icon,
  DatabaseIcon,
  GlobeIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ZapIcon,
  ClockIcon,
  ArrowRightIcon,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { MarketHealthBar } from "@/components/signal-sky/market-health-bar"
import { UserMenu } from "@/components/signal-sky/user-menu"
import type { ApiMarketHealth } from "@/lib/api"

const navItems = [
  { label: "Scanner", href: "/scanner", icon: CrosshairIcon },
  { label: "Market Health", href: "/market-health", icon: HeartPulseIcon },
  { label: "Watchlist", href: "/watchlist", icon: StarIcon },
  { label: "Backtests", href: "/backtests", icon: BarChart3Icon },
  { label: "Journal", href: "/journal", icon: BookOpenIcon },
]

const secondaryItems = [
  { label: "Settings", href: "/settings", icon: SettingsIcon },
]

function formatTimeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffMin = Math.floor(diffMs / 60_000)
  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDays = Math.floor(diffHr / 24)
  return `${diffDays}d ago`
}

function NavLink({ href, className, children }: { href: string; className?: string; children?: React.ReactNode }) {
  const { setOpenMobile } = useSidebar()
  const handleClick = useCallback(() => setOpenMobile(false), [setOpenMobile])
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}

export function DashboardShell({
  children,
  marketHealthData,
  lastScanTime,
}: {
  children: React.ReactNode
  marketHealthData: ApiMarketHealth[]
  lastScanTime: string | null
}) {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user?.isAdmin === true

  const accessInfo = useMemo(() => {
    if (!user) return { isTrialActive: false, daysRemaining: 0, isPro: false }
    const isPro = user.tier === "PRO" || user.tier === "INSTITUTIONAL"
    const trialEndsAt = user.trialEndsAt ? new Date(user.trialEndsAt) : null
    const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
    const daysRemaining = trialEndsAt
      ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)))
      : 0
    return { isTrialActive, daysRemaining, isPro }
  }, [user])

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r-0">
        <SidebarHeader className="px-3 py-4">
          <NavLink href="/scanner" className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ZapIcon className="size-4" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                SignalSky
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Scanner
              </span>
            </div>
          </NavLink>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<NavLink href={item.href} />}
                      isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                      tooltip={item.label}
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Last scan indicator */}
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="mx-2 rounded-md border border-border/50 bg-surface p-3 group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-1.5">
                  <ActivityIcon className="size-3 text-muted-foreground" />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {lastScanTime ? `Last scan: ${formatTimeAgo(lastScanTime)}` : "No scans yet"}
                  </span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <SidebarMenu>
            {isAdmin && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<NavLink href="/admin/panel" />}
                    isActive={pathname === "/admin/panel"}
                    tooltip="Admin Panel"
                  >
                    <GlobeIcon className="size-4" />
                    <span>Admin Panel</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<NavLink href="/admin/data" />}
                    isActive={pathname === "/admin/data"}
                    tooltip="CSV Upload"
                  >
                    <DatabaseIcon className="size-4" />
                    <span>CSV Upload</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
            {secondaryItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<NavLink href={item.href} />}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarSeparator />
          <UserMenu />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <MarketHealthBar markets={marketHealthData} />
        {/* Trial banner */}
        {accessInfo.isTrialActive && !accessInfo.isPro && (
          <div className="flex items-center justify-between gap-3 px-4 py-2 bg-primary/5 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <ClockIcon className="size-3.5 text-primary shrink-0" />
              <span className="text-xs text-primary">
                Your free trial ends in <span className="font-bold">{accessInfo.daysRemaining} day{accessInfo.daysRemaining !== 1 ? "s" : ""}</span>
              </span>
            </div>
            <Link
              href="/pricing"
              className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
            >
              Subscribe Now
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <Suspense>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
