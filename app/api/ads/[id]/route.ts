import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Update ad
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, type, content, linkUrl, position, active } = body;

        const ad = await prisma.advertisement.update({
            where: { id },
            data: {
                title,
                type,
                content,
                linkUrl,
                position,
                active,
            },
        });

        return NextResponse.json({ ad });
    } catch (error) {
        console.error('Error updating ad:', error);
        return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
    }
}

// DELETE - Delete ad
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.advertisement.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting ad:', error);
        return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
    }
}
