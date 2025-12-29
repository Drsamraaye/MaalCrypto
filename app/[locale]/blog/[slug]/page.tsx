'use client';

import { useEffect, useState } from 'react';
import { Calendar, User, Tag, ArrowLeft, Share2, Clock, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    imageUrl?: string;
    type: string;
    status: string;
    author: string;
    createdAt: string;
}

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/slug/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data.post);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Failed to fetch post', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-black text-white mb-4">POST NOT FOUND</h1>
                    <p className="text-neutral-400 mb-8 max-w-md mx-auto">The article you're following has moved or doesn't exist in our database.</p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Return to Hub
                    </Link>
                </div>
            </div>
        );
    }

    // Function to calculate read time
    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Simple Top Navigation */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/blog" className="flex items-center gap-2 text-neutral-400 hover:text-green-500 transition-colors font-bold text-sm uppercase tracking-wider">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Education</span>
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                            <Bookmark className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <header className="relative w-full overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 max-w-5xl relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <span className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            {post.type}
                        </span>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white max-w-4xl">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400 text-sm font-medium uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 text-white text-[10px] font-bold">
                                    {post.author?.[0] || 'A'}
                                </div>
                                <span>{post.author || 'MAAL ANALYST'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-500" />
                                <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-green-500" />
                                <span>{calculateReadTime(post.content)} MIN READ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.imageUrl && (
                    <div className="container mx-auto px-4 max-w-6xl pb-16">
                        <div className="relative aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                    </div>
                )}
            </header>

            {/* Article Content */}
            <main className="container mx-auto px-4 max-w-3xl pb-24">
                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-neutral-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-green-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                    {post.content.split('\n').map((line: string, i: number) => {
                        const trimmedLine = line.trim();
                        if (trimmedLine === '') return <div key={i} className="h-4" />;

                        if (trimmedLine.startsWith('# ')) {
                            return <h1 key={i}>{trimmedLine.replace('# ', '')}</h1>;
                        }
                        if (trimmedLine.startsWith('## ')) {
                            return <h2 key={i}>{trimmedLine.replace('## ', '')}</h2>;
                        }
                        if (trimmedLine.startsWith('### ')) {
                            return <h3 key={i}>{trimmedLine.replace('### ', '')}</h3>;
                        }

                        // Handle Bold text more robustly
                        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                            return <p key={i} className="font-bold text-white text-xl">{trimmedLine.replace(/\*\*/g, '')}</p>;
                        }

                        // Handle Lists
                        if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                            return <li key={i} className="text-neutral-300 ml-4">{trimmedLine.replace(/^[*-] /, '')}</li>;
                        }

                        // Basic line parsing for mid-sentence formatting
                        return (
                            <p key={i} className="mb-6">
                                {trimmedLine}
                            </p>
                        );
                    })}
                </article>

                {/* Bottom Metadata */}
                <div className="mt-16 pt-12 border-t border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">TOPICS:</span>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 font-bold uppercase tracking-wider">
                                {post.type}
                            </span>
                            <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 font-bold uppercase tracking-wider">
                                CRYPTO
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all font-bold text-sm uppercase tracking-wider">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* Newsletter Box */}
                <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-green-600/20 to-neutral-900 border border-green-500/20 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4">JOIN THE ELITE</h3>
                        <p className="text-neutral-300 mb-8 max-w-md">Get our daily crypto intelligence report directly to your inbox. No noise, just alpha.</p>
                        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 bg-black/50 border border-neutral-700 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-white"
                            />
                            <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)]">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
