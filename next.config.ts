import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // Client-side router cache: keep RSC payloads for dynamic routes (dashboard) so
    // in-app navigation doesn't refetch every time. Data changes daily after sync/scan.
    staleTimes: {
      dynamic: 3600,   // 1 hour for dynamic (e.g. /scanner, /backtests)
      static: 86400,   // 24 hours for static/prefetched
    },
  },
};

export default nextConfig;
