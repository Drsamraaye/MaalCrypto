import Link from 'next/link';
import NewsCard from '@/components/ui/NewsCard';

// Reusing the same mock/fetch structure as news page, but generic
export default async function GenericFeedPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { locale } = await params;
    // Get the last segment of the URL to determine category (e.g. 'data', 'research') in a real app, 
    // or just hardcode title based on folder.
    // Since we are creating independent files, we can just hardcode the title.

    // Mock Data
    const posts = [1, 2, 3, 4, 5, 6].map(i => ({
        title: `Generated Article #${i}`,
        summary: "This content was automatically generated to populate the feed. Click to read the full AI-written article.",
        category: "General",
        date: "Dec 21, 2025",
        slug: `auto-gen-post-${i}`,
        imageUrl: `https://placehold.co/600x400/1e293b/ffffff?text=Post+${i}`
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                <h1 className="text-3xl font-bold capitalize">Latest Updates</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                    <Link key={i} href={`/${locale}/news/${post.slug}`}>
                        <NewsCard {...post} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
