import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, ZapIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/15 py-4">
        <div className="mx-auto max-w-3xl px-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ZapIcon className="size-3.5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">SignalSky</span>
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeftIcon className="size-3" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Refund &amp; Cancellation Policy</h1>
        <p className="text-xs text-muted-foreground mb-10">Last updated: March 1, 2026</p>

        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
          <h2>1. Service Provider &amp; Business Information</h2>
          <p>
            Refunds and cancellations are handled by the operator of SignalSky: a <strong>Sole Proprietorship</strong> under the trade name <strong>YG IT Global Solutions</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Trade name:</strong> YG IT Global Solutions</li>
            <li><strong>GSTIN:</strong> 36BKTPG1266J1ZS</li>
            <li><strong>Email:</strong> <a href="mailto:support@signalsky.app" className="text-primary hover:underline">support@signalsky.app</a></li>
            <li></li>
          </ul>

          <h2>2. Free Trial</h2>
          <p>
            All new users receive a <strong>7-day free trial</strong> with full access to all features. No payment information is required during the trial. You can cancel at any time before the trial ends without any charge.
          </p>

          <h2>3. Subscription Plans</h2>
          <p>SignalSky offers the following paid plans:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Monthly Plan (₹299/month):</strong> Billed monthly. Renews automatically.</li>
            <li><strong>Yearly Plan (₹2,499/year):</strong> Billed annually. Renews automatically.</li>
            <li><strong>Lifetime Plan (₹4,999 one-time):</strong> One-time payment. No renewal.</li>
          </ul>

          <h2>4. Cancellation Policy</h2>
          <p>
            You may cancel your Monthly or Yearly subscription at any time from your <Link href="/settings" className="text-primary hover:underline">account settings</Link>. Upon cancellation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Your subscription will remain active until the end of the current billing period.</li>
            <li>You will not be charged for the next billing cycle.</li>
            <li>No partial refunds are issued for unused time within the current billing period.</li>
          </ul>

          <h2>5. Refund Policy</h2>

          <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">Monthly &amp; Yearly Plans</h3>
          <p>
            We offer a <strong>full refund within 7 days</strong> of your first payment if you are not satisfied with the Service. To request a refund, email us at <a href="mailto:support@signalsky.app" className="text-primary hover:underline">support@signalsky.app</a> with your registered email address and reason for the refund. Refunds after the 7-day window are not available.
          </p>

          <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">Lifetime Plan</h3>
          <p>
            Lifetime plan purchases are eligible for a <strong>full refund within 14 days</strong> of purchase. After 14 days, lifetime plan purchases are non-refundable. To request a refund, email us at <a href="mailto:support@signalsky.app" className="text-primary hover:underline">support@signalsky.app</a>.
          </p>

          <h2>6. Refund Process</h2>
          <p>
            Once a refund request is approved:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Refunds are processed within <strong>5–7 business days</strong>.</li>
            <li>The refund will be credited to the original payment method used during purchase.</li>
            <li>Your account access will be revoked upon refund processing.</li>
          </ul>

          <h2>7. Exceptions</h2>
          <p>
            Refunds will not be issued for: (a) accounts terminated for violation of our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>; (b) duplicate purchases — please contact us for resolution; (c) dissatisfaction with market data or signal results, as the Service provides informational tools and not guaranteed trading outcomes.
          </p>

          <h2>8. Contact</h2>
          <p>
            For refund or cancellation requests, contact YG IT Global Solutions — Email: <a href="mailto:support@signalsky.app" className="text-primary hover:underline">support@signalsky.app</a>. Please include your registered email address and order details.
          </p>
        </div>
      </main>
    </div>
  )
}
