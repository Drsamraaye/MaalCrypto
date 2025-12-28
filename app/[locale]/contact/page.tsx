import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    return (
        <div className="min-h-screen bg-black">
            <section className="relative py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Info */}
                        <div>
                            <span className="text-green-500 font-bold uppercase tracking-wider text-sm mb-4 block">Get in Touch</span>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-8">
                                LET'S START A CONVERSATION
                            </h1>
                            <p className="text-lg text-neutral-400 mb-12 leading-relaxed">
                                Have questions about MaalCrypto? Want to partner with us? Or just want to say hi? We'd love to hear from you.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0 text-green-500">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                                        <p className="text-neutral-400">support@maalcrypto.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0 text-green-500">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                                        <p className="text-neutral-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0 text-green-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                                        <p className="text-neutral-400">123 Crypto Valley, Blockchain City, BC 404</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 lg:p-12">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-300">First Name</label>
                                        <input type="text" className="w-full h-12 bg-black border border-neutral-800 rounded-xl px-4 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-300">Last Name</label>
                                        <input type="text" className="w-full h-12 bg-black border border-neutral-800 rounded-xl px-4 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-neutral-300">Email Address</label>
                                    <input type="email" className="w-full h-12 bg-black border border-neutral-800 rounded-xl px-4 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-neutral-300">Message</label>
                                    <textarea className="w-full h-32 bg-black border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-green-500 transition-colors resize-none" placeholder="Your message here..."></textarea>
                                </div>
                                <button type="button" className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-bold uppercase rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Send Message
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
