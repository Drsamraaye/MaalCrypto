import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - List all ads
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const position = searchParams.get('position');
        const active = searchParams.get('active');

        const where: Record<string, unknown> = {};
        if (position) where.position = position;
        if (active === 'true') where.active = true;

        const ads = await prisma.advertisement.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ ads });
    } catch (error) {
        console.error('Error fetching ads:', error);
        return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
    }
}

// POST - Create new ad
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, type, content, linkUrl, position, active } = body;

        if (!title || !type || !content) {
            return NextResponse.json({ error: 'Title, type, and content are required' }, { status: 400 });
        }

        const ad = await prisma.advertisement.create({
            data: {
                title,
                type,
                content,
                linkUrl,
                position: position || 'sidebar',
                active: active ?? true,
            },
        });

        return NextResponse.json({ ad }, { status: 201 });
    } catch (error) {
        console.error('Error creating ad:', error);
        return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
    }
}
