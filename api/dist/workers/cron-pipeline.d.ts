/**
 * Cron Pipeline — automated EOD data update + strategy scan.
 *
 * Schedules:
 *   India EOD: 4:00 PM IST (10:30 UTC) Mon-Fri
 *   US EOD:    2:00 AM IST (20:30 UTC prev day) Tue-Sat
 *
 * Usage:
 *   npm run cron          # start scheduler (long-running)
 *   npm run cron:india    # run India pipeline once (manual)
 *   npm run cron:us       # run US pipeline once (manual)
 */
import "dotenv/config";
//# sourceMappingURL=cron-pipeline.d.ts.map