import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const [
            totalUsers,
            totalSubscribers,
            totalPosts,
            draftPosts,
            publishedPosts
        ] = await Promise.all([
            prisma.user.count(),
            prisma.subscriber.count({ where: { active: true } }),
            prisma.post.count(),
            prisma.post.count({ where: { status: 'DRAFT' } }),
            prisma.post.count({ where: { status: 'PUBLISHED' } })
        ]);

        const recentActivity = await prisma.post.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                type: true,
                status: true,
                createdAt: true,
                author: true
            }
        });

        return NextResponse.json({
            stats: {
                totalUsers,
                totalSubscribers,
                totalPosts,
                draftPosts,
                publishedPosts
            },
            recentActivity
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
