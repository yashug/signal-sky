import "dotenv/config";
export const config = {
    port: parseInt(process.env.PORT || "4000"),
    host: process.env.HOST || "0.0.0.0",
    db: {
        connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/signalsky",
    },
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6379",
    },
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    },
    scan: {
        cronSchedule: process.env.SCAN_CRON || "0 */4 * * *", // every 4 hours
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    },
};
//# sourceMappingURL=config.js.map