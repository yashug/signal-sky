import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

/**
 * /r/[code] — Referral landing page
 * Sets a cookie with the referral code, then redirects to sign-in.
 * The referral code is applied when the user subscribes.
 */
export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  // Validate the code exists
  const referrer = await prisma.user.findFirst({
    where: { referralCode: code.toUpperCase() },
    select: { id: true, name: true },
  })

  // Set a 30-day referral cookie regardless (if referrer exists)
  if (referrer) {
    const cookieStore = await cookies()
    cookieStore.set("referral_code", code.toUpperCase(), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    })
  }

  redirect("/sign-in")
}
