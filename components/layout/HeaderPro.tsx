'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Bell, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProProps {
    locale: string;
}

const NAV_LINKS = [
    { label: 'News', href: '/news' },
    { label: 'Prices', href: '/prices' },
    { label: 'Exchanges', href: '/exchanges' },
    { label: 'Learn', href: '/learn' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];



export function HeaderPro({ locale }: HeaderProProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();


    return (
        <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-3 group shrink-0">
                        <Image
                            src="/images/Logo.png"
                            alt="MaalCrypto Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                            priority
                            unoptimized
                        />
                        <span className="text-white font-bold text-xl tracking-wider hidden sm:block">
                            MAAL<span className="text-green-500">CRYPTO</span>
                        </span>
                    </Link>


                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={`/${locale}${link.href}`}
                                className="text-gray-300 hover:text-green-400 font-medium text-sm uppercase tracking-wider transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <button className="hidden md:flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Notifications */}
                        <button className="hidden md:flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
                        </button>

                        {/* Auth Buttons - Conditional */}
                        {session ? (
                            <>
                                {/* User Profile Link */}
                                <Link
                                    href={`/${locale}/profile`}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold uppercase tracking-wider rounded transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{session.user?.name || session.user?.email?.split('@')[0]}</span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={() => signOut({ callbackUrl: `/${locale}` })}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider rounded transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            /* Login Button */
                            <Link
                                href={`/${locale}/auth/signin`}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold uppercase tracking-wider rounded transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-gray-900 border-t border-gray-800">
                    <nav className="container mx-auto px-4 py-4 space-y-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={`/${locale}${link.href}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-3 text-gray-300 hover:text-green-400 font-medium uppercase tracking-wider border-b border-gray-800 last:border-0 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default HeaderPro;
