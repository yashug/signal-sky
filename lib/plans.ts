// ── Plan Definitions (INR pricing) ─────────────────────────────────

export type BillingInterval = "monthly" | "yearly" | "lifetime"

export const PRO_PLAN = {
  name: "Pro",
  description: "Full access for serious traders",
  price: {
    monthly: 299,
    yearly: 2999,
    lifetime: 4999,
  },
  /** Anchor / "MRP" prices for strikethrough display */
  mrp: {
    monthly: 599,
    yearly: 5999,
    lifetime: 14999,
  },
  features: [
    "All Nifty indices + S&P 100 & NASDAQ 100",
    "Unlimited backtests",
    "Unlimited trade journal",
    "Priority support",
  ],
} as const

// ── Lifetime Deal Config ────────────────────────────────────────

export const LIFETIME_DEAL = {
  /** Total lifetime seats available */
  cap: 100,
  /** Price in INR */
  price: 4999,
  /** Anchor price for strikethrough */
  mrp: 14999,
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
