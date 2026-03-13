import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes("placeholder")) {
    // No real DB configured yet — return null-safe proxy at runtime.
    // Build will succeed; DB calls will throw at runtime until DATABASE_URL is set.
    const adapter = new PrismaPg({ connectionString: "postgresql://localhost/placeholder" });
    return new PrismaClient({ adapter });
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
