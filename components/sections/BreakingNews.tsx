import Link from 'next/link';
import { TrendingUp, Flame, Zap, Newspaper } from 'lucide-react';
import { getCryptoNews, NewsItem } from '@/lib/news';

interface BreakingNewsProps {
    locale: string;
}

// Map categories to icons
function getCategoryIcon(category?: string[]) {
    const cat = category?.[0]?.toLowerCase() || '';
    if (cat.includes('defi')) return Zap;
    if (cat.includes('nft')) return Flame;
    if (cat.includes('bitcoin') || cat.includes('trading')) return TrendingUp;
    return Newspaper;
}

// Format time ago
function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

export default async function BreakingNews({ locale }: BreakingNewsProps) {
    // Fetch real news from API
    const news = await getCryptoNews(3);

    return (
        <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Breaking News
                    </h2>
                    <Link
                        href={`/${locale}/news`}
                        className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-2"
                    >
                        View All News
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item, i) => {
                        const Icon = getCategoryIcon(item.category);
                        const categoryLabel = item.category?.[0] || 'Crypto';
                        const slug = encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50));

                        return (
                            <a
                                key={i}
                                href={item.link !== '#' ? item.link : `/${locale}/news/${slug}`}
                                target={item.link !== '#' ? '_blank' : undefined}
                                rel={item.link !== '#' ? 'noopener noreferrer' : undefined}
                                className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image_url || 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        <Icon className="w-3 h-3" />
                                        {categoryLabel}
                                    </div>

                                    {/* Source Badge */}
                                    {item.source_name && (
                                        <div className="absolute top-4 right-4 bg-slate-900/80 text-white px-2 py-1 rounded text-xs">
                                            {item.source_name}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                                        {item.title}
                                    </h3>

                                    {item.description && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                        <span>{formatTimeAgo(item.pubDate)}</span>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
