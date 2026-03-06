import type { Metadata } from "next";
import { Suspense } from "react";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { getInitialUser } from "@/lib/auth";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
  preload: false,
});

const siteUrl = "https://signalsky.app"

export const metadata: Metadata = {
  title: {
    default: "SignalSky — Market Signal Scanner",
    template: "%s | SignalSky",
  },
  description:
    "Professional-grade stock signal scanner for India & US markets. Track Reset & Reclaim breakouts with real-time market health monitoring.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "SignalSky",
    title: "SignalSky — Market Signal Scanner",
    description:
      "Find breakout setups across Nifty 50, S&P 100 & NASDAQ 100. Reset & Reclaim strategy scanner with backtests, trade journal & market health dashboard.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalSky — Market Signal Scanner",
    description:
      "Find breakout setups across Nifty 50, S&P 100 & NASDAQ 100. Reset & Reclaim strategy scanner with backtests, trade journal & market health dashboard.",
  },
  keywords: [
    "stock scanner",
    "breakout signals",
    "Nifty 50",
    "S&P 100",
    "NASDAQ 100",
    "Reset and Reclaim",
    "EMA 200",
    "market health",
    "India stocks",
    "US stocks",
    "trading signals",
  ],
  robots: { index: true, follow: true },
};

async function AuthenticatedProviders({ children }: { children: React.ReactNode }) {
  const initialUser = await getInitialUser()
  return <Providers initialUser={initialUser}>{children}</Providers>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Suspense>
          <AuthenticatedProviders>
            {children}
          </AuthenticatedProviders>
        </Suspense>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "bg-surface-raised border-border text-foreground",
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
