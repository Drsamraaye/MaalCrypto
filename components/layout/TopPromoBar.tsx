'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export default function TopPromoBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="w-full bg-[#fde047] text-slate-900 text-xs md:text-sm py-2 px-4 flex items-center justify-center relative">
            <div className="flex items-center gap-2 font-medium">
                <span className="hidden md:inline">📘 Kiribto: Kacdoonka Qarniga 21-aad.</span>
                <span className="md:hidden">Kacdoonka Qarniga 21-aad.</span>
                <button className="bg-slate-900 text-white px-3 py-0.5 rounded text-xs font-bold hover:bg-slate-700 transition-colors">
                    BUY NOW
                </button>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}
