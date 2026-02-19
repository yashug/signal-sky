import { z } from "zod";
import { getPrisma } from "../db/prisma.js";
const querySchema = z.object({
    q: z.string().min(1).max(50),
    limit: z.coerce.number().min(1).max(20).optional().default(10),
});
export async function symbolsRoutes(app) {
    app.get("/symbols/search", async (request) => {
        const query = querySchema.parse(request.query);
        const prisma = getPrisma();
        const pattern = `%${query.q}%`;
        const results = await prisma.universeMember.findMany({
            where: {
                OR: [
                    { symbol: { contains: query.q, mode: "insensitive" } },
                    { name: { contains: query.q, mode: "insensitive" } },
                ],
            },
            take: query.limit,
            select: {
                symbol: true,
                name: true,
                sector: true,
                universe: true,
            },
        });
        return {
            query: query.q,
            results: results.map((r) => ({
                symbol: r.symbol,
                name: r.name ?? r.symbol,
                sector: r.sector,
                universe: r.universe,
                exchange: r.symbol.endsWith(".NS") ? "NSE" : "NASDAQ",
            })),
        };
    });
}
//# sourceMappingURL=symbols.js.map