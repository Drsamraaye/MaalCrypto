import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking last 5 posts...');
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
            id: true,
            slug: true,
            title: true,
            imageUrl: true,
            status: true,
            createdAt: true
        }
    });

    console.table(posts);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
