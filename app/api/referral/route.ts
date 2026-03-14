import { NextResponse } from "next/server"
import { getSessionForApi } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/referral
 * Returns the current user's referral code and stats.
 * Generates a referral code if not already assigned.
 */
export async function GET() {
  const session = await getSessionForApi()
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { referralCode: true, name: true, email: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Generate a referral code if the user doesn't have one yet
  if (!user.referralCode) {
    const code = generateReferralCode(user.name ?? user.email ?? session.userId)
    user = await prisma.user.update({
      where: { id: session.userId },
      data: { referralCode: code },
      select: { referralCode: true, name: true, email: true },
    })
  }

  // Count how many users used this referral code
  const referralCount = await prisma.user.count({
    where: { referredBy: user.referralCode },
  })

  // Count how many of those converted to paid
  const conversions = await prisma.user.count({
    where: {
      referredBy: user.referralCode,
      tier: { in: ["PRO", "INSTITUTIONAL"] },
    },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://signalsky.app"

  return NextResponse.json({
    referralCode: user.referralCode,
    referralUrl: `${appUrl}/r/${user.referralCode}`,
    referralCount,
    conversions,
  })
}

function generateReferralCode(seed: string): string {
  // Take first 6 letters of the seed (name or email username)
  const letters = seed
    .replace(/@.*/, "") // strip email domain
    .replace(/[^a-zA-Z]/g, "") // keep only letters
    .toUpperCase()
    .slice(0, 6)
    .padEnd(3, "X") // ensure at least 3 chars

  // 4 random digits
  const digits = Math.floor(1000 + Math.random() * 9000).toString()

  return `${letters}${digits}`.slice(0, 20)
}
