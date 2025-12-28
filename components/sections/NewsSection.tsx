'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ExternalLink, Clock } from 'lucide-react';

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

interface NewsSectionProps {
    initialNews?: NewsArticle[];
    filter?: 'hot' | 'rising' | 'important';
    limit?: number;
    showHeader?: boolean;
}

function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

function SentimentIcon({ sentiment }: { sentiment: NewsArticle['sentiment'] }) {
    switch (sentiment) {
        case 'positive':
            return <TrendingUp className="w-4 h-4 text-green-500" />;
        case 'negative':
            return <TrendingDown className="w-4 h-4 text-red-500" />;
        default:
            return <Minus className="w-4 h-4 text-slate-400" />;
    }
}

export function NewsSection({
    initialNews = [],
    filter = 'hot',
    limit = 10,
    showHeader = true
}: NewsSectionProps) {
    const [news, setNews] = useState<NewsArticle[]>(initialNews);
    const [loading, setLoading] = useState(initialNews.length === 0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialNews.length > 0) return;

        async function fetchNews() {
            try {
                const res = await fetch(`/api/news?filter=${filter}&limit=${limit}`);
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
    }, [filter, limit, initialNews.length]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg h-24" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-slate-500">
                {error}
            </div>
        );
    }

    return (
        <div>
            {showHeader && (
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Latest Crypto News
                    </h2>
                    <div className="flex gap-2">
                        {['hot', 'rising', 'important'].map(f => (
                            <button
                                key={f}
                                className={`px-3 py-1 text-sm rounded-full capitalize ${f === filter
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {news.map(article => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                    >
                        <div className="flex items-start gap-4">
                            {/* Sentiment indicator */}
                            <div className="mt-1">
                                <SentimentIcon sentiment={article.sentiment} />
                            </div>

                            <div className="flex-1 min-w-0">
                                {/* Title */}
                                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                                    {article.title}
                                </h3>

                                {/* Meta info */}
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {article.source}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatTimeAgo(article.publishedAt)}
                                    </span>

                                    {/* Coins */}
                                    {article.currencies.length > 0 && (
                                        <div className="flex gap-1">
                                            {article.currencies.slice(0, 3).map(coin => (
                                                <span
                                                    key={coin}
                                                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium"
                                                >
                                                    {coin}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* External link icon */}
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default NewsSection;
