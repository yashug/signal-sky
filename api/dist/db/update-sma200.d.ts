/**
 * Utility to compute and update EMA200 + SMA200 for newly inserted daily bars.
 * Calls a PL/pgSQL function for EMA (sequential computation) and
 * uses a window function for SMA.
 */
/**
 * Update EMA200 for all bars of a given symbol that have ema200 = NULL.
 * Uses the `update_ema200_for_symbol` SQL function which computes
 * EMA sequentially (each value depends on the previous).
 */
export declare function updateEma200ForSymbol(symbol: string, exchange: string): Promise<number>;
/**
 * Update SMA200 for all bars of a given symbol that have sma200 = NULL.
 * Uses a window function (SMA can be computed independently per row).
 */
export declare function updateSma200ForSymbol(symbol: string, exchange: string): Promise<number>;
/**
 * Update both SMA200 and EMA200 for a symbol after inserting new bars.
 */
export declare function updateMovingAveragesForSymbol(symbol: string, exchange: string): Promise<void>;
//# sourceMappingURL=update-sma200.d.ts.map