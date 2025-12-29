import Link from 'next/link';
import { TrendingUp, Clock, User, Search, Filter } from 'lucide-react';
import DynamicPostsGrid from '@/components/DynamicPostsGrid';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Categories
    const categories = [
        { name: 'All', count: 156, slug: 'all' },
        { name: 'Beginner Guides', count: 42, slug: 'beginners' },
        { name: 'Trading', count: 38, slug: 'trading' },
        { name: 'DeFi', count: 28, slug: 'defi' },
        { name: 'NFTs', count: 22, slug: 'nfts' },
        { name: 'Security', count: 18, slug: 'security' },
        { name: 'Tax & Legal', count: 8, slug: 'tax' }
    ];

    // Trending posts
    const trendingPosts = [
        { title: "Bitcoin vs Ethereum: Which is Better in 2025?", views: "125K" },
        { title: "Top 10 Altcoins to Watch This Month", views: "98K" },
        { title: "Crypto Wallet Comparison: Hardware vs Software", views: "87K" },
        { title: "Is Crypto Mining Still Profitable?", views: "76K" }
    ];

    return (
        <div className="min-h-screen bg-black">

            {/* Hero Section */}
            <section className="bg-black py-20 border-b border-neutral-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/20 to-black" />
                <div className="container mx-auto px-4 relative">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-6 border border-green-500/20">
                            Knowledge Base
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            CRYPTO <span className="text-green-500">EDUCATION</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
                            Master cryptocurrency with our comprehensive guides, tutorials, and expert insights.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search articles, guides, tutorials..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${cat.slug === 'all'
                                    ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]'
                                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-green-500/50'
                                    }`}
                            >
                                {cat.name} <span className="text-xs opacity-60 ml-1">({cat.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <DynamicPostsGrid locale={locale} limit={12} showTitle={false} />
                    </div>

                    {/* Right: Sidebar */}
                    <div className="space-y-8">

                        {/* Newsletter Card */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
                            <h3 className="text-xl font-black text-white mb-2 relative z-10">WEEKLY INTEL</h3>
                            <p className="text-neutral-400 text-sm mb-4 relative z-10">
                                Get our best crypto analysis delivered to your inbox every week.
                            </p>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-3 rounded-lg bg-black border border-neutral-800 text-white placeholder-neutral-600 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 relative z-10"
                            />
                            <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-green-500 transition-colors relative z-10">
                                Subscribe Free
                            </button>
                        </div>

                        {/* Trending Posts */}
                        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
                            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Trending Now</h3>
                            </div>
                            <div className="space-y-4">
                                {trendingPosts.map((post, i) => (
                                    <Link
                                        key={i}
                                        href="#"
                                        className="group block pb-4 border-b border-neutral-800 last:border-0"
                                    >
                                        <div className="flex gap-3">
                                            <span className="text-2xl font-black text-neutral-800 group-hover:text-green-500/30 transition-colors">0{i + 1}</span>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-white group-hover:text-green-400 transition-colors mb-1 leading-tight">
                                                    {post.title}
                                                </h4>
                                                <span className="text-xs text-neutral-600">{post.views} views</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
                            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
                                <Filter className="w-4 h-4 text-green-500" />
                                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Topics</h3>
                            </div>
                            <div className="space-y-2">
                                {categories.slice(1).map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/${locale}/blog/category/${cat.slug}`}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-800 transition-colors group"
                                    >
                                        <span className="font-medium text-neutral-400 group-hover:text-white text-sm">
                                            {cat.name}
                                        </span>
                                        <span className="text-xs bg-black border border-neutral-800 px-2 py-1 rounded text-neutral-500 group-hover:text-green-500 group-hover:border-green-500/30 transition-colors">
                                            {cat.count}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
