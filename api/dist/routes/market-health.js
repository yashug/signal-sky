import { z } from "zod";
import { getPrisma } from "../db/prisma.js";
import { UNIVERSE_GROUPS } from "../config/universes.js";
const VALID_UNIVERSES = [
    "nifty50", "niftynext50", "nifty100", "nifty200",
    "niftymidcap50", "niftymidcap100",
    "niftysmallcap50", "niftysmallcap100",
    "niftybank",
    "sp100", "nasdaq100",
];
const querySchema = z.object({
    universe: z.enum(VALID_UNIVERSES).optional(),
});
const historySchema = z.object({
    days: z.coerce.number().min(1).max(365).optional().default(90),
    universes: z.string().optional(), // comma-separated universe keys
});
function trafficLight(pct) {
    if (pct >= 60)
        return "green";
    if (pct >= 40)
        return "amber";
    return "red";
}
export async function marketHealthRoutes(app) {
    app.get("/market-health", async (request) => {
        const query = querySchema.parse(request.query);
        const prisma = getPrisma();
        // Which universe keys to return
        const keys = query.universe
            ? [query.universe]
            : [
                "nifty50", "niftynext50", "nifty100", "nifty200",
                "niftymidcap50", "niftymidcap100",
                "niftysmallcap50", "niftysmallcap100",
                "niftybank",
                "sp100", "nasdaq100",
            ];
        const markets = [];
        for (const key of keys) {
            const group = UNIVERSE_GROUPS[key];
            if (!group)
                continue;
            // For composite indices, look up by the composite key first (scanner persists these)
            // Fall back to aggregating raw tags
            const latest = await prisma.marketHealth.findFirst({
                where: { universe: key },
                orderBy: { date: "desc" },
            });
            if (latest) {
                markets.push({
                    universe: key,
                    label: group.label,
                    date: latest.date,
                    totalStocks: latest.totalStocks,
                    aboveEma200: latest.aboveEma200,
                    percentAbove: Number(latest.pctAbove),
                    trafficLight: trafficLight(Number(latest.pctAbove)),
                });
            }
            else if (group.tags.length > 1) {
                // Aggregate from raw tags
                const tagRows = await prisma.marketHealth.findMany({
                    where: { universe: { in: group.tags } },
                    orderBy: { date: "desc" },
                    distinct: ["universe"],
                });
                if (tagRows.length > 0) {
                    let above = 0, total = 0;
                    for (const r of tagRows) {
                        above += r.aboveEma200;
                        total += r.totalStocks;
                    }
                    const pctAbove = total > 0 ? (above / total) * 100 : 0;
                    markets.push({
                        universe: key,
                        label: group.label,
                        date: tagRows[0].date,
                        totalStocks: total,
                        aboveEma200: above,
                        percentAbove: pctAbove,
                        trafficLight: trafficLight(pctAbove),
                    });
                }
            }
        }
        if (query.universe) {
            return markets[0] || { error: "Universe not found" };
        }
        return { markets };
    });
    // Time-series history for the breadth chart
    app.get("/market-health/history", async (request) => {
        const query = historySchema.parse(request.query);
        const prisma = getPrisma();
        const since = new Date();
        since.setDate(since.getDate() - query.days);
        // Which universes to include in history
        const universeKeys = query.universes
            ? query.universes.split(",")
            : ["nifty50", "sp100", "nasdaq100"];
        const rows = await prisma.marketHealth.findMany({
            where: {
                date: { gte: since },
                universe: { in: universeKeys },
            },
            orderBy: { date: "asc" },
        });
        // Pivot into {date, universe1: pct, universe2: pct, ...} format
        const dateMap = new Map();
        for (const r of rows) {
            const dateStr = r.date.toISOString().split("T")[0];
            if (!dateMap.has(dateStr)) {
                const entry = { date: dateStr };
                for (const k of universeKeys)
                    entry[k] = null;
                dateMap.set(dateStr, entry);
            }
            const entry = dateMap.get(dateStr);
            entry[r.universe] = Number(r.pctAbove);
        }
        return { history: Array.from(dateMap.values()), universes: universeKeys };
    });
}
//# sourceMappingURL=market-health.js.map