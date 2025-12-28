'use client';

import Link from 'next/link';
import { CoinData } from '@/lib/coingecko';
import CoinSparkline from './CoinSparkline';

interface CoinCardProps {
    coin: CoinData;
    locale: string;
}

export default function CoinCard({ coin, locale }: CoinCardProps) {
    const isUp = coin.price_change_percentage_24h >= 0;

    return (
        <Link
            href={`/${locale}/prices/${coin.id}`}
            className="block p-5 bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl dark:hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full ${isUp ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold font-heading text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{coin.name}</h3>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{coin.symbol}</span>
                    </div>
                </div>
                <div className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isUp ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                    {isUp ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                </div>
            </div>

            <div className="mb-4">
                <div className="text-2xl font-bold tracking-tight font-heading">
                    ${coin.current_price.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                    Vol: <span className="text-slate-600 dark:text-slate-300">${(coin.total_volume / 1000000).toFixed(0)}M</span>
                </div>
            </div>

            {coin.sparkline_in_7d && (
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                    <CoinSparkline
                        data={coin.sparkline_in_7d.price}
                        isUp={isUp}
                    />
                </div>
            )}
        </Link>
    );
}
