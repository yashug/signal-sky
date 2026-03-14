"use client"

import { useMemo, Suspense, useCallback, useState } from "react"
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
  GraduationCapIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ZapIcon,
  ClockIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  XIcon,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { MarketHealthBar } from "@/components/signal-sky/market-health-bar"
import { UserMenu } from "@/components/signal-sky/user-menu"
import { OnboardingModal } from "@/components/signal-sky/onboarding-modal"
import { GuideContent } from "@/components/signal-sky/guide-content"
import type { ApiMarketHealth } from "@/lib/api"

const navItems = [
  { label: "Scanner", href: "/scanner", icon: CrosshairIcon, badge: true },
  { label: "Market Health", href: "/market-health", icon: HeartPulseIcon },
  { label: "Watchlist", href: "/watchlist", icon: StarIcon },
  { label: "Backtests", href: "/backtests", icon: BarChart3Icon },
  { label: "Performance", href: "/performance", icon: TrendingUpIcon },
  { label: "Journal", href: "/journal", icon: BookOpenIcon },
]

const secondaryItems = [
  { label: "Settings", href: "/settings", icon: SettingsIcon },
]

const GUIDE_SECTIONS = [
  { label: "EMA 200", id: "guide-s1" },
  { label: "Pre-Set ATH", id: "guide-s2" },
  { label: "The Setup", id: "guide-s3" },
  { label: "Heat Levels", id: "guide-s4" },
  { label: "How to Use", id: "guide-s5" },
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

function GuideButton({ onClick }: { onClick: () => void }) {
  const { setOpenMobile } = useSidebar()
  const handleClick = useCallback(() => {
    setOpenMobile(false)
    onClick()
  }, [setOpenMobile, onClick])

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleClick} tooltip="Strategy Guide">
        <GraduationCapIcon className="size-4" />
        <span>Guide</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function DashboardShell({
  children,
  marketHealthData,
  lastScanTime,
  signalCount,
}: {
  children: React.ReactNode
  marketHealthData: ApiMarketHealth[]
  lastScanTime: string | null
  signalCount?: number
}) {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user?.isAdmin === true
  const [guideOpen, setGuideOpen] = useState(false)

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

  function jumpToSection(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
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
                        {item.badge && signalCount != null && signalCount > 0 && (
                          <span className="ml-auto rounded-full bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary group-data-[collapsible=icon]:hidden">
                            {signalCount}
                          </span>
                        )}
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
              <GuideButton onClick={() => setGuideOpen(true)} />
            </SidebarMenu>
            <SidebarSeparator />
            <UserMenu />
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <OnboardingModal />
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

      {/* Guide slide-over panel */}
      {guideOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setGuideOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col bg-background border-l border-border/30 shadow-2xl"
            style={{ width: "min(520px, 100vw)" }}
          >
            {/* Shimmer accent bar */}
            <div
              className="h-[2px] w-full shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, oklch(0.72 0.19 220 / 0.8) 30%, oklch(0.75 0.18 155 / 0.7) 60%, oklch(0.72 0.19 220 / 0.8) 80%, transparent 100%)",
              }}
            />

            {/* Header */}
            <div className="shrink-0 px-6 pt-5 pb-4 border-b border-border/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25"
                    style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.12), oklch(0.72 0.19 220 / 0.04))" }}
                  >
                    <GraduationCapIcon className="size-4.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.18em] text-primary/60 block mb-0.5">
                      Strategy Guide
                    </span>
                    <h2 className="text-[16px] font-bold tracking-[-0.02em] text-foreground leading-tight">
                      Reset &amp; Reclaim
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setGuideOpen(false)}
                  className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors shrink-0 mt-0.5"
                >
                  <XIcon className="size-3.5" />
                </button>
              </div>

              {/* Section jump pills */}
              <div className="flex gap-1.5 mt-4 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
                {GUIDE_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => jumpToSection(s.id)}
                    className="shrink-0 rounded-full border border-border/40 bg-muted/40 px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6" style={{ scrollbarWidth: "thin" }}>
              <GuideContent isAuthenticated sectionIds={GUIDE_SECTIONS.map((s) => s.id)} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
