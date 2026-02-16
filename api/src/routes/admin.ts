import type { FastifyInstance } from "fastify"

export async function adminRoutes(app: FastifyInstance) {
  // CSV Upload for NSE data
  app.post("/admin/data/upload", async (request, reply) => {
    // Requires @fastify/multipart to be registered
    // const file = await request.file()
    // const csv = await file.toBuffer()
    // const provider = new CSVUploadProvider()
    // const result = provider.ingestCSV(csv.toString(), "NSE")
    // Then persist to DB

    return reply.status(501).send({
      error: "CSV upload not yet connected to database",
      message: "Endpoint ready — connect Postgres to enable.",
    })
  })

  // Manual scan trigger
  app.post("/admin/scan/run", async (request, reply) => {
    // Enqueue a scan job to BullMQ
    // const queue = new Queue('scan', { connection: redis })
    // await queue.add('manual-scan', { universe: 'all', triggeredBy: 'admin' })

    return reply.status(501).send({
      error: "Manual scan not yet connected to worker queue",
      message: "Endpoint ready — connect Redis + BullMQ to enable.",
    })
  })
}
