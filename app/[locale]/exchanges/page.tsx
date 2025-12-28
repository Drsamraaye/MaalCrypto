import { ArrowRight, ExternalLink, Star, TrendingUp, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

export default async function ExchangesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const exchanges = [
        {
            name: "Binance",
            rank: 1,
            score: "9.9",
            volume: "$14B",
            coins: "350+",
            fees: "0.1%",
            features: ["P2P Trading", "Staking", "Futures"],
            color: "text-yellow-400"
        },
        {
            name: "Coinbase",
            rank: 2,
            score: "9.5",
            volume: "$2.1B",
            coins: "200+",
            fees: "0.4%",
            features: ["User Friendly", "Public Company", "Wallet"],
            color: "text-blue-400"
        },
        {
            name: "Kraken",
            rank: 3,
            score: "9.2",
            volume: "$800M",
            coins: "180+",
            fees: "0.16%",
            features: ["Security", "Margin", "Indices"],
            color: "text-purple-400"
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/20 to-black" />
                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        TOP CRYPTO <span className="text-green-500">EXCHANGES</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                        Compare and find the best cryptocurrency exchanges for your trading needs. Secure, fast, and reliable platforms.
                    </p>
                </div>
            </section>

            {/* Exchanges List */}
            <section className="container mx-auto px-4 pb-20">
                <div className="space-y-4">
                    {exchanges.map((exchange) => (
                        <div key={exchange.name} className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-green-500/50 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Rank */}
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-black rounded-xl border border-neutral-800 text-neutral-400 font-bold text-xl">
                                    #{exchange.rank}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center justify-center md:justify-start gap-2">
                                        {exchange.name}
                                        <Shield className="w-4 h-4 text-green-500" />
                                    </h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-neutral-500">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            {exchange.score}/10
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Globe className="w-3 h-3" />
                                            {exchange.coins} Coins
                                        </span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-8 text-center md:text-left">
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Volume (24h)</p>
                                        <p className="text-lg font-bold text-white">{exchange.volume}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Fees</p>
                                        <p className="text-lg font-bold text-green-400">{exchange.fees}</p>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="flex-shrink-0">
                                    <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold uppercase rounded-lg transition-colors flex items-center gap-2">
                                        Visit Site
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
