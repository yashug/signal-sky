/**
 * Backtest Pipeline — runs the backtest engine on all universe stocks
 * and persists results to the backtests + backtest_trades tables.
 */
export interface BacktestPipelineResult {
    backtestsPersisted: number;
    symbolsProcessed: number;
    errors: string[];
}
export declare function runBacktestPipeline(market: "IN" | "US"): Promise<BacktestPipelineResult>;
//# sourceMappingURL=run-backtest.d.ts.map