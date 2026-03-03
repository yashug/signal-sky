import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, ZapIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground mb-10">Last updated: March 1, 2026</p>

        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
          <h2>1. Data Controller &amp; Business Information</h2>
          <p>
            SignalSky is operated by a <strong>Sole Proprietorship</strong> under the trade name <strong>YG IT Global Solutions</strong>, which is the data controller for the personal data collected through the Service.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Trade name:</strong> YG IT Global Solutions</li>
            <li><strong>GSTIN:</strong> 36BKTPG1266J1ZS</li>
            <li><strong>Email:</strong> <a href="mailto:gosulayaswanth2@gmail.com" className="text-primary hover:underline">gosulayaswanth2@gmail.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+917207477206" className="text-primary hover:underline">+91 72074 77206</a></li>
          </ul>

          <h2>2. Information We Collect</h2>
          <p>When you use SignalSky, we collect:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Account information:</strong> Name, email address, and profile picture provided by Google OAuth during sign-in.</li>
            <li><strong>Usage data:</strong> Pages visited, features used, and interaction patterns to improve the Service.</li>
            <li><strong>Trade journal data:</strong> Trade entries you create within the journaling feature, stored securely in our database.</li>
            <li><strong>Watchlist data:</strong> Symbols you add to your watchlist.</li>
            <li><strong>Payment information:</strong> Payment transactions are processed by PhonePe. We store transaction IDs and subscription status but do not store card numbers or bank account details.</li>
            <li><strong>Device information:</strong> Browser type, operating system, and screen resolution via Vercel Analytics (anonymized, no cookies).</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Provide and maintain the Service, including your personalized watchlist, journal, and preferences.</li>
            <li>Process payments and manage subscriptions.</li>
            <li>Send important account notifications (subscription expiry, payment confirmations).</li>
            <li>Analyze usage patterns to improve features and performance.</li>
            <li>Prevent fraud and enforce our Terms of Service.</li>
          </ul>

          <h2>4. Data Storage &amp; Security</h2>
          <p>
            Your data is stored on Supabase (hosted on AWS) with encryption at rest and in transit. We use industry-standard security measures including HTTPS, secure authentication tokens, and access controls. While we strive to protect your data, no method of electronic storage is 100% secure.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Supabase:</strong> Authentication and database hosting.</li>
            <li><strong>Google OAuth:</strong> Sign-in authentication.</li>
            <li><strong>PhonePe:</strong> Payment processing.</li>
            <li><strong>Vercel:</strong> Application hosting and analytics (anonymized).</li>
            <li><strong>Yahoo Finance:</strong> Market data provider (no user data shared).</li>
          </ul>
          <p>Each third-party service has its own privacy policy governing how they handle data.</p>

          <h2>6. Cookies &amp; Tracking</h2>
          <p>
            SignalSky uses essential cookies for authentication session management only. We use Vercel Analytics which is cookie-free and privacy-friendly — it collects anonymized performance and usage data without tracking individual users across sites.
          </p>

          <h2>7. Data Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information. We may share data only: (a) with your consent; (b) to comply with legal obligations; (c) to protect the rights and safety of SignalSky and its users; (d) with service providers who assist in operating the Service, bound by confidentiality agreements.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain your account data for as long as your account is active. Trade journal entries and watchlist data are retained until you delete them. If you close your account, we will delete your personal data within 30 days, except where retention is required by law.
          </p>

          <h2>9. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data.</li>
            <li><strong>Portability:</strong> Request your data in a machine-readable format.</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:gosulayaswanth2@gmail.com" className="text-primary hover:underline">gosulayaswanth2@gmail.com</a> or call +91 72074 77206.</p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>
            SignalSky is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe a child has provided us with personal data, please contact us to have it removed.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Service constitutes acceptance of the revised policy.
          </p>

          <h2>12. Contact</h2>
          <p>
            For privacy-related questions or concerns, contact YG IT Global Solutions — Email: <a href="mailto:gosulayaswanth2@gmail.com" className="text-primary hover:underline">gosulayaswanth2@gmail.com</a>, Phone: <a href="tel:+917207477206" className="text-primary hover:underline">+91 72074 77206</a>.
          </p>
        </div>
      </main>
    </div>
  )
}
