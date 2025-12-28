import { prisma } from '@/lib/prisma';
import { generateContentMock } from '@/lib/ai-mock';

export type PlatformPostType = 'NEWS' | 'ANALYSIS' | 'BLOG' | 'TUTORIAL' | 'SPONSORED';

export async function getOrCreatePost(slug: string, type: PlatformPostType, locale: string) {
    // 1. Try to find existing post
    const existingPost = await prisma.post.findUnique({
        where: { slug }
    });

    if (existingPost) {
        return existingPost;
    }

    // 2. If not found, GENERATE IT (JIT)
    // Clean slug to topic text (e.g., "bitcoin-crash" -> "Bitcoin Crash")
    const topic = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const generated = await generateContentMock(topic, type);

    // 3. Save to DB directly as PUBLISHED
    const newPost = await prisma.post.create({
        data: {
            slug: slug,
            type: type as any,
            status: 'PUBLISHED',
            imageUrl: `https://placehold.co/800x600/1e293b/ffffff?text=${encodeURIComponent(topic)}`,
            // Use English content by default since we removed translations
            title: generated.en.title,
            description: generated.en.description,
            content: generated.en.content
        }
    });

    return newPost;
}
