/**
 * US bar update pipeline — fetches today's bars from Yahoo Finance
 * for all US universe symbols (S&P 100 + NASDAQ 100) and appends to daily_bars.
 */
export interface UpdateBarsResult {
    symbolsUpdated: number;
    barsInserted: number;
    errors: string[];
}
export declare function updateBarsUS(): Promise<UpdateBarsResult>;
//# sourceMappingURL=update-bars-us.d.ts.map