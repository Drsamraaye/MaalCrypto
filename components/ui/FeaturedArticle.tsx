import Link from 'next/link';
import Image from 'next/image';

interface FeaturedArticleProps {
    title: string;
    summary: string;
    author: string;
    date: string;
    slug: string;
    imageUrl?: string;
}

export default function FeaturedArticle({ title, summary, author, date, slug, imageUrl }: FeaturedArticleProps) {
    return (
        <div className="flex flex-col gap-6 group cursor-pointer h-full">
            <div className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                <img
                    src={imageUrl || "/placeholder.jpg"}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Markets
                    </span>
                    <span className="text-xs text-slate-400 font-medium">4 min read</span>
                </div>

                <Link href={`en/news/${slug}`} className="block">
                    <h1 className="text-3xl lg:text-4xl font-bold font-heading text-slate-900 dark:text-white leading-[1.1] tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h1>
                </Link>

                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed line-clamp-3">
                    {summary}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-auto pt-4">
                    <span className="text-slate-900 dark:text-slate-200">{author}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
}
