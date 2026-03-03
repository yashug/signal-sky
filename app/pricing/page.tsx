import { getLifetimeDealInfo } from "@/lib/data/deals"
import { PricingClient } from "./pricing-client"

export default async function PricingPage() {
  const deal = await getLifetimeDealInfo()
  return <PricingClient deal={deal} />
}
