import { getJournalTrades } from "@/lib/data/journal"
import { JournalClient } from "./journal-client"

export default async function JournalPage() {
  const trades = await getJournalTrades()
  return <JournalClient initialTrades={trades} />
}
