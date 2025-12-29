'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Image, Video, Type, ToggleLeft, ToggleRight } from 'lucide-react';

interface Ad {
    id: string;
    title: string;
    type: 'IMAGE' | 'VIDEO' | 'TEXT';
    content: string;
    linkUrl?: string;
    position?: string;
    active: boolean;
    createdAt: string;
}

export default function AdsManagementPage() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAd, setEditingAd] = useState<Ad | null>(null);
    const [form, setForm] = useState({
        title: '',
        type: 'IMAGE' as 'IMAGE' | 'VIDEO' | 'TEXT',
        content: '',
        linkUrl: '',
        position: 'sidebar',
        active: true
    });

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const res = await fetch('/api/ads');
            if (res.ok) {
                const data = await res.json();
                setAds(data.ads || []);
            }
        } catch (error) {
            console.error('Failed to fetch ads', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingAd ? `/api/ads/${editingAd.id}` : '/api/ads';
            const method = editingAd ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                fetchAds();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving ad', error);
        }
    };

    const handleEdit = (ad: Ad) => {
        setEditingAd(ad);
        setForm({
            title: ad.title,
            type: ad.type,
            content: ad.content,
            linkUrl: ad.linkUrl || '',
            position: ad.position || 'sidebar',
            active: ad.active
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this ad?')) return;

        try {
            const res = await fetch(`/api/ads/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setAds(ads.filter(a => a.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete ad', error);
        }
    };

    const toggleActive = async (ad: Ad) => {
        try {
            await fetch(`/api/ads/${ad.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...ad, active: !ad.active })
            });
            fetchAds();
        } catch (error) {
            console.error('Failed to toggle ad', error);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingAd(null);
        setForm({
            title: '',
            type: 'IMAGE',
            content: '',
            linkUrl: '',
            position: 'sidebar',
            active: true
        });
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'IMAGE': return <Image className="w-5 h-5 text-blue-400" />;
            case 'VIDEO': return <Video className="w-5 h-5 text-purple-400" />;
            case 'TEXT': return <Type className="w-5 h-5 text-green-400" />;
            default: return null;
        }
    };

    if (loading) {
        return <div className="p-6 text-white">Loading ads...</div>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Advertisement Management</h1>
                    <p className="text-gray-400 mt-1">Create and manage image, video, and text ads</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Ad
                </button>
            </div>

            {/* Create/Edit Form */}
            {showForm && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingAd ? 'Edit Advertisement' : 'Create New Advertisement'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as 'IMAGE' | 'VIDEO' | 'TEXT' })}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white"
                            >
                                <option value="IMAGE">Image Ad</option>
                                <option value="VIDEO">Video Ad</option>
                                <option value="TEXT">Text Ad</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-2">
                                {form.type === 'TEXT' ? 'Ad Text' : 'Content URL (image/video)'}
                            </label>
                            {form.type === 'TEXT' ? (
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    rows={3}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white"
                                    placeholder="Enter your ad text..."
                                    required
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white"
                                    placeholder={form.type === 'IMAGE' ? 'https://example.com/ad-image.jpg' : 'https://youtube.com/embed/...'}
                                    required
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Link URL (optional)</label>
                            <input
                                type="text"
                                value={form.linkUrl}
                                onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Position</label>
                            <select
                                value={form.position}
                                onChange={(e) => setForm({ ...form, position: e.target.value })}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white"
                            >
                                <option value="header">Header</option>
                                <option value="sidebar">Sidebar</option>
                                <option value="footer">Footer</option>
                                <option value="inline">Inline (within content)</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex gap-4">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
                            >
                                {editingAd ? 'Update Ad' : 'Create Ad'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Ads Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-neutral-800/50">
                        <tr>
                            <th className="text-left p-4 text-gray-400 font-medium">Ad</th>
                            <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Type</th>
                            <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Position</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                            <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {ads.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No ads found. Create your first ad!
                                </td>
                            </tr>
                        ) : (
                            ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-neutral-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {ad.type === 'IMAGE' && ad.content && (
                                                <img src={ad.content} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                            )}
                                            {ad.type !== 'IMAGE' && (
                                                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
                                                    {getTypeIcon(ad.type)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-medium">{ad.title}</p>
                                                <p className="text-sm text-gray-500 truncate max-w-xs">{ad.content}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="flex items-center gap-2">
                                            {getTypeIcon(ad.type)}
                                            {ad.type}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden md:table-cell text-gray-400 capitalize">
                                        {ad.position}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleActive(ad)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${ad.active
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-gray-500/10 text-gray-500'
                                                }`}
                                        >
                                            {ad.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                            {ad.active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(ad)}
                                                className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ad.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
