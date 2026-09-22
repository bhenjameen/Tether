import { PrismaClient } from '@prisma/client';

export const getResolvedDatabaseUrl = (): string | undefined => {
    return (
        process.env.DATABASE_URL ||
        process.env.POSTGRES_PRISMA_URL ||
        process.env.POSTGRES_URL ||
        process.env.POSTGRES_URL_NON_POOLING
    );
};

const resolvedUrl = getResolvedDatabaseUrl();
if (!process.env.DATABASE_URL && resolvedUrl) {
    process.env.DATABASE_URL = resolvedUrl;
}

const prismaClientSingleton = () => {
    const url = getResolvedDatabaseUrl();
    return new PrismaClient(
        url
            ? {
                  datasources: {
                      db: {
                          url,
                      },
                  },
              }
            : undefined
    );
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

