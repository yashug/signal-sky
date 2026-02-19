/**
 * Utility to compute and update EMA200 + SMA200 for newly inserted daily bars.
 * Calls a PL/pgSQL function for EMA (sequential computation) and
 * uses a window function for SMA.
 */
import { getPrisma } from "./prisma.js";
/**
 * Update EMA200 for all bars of a given symbol that have ema200 = NULL.
 * Uses the `update_ema200_for_symbol` SQL function which computes
 * EMA sequentially (each value depends on the previous).
 */
export async function updateEma200ForSymbol(symbol, exchange) {
    const prisma = getPrisma();
    const result = await prisma.$queryRawUnsafe(`SELECT update_ema200_for_symbol($1, $2)`, symbol, exchange);
    return result?.[0]?.update_ema200_for_symbol ?? 0;
}
/**
 * Update SMA200 for all bars of a given symbol that have sma200 = NULL.
 * Uses a window function (SMA can be computed independently per row).
 */
export async function updateSma200ForSymbol(symbol, exchange) {
    const prisma = getPrisma();
    const result = await prisma.$queryRawUnsafe(`
    WITH ranked AS (
      SELECT
        id,
        AVG(close) OVER (ORDER BY date ROWS BETWEEN 199 PRECEDING AND CURRENT ROW) AS computed_sma,
        COUNT(*)   OVER (ORDER BY date ROWS BETWEEN 199 PRECEDING AND CURRENT ROW) AS bar_count
      FROM daily_bars
      WHERE symbol = $1 AND exchange = $2
    )
    UPDATE daily_bars
    SET sma200 = ranked.computed_sma
    FROM ranked
    WHERE daily_bars.id = ranked.id
      AND ranked.bar_count >= 200
      AND daily_bars.sma200 IS NULL
    RETURNING daily_bars.id
    `, symbol, exchange);
    return Array.isArray(result) ? result.length : 0;
}
/**
 * Update both SMA200 and EMA200 for a symbol after inserting new bars.
 */
export async function updateMovingAveragesForSymbol(symbol, exchange) {
    await Promise.all([
        updateSma200ForSymbol(symbol, exchange),
        updateEma200ForSymbol(symbol, exchange),
    ]);
}
//# sourceMappingURL=update-sma200.js.map