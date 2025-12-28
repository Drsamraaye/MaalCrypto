import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Helper to check admin
async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user?.role === 'admin';
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!await isAdmin()) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const post = await prisma.post.findUnique({
            where: { id: params.id }
        });
        if (!post) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ post });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    if (!await isAdmin()) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        // Allow updating common fields
        const updated = await prisma.post.update({
            where: { id: params.id },
            data: {
                title: body.title,
                content: body.content,
                type: body.type,
                status: body.status,
                videoUrl: body.videoUrl,
                imageUrl: body.imageUrl,
                // Regenerate slug if title changed significantly? Usually better not to change slugs unless requested.
            }
        });
        return NextResponse.json({ message: 'Updated successfully', post: updated });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!await isAdmin()) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        await prisma.post.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}
