'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export function NewsletterGelle() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setMessage('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsSubmitted(true);
                setEmail('');
            } else {
                setMessage(data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 bg-neutral-900 border-y border-neutral-800">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Always Stay Up to Date
                    </h2>
                    <p className="text-neutral-400 mb-8">
                        Subscribe to our newsletter to get our newest articles instantly!
                    </p>

                    {/* Error Message */}
                    {message && !isSubmitted && (
                        <div className="mb-4 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm font-medium">
                            {message}
                        </div>
                    )}

                    {/* Form */}
                    {isSubmitted ? (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                            <p className="text-green-400 font-medium">
                                ✓ Thank you! You've been subscribed successfully.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    required
                                    className="w-full pl-12 pr-4 py-4 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-black text-white placeholder-neutral-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold uppercase text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    'Subscribing...'
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Sign Up Now
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Terms */}
                    <p className="text-xs text-neutral-500 mt-4">
                        By subscribing, you agree to our{' '}
                        <a href="#" className="underline hover:text-neutral-300">Terms of Use</a>
                        {' & '}
                        <a href="#" className="underline hover:text-neutral-300">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default NewsletterGelle;
