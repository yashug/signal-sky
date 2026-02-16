import pg from "pg"
import { config } from "../config.js"

const { Pool } = pg

let pool: pg.Pool | null = null

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: config.db.connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
    })

    pool.on("error", (err) => {
      console.error("[DB] Unexpected pool error:", err)
    })
  }
  return pool
}

export async function query<T extends pg.QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<pg.QueryResult<T>> {
  return getPool().query<T>(text, params)
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}
