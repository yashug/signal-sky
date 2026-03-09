"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { JournalTradeData } from "@/lib/data/journal"

export const JOURNAL_QUERY_KEY = ["journal"] as const

async function fetchJournal(): Promise<JournalTradeData[]> {
  const res = await fetch("/api/journal")
  if (!res.ok) throw new Error("Failed to fetch journal")
  const data = await res.json()
  return data.trades ?? []
}

export function useJournalTrades(initialData?: JournalTradeData[]) {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEY,
    queryFn: fetchJournal,
    initialData,
    staleTime: 0,
  })
}

export function useDeleteTrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/journal/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: JOURNAL_QUERY_KEY })
      const previous = queryClient.getQueryData<JournalTradeData[]>(JOURNAL_QUERY_KEY)
      queryClient.setQueryData<JournalTradeData[]>(JOURNAL_QUERY_KEY, (old = []) =>
        old.filter((t) => t.id !== id)
      )
      return { previous }
    },
    onSuccess: () => toast("Trade deleted"),
    onError: (_, __, ctx) => {
      queryClient.setQueryData(JOURNAL_QUERY_KEY, ctx?.previous)
      toast.error("Failed to delete trade")
    },
  })
}

export function useExitTrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      exitPrice,
      exitDate,
      exitQuantity,
      exitReason,
    }: {
      id: string
      exitPrice: number
      exitDate: string
      exitQuantity: number
      exitReason: string
    }) => {
      const res = await fetch(`/api/journal/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exitPrice, exitDate, exitQuantity, exitReason }),
      })
      if (!res.ok) throw new Error()
      return res.json()
    },
    onSuccess: (data) => {
      if (data.partial) {
        toast(`Exited ${data.exitedQty} shares — ${data.remainingQty} still open`)
      } else {
        toast("Trade closed")
      }
      // Refetch to get accurate server state (partial exit creates a new trade record)
      queryClient.invalidateQueries({ queryKey: JOURNAL_QUERY_KEY })
    },
    onError: () => toast.error("Failed to exit trade"),
  })
}
