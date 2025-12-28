'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ExternalLink, Clock, Flame, Zap, Star } from 'lucide-react';

interface NewsArticle {
    id: string;
    title: string;
    url: string;
    source: string;
    publishedAt: string;
    currencies: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    votes: {
        positive: number;
        negative: number;
    };
}

interface NewsSectionEnhancedProps {
    initialNews?: NewsArticle[];
    filter?: 'hot' | 'rising' | 'important';
    limit?: number;
    showHeader?: boolean;
    layout?: 'grid' | 'list';
}

function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
}

function SentimentBadge({ sentiment }: { sentiment: NewsArticle['sentiment'] }) {
    const config = {
        positive: { icon: TrendingUp, color: 'text-green-500 bg-green-50 dark:bg-green-500/10', label: 'Bullish' },
        negative: { icon: TrendingDown, color: 'text-red-500 bg-red-50 dark:bg-red-500/10', label: 'Bearish' },
        neutral: { icon: Minus, color: 'text-slate-500 bg-slate-50 dark:bg-slate-500/10', label: 'Neutral' },
    };

    const { icon: Icon, color, label } = config[sentiment];

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    );
}

const FILTER_ICONS: Record<string, typeof Flame> = {
    hot: Flame,
    rising: TrendingUp,
    important: Star,
};

export function NewsSectionEnhanced({
    initialNews = [],
    filter = 'hot',
    limit = 10,
    showHeader = true,
    layout = 'list'
}: NewsSectionEnhancedProps) {
    const [news, setNews] = useState<NewsArticle[]>(initialNews);
    const [loading, setLoading] = useState(initialNews.length === 0);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState(filter);

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            try {
                const res = await fetch(`/api/news?filter=${activeFilter}&limit=${limit}`);
                if (!res.ok) throw new Error('Failed to fetch news');

                const result = await res.json();
                setNews(result.data || []);
            } catch (err) {
                console.error('News fetch error:', err);
                setError('Failed to load news');
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [activeFilter, limit]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="card-premium p-6 animate-pulse">
                        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="card-premium p-8 text-center">
                <p className="text-slate-500 dark:text-slate-400">{error}</p>
                <button
                    onClick={() => setActiveFilter(activeFilter)}
                    className="mt-4 btn-premium"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            {showHeader && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Latest Crypto News
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {(['hot', 'rising', 'important'] as const).map(f => {
                            const Icon = FILTER_ICONS[f];
                            return (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg capitalize
                                        transition-all duration-200
                                        ${f === activeFilter
                                            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4" />
                                    {f}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                {news.map((article, index) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group card-premium p-5 block animate-slide-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start gap-4">
                            {/* Rank/Number */}
                            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400">
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                {/* Title */}
                                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                                    {article.title}
                                </h3>

                                {/* Meta info */}
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    {/* Source */}
                                    <span className="font-medium text-slate-600 dark:text-slate-300">
                                        {article.source}
                                    </span>

                                    {/* Time */}
                                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                        <Clock className="w-3 h-3" />
                                        {formatTimeAgo(article.publishedAt)}
                                    </span>

                                    {/* Sentiment */}
                                    <SentimentBadge sentiment={article.sentiment} />

                                    {/* Coins */}
                                    {article.currencies.length > 0 && (
                                        <div className="flex gap-1">
                                            {article.currencies.slice(0, 3).map(coin => (
                                                <span
                                                    key={coin}
                                                    className="px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium"
                                                >
                                                    ${coin}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* External link icon */}
                            <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                        </div>
                    </a>
                ))}
            </div>

            {/* Load More */}
            {news.length >= limit && (
                <div className="mt-6 text-center">
                    <button className="btn-premium">
                        Load More News
                    </button>
                </div>
            )}
        </div>
    );
}

export default NewsSectionEnhanced;
