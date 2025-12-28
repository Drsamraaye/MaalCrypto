'use client';

import { useState, useEffect } from 'react';
import NewsCardGelle from '@/components/ui/NewsCardGelle';
import { ChevronDown } from 'lucide-react';

interface NewsArticle {
    id: string;
    title: string;
    url: string;
    source: string;
    publishedAt: string;
    currencies: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    votes: { positive: number; negative: number };
}

interface NewsGridGelleProps {
    title: string;
    locale: string;
    initialNews?: NewsArticle[];
    showMoreLink?: string;
}

// Generate placeholder images based on news ID
function getNewsImage(id: string, index: number): string {
    const imageIds = [
        'bitcoin-chart', 'ethereum-network', 'crypto-trading',
        'blockchain-tech', 'defi-protocol', 'nft-art',
        'market-analysis', 'whale-activity', 'altcoin-rally'
    ];
    return `https://picsum.photos/seed/${imageIds[index % imageIds.length]}-${id}/800/500`;
}

export function NewsGridGelle({
    title,
    locale,
    initialNews = [],
    showMoreLink
}: NewsGridGelleProps) {
    const [news, setNews] = useState<NewsArticle[]>(initialNews);
    const [loading, setLoading] = useState(initialNews.length === 0);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        if (initialNews.length > 0) {
            setNews(initialNews);
            setLoading(false);
            return;
        }

        async function fetchNews() {
            try {
                const res = await fetch('/api/news?filter=hot&limit=12');
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                setNews(data.data || []);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [initialNews]);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    if (loading) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <span className="w-1 h-8 bg-yellow-400 rounded"></span>
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-100 animate-pulse rounded-lg overflow-hidden">
                                <div className="h-48 bg-gray-200" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const visibleNews = news.slice(0, visibleCount);
    const hasMore = visibleCount < news.length;

    return (
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="w-1 h-8 bg-green-500 rounded"></span>
                    {title}
                </h2>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleNews.map((article, index) => (
                        <NewsCardGelle
                            key={article.id}
                            id={article.id}
                            title={article.title}
                            image={getNewsImage(article.id, index)}
                            category={article.currencies[0] || 'LATEST NEWS'}
                            author={article.source}
                            publishedAt={article.publishedAt}
                            locale={locale}
                        />
                    ))}
                </div>

                {/* Show More Button */}
                {hasMore && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleShowMore}
                            className="inline-flex items-center gap-2 px-8 py-3 border border-green-500 text-green-500 font-bold uppercase text-sm rounded-full hover:bg-green-500 hover:text-white transition-colors"
                        >
                            Show More
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default NewsGridGelle;
