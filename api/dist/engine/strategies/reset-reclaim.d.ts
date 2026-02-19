import type { Strategy, StrategyContext, Signal } from "../types.js";
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
export declare class ResetReclaimStrategy implements Strategy {
    name: string;
    description: string;
    evaluate(symbol: string, ctx: StrategyContext): Signal | null;
    evaluateExit(symbol: string, ctx: StrategyContext): boolean;
}
//# sourceMappingURL=reset-reclaim.d.ts.map