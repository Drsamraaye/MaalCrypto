import Link from 'next/link';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const query = q || '';

    // TODO: Implement actual search logic with database
    const mockResults = query ? [
        { title: `Bitcoin reaches new high amid ${query} developments`, slug: 'btc-high', type: 'news' },
        { title: `Analysis: ${query} impact on crypto markets`, slug: 'crypto-analysis', type: 'analysis' },
        { title: `${query} explained for beginners`, slug: 'beginner-guide', type: 'blog' }
    ] : [];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">

                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        {query ? `Search Results for "${query}"` : 'Search'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        {query ? `Found ${mockResults.length} results` : 'Enter a search term to get started'}
                    </p>
                </div>

                {/* Results */}
                {query && (
                    <div className="space-y-6">
                        {mockResults.length > 0 ? (
                            mockResults.map((result, i) => (
                                <Link
                                    key={i}
                                    href={`/en/${result.type}/${result.slug}`}
                                    className="block p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded">
                                            {result.type}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                                        {result.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        Published 2 hours ago • 5 min read
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-slate-500 dark:text-slate-400">No results found. Try a different search term.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Popular Searches */}
                {!query && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            Popular Searches
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {['Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Web3', 'Staking'].map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/en/search?q=${tag.toLowerCase()}`}
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 rounded-full font-medium text-sm transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
