import { Users, Target, ShieldCheck } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative py-24 border-b border-neutral-900">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8">
                        ABOUT <span className="text-green-500">MAALCRYPTO</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                        We are building the future of crypto intelligence. Our mission is to simplify the complex world of blockchain and empower everyone to achieve financial freedom.
                    </p>
                </div>
            </section>

            {/* Mission Stats */}
            <section className="py-20 bg-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="text-5xl font-black text-white mb-2">50K+</div>
                            <div className="text-green-500 font-bold uppercase tracking-wider text-sm">Monthly Readers</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">100+</div>
                            <div className="text-green-500 font-bold uppercase tracking-wider text-sm">Detailed Guides</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">24/7</div>
                            <div className="text-green-500 font-bold uppercase tracking-wider text-sm">Market Updates</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 container mx-auto px-4">
                <h2 className="text-3xl font-black text-white text-center mb-16">OUR CORE VALUES</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl text-center">
                        <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center mb-6 text-green-500">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Accuracy</h3>
                        <p className="text-neutral-400">Data-driven insights you can trust. We verify every piece of information.</p>
                    </div>
                    <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl text-center">
                        <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center mb-6 text-green-500">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
                        <p className="text-neutral-400">Unbiased reporting and transparent analysis without hidden agendas.</p>
                    </div>
                    <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl text-center">
                        <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center mb-6 text-green-500">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                        <p className="text-neutral-400">Building a network of informed investors helping each other grow.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
