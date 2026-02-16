import type { DataProvider, OHLCVBar, Quote } from "../providers/types.js"
import type { Strategy, Signal } from "../engine/types.js"
import { ResetReclaimStrategy } from "../engine/strategies/reset-reclaim.js"

export interface ScanResult {
  symbol: string
  signal: Signal | null
  bars?: OHLCVBar[]
  quote?: Quote | null
  error?: string
}

export class ScanService {
  private strategies: Strategy[]

  constructor(private provider: DataProvider) {
    this.strategies = [new ResetReclaimStrategy()]
  }

  /**
   * Scan a single symbol against all strategies.
   */
  async scanSymbol(symbol: string, fromStr: string, today: string): Promise<ScanResult> {
    try {
      const [bars, quote] = await Promise.all([
        this.provider.fetchBars(symbol, fromStr, today),
        this.provider.fetchQuote(symbol),
      ])

      if (!quote || bars.length < 200) {
        return { symbol, signal: null, error: bars.length < 200 ? "Insufficient history" : "No quote" }
      }

      const ctx = { bars, quote }
      let bestSignal: Signal | null = null

      for (const strategy of this.strategies) {
        const signal = strategy.evaluate(symbol, ctx)
        if (signal) {
          bestSignal = signal
          break
        }
      }

      return { symbol, signal: bestSignal, bars, quote }
    } catch (err: any) {
      return { symbol, signal: null, error: err.message || "Unknown error" }
    }
  }

  /**
   * Scan a list of symbols in parallel batches.
   */
  async scanUniverse(symbols: string[], concurrency = 20): Promise<ScanResult[]> {
    const today = new Date().toISOString().split("T")[0]
    const from = new Date()
    from.setFullYear(from.getFullYear() - 3)
    const fromStr = from.toISOString().split("T")[0]

    const results: ScanResult[] = []

    // Process in batches
    for (let i = 0; i < symbols.length; i += concurrency) {
      const batch = symbols.slice(i, i + concurrency)
      const batchResults = await Promise.all(
        batch.map((symbol) => this.scanSymbol(symbol, fromStr, today)),
      )
      results.push(...batchResults)
    }

    return results
  }
}
