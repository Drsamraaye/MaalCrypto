'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Image as ImageIcon, Link as LinkIcon, Save, Eye } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setForm(prev => ({
            ...prev,
            title,
            slug: generateSlug(title)
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
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

    const handleSubmit = async (status: string) => {
        setLoading(true);

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, status })
            });

            if (res.ok) {
                router.push('/admin/blog');
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post', error);
            alert('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="text-3xl font-bold text-white">Create New Post</h1>
                    <p className="text-gray-400 mt-1">Add images and links to your blog post</p>
                </div>
            </div>

            <div className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={handleTitleChange}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                placeholder="Enter post title"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                                Slug (URL)
                                <LinkIcon className="w-4 h-4 inline ml-2 text-green-500" />
                            </label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                placeholder="post-url-slug"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={2}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none"
                                placeholder="Brief description for SEO"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                                Content
                                <span className="text-green-500 ml-2">(Supports Markdown & HTML)</span>
                            </label>
                            <textarea
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                rows={15}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none font-mono"
                                placeholder="Write your blog content here...

You can use:
- **Bold** and *italic* text
- [Links](https://example.com)
- Images: ![Alt text](image-url)
- Headers with # ## ###
- Lists with - or 1. 2. 3."
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
                                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
                                    placeholder="https://..."
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
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
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
                                <label className="block text-gray-400 text-xs mb-1">Author</label>
                                <input
                                    type="text"
                                    value={form.author}
                                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={() => handleSubmit('PUBLISHED')}
                                disabled={loading || !form.title || !form.slug}
                                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg transition-colors"
                            >
                                <Save className="w-5 h-5" />
                                Publish Now
                            </button>
                            <button
                                onClick={() => handleSubmit('DRAFT')}
                                disabled={loading || !form.title || !form.slug}
                                className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
                            >
                                <Eye className="w-5 h-5" />
                                Save as Draft
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
