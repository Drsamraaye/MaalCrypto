import NewsCard from '@/components/ui/NewsCard';

export default async function NewsPage(props: { searchParams: Promise<{ welcome?: string }> }) {
    const searchParams = await props.searchParams;
    const showWelcome = searchParams.welcome === 'true';

    // Mock Data
    const newsPosts = Array.from({ length: 8 }).map((_, i) => ({
        title: `Crypto Market Update: Bitcoin Holds Strong Amidst Global Uncertainty ${i + 1}`,
        summary: "Investors are watching closely as new regulations are proposed in major economies. Here is what you need to know about the market movements today.",
        category: "Market News",
        date: "Dec 21, 2025",
        slug: `crypto-update-${i}`,
        imageUrl: `https://placehold.co/600x400/1e293b/ffffff?text=News+${i + 1}`
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            {showWelcome && (
                <div className="mb-8 p-6 bg-green-500/10 border border-green-500 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-2xl">🎉</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-green-500 mb-1">Welcome to MaalCrypto Pro!</h2>
                        <p className="text-gray-400">You're now logged in. Enjoy our premium news and analysis tailored just for you.</p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold tracking-tight">Latest News</h1>
                <div className="flex gap-2 text-sm text-slate-500">
                    <span>Filter by:</span>
                    <select className="border rounded px-2 py-1">
                        <option>All</option>
                        <option>Regulation</option>
                        <option>Tech</option>
                        <option>Markets</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsPosts.map((post, i) => (
                    <NewsCard key={i} {...post} />
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button className="px-6 py-2 border border-slate-300 rounded-md hover:bg-slate-50 font-medium">
                    Load More Stories
                </button>
            </div>
        </div>
    );
}
