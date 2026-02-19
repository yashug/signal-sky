export interface OHLCVBar {
    symbol: string;
    exchange: string;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjustmentFactor?: number;
    splitFactor?: number;
    ema200?: number | null;
}
export interface Quote {
    symbol: string;
    exchange: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    timestamp: string;
}
export interface CorporateAction {
    symbol: string;
    date: string;
    type: "split" | "dividend" | "bonus";
    ratio?: number;
    amount?: number;
}
export interface DataProvider {
    name: string;
    /** Fetch historical OHLCV bars for a symbol */
    fetchBars(symbol: string, from: string, to: string): Promise<OHLCVBar[]>;
    /** Fetch latest quote */
    fetchQuote(symbol: string): Promise<Quote | null>;
    /** Fetch corporate actions (splits, dividends) if available */
    fetchCorporateActions?(symbol: string, from: string, to: string): Promise<CorporateAction[]>;
    /** Search for symbols */
    searchSymbols?(query: string): Promise<Array<{
        symbol: string;
        name: string;
        exchange: string;
    }>>;
}
//# sourceMappingURL=types.d.ts.map