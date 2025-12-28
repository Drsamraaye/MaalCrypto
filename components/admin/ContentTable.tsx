'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash, CheckCircle, XCircle } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    type: string;
    status: string;
    createdAt: string;
}

interface ContentTableProps {
    data: Post[];
    onDelete: () => void; // Callback to refresh data
}

export default function ContentTable({ data, onDelete }: ContentTableProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this content?')) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`/api/content/${id}`, { method: 'DELETE' });
            if (res.ok) {
                onDelete();
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-neutral-800 text-gray-400 text-sm">
                        <th className="pb-3 pl-2">Title</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((post) => (
                        <tr key={post.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                            <td className="py-4 pl-2 font-medium text-white">{post.title}</td>
                            <td className="py-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${post.type === 'NEWS' ? 'bg-blue-500/20 text-blue-400' :
                                        post.type === 'TUTORIAL' ? 'bg-purple-500/20 text-purple-400' :
                                            post.type === 'SPONSORED' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-neutral-700 text-neutral-300'
                                    }`}>
                                    {post.type}
                                </span>
                            </td>
                            <td className="py-4">
                                <span className={`flex items-center gap-1.5 text-sm ${post.status === 'PUBLISHED' ? 'text-green-400' : 'text-neutral-400'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'PUBLISHED' ? 'bg-green-400' : 'bg-neutral-400'
                                        }`} />
                                    {post.status}
                                </span>
                            </td>
                            <td className="py-4 text-gray-400 text-sm">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/admin/content/edit/${post.id}`}
                                        className="p-1 text-gray-400 hover:text-white transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        disabled={isDeleting === post.id}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                        title="Delete"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500">
                                No content found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
