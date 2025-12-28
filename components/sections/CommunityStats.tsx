import { Users, MessageCircle, Star, TrendingUp } from 'lucide-react';

export default function CommunityStats() {
    const stats = [
        {
            icon: Users,
            value: '500K+',
            label: 'Active Readers',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950'
        },
        {
            icon: MessageCircle,
            value: '50K+',
            label: 'Community Members',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950'
        },
        {
            icon: Star,
            value: '4.9/5',
            label: 'User Rating',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950'
        },
        {
            icon: TrendingUp,
            value: '1M+',
            label: 'Articles Published',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950'
        }
    ];

    const testimonials = [
        {
            quote: "Best crypto news source I've found. Always up-to-date and insights are spot-on.",
            author: "Alex Thompson",
            role: "Crypto Trader",
            avatar: "AT"
        },
        {
            quote: "The AI-powered content is incredible. Helped me understand DeFi in just a few articles.",
            author: "Sarah Chen",
            role: "Blockchain Developer",
            avatar: "SC"
        },
        {
            quote: "Daily newsletter is a must-read. Never miss important market movements anymore.",
            author: "Mike Rodriguez",
            role: "Investment Analyst",
            avatar: "MR"
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Trusted by 500,000+ Crypto Enthusiasts
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Join our growing community of traders, investors, and blockchain enthusiasts
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
                                    <Icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Testimonials */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
                        What Our Community Says
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all"
                            >
                                {/* Quote */}
                                <div className="mb-6">
                                    <svg className="w-8 h-8 text-blue-600 mb-3 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-8 py-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="font-medium">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Ad-Free Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">Award Winning</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
