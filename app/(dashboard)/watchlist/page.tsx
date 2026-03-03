import { getWatchlistItems } from "@/lib/data/watchlist"
import { WatchlistClient } from "./watchlist-client"

export default async function WatchlistPage() {
  const items = await getWatchlistItems()
  return <WatchlistClient initialItems={items} />
}
