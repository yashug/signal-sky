// ─── Frontend API Client ──────────────────────────────────────────
// Typed fetch functions for the Fastify backend at NEXT_PUBLIC_API_URL

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

// ─── Types ─────────────────────────────────────────────────────────

export type HeatStatus = "breakout" | "boiling" | "simmering" | "cooling"

export type ApiSignal = {
  id: string
  symbol: string
  exchange: string
  name: string
  strategyName: string
  heat: HeatStatus
  price: number
  ath: number
  ema200: number
  distancePct: number
  volumeSurge: number | null
  volumeToday: number | null
  volumeAvg20: number | null
  signalDate: string
  isActive: boolean
  details: Record<string, any>
  createdAt: string
}

export type ApiSignalsResponse = {
  signals: ApiSignal[]
  total: number
  heatCounts: {
    all: number
    breakout: number
    boiling: number
    simmering: number
    cooling: number
  }
  filters: {
    universe: string
    heat: string
  }
  pagination: {
    limit: number
    offset: number
  }
}

export type ApiMarketHealth = {
  universe: string
  label: string
  date: string
  totalStocks: number
  aboveEma200: number
  percentAbove: number
  trafficLight: "green" | "amber" | "red"
}

export type ApiMarketHealthResponse = {
  markets: ApiMarketHealth[]
}

export type ApiMarketHealthHistoryPoint = {
  date: string
  [universe: string]: string | number | null
}

export type ApiMarketHealthHistoryResponse = {
  history: ApiMarketHealthHistoryPoint[]
}

export type ApiSignalChart = {
  priceHistory: number[]
  ema200History: (number | null)[]
}

export type ApiSymbolResult = {
  symbol: string
  name: string
  sector: string | null
  universe: string
  exchange: string
}

// ─── Fetch ─────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)
  try {
    const res = await fetch(`${API_URL}${path}`, {
      signal: controller.signal,
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error(`API ${res.status}: ${res.statusText}`)
    }
    return res.json()
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out — the server took too long to respond.")
    }
    if (err.message?.startsWith("API ")) throw err
    throw new Error("Could not reach the API server. Please check your connection.")
  } finally {
    clearTimeout(timeout)
  }
}

export function fetchSignals(params?: {
  universe?: string
  heat?: string
  limit?: number
  offset?: number
}): Promise<ApiSignalsResponse> {
  const sp = new URLSearchParams()
  if (params?.universe) sp.set("universe", params.universe)
  if (params?.heat) sp.set("heat", params.heat)
  if (params?.limit) sp.set("limit", String(params.limit))
  if (params?.offset) sp.set("offset", String(params.offset))
  const qs = sp.toString()
  return apiFetch(`/signals${qs ? `?${qs}` : ""}`)
}

export function fetchMarketHealth(): Promise<ApiMarketHealthResponse> {
  return apiFetch("/market-health")
}

export function fetchMarketHealthHistory(
  days: number = 90
): Promise<ApiMarketHealthHistoryResponse> {
  return apiFetch(`/market-health/history?days=${days}`)
}

export function fetchSignalChart(signalId: string): Promise<ApiSignalChart> {
  return apiFetch(`/signals/${signalId}/chart`)
}

export function searchSymbols(
  query: string,
  limit: number = 10
): Promise<{ query: string; results: ApiSymbolResult[] }> {
  return apiFetch(`/symbols/search?q=${encodeURIComponent(query)}&limit=${limit}`)
}
