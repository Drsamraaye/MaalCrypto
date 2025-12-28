'use client';

import Link from 'next/link';
import { Clock, Bookmark } from 'lucide-react';

interface NewsCardGelleProps {
    id: string;
    title: string;
    image?: string;
    category: string;
    author: string;
    publishedAt: string;
    locale: string;
    size?: 'small' | 'medium' | 'large';
}

function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins} MINS AGO`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} HOURS AGO`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return `1 DAY AGO`;
    if (diffDays < 7) return `${diffDays} DAYS AGO`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return `1 WEEK AGO`;
    return `${diffWeeks} WEEKS AGO`;
}

export function NewsCardGelle({
    id,
    title,
    image,
    category,
    author,
    publishedAt,
    locale,
    size = 'medium'
}: NewsCardGelleProps) {
    const defaultImage = `https://picsum.photos/seed/${id}/800/500`;

    return (
        <Link
            href={`/${locale}/news/${id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
            {/* Image Container */}
            <div className={`relative overflow-hidden ${size === 'large' ? 'h-64' : size === 'small' ? 'h-36' : 'h-48'}`}>
                <img
                    src={image || defaultImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase rounded">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className={`font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 mb-3 ${size === 'large' ? 'text-xl' : 'text-base'}`}>
                    {title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 uppercase">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{author}</span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(publishedAt)}
                        </span>
                    </div>
                    <button
                        onClick={(e) => { e.preventDefault(); }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default NewsCardGelle;
