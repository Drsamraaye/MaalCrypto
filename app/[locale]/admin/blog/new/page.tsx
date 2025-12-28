'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Send, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function CreateBlogPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('NEWS');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Auto-generate slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/blog/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    category,
                    imageUrl,
                    videoUrl,
                    author: session?.user?.name || 'Admin',
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Success! Blog post created and subscribers notified.');
                // router.push('/blog/' + slug); // Optionally redirect
                // Clear form
                setTitle('');
                setSlug('');
                setContent('');
                setImageUrl('');
            } else {
                setMessage(data.message || 'Failed to create post');
            }
        } catch (error) {
            setMessage('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/profile" className="p-2 bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-black">Create New <span className="text-green-500">Post</span></h1>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl mb-6 font-medium ${message.includes('Success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 focus:border-green-500 outline-none transition-colors"
                                placeholder="Enter post title..."
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Slug (URL)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 focus:border-green-500 outline-none transition-colors"
                                placeholder="enter-post-slug"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 focus:border-green-500 outline-none transition-colors appearance-none"
                            >
                                <option value="NEWS">News</option>
                                <option value="ANALYSIS">Analysis</option>
                                <option value="BLOG">Blog</option>
                                <option value="TUTORIAL">Tutorial (Video)</option>
                                <option value="SPONSORED">Sponsored</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Image URL</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 focus:border-green-500 outline-none transition-colors"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    {category === 'TUTORIAL' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-purple-400 uppercase tracking-wider">YouTube Video URL</label>
                            <input
                                type="url"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full bg-neutral-900 border border-purple-500/30 rounded-xl p-4 focus:border-purple-500 outline-none transition-colors"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Content (Markdown)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-96 bg-neutral-900 border border-neutral-800 rounded-xl p-4 focus:border-green-500 outline-none transition-colors font-mono text-sm"
                            placeholder="# Write your content here..."
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all uppercase tracking-wider disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            Publish & Notify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
