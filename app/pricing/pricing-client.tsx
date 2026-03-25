"use client"

import { useState, Suspense, useEffect } from "react"
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
  Loader2Icon,
  BellIcon,
  StarIcon,
  BookOpenIcon,
  TrendingUpIcon,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { LifetimeDealInfo } from "@/lib/data/deals"

type TrialSummary = {
  watchlistCount: number
  journalCount: number
  openTrades: number
  watchlistSymbols?: { symbol: string; exchange: string }[]
}

const PRO_FEATURES = [
  "All Nifty indices (50, 100, 200, Midcap, Smallcap)",
  "S&P 100 & NASDAQ 100 coverage",
  "Telegram & email signal alerts",
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
  const [signingOut, setSigningOut] = useState(false)
  const [trialSummary, setTrialSummary] = useState<TrialSummary | null>(null)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  // Load Razorpay checkout.js once
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!isExpired) return
    fetch("/api/user/trial-summary")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setTrialSummary(data) })
      .catch(() => {})
  }, [isExpired])

  useEffect(() => {
    if (!isExpired) return
    // 24 hours countdown from when the user lands on the page
    const target = Date.now() + 24 * 60 * 60 * 1000
    const tick = () => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000))
      setSecondsLeft(diff)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [isExpired])

  function formatCountdown(s: number) {
    const h = Math.floor(s / 3600).toString().padStart(2, "0")
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0")
    const sec = (s % 60).toString().padStart(2, "0")
    return { h, m, sec }
  }

  async function handleCheckout(interval: "monthly" | "yearly" | "lifetime") {
    setCheckingOut(interval)
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
        setCheckingOut(null)
        return
      }

      const options: Record<string, unknown> = {
        key: data.keyId,
        name: "SignalSky",
        description:
          interval === "monthly"
            ? "Pro Monthly"
            : interval === "yearly"
            ? "Pro Yearly"
            : "Lifetime Access",
        theme: { color: "#4fa0e2" },
        modal: { ondismiss: () => setCheckingOut(null) },
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_subscription_id?: string
          razorpay_order_id?: string
          razorpay_signature: string
        }) => {
          const callbackRes = await fetch("/api/payments/callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              interval,
            }),
          })
          const result = await callbackRes.json()
          if (result.success) {
            router.push("/scanner?payment=success")
          } else {
            toast.error("Payment verification failed. Please contact support.")
            setCheckingOut(null)
          }
        },
      }

      if (data.subscriptionId) {
        options.subscription_id = data.subscriptionId
      } else {
        options.order_id = data.orderId
        options.amount = data.amount
        options.currency = "INR"
      }

      const rzp = new (window as unknown as { Razorpay: new (opts: Record<string, unknown>) => { open(): void } }).Razorpay(options)
      rzp.open()
    } catch {
      toast.error("Something went wrong. Please try again.")
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
                if (signingOut) return
                setSigningOut(true)
                const supabase = createClient()
                await supabase.auth.signOut()
                window.location.href = "/"
              }}
              disabled={signingOut}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-bear transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingOut ? (
                <Loader2Icon className="size-3 animate-spin" />
              ) : (
                <LogOutIcon className="size-3" />
              )}
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center px-4 py-16">
        {isExpired && (
          <div className="flex flex-col gap-3 mb-8 max-w-lg w-full">
            <div className="flex items-center gap-2 rounded-lg border border-heat-simmering/30 bg-heat-simmering/5 px-4 py-2.5">
              <AlertCircleIcon className="size-4 text-heat-simmering shrink-0" />
              <p className="text-xs text-heat-simmering">
                Your 7-day free trial has ended. Subscribe to continue using SignalSky.
              </p>
            </div>
            {trialSummary && (trialSummary.watchlistCount > 0 || trialSummary.journalCount > 0) && (
              <div className="rounded-xl border border-border/30 bg-card/60 px-5 py-4">
                <p className="text-[11px] font-semibold text-foreground mb-3">
                  Here&apos;s what you built during your trial:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {trialSummary.watchlistCount > 0 && (
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-primary/5 p-3">
                      <StarIcon className="size-4 text-primary" />
                      <span className="font-mono text-lg font-bold text-foreground">
                        {trialSummary.watchlistCount}
                      </span>
                      <span className="text-[10px] text-muted-foreground text-center">
                        watchlist{trialSummary.watchlistCount !== 1 ? " stocks" : " stock"}
                      </span>
                    </div>
                  )}
                  {trialSummary.journalCount > 0 && (
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-bull/5 p-3">
                      <BookOpenIcon className="size-4 text-bull" />
                      <span className="font-mono text-lg font-bold text-foreground">
                        {trialSummary.journalCount}
                      </span>
                      <span className="text-[10px] text-muted-foreground text-center">
                        trade{trialSummary.journalCount !== 1 ? "s" : ""} logged
                      </span>
                    </div>
                  )}
                  {trialSummary.openTrades > 0 && (
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-heat-simmering/5 p-3">
                      <TrendingUpIcon className="size-4 text-heat-simmering" />
                      <span className="font-mono text-lg font-bold text-foreground">
                        {trialSummary.openTrades}
                      </span>
                      <span className="text-[10px] text-muted-foreground text-center">
                        open position{trialSummary.openTrades !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 text-center">
                  Subscribe to keep your data and continue tracking.
                </p>
                {trialSummary.watchlistSymbols && trialSummary.watchlistSymbols.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[11px] font-semibold text-foreground mb-2">Your watchlist — subscribe to access:</p>
                    <div className="flex flex-wrap gap-2">
                      {trialSummary.watchlistSymbols.map((s) => (
                        <div
                          key={s.symbol}
                          className="relative rounded-lg border border-border/30 bg-muted/40 px-3 py-2 overflow-hidden"
                        >
                          {/* Blurred content */}
                          <div className="blur-[3px] select-none pointer-events-none">
                            <span className="font-mono text-[12px] font-bold text-foreground">{s.symbol}</span>
                            <span className="text-[10px] text-muted-foreground ml-1.5">{s.exchange}</span>
                          </div>
                          {/* Lock overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-3.5 text-muted-foreground/40">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {secondsLeft !== null && secondsLeft > 0 && (
              <div className="rounded-xl border border-heat-boiling/20 bg-heat-boiling/5 px-5 py-4 max-w-lg w-full">
                <p className="text-[11px] text-heat-boiling font-semibold mb-2 uppercase tracking-wider">
                  Subscribe in the next
                </p>
                <div className="flex items-center gap-2">
                  {(() => {
                    const { h, m, sec } = formatCountdown(secondsLeft)
                    return (
                      <>
                        {[
                          { val: h, label: "hr" },
                          { val: m, label: "min" },
                          { val: sec, label: "sec" },
                        ].map(({ val, label }, i) => (
                          <>
                            {i > 0 && <span key={`sep-${label}`} className="text-heat-boiling/40 font-mono text-lg font-bold">:</span>}
                            <div key={label} className="flex flex-col items-center">
                              <span className="font-mono text-2xl font-bold text-heat-boiling leading-none">{val}</span>
                              <span className="text-[9px] text-heat-boiling/60 uppercase tracking-wider mt-0.5">{label}</span>
                            </div>
                          </>
                        ))}
                        <span className="text-[11px] text-muted-foreground ml-2">to lock in current pricing</span>
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
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
            Start with a 7-day free trial. Unlock all Nifty &amp; US indices, Telegram &amp; email alerts, unlimited backtests, and more.
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
                  {feature.startsWith("Telegram") ? (
                    <BellIcon className="size-3.5 mt-0.5 shrink-0 text-heat-boiling" />
                  ) : (
                    <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  )}
                  <span className={feature.startsWith("Telegram") ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {feature}
                    {feature.startsWith("Telegram") && (
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-heat-boiling/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heat-boiling">New</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full h-10 text-xs"
              variant="outline"
              onClick={() => handleCheckout("monthly")}
              disabled={checkingOut === "monthly"}
            >
              {checkingOut === "monthly" ? (
                <Loader2Icon className="size-3 mr-1 animate-spin" />
              ) : (
                <SparklesIcon className="size-3 mr-1" />
              )}
              {checkingOut === "monthly" ? "Opening..." : "Go Monthly"}
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
                  {feature.startsWith("Telegram") ? (
                    <BellIcon className="size-3.5 mt-0.5 shrink-0 text-heat-boiling" />
                  ) : (
                    <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  )}
                  <span className={feature.startsWith("Telegram") ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {feature}
                    {feature.startsWith("Telegram") && (
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-heat-boiling/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heat-boiling">New</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full h-10 text-xs glow-signal"
              onClick={() => handleCheckout("yearly")}
              disabled={checkingOut === "yearly"}
            >
              {checkingOut === "yearly" ? (
                <Loader2Icon className="size-3 mr-1 animate-spin" />
              ) : (
                <SparklesIcon className="size-3 mr-1" />
              )}
              {checkingOut === "yearly" ? "Opening..." : "Upgrade to Pro"}
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              Saves ₹{formatINR(monthlyPrice * 12 - yearlyPrice)} vs monthly over 12 months
            </p>
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
              disabled={!deal.available || checkingOut === "lifetime"}
              onClick={() => handleCheckout("lifetime")}
            >
              {checkingOut === "lifetime" ? (
                <Loader2Icon className="size-3 mr-1 animate-spin" />
              ) : (
                <CrownIcon className="size-3 mr-1" />
              )}
              {checkingOut === "lifetime" ? "Opening..." : deal.available ? "Claim Lifetime Access" : "Sold Out"}
            </Button>
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className="flex items-start gap-3 mt-8 rounded-xl border border-bull/20 bg-bull/5 px-5 py-4 max-w-2xl w-full">
          <ShieldCheckIcon className="size-4 text-bull shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">7-day money-back guarantee</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Not satisfied within 7 days of payment? Email{" "}
              <a href="mailto:support@signalsky.app" className="underline">support@signalsky.app</a>{" "}
              for a full refund. No questions asked.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14 text-muted-foreground">
          {[
            { icon: ShieldCheckIcon, text: "Secure payments via Razorpay" },
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
                q: "Do you offer a money-back guarantee?",
                a: "Yes. If you're not happy within 7 days of your first payment, email support@signalsky.app and we'll refund you in full. No questions, no hassle.",
              },
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
                a: "We accept UPI, credit/debit cards, net banking, and wallets via Razorpay. Payments are processed securely.",
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
