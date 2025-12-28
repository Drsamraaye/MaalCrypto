'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown, ExternalLink, Sparkles } from 'lucide-react';
import PriceChart from './PriceChart';

interface CoinData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    image: string;
    sparkline_in_7d?: { price: number[] };
}

interface CoinCardEnhancedProps {
    coin: CoinData;
    locale: string;
    showChart?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

function formatNumber(num: number): string {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
}

function formatPrice(price: number): string {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    if (price >= 0.01) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(6)}`;
}

export function CoinCardEnhanced({ coin, locale, showChart = true, size = 'md' }: CoinCardEnhancedProps) {
    const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0;
    const changePercent = coin.price_change_percentage_24h ?? 0;

    return (
        <Link
            href={`/${locale}/prices/${coin.id}`}
            className="group card-premium p-5 block"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-12 h-12 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-blue-500/50 transition-all"
                        />
                        {isPositive && (
                            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {coin.name}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
                            {coin.symbol}
                        </span>
                    </div>
                </div>

                {/* External link icon */}
                <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Price & Change */}
            <div className="flex items-end justify-between mb-4">
                <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatPrice(coin.current_price)}
                    </div>
                    <div className={`
                        inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-sm font-bold
                        ${isPositive
                            ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-500/10'
                            : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10'
                        }
                    `}>
                        {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                    </div>
                </div>

                {/* Mini Chart */}
                {showChart && (
                    <div className="w-24 h-12 opacity-70 group-hover:opacity-100 transition-opacity">
                        <PriceChart
                            symbol={coin.symbol.toUpperCase()}
                            timeframe="7d"
                            height={48}
                            showLabels={false}
                        />
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Market Cap</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {formatNumber(coin.market_cap)}
                    </div>
                </div>
                <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">24h Volume</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {formatNumber(coin.total_volume)}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CoinCardEnhanced;
