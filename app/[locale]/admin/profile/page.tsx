'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Mail, Shield, LogOut, Calendar } from 'lucide-react';

export default function AdminProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            signOut({ callbackUrl: '/' });
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8">Admin Profile</h1>

            <div className="max-w-2xl">
                {/* Profile Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-green-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{session?.user?.name || 'Admin User'}</h2>
                            <p className="text-gray-400">Administrator</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg">
                            <Mail className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white font-medium">{session?.user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg">
                            <Shield className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-400">Access Level</p>
                                <p className="text-white font-medium capitalize">{session?.user?.role || 'admin'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg">
                            <Calendar className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-400">Session Status</p>
                                <p className="text-green-500 font-medium">Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout from Admin Panel
                </button>
            </div>
        </div>
    );
}
