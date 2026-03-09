export const runtime = 'nodejs'
import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

const VALID_TAGS = ["signals", "backtests", "market-health", "lifetime-deals"]

/**
 * POST /api/revalidate
 * On-demand cache invalidation. Called after scans/backtests complete.
 *
 * Body: { tags: string[] }
 * Headers: x-revalidation-secret (must match REVALIDATION_SECRET env var)
 *
 * Can also be called internally from admin routes without the secret header.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidation-secret")
  const expectedSecret = process.env.REVALIDATION_SECRET

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const tags: string[] = Array.isArray(body.tags) ? body.tags : [body.tag].filter(Boolean)

    const revalidated: string[] = []
    for (const tag of tags) {
      if (VALID_TAGS.includes(tag)) {
        revalidateTag(tag, { expire: 0 })
        revalidated.push(tag)
      }
    }

    return NextResponse.json({
      revalidated,
      now: Date.now(),
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
