import type { DataProvider, OHLCVBar, Quote } from "./types.js";
export declare class YahooFinanceProvider implements DataProvider {
    name: string;
    fetchBars(symbol: string, from: string, to: string): Promise<OHLCVBar[]>;
    fetchQuote(symbol: string): Promise<Quote | null>;
    searchSymbols(query: string): Promise<any>;
}
//# sourceMappingURL=yahoo.d.ts.map