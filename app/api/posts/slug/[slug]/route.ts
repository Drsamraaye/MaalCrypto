import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get post by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await prisma.post.findFirst({
            where: {
                slug,
                status: 'PUBLISHED'
            },
        });

        if (!post) {
            console.log('Post not found for slug:', slug);
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        console.log('Fetched post:', post.id, 'Image URL:', post.imageUrl);
        return NextResponse.json({ post });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
