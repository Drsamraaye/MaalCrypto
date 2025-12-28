import Link from 'next/link';
import { TrendingUp, Zap, Globe, Users, ArrowRight } from 'lucide-react';
import { getBinancePrices } from '@/lib/binance';

interface HeroSectionEnhancedProps {
    locale: string;
}

export default async function HeroSectionEnhanced({ locale }: HeroSectionEnhancedProps) {
    // Fetch live stats
    const prices = await getBinancePrices();
    const btcPrice = prices.find(p => p.symbol === 'BTCUSDT')?.price || 0;
    const ethPrice = prices.find(p => p.symbol === 'ETHUSDT')?.price || 0;

    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />

            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Glow orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative container mx-auto px-4 py-20 md:py-28">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-float">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Real-time crypto intelligence</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Your Gateway to{' '}
                        <span className="text-gradient">Crypto Markets</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Live prices, breaking news, and market insights. Everything you need to navigate the crypto world.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            href={`/${locale}/prices`}
                            className="group btn-premium flex items-center gap-2"
                        >
                            <TrendingUp className="w-5 h-5" />
                            View Live Prices
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href={`/${locale}/news`}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white border border-white/20 hover:bg-white/10 transition-all"
                        >
                            <Globe className="w-5 h-5" />
                            Latest News
                        </Link>
                    </div>

                    {/* Live Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="stat-card">
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Bitcoin</div>
                            <div className="text-2xl font-bold text-white">${btcPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-green-400">
                                <span className="live-dot" />
                                <span>Live</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ethereum</div>
                            <div className="text-2xl font-bold text-white">${ethPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-green-400">
                                <span className="live-dot" />
                                <span>Live</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">News Sources</div>
                            <div className="text-2xl font-bold text-white">200+</div>
                            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-slate-400">
                                <Globe className="w-3 h-3" />
                                <span>Aggregated</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Coins Tracked</div>
                            <div className="text-2xl font-bold text-white">1,000+</div>
                            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-slate-400">
                                <Users className="w-3 h-3" />
                                <span>Real-time</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
        </section>
    );
}
