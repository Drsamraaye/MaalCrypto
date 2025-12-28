import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin, Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-neutral-900 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl font-black text-white tracking-tight">
                                MAAL<span className="text-green-500">CRYPTO</span>
                            </h3>
                        </Link>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            The premier destination for cryptocurrency intelligence, market data, and investment education. Empowering your financial future in the decentralized economy.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/news" className="hover:text-green-500 transition-colors flex items-center gap-2">Latest News</Link></li>
                            <li><Link href="/prices" className="hover:text-green-500 transition-colors flex items-center gap-2">Market Data</Link></li>
                            <li><Link href="/exchanges" className="hover:text-green-500 transition-colors flex items-center gap-2">Exchanges</Link></li>
                            <li><Link href="/learn" className="hover:text-green-500 transition-colors flex items-center gap-2">Academy</Link></li>
                        </ul>
                    </div>

                    {/* Legal/Company */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-green-500 transition-colors">Contact Support</Link></li>
                            <li><Link href="/advertise" className="hover:text-green-500 transition-colors">Advertise with Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-green-500 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Stay Ahead</h4>
                        <p className="text-sm text-neutral-400 mb-4">
                            Join 50,000+ subscribers for daily crypto insights.
                        </p>
                        <form className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-neutral-600"
                                />
                            </div>
                            <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                                Subscribe Now
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} MaalCrypto. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            System Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
