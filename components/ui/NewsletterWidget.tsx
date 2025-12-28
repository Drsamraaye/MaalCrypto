'use client';

import { ArrowRight, Mail } from 'lucide-react';

export default function NewsletterWidget() {
    return (
        <div className="rounded-xl p-8 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Mail className="w-6 h-6 text-blue-200" />
                </div>

                <h3 className="text-2xl font-bold font-heading mb-2">The Daily Briefing</h3>
                <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                    Get the most vital crypto news and analysis delivered to your inbox every morning. Join 50,000+ subscribers.
                </p>

                <div className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                    />
                    <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                        Subscribe Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-blue-200/60 text-center mt-1">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
