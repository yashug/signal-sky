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
  // Return cached token if still valid (with 60s buffer)
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

// ── Create Payment ─────────────────────────────────────────────

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
      expireAfter: 1800, // 30 minutes
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

// ── Check Order Status ─────────────────────────────────────────

export async function getOrderStatus(merchantOrderId: string): Promise<{
  state: string
  orderId: string
  amount: number
}> {
  const token = await getToken()

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
  return {
    state: data.state,
    orderId: data.orderId,
    amount: data.amount,
  }
}
