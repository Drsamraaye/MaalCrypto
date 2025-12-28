import { getOrCreatePost, PlatformPostType } from '@/lib/post-service';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Tag } from 'lucide-react';
import React from 'react';

// We create a shared component logic
interface DynamicPostPageProps {
    params: Promise<{ locale: string; slug: string }>;
    type: PlatformPostType;
}

export default async function DynamicPostPage({ params, type }: DynamicPostPageProps) {
    const { locale, slug } = await params;

    const post = await getOrCreatePost(slug, type, locale);

    if (!post) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header Section */}
            <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">
                    {type}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-6 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author || 'AI Agent'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Video or Image */}
            {post.videoUrl && type === 'TUTORIAL' ? (
                <div className="aspect-video w-full relative rounded-xl overflow-hidden mb-10 bg-slate-900">
                    <iframe
                        src={post.videoUrl.replace('watch?v=', 'embed/')}
                        className="w-full h-full"
                        allowFullScreen
                        title="Tutorial Video"
                    />
                </div>
            ) : post.imageUrl ? (
                <div className="aspect-video w-full relative rounded-xl overflow-hidden mb-10 bg-slate-100">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            ) : null}

            {/* Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
                {post.content.split('\n').map((line: string, i: number) => {
                    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('**')) return <p key={i} className="font-bold my-4">{line.replace(/\*\*/g, '')}</p>;
                    if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.replace('* ', '')}</li>;
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>;
                })}
            </article>

            {/* Tags / Footer of Article */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex gap-2">
                    <Tag className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Crypto</span>
                    <span className="text-sm font-medium">•</span>
                    <span className="text-sm font-medium">Analysis</span>
                </div>
            </div>
        </div>
    );
}
