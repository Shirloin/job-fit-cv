import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.APP_ENV !== "production" ? ["query", "warn", "error"] : [],
  });

if (process.env.APP_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
