'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, User, FileText } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    slug: string;
    description?: string;
    content: string;
    imageUrl?: string;
    type: string;
    status: string;
    author: string;
    createdAt: string;
}

interface DynamicPostsGridProps {
    locale?: string;
    limit?: number;
    type?: string;
    showTitle?: boolean;
    title?: string;
}

export default function DynamicPostsGrid({
    locale = 'en',
    limit = 6,
    type,
    showTitle = true,
    title = 'Latest Posts'
}: DynamicPostsGridProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const params = new URLSearchParams();
                params.set('status', 'PUBLISHED');
                if (type) params.set('type', type);
                params.set('limit', limit.toString());

                const res = await fetch(`/api/posts?${params}`);
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts || []);
                }
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [limit, type]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 animate-pulse">
                        <div className="h-48 bg-neutral-800" />
                        <div className="p-6 space-y-3">
                            <div className="h-4 bg-neutral-800 rounded w-3/4" />
                            <div className="h-3 bg-neutral-800 rounded w-full" />
                            <div className="h-3 bg-neutral-800 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No published posts yet</p>
            </div>
        );
    }

    const getCategoryColor = (type: string) => {
        switch (type) {
            case 'NEWS': return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
            case 'BLOG': return 'bg-green-500/10 text-green-500 border border-green-500/20';
            case 'ANALYSIS': return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
            case 'TUTORIAL': return 'bg-orange-500/10 text-orange-500 border border-orange-500/20';
            case 'SPONSORED': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
        }
    };

    return (
        <div>
            {showTitle && (
                <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/${locale}/blog/${post.slug}`}
                        className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-green-500/50 transition-all hover:-translate-y-2 shadow-lg hover:shadow-green-500/10"
                    >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden bg-neutral-800">
                            {post.imageUrl ? (
                                <>
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                                    <FileText className="w-12 h-12 text-neutral-700" />
                                </div>
                            )}
                            <div className="absolute top-4 left-4">
                                <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${getCategoryColor(post.type)}`}>
                                    {post.type}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            {post.description && (
                                <p className="text-neutral-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {post.description}
                                </p>
                            )}

                            {/* Meta */}
                            <div className="flex items-center justify-between pt-5 border-t border-neutral-800/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 text-white text-[10px] font-bold">
                                        {post.author?.[0] || 'A'}
                                    </div>
                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{post.author || 'Admin'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
