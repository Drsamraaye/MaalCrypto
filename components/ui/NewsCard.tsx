import Link from 'next/link';
import Image from 'next/image'; // Assuming we configure images, but placeholders for now.
import { Clock } from 'lucide-react';

interface NewsCardProps {
    title: string;
    summary: string;
    category: string;
    date: string;
    slug: string;
    imageUrl?: string;
}

export default function NewsCard({ title, summary, category, date, slug, imageUrl }: NewsCardProps) {
    return (
        <Link href={`/news/${slug}`} className="group block">
            <article className="h-full flex flex-col space-y-3">
                <div className="relative aspect-video overflow-hidden rounded-md bg-slate-100">
                    {imageUrl ? (
                        <div className="relative w-full h-full">
                            {/* In a real app, use next/image */}
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <span className="text-xs font-semibold">NO IMAGE</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {category}
                </div>
                <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                    {summary}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <time>{date}</time>
                </div>
            </article>
        </Link>
    );
}
