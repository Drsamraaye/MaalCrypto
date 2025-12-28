import Link from 'next/link';
import { TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';

interface ExchangesSectionProps {
    locale: string;
}

export default function TopExchanges({ locale }: ExchangesSectionProps) {
    // Mock exchange data - in production, fetch from CoinGecko exchanges API
    const exchanges = [
        {
            name: 'Binance',
            logo: '🟡',
            volume24h: '$76.4B',
            trustScore: 10,
            tradingPairs: 2000,
            url: 'https://binance.com'
        },
        {
            name: 'Coinbase',
            logo: '🔵',
            volume24h: '$4.2B',
            trustScore: 10,
            tradingPairs: 400,
            url: 'https://coinbase.com'
        },
        {
            name: 'Kraken',
            logo: '🟣',
            volume24h: '$1.8B',
            trustScore: 10,
            tradingPairs: 600,
            url: 'https://kraken.com'
        },
        {
            name: 'Bybit',
            logo: '🟠',
            volume24h: '$12.5B',
            trustScore: 9,
            tradingPairs: 1200,
            url: 'https://bybit.com'
        }
    ];

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Top Crypto Exchanges
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Most trusted platforms for trading digital assets
                        </p>
                    </div>
                    <Link
                        href={`/${locale}/exchanges`}
                        className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Exchanges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {exchanges.map((exchange, i) => (
                        <a
                            key={i}
                            href={exchange.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                        >
                            {/* Exchange Logo & Name */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-4xl">{exchange.logo}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {exchange.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <Shield className="w-3 h-3 text-green-600" />
                                        <span>Trust Score: {exchange.trustScore}/10</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">24h Volume</span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">{exchange.volume24h}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        Trading Pairs
                                    </span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">{exchange.tradingPairs}+</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
                                    <span>Visit Exchange</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom CTA - Mobile */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href={`/${locale}/exchanges`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm"
                    >
                        View All Exchanges
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
