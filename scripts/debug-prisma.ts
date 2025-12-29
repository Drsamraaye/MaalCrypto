
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL || process.env.DIRECT_URL}`;
console.log('Connection string exists:', !!connectionString);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

try {
    const prisma =
        globalForPrisma.prisma ||
        new PrismaClient({
            log: ['query'],
        });
    console.log('Prisma initialized successfully');

    prisma.$connect().then(() => {
        console.log('Connected to DB');
        process.exit(0);
    }).catch(e => {
        console.error('Connection failed:', e);
        process.exit(1);
    });

} catch (e) {
    console.error('Initialization failed:', e);
    process.exit(1);
}
