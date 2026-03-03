import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, ZapIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
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
        <h1 className="text-2xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-xs text-muted-foreground mb-10">Last updated: March 1, 2026</p>

        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using SignalSky (&quot;the Service&quot;), operated by SignalSky (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            SignalSky is a stock market signal scanner and trading toolkit that provides breakout signal detection, backtesting, trade journaling, and market health dashboards for Indian (NSE) and US (NASDAQ/S&amp;P) markets. The Service is available via web application at signalsky.app.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You must sign in via Google OAuth to access the Service. You are responsible for maintaining the security of your account. You must provide accurate information and promptly update any changes. We reserve the right to suspend or terminate accounts that violate these Terms.
          </p>

          <h2>4. Free Trial &amp; Subscriptions</h2>
          <p>
            New users receive a 7-day free trial with full access. After the trial, continued access requires a paid subscription (Monthly, Yearly, or Lifetime). Subscription prices are listed on our <Link href="/pricing" className="text-primary hover:underline">Pricing page</Link> and may change with prior notice.
          </p>

          <h2>5. Payment Terms</h2>
          <p>
            Payments are processed securely through PhonePe Payment Gateway. All prices are in Indian Rupees (INR). By subscribing, you authorize us to charge your selected payment method. Monthly and yearly subscriptions renew automatically unless cancelled before the renewal date.
          </p>

          <h2>6. Disclaimer — Not Financial Advice</h2>
          <p>
            <strong>The Service is for informational and educational purposes only.</strong> Signals, backtests, and data provided by SignalSky do not constitute financial advice, investment recommendations, or solicitation to buy or sell securities. You are solely responsible for your investment decisions. Past performance does not guarantee future results. Always consult a qualified financial advisor before making investment decisions.
          </p>

          <h2>7. Data Accuracy</h2>
          <p>
            While we strive for accuracy, market data is sourced from third-party providers and may contain delays, errors, or omissions. We do not guarantee the completeness or real-time accuracy of any data displayed. Use the Service at your own risk.
          </p>

          <h2>8. Prohibited Use</h2>
          <p>
            You may not: (a) resell, redistribute, or commercially exploit the Service without permission; (b) attempt to reverse-engineer, decompile, or hack the Service; (c) use automated bots or scrapers to extract data; (d) use the Service for any unlawful purpose.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            All content, design, code, and branding of SignalSky are the intellectual property of SignalSky. You may not copy, modify, or distribute any part of the Service without express written permission.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, SignalSky shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Service, including but not limited to financial losses from trading decisions made based on our signals or data.
          </p>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access at any time, with or without notice, for violation of these Terms or any other reason. Upon termination, your right to use the Service ceases immediately.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms. We will notify users of material changes via email or in-app notice.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
          </p>

          <h2>14. Contact</h2>
          <p>
            For questions about these Terms, contact us at <a href="mailto:support@signalsky.app" className="text-primary hover:underline">support@signalsky.app</a>.
          </p>
        </div>
      </main>
    </div>
  )
}
