import pg from "pg";
import { config } from "../config.js";
const { Pool } = pg;
let pool = null;
export function getPool() {
    if (!pool) {
        pool = new Pool({
            connectionString: config.db.connectionString,
            max: 10,
            idleTimeoutMillis: 30000,
        });
        pool.on("error", (err) => {
            console.error("[DB] Unexpected pool error:", err);
        });
    }
    return pool;
}
export async function query(text, params) {
    return getPool().query(text, params);
}
export async function closePool() {
    if (pool) {
        await pool.end();
        pool = null;
    }
}
//# sourceMappingURL=client.js.map