import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    })
  }
  return _stripe
}

// ── Plan Definitions (INR pricing) ─────────────────────────────────

export type BillingInterval = "monthly" | "yearly" | "lifetime"

export const PLANS = {
  free: {
    name: "Free",
    description: "Get started with core scanning features",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Nifty 50 + S&P 100 scanner",
      "Delayed Telegram alerts (+15 min)",
      "Basic position calculator",
      "Trade journal (up to 20 trades)",
    ],
    limits: {
      universes: ["nifty50", "sp100"],
      backtestsPerDay: 0,
      alertDelay: 15,
      volumeFilter: false,
      journalTrades: 20,
    },
  },
  pro: {
    name: "Pro",
    description: "Full access for serious traders",
    priceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? process.env.STRIPE_PRO_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
      lifetime: process.env.STRIPE_PRO_LIFETIME_PRICE_ID,
    },
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
    limits: {
      universes: [
        "nifty50", "niftynext50", "nifty100", "nifty200",
        "niftymidcap50", "niftymidcap100",
        "niftysmallcap50", "niftysmallcap100",
        "niftybank",
        "sp100", "nasdaq100",
      ],
      backtestsPerDay: Infinity,
      alertDelay: 0,
      volumeFilter: true,
      journalTrades: Infinity,
    },
  },
} as const

export type PlanKey = keyof typeof PLANS

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

export function getUserTier(tier: string | undefined): PlanKey {
  if (tier === "PRO" || tier === "INSTITUTIONAL") return "pro"
  return "free"
}

export function canAccessFeature(
  tier: PlanKey,
  feature: "volumeFilter" | "unlimitedBacktests" | "realTimeAlerts" | "allUniverses"
): boolean {
  switch (feature) {
    case "volumeFilter":
      return PLANS[tier].limits.volumeFilter
    case "unlimitedBacktests":
      return PLANS[tier].limits.backtestsPerDay === Infinity
    case "realTimeAlerts":
      return PLANS[tier].limits.alertDelay === 0
    case "allUniverses":
      return tier === "pro"
    default:
      return false
  }
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
