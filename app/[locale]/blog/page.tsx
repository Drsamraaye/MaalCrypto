import Link from 'next/link';
import { TrendingUp, Clock, User, Search, Filter } from 'lucide-react';

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

    // Featured Post
    const featuredPost = {
        title: "Complete Guide to Cryptocurrency Investing in 2025: From Beginner to Advanced",
        excerpt: "Master the fundamentals of crypto investing with our comprehensive guide covering wallets, exchanges, portfolio management, risk strategies, and advanced trading techniques.",
        category: "Beginner Guides",
        date: "Dec 22, 2025",
        readTime: "18 min",
        slug: "complete-crypto-investing-guide-2025",
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80",
        author: {
            name: "Sarah Chen",
            avatar: "SC",
            role: "Senior Analyst"
        }
    };

    // Blog posts
    const blogPosts = [
        {
            title: "How to Secure Your Crypto Wallet: Complete Security Guide",
            excerpt: "Learn essential security practices to protect your digital assets from hackers and scammers.",
            category: "Security",
            categoryColor: "bg-red-500/10 text-red-500 border border-red-500/20",
            date: "Dec 21, 2025",
            readTime: "12 min",
            slug: "secure-crypto-wallet-guide",
            imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
            author: { name: "Mike Johnson", avatar: "MJ" }
        },
        {
            title: "Understanding DeFi: Decentralized Finance Explained Simply",
            excerpt: "Demystify DeFi protocols, yield farming, liquidity pools, and how to earn passive income.",
            category: "DeFi",
            categoryColor: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
            date: "Dec 20, 2025",
            readTime: "15 min",
            slug: "defi-explained-simple",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
            author: { name: "Emma Davis", avatar: "ED" }
        },
        {
            title: "NFT Investing Strategy: How to Find Valuable Projects",
            excerpt: "Discover proven strategies for identifying NFT projects with long-term potential and avoiding scams.",
            category: "NFTs",
            categoryColor: "bg-pink-500/10 text-pink-500 border border-pink-500/20",
            date: "Dec 19, 2025",
            readTime: "10 min",
            slug: "nft-investing-strategy",
            imageUrl: "https://images.unsplash.com/photo-1643916861364-02e63ce3e52f?w=600&q=80",
            author: { name: "Alex Wong", avatar: "AW" }
        },
        {
            title: "Crypto Tax Guide 2025: Everything You Need to Know",
            excerpt: "Navigate crypto taxes with confidence. Learn about capital gains, DeFi income, and deductions.",
            category: "Tax & Legal",
            categoryColor: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
            date: "Dec 18, 2025",
            readTime: "14 min",
            slug: "crypto-tax-guide-2025",
            imageUrl: "https://images.unsplash.com/photo-1554224311-beee4542a1ed?w=600&q=80",
            author: { name: "Sarah Chen", avatar: "SC" }
        },
        {
            title: "Day Trading Crypto: Essential Strategies for Beginners",
            excerpt: "Learn technical analysis, chart patterns, and risk management for successful crypto day trading.",
            category: "Trading",
            categoryColor: "bg-green-500/10 text-green-500 border border-green-500/20",
            date: "Dec 17, 2025",
            readTime: "16 min",
            slug: "day-trading-crypto-strategies",
            imageUrl: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=600&q=80",
            author: { name: "Mike Johnson", avatar: "MJ" }
        },
        {
            title: "Staking Rewards Calculator: Maximize Your Crypto Earnings",
            excerpt: "Compare staking platforms, calculate potential returns, and optimize your passive income strategy.",
            category: "DeFi",
            categoryColor: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
            date: "Dec 16, 2025",
            readTime: "9 min",
            slug: "staking-rewards-calculator",
            imageUrl: "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=600&q=80",
            author: { name: "Emma Davis", avatar: "ED" }
        }
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

                    {/* Left: Blog Posts */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Featured Post */}
                        <Link
                            href={`/${locale}/blog/${featuredPost.slug}`}
                            className="group block bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-green-500/50 transition-all"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={featuredPost.imageUrl}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        ⭐ Featured
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="inline-block bg-green-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3">
                                        {featuredPost.category}
                                    </span>
                                    <h2 className="text-3xl font-bold text-white leading-tight mb-3 group-hover:text-green-400 transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-neutral-300 mb-4 line-clamp-2">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-white text-xs font-bold border border-neutral-700">
                                                {featuredPost.author.avatar}
                                            </div>
                                            <span>{featuredPost.author.name}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{featuredPost.date}</span>
                                        <span>•</span>
                                        <span>{featuredPost.readTime} read</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Blog Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogPosts.map((post, i) => (
                                <Link
                                    key={i}
                                    href={`/${locale}/blog/${post.slug}`}
                                    className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-green-500/50 transition-all hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${post.categoryColor}`}>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold border border-neutral-700">
                                                    {post.author.avatar}
                                                </div>
                                                <span className="text-xs font-medium text-neutral-400">{post.author.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-neutral-600">
                                                <Clock className="w-3 h-3" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-8">
                            <button className="px-8 py-4 bg-neutral-900 border border-neutral-800 hover:bg-green-600 hover:text-white hover:border-green-500 text-neutral-300 rounded-lg font-bold transition-all uppercase tracking-wider text-sm">
                                Load More Articles
                            </button>
                        </div>
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
