"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const WATCHLIST_QUERY_KEY = ["watchlist"] as const

export type WatchlistItem = {
  id: string
  symbol: string
  name: string
  exchange: string
  addedAt: string
  notes: string
  currentPrice: number
  ema200: number
  ath: number
  heat: "breakout" | "boiling" | "simmering" | "cooling"
  distanceToBreakout: number
  priceAtAdd: number | null
}

async function fetchWatchlist(): Promise<WatchlistItem[]> {
  const res = await fetch("/api/watchlist")
  if (!res.ok) throw new Error("Failed to fetch watchlist")
  const data = await res.json()
  return data.items ?? []
}

/**
 * Cached watchlist query — shared between scanner and watchlist page.
 * Pass initialData from SSR to show data instantly on first load.
 */
export function useWatchlist(initialData?: WatchlistItem[]) {
  return useQuery({
    queryKey: WATCHLIST_QUERY_KEY,
    queryFn: fetchWatchlist,
    initialData,
    staleTime: 0, // always refresh in background — user-specific data changes often
  })
}

/**
 * Returns a map of symbol → watchlist item id for fast lookup in scanner.
 */
export function useWatchlistMap(initialData?: WatchlistItem[]) {
  const { data = [] } = useWatchlist(initialData)
  const map = new Map(data.map((item) => [item.symbol, item.id]))
  return map
}

/**
 * Add/remove watchlist mutations with optimistic updates.
 * The cache is updated instantly; server confirms in background.
 */
export function useWatchlistMutations() {
  const queryClient = useQueryClient()

  const add = useMutation({
    mutationFn: async ({ symbol, exchange }: { symbol: string; exchange: string }) => {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, exchange }),
      })
      if (!res.ok) throw new Error()
      return res.json() as Promise<{ id: string; symbol: string }>
    },
    onMutate: async ({ symbol, exchange }) => {
      await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY })
      const previous = queryClient.getQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY)
      // Optimistic: add temp item immediately
      queryClient.setQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY, (old = []) => [
        {
          id: `temp-${symbol}`,
          symbol,
          exchange,
          name: symbol.replace(".NS", ""),
          addedAt: new Date().toISOString(),
          notes: "",
          currentPrice: 0,
          ema200: 0,
          ath: 0,
          heat: "cooling",
          distanceToBreakout: 0,
          priceAtAdd: null,
        },
        ...old,
      ])
      return { previous }
    },
    onSuccess: (data, { symbol }) => {
      // Replace temp ID with real server ID
      queryClient.setQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY, (old = []) =>
        old.map((item) => (item.id === `temp-${symbol}` ? { ...item, id: data.id } : item))
      )
      toast(`Added ${symbol.replace(".NS", "")} to watchlist`)
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(WATCHLIST_QUERY_KEY, ctx?.previous)
      toast.error("Failed to add to watchlist")
    },
  })

  const remove = useMutation({
    mutationFn: async ({ id }: { id: string; symbol: string }) => {
      const res = await fetch(`/api/watchlist/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
    },
    onMutate: async ({ id, symbol }) => {
      await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY })
      const previous = queryClient.getQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY)
      // Optimistic: remove immediately
      queryClient.setQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY, (old = []) =>
        old.filter((item) => item.id !== id)
      )
      return { previous, symbol }
    },
    onSuccess: (_, { symbol }) => {
      toast(`Removed ${symbol.replace(".NS", "")} from watchlist`)
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(WATCHLIST_QUERY_KEY, ctx?.previous)
      toast.error("Failed to remove from watchlist")
    },
    onSettled: () => {
      // Sync with server after remove to ensure consistency
      queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY })
    },
  })

  return { add, remove }
}

/**
 * Update notes on a watchlist item (optimistic).
 */
export function useUpdateWatchlistNotes() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const res = await fetch(`/api/watchlist/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      })
      if (!res.ok) throw new Error()
    },
    onMutate: async ({ id, notes }) => {
      await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY })
      const previous = queryClient.getQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY)
      queryClient.setQueryData<WatchlistItem[]>(WATCHLIST_QUERY_KEY, (old = []) =>
        old.map((item) => (item.id === id ? { ...item, notes } : item))
      )
      return { previous }
    },
    onSuccess: () => toast("Notes updated"),
    onError: (_, __, ctx) => {
      queryClient.setQueryData(WATCHLIST_QUERY_KEY, ctx?.previous)
      toast.error("Failed to update notes")
    },
  })
}
