import type { Metadata } from "next";
import { Suspense } from "react";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
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
});

export const metadata: Metadata = {
  title: "SignalSky — Market Signal Scanner",
  description: "Professional-grade stock signal scanner for India & US markets. Track Reset & Reclaim breakouts with real-time market health monitoring.",
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
      </body>
    </html>
  );
}
