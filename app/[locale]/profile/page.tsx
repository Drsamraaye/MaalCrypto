'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, LogOut, Bell } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return null; // Redirecting
    }

    return (
        <div className="min-h-screen bg-black py-20 px-4">
            <div className="container mx-auto max-w-4xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-black text-white">MY <span className="text-green-500">PROFILE</span></h1>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 px-6 py-2 bg-neutral-900 border border-neutral-800 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 rounded-lg transition-all font-bold text-sm uppercase tracking-wider"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* User Info Card */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 lg:col-span-2">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                {session?.user?.name?.[0] || 'U'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">{session?.user?.name || 'User'}</h2>
                                <p className="text-neutral-400 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {session?.user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-black/50 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-green-500" />
                                    <span className="text-neutral-300 font-medium">Account Status</span>
                                </div>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs font-bold uppercase tracking-wider">
                                    Active Member
                                </span>
                            </div>

                            <div className="bg-black/50 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-blue-500" />
                                    <span className="text-neutral-300 font-medium">Role</span>
                                </div>
                                <span className="text-white font-bold capitalize">
                                    {(session?.user as any)?.role || 'User'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notifications / Subscriptions */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="w-5 h-5 text-yellow-500" />
                            <h3 className="text-xl font-bold text-white">Notifications</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-black/30 rounded-lg border border-neutral-800">
                                <p className="text-neutral-400 text-sm mb-2">You are subscribed to the newsletter.</p>
                                <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Active
                                </div>
                            </div>

                            <button className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                                Manage Preferences
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
