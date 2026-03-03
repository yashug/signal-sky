"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ZapIcon,
  CheckIcon,
  SparklesIcon,
  CrownIcon,
  FlameIcon,
  ArrowLeftIcon,
  LogOutIcon,
  ShieldCheckIcon,
  UsersIcon,
  AlertCircleIcon,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { LifetimeDealInfo } from "@/lib/data/deals"

const PRO_FEATURES = [
  "All Nifty indices (50, 100, 200, Midcap, Smallcap)",
  "S&P 100 & NASDAQ 100 coverage",
  "Unlimited backtests",
  "Unlimited trade journal",
  "Priority support",
]

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

function PricingContent({ deal }: { deal: LifetimeDealInfo }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isExpired = searchParams.get("expired") === "1"
  const paymentError = searchParams.get("error")
  const [checkingOut, setCheckingOut] = useState<string | null>(null)

  async function handleCheckout(interval: "monthly" | "yearly" | "lifetime") {
    setCheckingOut(interval)
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      })
      const data = await res.json()
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setCheckingOut(null)
      }
    } catch {
      setCheckingOut(null)
    }
  }

  const monthlyPrice = 299
  const yearlyPrice = 2999
  const monthlyMrp = 599
  const yearlyMrp = 5999
  const lifetimePrice = 4999
  const lifetimeMrp = 14999
  const yearlySavings = Math.round(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <nav className="border-b border-border/20 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ZapIcon className="size-4" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">SignalSky</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="size-3" />
              Back to home
            </Link>
            <button
              onClick={async () => {
                const supabase = createClient()
                await supabase.auth.signOut()
                router.push("/")
              }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-bear transition-colors cursor-pointer"
            >
              <LogOutIcon className="size-3" />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center px-4 py-16">
        {isExpired && (
          <div className="flex items-center gap-2 rounded-lg border border-heat-simmering/30 bg-heat-simmering/5 px-4 py-2.5 mb-8 max-w-lg w-full">
            <AlertCircleIcon className="size-4 text-heat-simmering shrink-0" />
            <p className="text-xs text-heat-simmering">
              Your 7-day free trial has ended. Subscribe to continue using SignalSky.
            </p>
          </div>
        )}

        {paymentError && (
          <div className="flex items-center gap-2 rounded-lg border border-bear/30 bg-bear/5 px-4 py-2.5 mb-8 max-w-lg w-full">
            <AlertCircleIcon className="size-4 text-bear shrink-0" />
            <p className="text-xs text-bear">
              Payment could not be completed. Please try again.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
            Invest in your edge
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            Start with a 7-day free trial. Then choose a plan to unlock all Nifty indices, unlimited backtests, and real-time alerts.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid gap-5 md:grid-cols-3 max-w-4xl w-full">
          {/* Pro Monthly */}
          <div className="rounded-2xl border border-border/30 bg-card/60 p-6 flex flex-col">
            <h3 className="text-base font-semibold">Pro Monthly</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Flexible month-to-month billing
            </p>

            <div className="mt-5 mb-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-muted-foreground line-through">
                  &#8377;{formatINR(monthlyMrp)}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight">
                  &#8377;{formatINR(monthlyPrice)}
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-6">
              7-day free trial included
            </p>

            <ul className="space-y-2 mb-6 flex-1">
              {PRO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[12px]">
                  <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full h-10 text-xs"
              variant="outline"
              onClick={() => handleCheckout("monthly")}
              disabled={checkingOut !== null}
            >
              <SparklesIcon className="size-3 mr-1" />
              {checkingOut === "monthly" ? "Redirecting..." : "Go Monthly"}
            </Button>
          </div>

          {/* Pro Yearly */}
          <div className="relative rounded-2xl border border-primary/30 bg-card/80 p-6 ring-1 ring-primary/10 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                <SparklesIcon className="size-2.5" />
                Most Popular
              </span>
            </div>

            <h3 className="text-base font-semibold">Pro Yearly</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Best value for committed traders
            </p>

            <div className="mt-5 mb-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-muted-foreground line-through">
                  &#8377;{formatINR(yearlyMrp)}
                </span>
                <span className="rounded-full bg-bull/10 px-2 py-0.5 text-[9px] font-bold text-bull">
                  Save {yearlySavings}%
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight text-primary">
                  &#8377;{formatINR(yearlyPrice)}
                </span>
                <span className="text-sm text-muted-foreground">/yr</span>
              </div>
            </div>
            <p className="text-[10px] text-bull font-medium mb-6">
              That&apos;s just &#8377;{formatINR(Math.round(yearlyPrice / 12))}/month
            </p>

            <ul className="space-y-2 mb-6 flex-1">
              {PRO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[12px]">
                  <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full h-10 text-xs glow-signal"
              onClick={() => handleCheckout("yearly")}
              disabled={checkingOut !== null}
            >
              <SparklesIcon className="size-3 mr-1" />
              {checkingOut === "yearly" ? "Redirecting..." : "Upgrade to Pro"}
            </Button>
          </div>

          {/* Lifetime Deal */}
          <div className="relative rounded-2xl border border-heat-simmering/30 bg-gradient-to-b from-heat-simmering/[0.03] to-card/80 p-6 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-heat-simmering to-heat-boiling px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                <FlameIcon className="size-2.5" />
                Limited Offer
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Lifetime</h3>
              <CrownIcon className="size-4 text-heat-simmering" />
            </div>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Pay once, Pro access forever
            </p>

            <div className="mt-5 mb-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-muted-foreground line-through">
                  &#8377;{formatINR(lifetimeMrp)}
                </span>
                <span className="rounded-full bg-heat-boiling/10 px-2 py-0.5 text-[9px] font-bold text-heat-boiling">
                  {Math.round(((lifetimeMrp - lifetimePrice) / lifetimeMrp) * 100)}% OFF
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight text-heat-simmering">
                  &#8377;{formatINR(lifetimePrice)}
                </span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-4">
              Equivalent to {Math.round(lifetimePrice / monthlyPrice)} months of Pro
            </p>

            {/* Scarcity counter */}
            <div className="rounded-xl border border-heat-simmering/20 bg-heat-simmering/[0.04] p-3 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <UsersIcon className="size-3.5 text-heat-simmering" />
                <span className="text-[11px] font-semibold text-foreground">
                  Only {deal.cap} seats available
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden mb-1.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-heat-simmering to-heat-boiling transition-all"
                  style={{ width: `${(deal.sold / deal.cap) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-heat-simmering">
                  {deal.remaining} spots left
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {deal.sold} claimed
                </span>
              </div>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {[
                "Everything in Pro, forever",
                "No recurring charges",
                "Early adopter badge",
                "Locked-in price guarantee",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[12px]">
                  <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-heat-simmering" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full h-10 text-xs bg-gradient-to-r from-heat-simmering to-heat-boiling text-white hover:brightness-110"
              disabled={!deal.available || checkingOut !== null}
              onClick={() => handleCheckout("lifetime")}
            >
              <CrownIcon className="size-3 mr-1" />
              {checkingOut === "lifetime" ? "Redirecting..." : deal.available ? "Claim Lifetime Access" : "Sold Out"}
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14 text-muted-foreground">
          {[
            { icon: ShieldCheckIcon, text: "Secure payments via PhonePe" },
            { icon: ZapIcon, text: "7-day free trial, no card required" },
            { icon: SparklesIcon, text: "Instant access after payment" },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-[11px]">
              <badge.icon className="size-3.5" />
              {badge.text}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-xl w-full mt-20">
          <h2 className="text-lg font-semibold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How does the free trial work?",
                a: "You get 7 days of full Pro access when you sign up. No payment required. After the trial ends, subscribe to any plan to continue.",
              },
              {
                q: "Can I switch between monthly and yearly?",
                a: "Yes, you can upgrade or downgrade anytime. Contact support and we'll handle the switch for you.",
              },
              {
                q: "What happens to my Lifetime deal if you add features?",
                a: "Lifetime means lifetime. All future Pro features are included at no extra cost, forever.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI, credit/debit cards, net banking, and wallets via PhonePe. Payments are processed securely.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border/25 bg-card/60 p-5">
                <h3 className="text-[13px] font-semibold text-foreground mb-1.5">{faq.q}</h3>
                <p className="text-[12px] leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PricingClient({ deal }: { deal: LifetimeDealInfo }) {
  return (
    <Suspense>
      <PricingContent deal={deal} />
    </Suspense>
  )
}
