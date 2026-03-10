/**
 * PhonePe Payment Gateway client
 * Docs: https://developer.phonepe.com/payment-gateway
 */

const IS_PRODUCTION = process.env.PHONEPE_ENV === "production"

const BASE_URL = IS_PRODUCTION
  ? "https://api.phonepe.com/apis/pg"
  : "https://api-preprod.phonepe.com/apis/pg-sandbox"

const AUTH_URL = IS_PRODUCTION
  ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
  : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token"

// ── Token cache ────────────────────────────────────────────────

let cachedToken: { token: string; expiresAt: number } | null = null

export async function getToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() / 1000 + 60) {
    return cachedToken.token
  }

  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.PHONEPE_CLIENT_ID!,
      client_secret: process.env.PHONEPE_CLIENT_SECRET!,
      client_version: process.env.PHONEPE_CLIENT_VERSION!,
      grant_type: "client_credentials",
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe auth failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: data.expires_at,
  }

  return data.access_token
}

// ── One-time Payment (lifetime deal) ──────────────────────────

export async function createPayment(opts: {
  orderId: string
  amountPaisa: number
  redirectUrl: string
  metaInfo?: Record<string, string>
}): Promise<{ orderId: string; redirectUrl: string }> {
  const token = await getToken()

  const res = await fetch(`${BASE_URL}/checkout/v2/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
    body: JSON.stringify({
      merchantOrderId: opts.orderId,
      amount: opts.amountPaisa,
      expireAfter: 1800,
      metaInfo: opts.metaInfo ?? {},
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: opts.redirectUrl,
        },
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe create payment failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  return {
    orderId: data.orderId,
    redirectUrl: data.redirectUrl,
  }
}

// ── Subscription Setup (monthly / yearly autopay) ─────────────

export async function createSubscription(opts: {
  merchantOrderId: string
  merchantSubscriptionId: string
  amountPaisa: number
  frequency: "MONTHLY" | "YEARLY"
  redirectUrl: string
  metaInfo?: Record<string, string>
}): Promise<{ orderId: string; redirectUrl: string }> {
  const token = await getToken()

  // Mandate valid for 5 years
  const expireAt = Date.now() + 5 * 365 * 24 * 60 * 60 * 1000

  const res = await fetch(`${BASE_URL}/checkout/v2/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
    body: JSON.stringify({
      merchantOrderId: opts.merchantOrderId,
      amount: opts.amountPaisa,
      expireAfter: 1800,
      metaInfo: opts.metaInfo ?? {},
      paymentFlow: {
        type: "SUBSCRIPTION_CHECKOUT_SETUP",
        merchantUrls: {
          redirectUrl: opts.redirectUrl,
        },
        subscriptionDetails: {
          subscriptionType: "RECURRING",
          merchantSubscriptionId: opts.merchantSubscriptionId,
          authWorkflowType: "TRANSACTION", // first payment = actual charge during mandate setup
          amountType: "FIXED",
          maxAmount: opts.amountPaisa,
          frequency: opts.frequency,
          // productType: UPI_MANDATE = UPI autopay (primary autopay method in India)
          // Card/netbanking recurring require CARD_MANDATE / NB_MANDATE to be enabled
          // on your PhonePe merchant account separately (contact PhonePe support)
          productType: "UPI_MANDATE",
          expireAt,
        },
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe create subscription failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  console.log("[phonepe] createSubscription response:", JSON.stringify(data))
  return {
    orderId: data.orderId,
    redirectUrl: data.redirectUrl,
  }
}

// ── Check Order Status ─────────────────────────────────────────
// For subscription orders: /subscriptions/v2/order/{id}/status
// For one-time orders:     /checkout/v2/order/{id}/status
// We try subscriptions first, fall back to checkout endpoint.

export async function getOrderStatus(merchantOrderId: string): Promise<{
  state: string
  orderId: string
  amount: number
}> {
  const token = await getToken()

  // Try subscription order status first (covers monthly/yearly mandate setup orders)
  const subRes = await fetch(
    `${BASE_URL}/subscriptions/v2/order/${merchantOrderId}/status`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    }
  )

  if (subRes.ok) {
    const data = await subRes.json()
    console.log(`[phonepe] subscription order status for ${merchantOrderId}:`, JSON.stringify(data))
    return { state: data.state, orderId: data.orderId ?? merchantOrderId, amount: data.amount }
  }

  // Fall back to checkout order status (lifetime one-time payments)
  const res = await fetch(
    `${BASE_URL}/checkout/v2/order/${merchantOrderId}/status`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe order status failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  console.log(`[phonepe] checkout order status for ${merchantOrderId}:`, JSON.stringify(data))
  return { state: data.state, orderId: data.orderId ?? merchantOrderId, amount: data.amount }
}

// ── Subscription Status ────────────────────────────────────────

export async function getSubscriptionStatus(merchantSubscriptionId: string): Promise<{
  merchantSubscriptionId: string
  state: string
  frequency: string
  maxAmount: number
  expireAt: number
  amountType: string
}> {
  const token = await getToken()

  const res = await fetch(
    `${BASE_URL}/subscriptions/v2/${merchantSubscriptionId}/status?details=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe subscription status failed: ${res.status} ${text}`)
  }

  return res.json()
}

// ── Notify Redemption (trigger recurring charge) ───────────────

export async function notifyRedemption(opts: {
  merchantOrderId: string
  merchantSubscriptionId: string
  amountPaisa: number
}): Promise<{ orderId: string; state: string }> {
  const token = await getToken()

  const res = await fetch(`${BASE_URL}/subscriptions/v2/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
    body: JSON.stringify({
      merchantOrderId: opts.merchantOrderId,
      amount: opts.amountPaisa,
      paymentFlow: {
        type: "SUBSCRIPTION_REDEMPTION",
        merchantSubscriptionId: opts.merchantSubscriptionId,
        redemptionRetryStrategy: "STANDARD",
        autoDebit: true, // PhonePe auto-executes debit
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe notify redemption failed: ${res.status} ${text}`)
  }

  return res.json()
}

// ── Execute Redemption (direct debit, bypasses 24hr notify window) ──

export async function executeRedemption(opts: {
  merchantOrderId: string
  merchantSubscriptionId: string
  amountPaisa: number
}): Promise<{ orderId: string; state: string }> {
  const token = await getToken()

  const res = await fetch(`${BASE_URL}/subscriptions/v2/redeem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
    body: JSON.stringify({
      merchantOrderId: opts.merchantOrderId,
      amount: opts.amountPaisa,
      paymentFlow: {
        type: "SUBSCRIPTION_REDEMPTION",
        merchantSubscriptionId: opts.merchantSubscriptionId,
        redemptionRetryStrategy: "STANDARD",
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PhonePe execute redemption failed: ${res.status} ${text}`)
  }

  return res.json()
}

// ── Cancel Subscription ────────────────────────────────────────

export async function cancelSubscription(merchantSubscriptionId: string): Promise<void> {
  const token = await getToken()

  const res = await fetch(
    `${BASE_URL}/subscriptions/v2/${merchantSubscriptionId}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    }
  )

  // 204 = success (no content)
  if (!res.ok && res.status !== 204) {
    const text = await res.text()
    throw new Error(`PhonePe cancel subscription failed: ${res.status} ${text}`)
  }
}
