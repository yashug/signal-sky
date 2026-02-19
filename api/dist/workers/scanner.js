/**
 * Scanner Worker — CLI entry point.
 *
 * Scans all universe members, persists signals/indicators/daily_bars/market_health.
 *
 * Usage:
 *   npm run scan                       # scan using DB data (default)
 *   SCAN_PROVIDER=yahoo npm run scan   # scan using Yahoo Finance
 */
import "dotenv/config";
import { YahooFinanceProvider } from "../providers/yahoo.js";
import { DatabaseProvider } from "../providers/database.js";
import { runScanPipeline } from "./pipelines/run-scan.js";
import { disconnectPrisma } from "../db/prisma.js";
async function runScan() {
    const scanProvider = process.env.SCAN_PROVIDER ?? "db";
    console.log(`[Scanner] Starting scan (provider: ${scanProvider})...`);
    const provider = scanProvider === "yahoo" ? new YahooFinanceProvider() : new DatabaseProvider();
    // Run India scan
    const indiaResult = await runScanPipeline("IN", provider);
    console.log(`\n[Scanner] India Complete:`);
    console.log(`  Signals persisted: ${indiaResult.signalsPersisted}`);
    console.log(`  Indicators upserted: ${indiaResult.indicatorsUpserted}`);
    console.log(`  Symbols scanned: ${indiaResult.symbolsScanned}`);
    console.log(`  Errors: ${indiaResult.errors.length}`);
    // Run US scan
    const usResult = await runScanPipeline("US", provider);
    console.log(`\n[Scanner] US Complete:`);
    console.log(`  Signals persisted: ${usResult.signalsPersisted}`);
    console.log(`  Indicators upserted: ${usResult.indicatorsUpserted}`);
    console.log(`  Symbols scanned: ${usResult.symbolsScanned}`);
    console.log(`  Errors: ${usResult.errors.length}`);
    const totalErrors = [...indiaResult.errors, ...usResult.errors];
    if (totalErrors.length > 0) {
        console.log(`\n  Errors (first 20):`);
        for (const err of totalErrors.slice(0, 20)) {
            console.log(`    ${err}`);
        }
    }
}
runScan()
    .catch(console.error)
    .finally(() => disconnectPrisma());
//# sourceMappingURL=scanner.js.map