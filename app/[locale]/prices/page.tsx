import { getMarketTickerData } from '@/lib/coingecko';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Search } from 'lucide-react';
import Link from 'next/link';

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const marketData = await getMarketTickerData();

    return (
        <div className="min-h-screen bg-black">

            {/* Hero Section */}
            <section className="relative bg-black py-16 border-b border-neutral-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/20 to-black" />
                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        LIVE <span className="text-green-500">MARKET DATA</span>
                    </h1>
                    <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
                        Track real-time prices, market caps, and 24h changes for top cryptocurrencies.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search cryptocurrencies..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        />
                    </div>
                </div>
            </section>

            {/* Market Stats */}
            <section className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 text-center">
                        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Market Cap</div>
                        <div className="text-2xl font-black text-white">$2.1T</div>
                        <div className="text-xs text-green-500 font-bold mt-1 bg-green-500/10 inline-block px-2 py-0.5 rounded">+2.4%</div>
                    </div>
                    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 text-center">
                        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">24h Volume</div>
                        <div className="text-2xl font-black text-white">$89B</div>
                        <div className="text-xs text-green-500 font-bold mt-1 bg-green-500/10 inline-block px-2 py-0.5 rounded">+5.2%</div>
                    </div>
                    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 text-center">
                        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">BTC Dominance</div>
                        <div className="text-2xl font-black text-white">52.8%</div>
                    </div>
                    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 text-center">
                        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Cryptocurrencies</div>
                        <div className="text-2xl font-black text-white">12,456</div>
                    </div>
                </div>
            </section>

            {/* Price Table */}
            <section className="container mx-auto px-4 pb-16">
                <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">

                    {/* Table Header */}
                    <div className="border-b border-neutral-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <h2 className="text-xl font-bold text-white">Top 100 Assets</h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                                All
                            </button>
                            <button className="px-4 py-2 bg-neutral-800 text-neutral-400 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 hover:text-white transition-colors">
                                DeFi
                            </button>
                            <button className="px-4 py-2 bg-neutral-800 text-neutral-400 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-neutral-700 hover:text-white transition-colors">
                                NFT
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                                    <th className="text-left p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">#</th>
                                    <th className="text-left p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Asset</th>
                                    <th className="text-right p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Price</th>
                                    <th className="text-right p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">24h Change</th>
                                    <th className="text-right p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Market Cap</th>
                                    <th className="text-right p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marketData.map((coin, index) => {
                                    const isUp = (coin.price_change_percentage_24h ?? 0) >= 0;
                                    return (
                                        <tr
                                            key={coin.id}
                                            className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                                        >
                                            <td className="p-4 text-neutral-500 font-medium">{index + 1}</td>
                                            <td className="p-4">
                                                <Link href={`/${locale}/prices/${coin.id}`} className="flex items-center gap-3 group">
                                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full ring-2 ring-neutral-800 group-hover:ring-green-500/50 transition-all" />
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-green-500 transition-colors">
                                                            {coin.name}
                                                        </div>
                                                        <div className="text-xs text-neutral-500 uppercase font-bold">
                                                            {coin.symbol}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="p-4 text-right font-bold text-white">
                                                ${coin.current_price.toLocaleString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className={`inline-flex items-center gap-1 font-bold ${isUp ? 'text-green-500' : 'text-red-500'
                                                    }`}>
                                                    {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                                    {isUp ? '+' : ''}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                                                </div>
                                            </td>
                                            <td className="p-4 text-right text-neutral-400 font-medium hidden md:table-cell">
                                                ${(coin.market_cap / 1000000000).toFixed(2)}B
                                            </td>
                                            <td className="p-4 text-right text-neutral-400 font-medium hidden lg:table-cell">
                                                ${(coin.total_volume / 1000000).toFixed(0)}M
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Load More */}
                    <div className="p-6 text-center border-t border-neutral-800">
                        <button className="px-8 py-3 bg-neutral-800 hover:bg-green-600 hover:text-white text-neutral-300 rounded-lg font-bold transition-all text-sm uppercase tracking-wider">
                            Load More Assets
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
