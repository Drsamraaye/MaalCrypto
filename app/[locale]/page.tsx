import NewsGridGelle from '@/components/sections/NewsGridGelle';
import NewsletterGelle from '@/components/sections/NewsletterGelle';
import YouTubePlaylist from '@/components/sections/YouTubePlaylist';
import HeroTicker from '@/components/sections/HeroTicker';
import DynamicPostsGrid from '@/components/DynamicPostsGrid';
import AdBanner from '@/components/ads/AdBanner';

import Link from 'next/link';
import { TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { getBinancePrices } from '@/lib/binance';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Fetch live prices
    const prices = await getBinancePrices();
    const btcPrice = prices.find(p => p.symbol === 'BTCUSDT')?.price || 0;
    const ethPrice = prices.find(p => p.symbol === 'ETHUSDT')?.price || 0;

    return (
        <div className="min-h-screen bg-black">

            {/* Hero Section - Dark with Green Accent */}
            <section className="relative overflow-hidden bg-black py-24 md:py-32">
                {/* Background Image */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

                <div className="relative container mx-auto px-4 text-center">
                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-green-500 mb-4 tracking-tight">
                        MAALCRYPTO
                    </h1>
                    <p className="text-2xl md:text-4xl text-white font-light tracking-[0.3em] mb-8">
                        YOUR CRYPTO DESTINATION
                    </p>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/prices`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider rounded transition-colors"
                    >
                        Get Started
                    </Link>

                    {/* Subtitle */}
                    <p className="mt-12 text-neutral-400 max-w-2xl mx-auto">
                        Your gateway to cryptocurrency markets. Real-time prices, breaking news, and expert analysis - all in one place.
                    </p>

                    {/* Live Prices */}
                    <HeroTicker />

                </div>
            </section>

            {/* Header Advertisement */}
            <section className="py-4 bg-neutral-900 border-y border-neutral-800">
                <div className="container mx-auto px-4">
                    <AdBanner position="header" className="max-w-4xl mx-auto" />
                </div>
            </section>

            {/* Latest Blog Posts from Admin */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-2 border border-green-500/20">
                                From Our Blog
                            </span>
                            <h2 className="text-3xl font-bold text-white">Latest Posts</h2>
                        </div>
                        <Link
                            href={`/${locale}/blog`}
                            className="text-green-500 hover:text-green-400 font-medium flex items-center gap-2"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <DynamicPostsGrid locale={locale} limit={6} showTitle={false} />
                </div>
            </section>

            {/* Latest News Section */}
            <NewsGridGelle title="Latest News" locale={locale} />

            {/* Newsletter Section */}
            <NewsletterGelle />

            {/* Sidebar Ad */}
            <section className="py-8 bg-neutral-900">
                <div className="container mx-auto px-4">
                    <AdBanner position="inline" className="max-w-2xl mx-auto" />
                </div>
            </section>

            {/* YouTube Playlist */}
            <YouTubePlaylist title="YouTube Playlist" />

        </div>
    );
}

