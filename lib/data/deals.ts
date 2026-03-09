import { cacheTag, cacheLife } from "next/cache"
import { prisma } from "@/lib/prisma"
import { LIFETIME_DEAL } from "@/lib/plans"

export type LifetimeDealInfo = {
  cap: number
  sold: number
  remaining: number
  available: boolean
}

export async function getLifetimeDealInfo(): Promise<LifetimeDealInfo> {
  "use cache"
  cacheTag("lifetime-deals")
  cacheLife("hours")

  try {
    let deal = await prisma.lifetimeDeal.findFirst()

    if (!deal) {
      deal = await prisma.lifetimeDeal.create({
        data: { cap: LIFETIME_DEAL.cap, sold: 0 },
      })
    }

    return {
      cap: deal.cap,
      sold: deal.sold,
      remaining: Math.max(0, deal.cap - deal.sold),
      available: deal.sold < deal.cap,
    }
  } catch {
    return {
      cap: LIFETIME_DEAL.cap,
      sold: 0,
      remaining: LIFETIME_DEAL.cap,
      available: true,
    }
  }
}
