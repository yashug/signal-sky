import type { Strategy, StrategyContext, Signal, HeatStatus } from "../types.js"

/**
 * Pre-set ATH + EMA200 Reset Strategy
 *
 * Algorithm:
 * 1. Walk backwards from latest bar to find first bar where close < ema200
 *    → that is the "break day"
 * 2. If no break found in 2 years of history → skip stock
 * 3. Pre-set ATH = max(high) of all bars strictly before the break day
 * 4. If current close < ema200 → skip stock
 * 5. Classify state:
 *    - Breakout: close >= preSetATH AND close <= preSetATH * 1.05
 *    - Boiling:  close < preSetATH, distancePct <= 2%
 *    - Simmering: close < preSetATH, 2% < distancePct <= 5%
 *    - Cooling:  close < preSetATH, 5% < distancePct <= 15%
 *    - >15% away or >5% above preSetATH → skip
 * 6. Distance formula: ((preSetATH - close) / preSetATH) * 100
 * 7. Exit: close < ema200
 */
export class ResetReclaimStrategy implements Strategy {
  name = "Reset & Reclaim"
  description =
    "Identifies stocks that broke below EMA200, reclaimed it, and are approaching their pre-set ATH."

  evaluate(symbol: string, ctx: StrategyContext): Signal | null {
    const { bars, quote } = ctx

    if (bars.length < 200) return null

    const currentClose = quote.price
    const latestBar = bars[bars.length - 1]
    const currentEma200 = latestBar.ema200
    if (currentEma200 == null) return null

    // Rule 3: current close must be >= ema200
    if (currentClose < currentEma200) return null

    // Rule 1: walk backwards to find first bar where close < ema200
    let breakIdx = -1
    for (let i = bars.length - 1; i >= 0; i--) {
      const ema = bars[i].ema200
      if (ema != null && bars[i].close < ema) {
        breakIdx = i
        break
      }
    }

    // No break found → skip
    if (breakIdx < 0) return null

    const breakDate = bars[breakIdx].date

    // Rule 2: pre-set ATH = max high of all bars strictly before break day
    const barsBeforeBreak = bars.slice(0, breakIdx)
    if (barsBeforeBreak.length === 0) return null

    let preSetATH = -Infinity
    let preSetATHDate = ""
    for (const bar of barsBeforeBreak) {
      if (bar.high > preSetATH) {
        preSetATH = bar.high
        preSetATHDate = bar.date
      }
    }

    if (preSetATH <= 0) return null

    // Classify state
    let heat: HeatStatus
    let distancePct: number

    if (currentClose >= preSetATH && currentClose <= preSetATH * 1.05) {
      // Rule 4: Breakout — crossed above pre-set ATH, within 5% buffer
      heat = "breakout"
      distancePct = ((preSetATH - currentClose) / preSetATH) * 100
    } else if (currentClose < preSetATH) {
      // Rule 5: Heat buckets — approaching ATH from below
      distancePct = ((preSetATH - currentClose) / preSetATH) * 100

      if (distancePct <= 2) {
        heat = "boiling"
      } else if (distancePct <= 5) {
        heat = "simmering"
      } else if (distancePct <= 15) {
        heat = "cooling"
      } else {
        // >15% away — not near enough, skip
        return null
      }
    } else {
      // close > preSetATH * 1.05 — too far above, no bucket
      return null
    }

    // Volume metrics
    const recentBars = bars.slice(-20)
    const avgVol20 = recentBars.reduce((sum, b) => sum + b.volume, 0) / recentBars.length
    const volumeSurge = avgVol20 > 0 ? quote.volume / avgVol20 : 0

    return {
      symbol,
      exchange: quote.exchange,
      strategyName: this.name,
      heat,
      price: currentClose,
      ath: preSetATH,
      ema200: currentEma200,
      distanceToBreakout: distancePct,
      volumeSurge,
      volumeToday: quote.volume,
      volumeAvg20: avgVol20,
      signalDate: new Date().toISOString().split("T")[0],
      details: {
        preSetATH,
        preSetATHDate,
        breakDate,
        aboveEma200: true,
      },
    }
  }

  evaluateExit(symbol: string, ctx: StrategyContext): boolean {
    const { bars, quote } = ctx
    const latestBar = bars[bars.length - 1]
    const currentEma200 = latestBar?.ema200
    if (currentEma200 == null) return false
    return quote.price < currentEma200
  }
}
