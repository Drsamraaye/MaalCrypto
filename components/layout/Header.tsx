'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';

type MenuCategory = 'News' | 'Data' | 'Research' | 'Prices';

interface HeaderProps {
    locale: string;
}

const MENU_DATA = {
    'News': {
        items: [
            { title: 'Breaking News', href: '/en/news/breaking' },
            { title: 'Market Updates', href: '/en/news/market' },
            { title: 'Regulation', href: '/en/news/regulation' },
            { title: 'Technology', href: '/en/news/tech' }
        ],
        featured: [
            { title: 'Bitcoin ETF Approval Imminent', href: '/en/news/btc-etf', imageUrl: 'https://placehold.co/400x250/3b82f6/ffffff?text=BTC+ETF' },
            { title: 'Ethereum Merge Success', href: '/en/news/eth-merge', imageUrl: 'https://placehold.co/400x250/8b5cf6/ffffff?text=ETH' },
            { title: 'Solana Network Upgrade', href: '/en/news/sol-upgrade', imageUrl: 'https://placehold.co/400x250/10b981/ffffff?text=SOL' }
        ]
    },
    'Data': {
        items: [
            { title: 'On-Chain Metrics', href: '/en/data/on-chain' },
            { title: 'Exchange Flow', href: '/en/data/exchange-flow' },
            { title: 'DeFi Stats', href: '/en/data/defi' }
        ],
        featured: [
            { title: 'Bitcoin Hash Rate Hits ATH', href: '/en/data/btc-hash', imageUrl: 'https://placehold.co/400x250/f59e0b/ffffff?text=Hash+Rate' },
            { title: 'DEX Volume Surges', href: '/en/data/dex-volume', imageUrl: 'https://placehold.co/400x250/06b6d4/ffffff?text=DEX' }
        ]
    },
    'Research': {
        items: [
            { title: '2026 Digital Assets Outlook Report', href: '/en/research/2026-outlook' },
            { title: 'Q4 Market Analysis', href: '/en/research/q4-analysis' },
            { title: 'Institutional Adoption Study', href: '/en/research/institutional' }
        ],
        featured: [
            { title: 'Layer 2 Scaling Solutions', href: '/en/research/layer2', imageUrl: 'https://placehold.co/400x250/8b5cf6/ffffff?text=L2' },
            { title: 'NFT Market Trends', href: '/en/research/nft-trends', imageUrl: 'https://placehold.co/400x250/ec4899/ffffff?text=NFT' }
        ]
    },
    'Prices': {
        items: [
            { title: 'Top 100 Coins', href: '/en/prices' },
            { title: 'DeFi Tokens', href: '/en/prices/defi' },
            { title: 'NFT Collections', href: '/en/prices/nft' }
        ],
        featured: [
            { title: 'Bitcoin Price Analysis', href: '/en/prices/bitcoin', imageUrl: 'https://placehold.co/400x250/f97316/ffffff?text=BTC' },
            { title: 'Ethereum Price Trends', href: '/en/prices/ethereum', imageUrl: 'https://placehold.co/400x250/3b82f6/ffffff?text=ETH' }
        ]
    }
};

export default function Header({ locale }: HeaderProps) {
    const [activeMenu, setActiveMenu] = useState<MenuCategory | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/${locale}/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleLanguageChange = () => {
        const newLocale = locale === 'en' ? 'so' : 'en';
        window.location.href = `/${newLocale}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">

            {/* Top Bar - Desktop Only */}
            <div className="hidden md:block border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <div className="container mx-auto px-4 h-10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                        <span>📍 Global Crypto News</span>
                        <span>•</span>
                        <span>🔴 Live Market Data</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLanguageChange}
                            className="flex items-center gap-2 hover:text-blue-600 font-medium transition-colors"
                        >
                            🌐 {locale === 'en' ? 'English' : 'Somali'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg group-hover:shadow-xl transition-shadow">
                            CB
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-xl text-slate-900 dark:text-white">CryptoBlog</div>
                            <div className="text-[10px] text-slate-500 -mt-1">POWERED BY AI</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {Object.keys(MENU_DATA).map((key) => (
                            <div
                                key={key}
                                className="relative"
                                onMouseEnter={() => setActiveMenu(key as MenuCategory)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-bold transition-colors rounded-lg ${activeMenu === key
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                                    }`}>
                                    {key}
                                    <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        ))}
                        <Link
                            href={`/${locale}/blog`}
                            className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>

                    {/* Search & Mobile Menu Buttons */}
                    <div className="flex items-center gap-2">

                        {/* Search Button */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                            ) : (
                                <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                            )}
                        </button>

                        {/* CTA Button - Desktop */}
                        <Link
                            href={`/${locale}/subscribe`}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-600/30"
                        >
                            Subscribe
                        </Link>
                    </div>
                </div>

                {/* Search Bar Dropdown */}
                {searchOpen && (
                    <div className="py-4 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search crypto news, analysis, prices..."
                                autoFocus
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-slate-900 dark:text-white placeholder-slate-400"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-bold text-sm transition-colors"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mega Menu - Desktop */}
            {activeMenu && MENU_DATA[activeMenu] && (
                <div
                    onMouseEnter={() => setActiveMenu(activeMenu)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    <MegaMenu
                        active={true}
                        category={activeMenu}
                        items={MENU_DATA[activeMenu].items}
                        featured={MENU_DATA[activeMenu].featured}
                    />
                </div>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 animate-in slide-in-from-top-4">
                    <nav className="container mx-auto px-4 py-6 space-y-2">
                        {Object.keys(MENU_DATA).map((key) => (
                            <Link
                                key={key}
                                href={`/${locale}/${key.toLowerCase()}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
                            >
                                {key}
                            </Link>
                        ))}
                        <Link
                            href={`/${locale}/blog`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
                        >
                            Blog
                        </Link>
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <button
                                onClick={() => {
                                    handleLanguageChange();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors text-left"
                            >
                                🌐 {locale === 'en' ? 'Switch to Somali' : 'Switch to English'}
                            </button>
                        </div>
                        <Link
                            href={`/${locale}/subscribe`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold text-center transition-colors shadow-lg shadow-blue-600/30"
                        >
                            Subscribe Free
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
