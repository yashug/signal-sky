import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,     // Show cached RSC immediately on navigation, refresh silently in background
      static: 86400,
    },
    viewTransition: true,         // Enable View Transitions API for <Link> navigation
    prefetchInlining: true,       // Bundle all segment data in 1 prefetch request per link (fewer round-trips)
    appNewScrollHandler: true,    // Improved scroll/focus management after navigation
  },
  logging: {
    browserToTerminal: "error",   // Forward browser errors to dev terminal
  },
};

export default nextConfig;
