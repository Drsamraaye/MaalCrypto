import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    locale: string;
}

export default function HeroSection({ locale }: HeroProps) {
    return (
        <section className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-b border-slate-800">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full">
                                Breaking News
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                            Bitcoin ETF Approval Sends Markets Soaring
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                            SEC greenlight marks historic moment for institutional crypto adoption as Bitcoin surges past $100K for first time.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href={`/${locale}/news/btc-etf-approval`}
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/70"
                            >
                                Read Full Story
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href={`/${locale}/prices`}
                                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold transition-all border border-slate-700"
                            >
                                View Live Prices
                            </Link>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-slate-400 pt-4">
                            <span>By CryptoMedia Team</span>
                            <span>•</span>
                            <span>2 hours ago</span>
                            <span>•</span>
                            <span>5 min read</span>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80"
                            alt="Bitcoin"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                    </div>

                </div>
            </div>
        </section>
    );
}
