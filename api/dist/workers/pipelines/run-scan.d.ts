/**
 * Reusable scan pipeline — runs the strategy scanner against DB data
 * and persists signals, indicators, and market health.
 *
 * Used by both the CLI scanner and the cron pipeline.
 */
import type { DataProvider } from "../../providers/types.js";
export interface ScanPipelineResult {
    signalsPersisted: number;
    indicatorsUpserted: number;
    symbolsScanned: number;
    errors: string[];
}
/**
 * Run the strategy scan for a given market.
 * @param market "IN" for Indian stocks, "US" for US stocks
 * @param provider Optional custom DataProvider (defaults to DatabaseProvider)
 */
export declare function runScanPipeline(market: "IN" | "US", provider?: DataProvider): Promise<ScanPipelineResult>;
//# sourceMappingURL=run-scan.d.ts.map