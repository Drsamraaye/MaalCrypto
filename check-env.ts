import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log("Current Directory:", process.cwd());
console.log("DB URL Found:", !!process.env.DATABASE_URL);

async function main() {
    try {
        console.log("Instantiating Prisma Client...");
        const prisma = new PrismaClient({
            log: ['query'],
        });
        console.log("Prisma Client Instantiated.");
        await prisma.$connect();
        console.log("Connected successfully.");
        await prisma.$disconnect();
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
