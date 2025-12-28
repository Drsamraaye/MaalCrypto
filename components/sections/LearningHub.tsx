import Link from 'next/link';
import { BookOpen, Video, FileText, Award } from 'lucide-react';

interface LearningHubProps {
    locale: string;
}

export default function LearningHub({ locale }: LearningHubProps) {
    const resources = [
        {
            icon: BookOpen,
            title: 'Beginner Guides',
            description: 'Start your crypto journey with our comprehensive beginner-friendly guides',
            count: '25+ Guides',
            color: 'from-blue-500 to-blue-600',
            href: `/${locale}/learn/beginners`
        },
        {
            icon: Video,
            title: 'Video Tutorials',
            description: 'Watch step-by-step video tutorials on trading, wallets, and DeFi',
            count: '50+ Videos',
            color: 'from-purple-500 to-purple-600',
            href: `/${locale}/learn/videos`
        },
        {
            icon: FileText,
            title: 'Market Analysis',
            description: 'In-depth technical and fundamental analysis reports',
            count: '100+ Reports',
            color: 'from-pink-500 to-pink-600',
            href: `/${locale}/analysis`
        },
        {
            icon: Award,
            title: 'Certification',
            description: 'Earn crypto certification and prove your knowledge',
            count: 'Free Courses',
            color: 'from-orange-500 to-orange-600',
            href: `/${locale}/learn/certification`
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Crypto Learning Hub
                    </h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Master cryptocurrency with our comprehensive educational resources
                    </p>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resources.map((resource, i) => {
                        const Icon = resource.icon;
                        return (
                            <Link
                                key={i}
                                href={resource.href}
                                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Icon with Gradient */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                                    {resource.title}
                                </h3>
                                <p className="text-sm text-blue-100/80 mb-4 leading-relaxed">
                                    {resource.description}
                                </p>

                                {/* Count Badge */}
                                <div className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    {resource.count}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href={`/${locale}/learn`}
                        className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-slate-900 px-8 py-4 rounded-lg font-bold shadow-2xl hover:shadow-blue-500/50 transition-all"
                    >
                        Browse All Resources
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}
