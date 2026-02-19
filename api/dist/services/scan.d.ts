import type { DataProvider, OHLCVBar, Quote } from "../providers/types.js";
import type { Signal } from "../engine/types.js";
export interface ScanResult {
    symbol: string;
    signal: Signal | null;
    bars?: OHLCVBar[];
    quote?: Quote | null;
    error?: string;
}
export declare class ScanService {
    private provider;
    private strategies;
    constructor(provider: DataProvider);
    /**
     * Scan a single symbol against all strategies.
     */
    scanSymbol(symbol: string, fromStr: string, today: string): Promise<ScanResult>;
    /**
     * Scan a list of symbols in parallel batches.
     */
    scanUniverse(symbols: string[], concurrency?: number): Promise<ScanResult[]>;
}
//# sourceMappingURL=scan.d.ts.map