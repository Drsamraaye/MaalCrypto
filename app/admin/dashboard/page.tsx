'use client';

import { useState } from 'react';
import { PenTool, LayoutDashboard, FileText, Settings, Plus, Sparkles, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    const generatePost = async () => {
        if (!topic) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, type: 'NEWS' })
            });
            const data = await res.json();
            if (data.success) {
                // Refresh posts list (mock refresh for now)
                alert('Post generated successfully! (Status: DRAFT)');
                setTopic('');
            } else {
                alert('Failed to generate: ' + data.error);
            }
        } catch (e) {
            alert('Error generating post');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 hidden md:block">
                <div className="mb-8">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        CMS <span className="text-slate-800 dark:text-slate-200">Admin</span>
                    </h1>
                </div>

                <nav className="space-y-2">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-md">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                        <PenTool className="w-4 h-4" />
                        Create New
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                        <FileText className="w-4 h-4" />
                        All Posts
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                </div>

                {/* AI Generator Card */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        AI Content Generator
                    </h3>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter a topic (e.g., 'Bitcoin Halving 2028')"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        <button
                            onClick={generatePost}
                            disabled={isGenerating || !topic}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Draft'}
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 font-semibold">
                        Recent Posts
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-900">
                        {/* This would be populated by fetching /api/posts */}
                        <div className="p-8 text-center text-slate-500">
                            <p>No posts yet. Generate one above!</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
