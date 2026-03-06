import { Suspense } from "react"
import { getJournalTrades } from "@/lib/data/journal"
import { JournalClient } from "./journal-client"
import { Loader2Icon } from "lucide-react"

async function JournalData() {
  const trades = await getJournalTrades()
  return <JournalClient initialTrades={trades} />
}

export default function JournalPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2Icon className="size-5 text-primary animate-spin" />
      </div>
    }>
      <JournalData />
    </Suspense>
  )
}
