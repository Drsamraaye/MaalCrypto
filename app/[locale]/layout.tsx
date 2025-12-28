import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/globals.css";
import HeaderPro from "@/components/layout/HeaderPro";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import MarketTickerGelle from "@/components/ui/MarketTickerGelle";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "MaalCrypto | Crypto News & Market Data",
    description: "Real-time cryptocurrency news, market analysis, and live price tracking - MaalCrypto.",
};

import { AuthProvider } from "@/components/providers/AuthProvider";

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn(inter.variable, outfit.variable, "min-h-screen bg-white font-sans antialiased flex flex-col")}>
                <AuthProvider>
                    <ThemeProvider defaultTheme="light">
                        {/* Fixed Header */}
                        <div className="sticky top-0 z-50 w-full">
                            <HeaderPro locale={locale} />
                            <MarketTickerGelle />
                        </div>

                        {/* Main Content */}
                        <main className="flex-1">
                            {children}
                        </main>

                        {/* Footer */}
                        <Footer />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
