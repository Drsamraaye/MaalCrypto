'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Users,
    Mail,
    FileText,
    FileEdit,
    Megaphone,
    TrendingUp,
    Plus,
    Eye,
    Edit,
    Trash2,
    ArrowRight
} from 'lucide-react';

interface DashboardStats {
    totalUsers: number;
    totalSubscribers: number;
    totalPosts: number;
    draftPosts: number;
    publishedPosts: number;
    totalAds: number;
}

interface RecentPost {
    id: string;
    title: string;
    type: string;
    status: string;
    createdAt: string;
    imageUrl?: string;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalSubscribers: 0,
        totalPosts: 0,
        draftPosts: 0,
        publishedPosts: 0,
        totalAds: 0
    });
    const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        } else if (session?.user?.role !== 'admin' && status === 'authenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            fetchData();
        }
    }, [status, session, router]);

    const fetchData = async () => {
        try {
            // Fetch posts
            const postsRes = await fetch('/api/posts');
            if (postsRes.ok) {
                const postsData = await postsRes.json();
                const posts = postsData.posts || [];
                setRecentPosts(posts.slice(0, 5));
                setStats(prev => ({
                    ...prev,
                    totalPosts: posts.length,
                    publishedPosts: posts.filter((p: RecentPost) => p.status === 'PUBLISHED').length,
                    draftPosts: posts.filter((p: RecentPost) => p.status === 'DRAFT').length
                }));
            }

            // Fetch ads
            const adsRes = await fetch('/api/ads');
            if (adsRes.ok) {
                const adsData = await adsRes.json();
                setStats(prev => ({
                    ...prev,
                    totalAds: (adsData.ads || []).length
                }));
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setRecentPosts(recentPosts.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 mt-1">Welcome back, {session?.user?.name || 'Admin'}</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Blog Post
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<FileText className="w-6 h-6 text-green-400" />}
                    label="Total Posts"
                    value={stats.totalPosts}
                    color="bg-green-500/10 border-green-500/20"
                />
                <StatCard
                    icon={<Eye className="w-6 h-6 text-blue-400" />}
                    label="Published"
                    value={stats.publishedPosts}
                    color="bg-blue-500/10 border-blue-500/20"
                />
                <StatCard
                    icon={<FileEdit className="w-6 h-6 text-yellow-400" />}
                    label="Drafts"
                    value={stats.draftPosts}
                    color="bg-yellow-500/10 border-yellow-500/20"
                />
                <StatCard
                    icon={<Megaphone className="w-6 h-6 text-purple-400" />}
                    label="Active Ads"
                    value={stats.totalAds}
                    color="bg-purple-500/10 border-purple-500/20"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link href="/admin/blog" className="group">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <FileText className="w-8 h-8 text-green-500" />
                            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors" />
                        </div>
                        <h3 className="text-white font-bold text-lg">Blog Management</h3>
                        <p className="text-gray-400 text-sm mt-1">Create, edit, and manage blog posts</p>
                    </div>
                </Link>

                <Link href="/admin/ads" className="group">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <Megaphone className="w-8 h-8 text-purple-500" />
                            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-colors" />
                        </div>
                        <h3 className="text-white font-bold text-lg">Advertisements</h3>
                        <p className="text-gray-400 text-sm mt-1">Manage image, video, and text ads</p>
                    </div>
                </Link>

                <Link href="/admin/profile" className="group">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-8 h-8 text-blue-500" />
                            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h3 className="text-white font-bold text-lg">Profile Settings</h3>
                        <p className="text-gray-400 text-sm mt-1">View profile and logout</p>
                    </div>
                </Link>
            </div>

            {/* Recent Posts */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Recent Posts
                    </h2>
                    <Link href="/admin/blog" className="text-green-500 hover:text-green-400 text-sm font-medium">
                        View All →
                    </Link>
                </div>

                <div className="divide-y divide-neutral-800">
                    {recentPosts.length === 0 ? (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500">No posts yet</p>
                            <Link href="/admin/blog/new" className="text-green-500 hover:text-green-400 text-sm mt-2 inline-block">
                                Create your first post →
                            </Link>
                        </div>
                    ) : (
                        recentPosts.map((post) => (
                            <div key={post.id} className="flex items-center justify-between p-4 hover:bg-neutral-800/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    {post.imageUrl ? (
                                        <img src={post.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-gray-500" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-white font-medium">{post.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">{post.type}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${post.status === 'PUBLISHED'
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/blog/${post.id}/edit`}
                                        className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
    return (
        <div className={`p-6 rounded-xl border ${color} backdrop-blur-sm transition-transform hover:scale-[1.02]`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                </div>
                <div className="p-2 bg-black/20 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}
