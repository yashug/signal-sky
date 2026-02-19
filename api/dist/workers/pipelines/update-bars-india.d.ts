/**
 * India bar update pipeline — fetches today's bars from Kite Connect
 * for all Indian universe symbols and appends to daily_bars.
 */
export interface UpdateBarsResult {
    symbolsUpdated: number;
    barsInserted: number;
    errors: string[];
    tokenStale: boolean;
}
export declare function updateBarsIndia(): Promise<UpdateBarsResult>;
//# sourceMappingURL=update-bars-india.d.ts.map