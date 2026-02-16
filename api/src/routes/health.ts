import type { FastifyInstance } from "fastify"

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "signal-sky-api",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
    }
  })
}
