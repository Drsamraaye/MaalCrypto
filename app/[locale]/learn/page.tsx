import { BookOpen, GraduationCap, Lightbulb, PlayCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black py-20 border-b border-neutral-900">
                <div className="absolute inset-0 bg-gradient-to-b from-green-950/10 to-black" />
                <div className="relative container mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-6 border border-green-500/20">
                        MaalCrypto Academy
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        LEARN <span className="text-green-500">CRYPTO</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                        Start your journey into the world of cryptocurrency. Free guides, tutorials, and courses for all levels.
                    </p>
                </div>
            </section>

            {/* Content Modules */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Module 1 */}
                    <div className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-green-500/50 transition-all">
                        <div className="w-14 h-14 bg-black rounded-xl border border-neutral-800 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:border-green-500 transition-colors">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Crypto Basics</h3>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            Understanding Bitcoin, Blockchain, and how cryptocurrencies work fundamentally.
                        </p>
                        <Link href={`/${locale}/blog/category/beginners`} className="text-green-500 font-bold uppercase text-sm hover:text-green-400 transition-colors flex items-center gap-2">
                            Start Reading <div className="w-4 h-0.5 bg-green-500" />
                        </Link>
                    </div>

                    {/* Module 2 */}
                    <div className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-green-500/50 transition-all">
                        <div className="w-14 h-14 bg-black rounded-xl border border-neutral-800 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:border-green-500 transition-colors">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Trading 101</h3>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            Master charts, technical analysis, and market psychology to trade effectively.
                        </p>
                        <Link href={`/${locale}/blog/category/trading`} className="text-green-500 font-bold uppercase text-sm hover:text-green-400 transition-colors flex items-center gap-2">
                            Start Reading <div className="w-4 h-0.5 bg-green-500" />
                        </Link>
                    </div>

                    {/* Module 3 */}
                    <div className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-green-500/50 transition-all">
                        <div className="w-14 h-14 bg-black rounded-xl border border-neutral-800 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:border-green-500 transition-colors">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">DeFi & NFTs</h3>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            Explore decentralized finance, yield farming, and the world of digital collectibles.
                        </p>
                        <Link href={`/${locale}/blog/category/defi`} className="text-green-500 font-bold uppercase text-sm hover:text-green-400 transition-colors flex items-center gap-2">
                            Start Reading <div className="w-4 h-0.5 bg-green-500" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
