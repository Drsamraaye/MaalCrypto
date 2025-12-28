import NewsCard from '@/components/ui/NewsCard';

export default function AnalysisPage() {
    const analysisPosts = Array.from({ length: 6 }).map((_, i) => ({
        title: `Technical Analysis: Bitcoin Approaches Critical Resistance Level at $90k ${i + 1}`,
        summary: "RSI indicators suggest overbought territory on the 4H chart, but institutional inflows remain strong. A breakout could target $100k.",
        category: "Technical Analysis",
        date: "Dec 21, 2025",
        slug: `bitcoin-analysis-${i}`,
        imageUrl: `https://placehold.co/600x400/0f172a/ffffff?text=Analysis+${i + 1}`
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100">Market Analysis</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Expert insights, technical charts, and fundamental deep dives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {analysisPosts.map((post, i) => (
                    <NewsCard key={i} {...post} />
                ))}
            </div>
        </div>
    );
}
