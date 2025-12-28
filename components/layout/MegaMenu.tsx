'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface MegaMenuItem {
    title: string;
    href: string;
}

interface MegaMenuFeatured {
    title: string;
    imageUrl: string;
    href: string;
}

interface MegaMenuProps {
    active: boolean;
    category: string;
    items: MegaMenuItem[];
    featured: MegaMenuFeatured[];
}

export default function MegaMenu({ active, category, items, featured }: MegaMenuProps) {
    if (!active) return null;

    return (
        <div className="absolute top-full left-0 w-full bg-slate-950 text-white border-t border-slate-800 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Left Column: Sidebar Links */}
                    <div className="md:col-span-3 border-r border-slate-800 pr-4">
                        <h2 className="text-2xl font-bold mb-6">{category}</h2>
                        <div className="flex flex-col space-y-3">
                            {items.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="text-slate-400 hover:text-white hover:pl-2 transition-all font-medium text-sm"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        <Link href={`/${category.toLowerCase()}`} className="flex items-center gap-2 text-blue-500 text-sm font-bold mt-8 hover:text-blue-400">
                            View All {category} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Right Column: Featured Content */}
                    <div className="md:col-span-9 pl-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Latest {category}</h3>
                        <div className="grid grid-cols-3 gap-6">
                            {featured.map((item, i) => (
                                <Link key={i} href={item.href} className="group block">
                                    <div className="aspect-video relative bg-slate-900 mb-3 overflow-hidden rounded-sm border border-slate-800">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold leading-tight group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
