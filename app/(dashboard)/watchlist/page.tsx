import { Suspense } from "react"
import { getWatchlistItems } from "@/lib/data/watchlist"
import { WatchlistClient } from "./watchlist-client"
import { Loader2Icon } from "lucide-react"

function WatchlistSkeleton() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2Icon className="size-5 text-primary animate-spin" />
    </div>
  )
}

async function WatchlistData() {
  const items = await getWatchlistItems()
  return <WatchlistClient initialItems={items} />
}

export default function WatchlistPage() {
  return (
    <Suspense fallback={<WatchlistSkeleton />}>
      <WatchlistData />
    </Suspense>
  )
}
