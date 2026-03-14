import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getMarketHealth } from "@/lib/data/market-health"
import { getLastScanTime, getActiveSignalCount } from "@/lib/data/signals"
import { DashboardShell } from "./dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (session?.user) {
    const { user } = session
    const isPro = user.tier === "PRO" || user.tier === "INSTITUTIONAL"
    const trialEndsAt = user.trialEndsAt ? new Date(user.trialEndsAt) : null
    const isTrialActive = trialEndsAt ? trialEndsAt.getTime() > Date.now() : false
    const hasAccess = isPro || isTrialActive || user.isAdmin

    if (!hasAccess) {
      redirect("/pricing?expired=1")
    }
  }

  const [marketHealthResult, lastScanResult, signalCountResult] = await Promise.allSettled([
    getMarketHealth(),
    getLastScanTime(),
    getActiveSignalCount(),
  ])

  const markets = marketHealthResult.status === "fulfilled"
    ? marketHealthResult.value.markets
    : []
  const lastScan = lastScanResult.status === "fulfilled"
    ? lastScanResult.value
    : null
  const signalCount = signalCountResult.status === "fulfilled"
    ? signalCountResult.value
    : undefined

  return (
    <DashboardShell
      marketHealthData={markets}
      lastScanTime={lastScan}
      signalCount={signalCount}
    >
      {children}
    </DashboardShell>
  )
}
