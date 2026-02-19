// ── Plan Definitions (INR pricing) ─────────────────────────────────

export type BillingInterval = "monthly" | "yearly" | "lifetime"

export const PRO_PLAN = {
  name: "Pro",
  description: "Full access for serious traders",
  price: {
    monthly: 499,
    yearly: 4999,
    lifetime: 9999,
  },
  /** Anchor / "MRP" prices for strikethrough display */
  mrp: {
    monthly: 999,
    yearly: 9999,
    lifetime: 24999,
  },
  features: [
    "All Nifty indices + S&P 100 & NASDAQ 100",
    "Unlimited backtests",
    "Real-time Telegram alerts",
    "Volume surge filter",
    "Unlimited trade journal",
    "Priority support",
    "Export to CSV",
  ],
} as const

// ── Lifetime Deal Config ────────────────────────────────────────

export const LIFETIME_DEAL = {
  /** Total lifetime seats available */
  cap: 100,
  /** Price in INR */
  price: 9999,
  /** Anchor price for strikethrough */
  mrp: 24999,
}

// ── Helpers ─────────────────────────────────────────────────────

export function isPro(tier: string | undefined): boolean {
  return tier === "PRO" || tier === "INSTITUTIONAL"
}

/** Format INR price for display */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
