"use client"

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
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { MarketHealthBar } from "@/components/signal-sky/market-health-bar"
import { UserMenu } from "@/components/signal-sky/user-menu"

const navItems = [
  { label: "Scanner", href: "/scanner", icon: CrosshairIcon },
  { label: "Market Health", href: "/market-health", icon: HeartPulseIcon },
  { label: "Watchlist", href: "/watchlist", icon: StarIcon },
  { label: "Journal", href: "/journal", icon: BookOpenIcon },
]

const secondaryItems = [
  { label: "Settings", href: "/settings", icon: SettingsIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user?.isAdmin === true

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r-0">
        <SidebarHeader className="px-3 py-4">
          <Link href="/scanner" className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
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
          </Link>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={pathname === item.href}
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

          {/* Live status indicator */}
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="mx-2 rounded-md border border-border/50 bg-surface p-3 group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-2 text-xs">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-bull opacity-40" />
                    <span className="relative inline-flex size-2 rounded-full bg-bull" />
                  </span>
                  <span className="text-muted-foreground">Market Open</span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <ActivityIcon className="size-3 text-muted-foreground" />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Last scan: 2m ago
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
                    render={<Link href="/admin/panel" />}
                    isActive={pathname === "/admin/panel"}
                    tooltip="Admin Panel"
                  >
                    <GlobeIcon className="size-4" />
                    <span>Admin Panel</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/admin/data" />}
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
                  render={<Link href={item.href} />}
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
        <MarketHealthBar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
