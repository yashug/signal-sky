import Fastify from "fastify"
import cors from "@fastify/cors"
import { config } from "./config.js"
import { healthRoutes } from "./routes/health.js"
import { marketHealthRoutes } from "./routes/market-health.js"
import { signalsRoutes } from "./routes/signals.js"
import { symbolsRoutes } from "./routes/symbols.js"
import { adminRoutes } from "./routes/admin.js"

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

// ─── Routes ───────────────────────────────────────────────────────
await app.register(healthRoutes)
await app.register(marketHealthRoutes)
await app.register(signalsRoutes)
await app.register(symbolsRoutes)
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
