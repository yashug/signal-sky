import Link from "next/link"
import { ZapIcon, GraduationCapIcon, ArrowLeftIcon } from "lucide-react"
import { ThemeToggle } from "@/components/signal-sky/theme-toggle"
import { GuideContent } from "@/components/signal-sky/guide-content"
import { getInitialUser } from "@/lib/auth"

export const metadata = {
  title: "Strategy Guide — SignalSky",
  description: "Learn the Reset & Reclaim breakout strategy: how EMA 200, Pre-Set ATH, and heat levels work to surface high-probability setups.",
}

export default async function GuidePage() {
  const user = await getInitialUser()
  const isAuthenticated = !!user

  if (isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCapIcon className="size-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Strategy Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] mb-2">
            The Reset &amp; Reclaim Strategy
          </h1>
          <p className="text-sm text-muted-foreground">
            How SignalSky finds high-probability breakout setups — and how to trade them.
          </p>
        </div>
        <GuideContent isAuthenticated />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Public navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ZapIcon className="size-4" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">SignalSky</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="rounded-lg bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCapIcon className="size-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Strategy Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] mb-3">
            The Reset &amp; Reclaim Strategy
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            How SignalSky finds high-probability breakout setups — and how to trade them.
          </p>
        </div>
        <GuideContent isAuthenticated={false} />
      </div>
    </div>
  )
}
