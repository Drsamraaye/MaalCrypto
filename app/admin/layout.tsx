import "@/globals.css";
import { Inter, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
    title: "MaalCrypto Admin",
    description: "Admin Dashboard for MaalCrypto",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.variable, outfit.variable, "min-h-screen bg-background font-sans antialiased")}>
                <AuthProvider>
                    <ThemeProvider defaultTheme="light">
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
