import { PrismaClient } from '@prisma/client';

async function main() {
    try {
        console.log("Attempting to instantiate PrismaClient...");
        const prisma = new PrismaClient();
        console.log("Success! PrismaClient created.");
        await prisma.$connect();
        console.log("Connected.");
        await prisma.$disconnect();
    } catch (e) {
        console.error("Instantiation failed:");
        console.error(e);
    }
}

main();
