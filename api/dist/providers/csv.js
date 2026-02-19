import { parse } from "csv-parse/sync";
/**
 * CSV Upload adapter for NSE reliability backstop.
 * Processes uploaded bhavcopy / historical CSV files and normalizes
 * them into the canonical OHLCV schema.
 */
export class CSVUploadProvider {
    name = "csv-upload";
    bars = new Map();
    /**
     * Ingest CSV content. Expected columns (case-insensitive):
     * symbol, date, open, high, low, close, volume
     * Optional: series, prev_close, adj_close
     */
    ingestCSV(csvContent, exchange = "NSE") {
        const errors = [];
        let imported = 0;
        const records = parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            relax_column_count: true,
        });
        for (const row of records) {
            // Normalize column names (case-insensitive)
            const normalized = {};
            for (const [k, v] of Object.entries(row)) {
                normalized[k.toLowerCase().trim().replace(/\s+/g, "_")] = String(v).trim();
            }
            const symbol = normalized.symbol || normalized.ticker || normalized.sc_name;
            const dateStr = normalized.date || normalized.trade_date || normalized.timestamp;
            const open = parseFloat(normalized.open || normalized.open_price || "0");
            const high = parseFloat(normalized.high || normalized.high_price || "0");
            const low = parseFloat(normalized.low || normalized.low_price || "0");
            const close = parseFloat(normalized.close || normalized.close_price || normalized.last_price || "0");
            const volume = parseInt(normalized.volume || normalized.total_traded_quantity || normalized.tottrdqty || "0");
            if (!symbol || !dateStr || isNaN(close) || close === 0) {
                errors.push(`Skipping invalid row: ${JSON.stringify(row).slice(0, 100)}`);
                continue;
            }
            // Normalize date to ISO format
            let date;
            try {
                const d = new Date(dateStr);
                if (isNaN(d.getTime()))
                    throw new Error("Invalid date");
                date = d.toISOString().split("T")[0];
            }
            catch {
                errors.push(`Invalid date for ${symbol}: ${dateStr}`);
                continue;
            }
            const nseSymbol = symbol.endsWith(".NS") ? symbol : `${symbol}.NS`;
            const bar = {
                symbol: nseSymbol,
                exchange,
                date,
                open: open || close,
                high: high || close,
                low: low || close,
                close,
                volume,
            };
            const existing = this.bars.get(nseSymbol) || [];
            existing.push(bar);
            this.bars.set(nseSymbol, existing);
            imported++;
        }
        return { imported, errors: errors.slice(0, 20) };
    }
    async fetchBars(symbol, from, to) {
        const bars = this.bars.get(symbol) || [];
        return bars.filter((b) => b.date >= from && b.date <= to).sort((a, b) => a.date.localeCompare(b.date));
    }
    async fetchQuote(symbol) {
        const bars = this.bars.get(symbol) || [];
        if (bars.length === 0)
            return null;
        const latest = bars.sort((a, b) => b.date.localeCompare(a.date))[0];
        return {
            symbol,
            exchange: latest.exchange,
            price: latest.close,
            change: 0,
            changePercent: 0,
            volume: latest.volume,
            timestamp: latest.date,
        };
    }
}
//# sourceMappingURL=csv.js.map