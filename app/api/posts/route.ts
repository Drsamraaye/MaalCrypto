import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - List all posts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: Record<string, unknown> = {};
        if (type && type !== 'all') where.type = type;
        if (status && status !== 'all') where.status = status;

        const posts = await prisma.post.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST - Create new post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('POST /api/posts - Received body:', JSON.stringify(body, null, 2));
        const { title, slug, description, content, imageUrl, type, status, author, videoUrl } = body;

        if (!title || !slug) {
            return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
        }

        // Check if slug exists
        const existing = await prisma.post.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        console.log('Creating post with data:', { title, slug, imageUrl });
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                description,
                content,
                imageUrl,
                type: type || 'BLOG',
                status: status || 'DRAFT',
                author,
                videoUrl,
            },
        });
        console.log('Post created successfully:', post.id, post.slug, 'Image URL:', post.imageUrl);

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({
            error: 'Failed to create post',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
