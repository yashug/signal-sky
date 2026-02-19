import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
let prisma = null;
export function getPrisma() {
    if (!prisma) {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        prisma = new PrismaClient({ adapter });
    }
    return prisma;
}
export async function disconnectPrisma() {
    if (prisma) {
        await prisma.$disconnect();
        prisma = null;
    }
}
//# sourceMappingURL=prisma.js.map