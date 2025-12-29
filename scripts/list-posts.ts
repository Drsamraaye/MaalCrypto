import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const connectionString = `${process.env.DATABASE_URL || process.env.DIRECT_URL}`;

async function main() {
    if (!connectionString) {
        console.error('No connection string found');
        return;
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: {
                id: true,
                slug: true,
                title: true,
                imageUrl: true,
                status: true,
                type: true,
            }
        });

        console.log(JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
