import Razorpay from "razorpay"
import crypto from "crypto"

let instance: Razorpay | null = null

export function getRazorpay() {
  if (!instance) {
    instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  }
  return instance
}

// Create a one-time order (lifetime plan)
export async function createOrder(amountInr: number, receipt: string, notes: Record<string, string>) {
  const rz = getRazorpay()
  return rz.orders.create({
    amount: amountInr * 100, // paise
    currency: "INR",
    receipt,
    notes,
  })
}

// Create a recurring subscription (monthly/yearly)
export async function createSubscription(
  planId: string,
  totalCount: number,
  notes: Record<string, string>
) {
  const rz = getRazorpay()
  return rz.subscriptions.create({
    plan_id: planId,
    total_count: totalCount,
    quantity: 1,
    customer_notify: 1,
    notes,
  })
}

// Verify payment signature after checkout modal
// For subscriptions: HMAC(payment_id + "|" + subscription_id)
// For orders: HMAC(order_id + "|" + payment_id)
export function verifySignature(payload: string, signature: string): boolean {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(payload)
    .digest("hex")
  return expected === signature
}

// Verify webhook signature
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex")
  return expected === signature
}

// Cancel a subscription
export async function cancelSubscription(subscriptionId: string) {
  const rz = getRazorpay()
  return rz.subscriptions.cancel(subscriptionId)
}

// Fetch subscription details
export async function fetchSubscription(subscriptionId: string) {
  const rz = getRazorpay()
  return rz.subscriptions.fetch(subscriptionId)
}
