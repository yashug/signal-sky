import "dotenv/config";
export declare const config: {
    port: number;
    host: string;
    db: {
        connectionString: string;
    };
    redis: {
        url: string;
    };
    telegram: {
        botToken: string;
    };
    scan: {
        cronSchedule: string;
    };
    cors: {
        origin: string;
    };
};
//# sourceMappingURL=config.d.ts.map