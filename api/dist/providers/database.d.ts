import type { DataProvider, OHLCVBar, Quote } from "./types.js";
/**
 * DatabaseProvider — reads historical bars from the `daily_bars` table
 * (populated by Kite Connect or CSV upload) instead of fetching from
 * an external API.
 *
 * Quote is synthesized from the most recent bar (EOD scanning).
 */
export declare class DatabaseProvider implements DataProvider {
    name: string;
    /**
     * Normalize symbol for DB lookup.
     * Universe members store "BHARTIARTL.NS", DB stores "BHARTIARTL" with exchange "NSE".
     */
    private resolveSymbol;
    fetchBars(symbol: string, from: string, to: string): Promise<OHLCVBar[]>;
    fetchQuote(symbol: string): Promise<Quote | null>;
}
//# sourceMappingURL=database.d.ts.map