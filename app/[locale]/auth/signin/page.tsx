'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
    // We need to resolve the promise for params if we use it, but here we might not need locale explicitly if we use relative links or get it from usePathname
    // But let's unwrap it just in case
    // const { locale } = await params; (Inside async component)
    // Client components can't receive async params in the same way depending on Next.js version, but let's assume standard client component

    // Actually, in Next.js 15+, page props are promises. 
    // Let's just use empty for now or handle async properly if needed.
    // Simpler: Just use standard client component structure.

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password');
                setLoading(false);
            } else {
                // Fetch the upgraded session to get the role
                const sessionRes = await fetch('/api/auth/session');
                const session = await sessionRes.json();

                if (session?.user?.role === 'admin') {
                    // Force a hard navigation to admin in case layout differs significantly 
                    // or simply push
                    router.push('/admin/dashboard');
                } else {
                    // User login - show welcome and go to news
                    // Using simple alert or console for now, as no Toast component verification yet
                    // Just redirect to news as requested "make awareness the news"
                    router.push('/news?welcome=true');
                }
                router.refresh();
            }
        } catch (error) {
            setError('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
                    <p className="text-neutral-400">Sign in to access your profile and subscriptions</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-neutral-600"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-neutral-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-800"></div>
                    <span className="text-neutral-500 text-sm font-medium">OR</span>
                    <div className="flex-1 h-px bg-neutral-800"></div>
                </div>

                {/* Google Sign In Button */}
                <button
                    onClick={async () => {
                        const result = await signIn('google', { redirect: false });
                        if (result?.ok) {
                            // Fetch session to check if admin
                            const sessionRes = await fetch('/api/auth/session');
                            const session = await sessionRes.json();

                            if (session?.user?.email === 'admin@maalcrypto.com') {
                                // Admin user - redirect to dashboard
                                router.push('/admin/dashboard');
                            } else {
                                // Regular user - redirect to news
                                router.push('/news');
                            }
                            router.refresh();
                        }
                    }}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl border border-gray-300 transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <div className="mt-8 text-center">
                    <p className="text-neutral-500 text-sm">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-green-500 hover:text-green-400 font-bold">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
