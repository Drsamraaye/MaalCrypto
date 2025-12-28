import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Ensure user is authenticated and is admin (optional check)
        // if (!session || session.user.role !== 'admin') {
        //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // }

        const { title, slug, content, category, imageUrl, author, videoUrl } = await req.json();

        if (!title || !slug || !content) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Create Post in Database
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                description: content.substring(0, 150) + '...',
                type: category, // Now supports TUTORIAL, SPONSORED
                imageUrl,
                videoUrl,
                author,
                status: 'PUBLISHED',
            },
        });

        // 2. Send Emails to Subscribers
        const subscribers = await prisma.subscriber.findMany({
            where: { active: true },
        });

        // Determine subject prefix
        const subjectPrefix =
            category === 'TUTORIAL' ? 'New Tutorial: ' :
                category === 'SPONSORED' ? 'Partner Content: ' :
                    'New Blog Post: ';

        // Send emails in parallel (or use a queue in production)
        Promise.all(
            subscribers.map((sub: { email: string }) =>
                sendEmail({
                    to: sub.email,
                    subject: subjectPrefix + title,
                    html: `
            <h1>${title}</h1>
            <p>${content.substring(0, 200)}...</p>
            <a href="${process.env.NEXTAUTH_URL}/blog/${slug}">Read Full Post</a>
          `,
                })
            )
        ).catch((err) => console.error('Failed to send emails', err));
        // Optionally await or let it run in background/Vercel functions
        // await notificationPromise;

        return NextResponse.json(
            { message: 'Post created and notifications sent', postId: post.id },
            { status: 201 }
        );

    } catch (error) {
        console.error('Blog creation error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
