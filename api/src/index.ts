import Fastify from "fastify"
import cors from "@fastify/cors"
import { config } from "./config.js"
import { healthRoutes } from "./routes/health.js"
import { marketHealthRoutes } from "./routes/market-health.js"
import { signalsRoutes } from "./routes/signals.js"
import { symbolsRoutes } from "./routes/symbols.js"
import { adminRoutes } from "./routes/admin.js"
import { backtestsRoutes } from "./routes/backtests.js"

const app = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
})

// ─── Plugins ──────────────────────────────────────────────────────
await app.register(cors, {
  origin: config.cors.origin,
  methods: ["GET", "POST", "PUT", "DELETE"],
})

// ─── Smart Cache-Control per route ───────────────────────────────
// Data freshness varies by endpoint purpose:
//   Scanner signals  → updates once/day after scan   → 5 min cache
//   Signal charts    → updates once/day              → 5 min cache
//   Market health    → updates once/day              → 10 min cache
//   Backtests        → updates on manual run (rare)  → 1 hour cache
//   Symbol search    → nearly static                 → 24 hour cache
//   Health / Admin   → must be real-time             → no cache
app.addHook("onSend", async (request, reply) => {
  const url = request.url
  let maxAge = 0

  if (url.startsWith("/backtests")) {
    maxAge = 3600       // 1 hour
  } else if (url.startsWith("/symbols")) {
    maxAge = 86400      // 24 hours
  } else if (url.startsWith("/market-health/history")) {
    maxAge = 600        // 10 min
  } else if (url.startsWith("/market-health")) {
    maxAge = 300        // 5 min
  } else if (url.startsWith("/signals") && url.includes("/chart")) {
    maxAge = 300        // 5 min
  } else if (url.startsWith("/signals")) {
    maxAge = 300        // 5 min
  }

  if (maxAge > 0) {
    reply.header("Cache-Control", `public, max-age=${maxAge}, stale-while-revalidate=${maxAge * 2}`)
  } else {
    reply.header("Cache-Control", "no-store, no-cache, must-revalidate")
    reply.header("Pragma", "no-cache")
  }
})

// ─── Routes ───────────────────────────────────────────────────────
await app.register(healthRoutes)
await app.register(marketHealthRoutes)
await app.register(signalsRoutes)
await app.register(symbolsRoutes)
await app.register(backtestsRoutes)
await app.register(adminRoutes)

// ─── Error handling ───────────────────────────────────────────────
app.setErrorHandler((error: any, request, reply) => {
  // Zod validation errors
  if (error.name === "ZodError") {
    return reply.status(400).send({
      error: "Validation error",
      details: JSON.parse(error.message),
    })
  }

  app.log.error(error)
  return reply.status(500).send({
    error: "Internal server error",
  })
})

// ─── Start ────────────────────────────────────────────────────────
try {
  await app.listen({ port: config.port, host: config.host })
  console.log(`
  ╔══════════════════════════════════════╗
  ║   SignalSky API v0.1.0              ║
  ║   http://${config.host}:${config.port}             ║
  ╚══════════════════════════════════════╝
  `)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
