'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    FileText,
    Megaphone,
    User,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { label: 'Advertisements', href: '/admin/ads', icon: Megaphone },
    { label: 'Profile', href: '/admin/profile', icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            signOut({ callbackUrl: '/' });
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Mobile Header */}
            <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-green-500">Admin Panel</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white p-2"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 bg-neutral-900 border-r border-neutral-800
                    transform transition-transform lg:transform-none
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    {/* Logo */}
                    <div className="hidden lg:flex items-center gap-3 p-6 border-b border-neutral-800">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-xl">M</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold">MaalCrypto</h1>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname?.includes(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${isActive
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : 'text-gray-400 hover:bg-neutral-800 hover:text-white'
                                        }
                                    `}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User & Logout */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
                        <div className="flex items-center gap-3 mb-4 px-4">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{session?.user?.name || 'Admin'}</p>
                                <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-h-screen lg:ml-0">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
