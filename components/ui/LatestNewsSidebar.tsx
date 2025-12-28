import Link from 'next/link';

export default function LatestNewsSidebar() {
    const latestNews = [
        { title: "Bipartisan House lawmakers unveil crypto tax framework with stablecoin safe harbor", time: "Dec 20, 2025", tag: "POLICY" },
        { title: "Brooklyn man indicted for allegedly stealing $16 million from Coinbase users", time: "Dec 20, 2025", tag: "COMPANIES" },
        { title: "Crypto trader loses $50 million in address poisoning attack", time: "Dec 20, 2025", tag: "ECOSYSTEM" },
        { title: "CryptoQuant says bear market has officially ended for Bitcoin", time: "Dec 19, 2025", tag: "MARKETS" },
        { title: "Ethereum Layer 2 TVL hits all-time high amidst surge", time: "Dec 19, 2025", tag: "DATA" },
    ];

    return (
        <div className="flex flex-col">
            <h2 className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider border-b border-gray-100 pb-2">Latest Crypto News</h2>
            <div className="flex flex-col gap-6">
                {latestNews.map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                        <Link href={`/en/news/mock-news ${i}`} className="block">
                            <h3 className="text-base font-semibold leading-snug group-hover:text-blue-600 transition-colors mb-2 text-slate-900 dark:text-slate-100">
                                {item.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            <span>{item.time}</span>
                            <span>•</span>
                            <span className="underline decoration-slate-300 underline-offset-2">{item.tag}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
