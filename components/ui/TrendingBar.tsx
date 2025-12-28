import { Flame } from 'lucide-react';
import Link from 'next/link';
import { getTrendingCoins } from '@/lib/coingecko';

export default async function TrendingBar() {
    const trendingData = await getTrendingCoins();
    const trendingCoins = trendingData.slice(0, 7); // Top 7

    if (!trendingCoins.length) return null;

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 py-2 px-4 flex items-center gap-4 text-sm overflow-hidden">
            <div className="flex items-center gap-1 font-bold text-orange-500 whitespace-nowrap">
                <Flame className="w-4 h-4" />
                <span>Trending:</span>
            </div>
            <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-slate-600 dark:text-slate-400">
                {trendingCoins.map((t, i) => (
                    <Link key={i} href={`/en/prices/${t.item.slug || t.item.id}`} className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <img src={t.item.thumb} alt={t.item.name} className="w-4 h-4 rounded-full" />
                        <span className="font-medium">{t.item.name}</span>
                        <span className="text-xs text-slate-400">#{t.item.market_cap_rank}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
