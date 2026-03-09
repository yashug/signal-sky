import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,      // Never cache dynamic RSC payloads client-side — user-specific pages (watchlist, journal) must always be fresh
      static: 86400,   // 24 hours for static/prefetched
    },
  },
};

export default nextConfig;
