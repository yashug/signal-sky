import type { DataProvider, OHLCVBar, Quote } from "./types.js";
/**
 * CSV Upload adapter for NSE reliability backstop.
 * Processes uploaded bhavcopy / historical CSV files and normalizes
 * them into the canonical OHLCV schema.
 */
export declare class CSVUploadProvider implements DataProvider {
    name: string;
    private bars;
    /**
     * Ingest CSV content. Expected columns (case-insensitive):
     * symbol, date, open, high, low, close, volume
     * Optional: series, prev_close, adj_close
     */
    ingestCSV(csvContent: string, exchange?: string): {
        imported: number;
        errors: string[];
    };
    fetchBars(symbol: string, from: string, to: string): Promise<OHLCVBar[]>;
    fetchQuote(symbol: string): Promise<Quote | null>;
}
//# sourceMappingURL=csv.d.ts.map