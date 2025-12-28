'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditContentPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('BLOG'); // BLOG, NEWS, ANALYSIS, TUTORIAL, SPONSORED
    const [status, setStatus] = useState('DRAFT');
    const [videoUrl, setVideoUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchPost();
    }, [params.id]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/content/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                const post = data.post;
                setTitle(post.title);
                setContent(post.content);
                setType(post.type);
                setStatus(post.status);
                setVideoUrl(post.videoUrl || '');
                setImageUrl(post.imageUrl || '');
            } else {
                alert('Post not found');
                router.push('/admin/dashboard');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/content/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                    type,
                    status,
                    videoUrl,
                    imageUrl,
                }),
            });

            if (res.ok) {
                alert('Updated successfully');
                router.push('/admin/dashboard');
            } else {
                alert('Failed to update');
            }
        } catch (error) {
            console.error('Update error:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-8">
                    Edit Content
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Type & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
                            >
                                <option value="BLOG">Blog Post</option>
                                <option value="NEWS">News</option>
                                <option value="ANALYSIS">Analysis</option>
                                <option value="TUTORIAL">Tutorial (Video)</option>
                                <option value="SPONSORED">Sponsored</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>
                    </div>

                    {/* Tutorial Video URL */}
                    {type === 'TUTORIAL' && (
                        <div>
                            <label className="block text-sm font-medium text-purple-400 mb-1">YouTube Video URL</label>
                            <input
                                type="url"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                    )}

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Content (Markdown)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none font-mono text-sm"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Update Content'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
