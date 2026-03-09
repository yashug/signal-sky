import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,     // Show cached RSC immediately on navigation, refresh silently in background
      static: 86400,
    },
  },
};

export default nextConfig;
