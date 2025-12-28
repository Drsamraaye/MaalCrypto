'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import {
    Users,
    Mail,
    FileText,
    FileEdit,
    CheckCircle,
    TrendingUp,
    Plus
} from 'lucide-react';
import Link from 'next/link';
import ContentTable from '@/components/admin/ContentTable';

interface DashboardStats {
    totalUsers: number;
    totalSubscribers: number;
    totalPosts: number;
    draftPosts: number;
    publishedPosts: number;
}

interface RecentActivity {
    id: string;
    title: string;
    type: string;
    status: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        } else if (session?.user?.role !== 'admin' && status === 'authenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            fetchStats();
        }
    }, [status, session, router]);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats);
                setRecentActivity(data.recentActivity);
            }
        } catch (error) {
            console.error('Failed to fetch stats', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Welcome back, {session?.user?.name}</p>
                    </div>
                    <Link
                        href="/admin/blog/new"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Content
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Users className="w-6 h-6 text-blue-400" />}
                        label="Total Users"
                        value={stats?.totalUsers || 0}
                        color="bg-blue-500/10 border-blue-500/20"
                    />
                    <StatCard
                        icon={<Mail className="w-6 h-6 text-purple-400" />}
                        label="Subscribers"
                        value={stats?.totalSubscribers || 0}
                        color="bg-purple-500/10 border-purple-500/20"
                    />
                    <StatCard
                        icon={<FileText className="w-6 h-6 text-green-400" />}
                        label="Total Posts"
                        value={stats?.totalPosts || 0}
                        color="bg-green-500/10 border-green-500/20"
                    />
                    <StatCard
                        icon={<FileEdit className="w-6 h-6 text-yellow-400" />}
                        label="Drafts"
                        value={stats?.draftPosts || 0}
                        color="bg-yellow-500/10 border-yellow-500/20"
                    />
                </div>

                {/* Recent Activity */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Recent Activity
                    </h2>
                    <ContentTable data={recentActivity} onDelete={fetchStats} />
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
