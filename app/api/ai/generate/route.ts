import { NextRequest, NextResponse } from 'next/server';
import { generateContentMock } from '@/lib/ai-mock';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { topic, type } = await req.json();

        if (!topic || !type) {
            return NextResponse.json({ error: 'Topic and Type are required' }, { status: 400 });
        }

        // 1. Generate Mock Content
        const generated = await generateContentMock(topic, type);

        // 2. Save to Database (Draft)
        const post = await prisma.post.create({
            data: {
                slug: generated.slug,
                type: type as any,
                status: 'DRAFT',
                imageUrl: `https://placehold.co/800x600?text=${encodeURIComponent(topic)}`,
                translations: {
                    create: [
                        {
                            language: 'EN',
                            title: generated.en.title,
                            description: generated.en.description,
                            content: generated.en.content
                        },
                        {
                            language: 'SO',
                            title: generated.so.title,
                            description: generated.so.description,
                            content: generated.so.content
                        }
                    ]
                }
            },
            include: {
                translations: true
            }
        });

        return NextResponse.json({ success: true, post });

    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}
