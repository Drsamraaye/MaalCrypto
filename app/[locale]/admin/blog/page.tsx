'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    slug: string;
    type: string;
    status: string;
    imageUrl?: string;
    createdAt: string;
}

export default function BlogManagementPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
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

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || post.type === filterType;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return <div className="p-6 text-white">Loading posts...</div>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Blog Management</h1>
                    <p className="text-gray-400 mt-1">Create, edit, and manage your blog posts</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg pl-12 pr-8 py-3 text-white focus:outline-none focus:border-green-500 appearance-none"
                    >
                        <option value="all">All Types</option>
                        <option value="BLOG">Blog</option>
                        <option value="NEWS">News</option>
                        <option value="ANALYSIS">Analysis</option>
                        <option value="TUTORIAL">Tutorial</option>
                        <option value="SPONSORED">Sponsored</option>
                    </select>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-neutral-800/50">
                        <tr>
                            <th className="text-left p-4 text-gray-400 font-medium">Post</th>
                            <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Type</th>
                            <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Status</th>
                            <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Date</th>
                            <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No posts found. Create your first post!
                                </td>
                            </tr>
                        ) : (
                            filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-neutral-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {post.imageUrl && (
                                                <img
                                                    src={post.imageUrl}
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            )}
                                            <div>
                                                <p className="text-white font-medium">{post.title}</p>
                                                <p className="text-sm text-gray-500">/{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm rounded-full">
                                            {post.type}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className={`px-3 py-1 text-sm rounded-full ${post.status === 'PUBLISHED'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell text-gray-400">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                href={`/admin/blog/${post.id}/edit`}
                                                className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
