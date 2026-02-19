import type { OHLCVBar, Quote } from "../providers/types.js";
export type HeatStatus = "breakout" | "boiling" | "simmering" | "cooling";
export interface StrategyContext {
    bars: OHLCVBar[];
    quote: Quote;
}
export interface Signal {
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: HeatStatus;
    price: number;
    ath: number;
    ema200: number;
    distanceToBreakout: number;
    volumeSurge: number;
    volumeToday: number;
    volumeAvg20: number;
    signalDate: string;
    details: Record<string, any>;
}
export interface Strategy {
    name: string;
    description: string;
    /** Evaluate entry signal. Returns Signal if triggered, null otherwise. */
    evaluate(symbol: string, ctx: StrategyContext): Signal | null;
    /** Evaluate exit signal. Returns true if position should be exited. */
    evaluateExit(symbol: string, ctx: StrategyContext): boolean;
}
//# sourceMappingURL=types.d.ts.map