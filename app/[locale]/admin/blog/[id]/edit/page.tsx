'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Upload, Image as ImageIcon, Link as LinkIcon, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        imageUrl: '',
        type: 'BLOG',
        status: 'DRAFT',
        author: 'Admin'
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setForm({
                        title: data.post.title,
                        slug: data.post.slug,
                        description: data.post.description || '',
                        content: data.post.content || '',
                        imageUrl: data.post.imageUrl || '',
                        type: data.post.type,
                        status: data.post.status,
                        author: data.post.author || 'Admin'
                    });
                    if (data.post.imageUrl) {
                        setImagePreview(data.post.imageUrl);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch post', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                const data = await res.json();
                setForm(prev => ({ ...prev, imageUrl: data.url }));
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const handleSubmit = async () => {
        setSaving(true);

        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                router.push('/admin/blog');
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post', error);
            alert('Failed to update post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-white">Loading post...</div>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/blog"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Edit Post</h1>
                    <p className="text-gray-400 mt-1">Update your blog post</p>
                </div>
            </div>

            <div className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                                Slug (URL)
                                <LinkIcon className="w-4 h-4 inline ml-2 text-green-500" />
                            </label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={2}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">Content</label>
                            <textarea
                                value={form.content}
                                onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                                rows={15}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none font-mono"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <label className="block text-gray-400 text-sm font-medium mb-3">
                                <ImageIcon className="w-4 h-4 inline mr-2" />
                                Featured Image
                            </label>

                            {imagePreview || form.imageUrl ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview || form.imageUrl}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => {
                                            setImagePreview(null);
                                            setForm({ ...form, imageUrl: '' });
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-neutral-700 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                                    <span className="text-gray-500 text-sm">Click to upload</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}

                            <div className="mt-3">
                                <label className="block text-gray-500 text-xs mb-1">Or paste image URL</label>
                                <input
                                    type="text"
                                    value={form.imageUrl}
                                    onChange={(e) => setForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                                />
                            </div>
                        </div>

                        {/* Post Settings */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4">
                            <h3 className="text-white font-medium">Post Settings</h3>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="BLOG">Blog</option>
                                    <option value="NEWS">News</option>
                                    <option value="ANALYSIS">Analysis</option>
                                    <option value="TUTORIAL">Tutorial</option>
                                    <option value="SPONSORED">Sponsored</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Status</label>
                                <select
                                    value={form.status}
                                    onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PUBLISHED">Published</option>
                                    <option value="ARCHIVED">Archived</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Author</label>
                                <input
                                    type="text"
                                    value={form.author}
                                    onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !form.title || !form.slug}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg transition-colors"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
