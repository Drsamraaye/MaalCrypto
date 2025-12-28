import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') || 'EN';
        const status = searchParams.get('status');

        const whereClause: any = {};
        if (status) {
            whereClause.status = status;
        }

        const posts = await prisma.post.findMany({
            where: whereClause,
            include: {
                translations: {
                    where: {
                        language: lang as any
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Transform response to flat structure for easier frontend consumption
        const formattedPosts = posts.map(post => {
            const translation = post.translations[0];
            return {
                id: post.id,
                slug: post.slug,
                type: post.type,
                status: post.status,
                imageUrl: post.imageUrl,
                createdAt: post.createdAt,
                title: translation?.title || 'No Title',
                description: translation?.description || 'No Description',
                content: translation?.content || ''
            };
        });

        return NextResponse.json(formattedPosts);

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
