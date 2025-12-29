import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Hardcoded admin credentials (from seed.ts)
const ADMIN_EMAIL = "admin@maalcrypto.com";
const ADMIN_PASSWORD_HASH = "$2b$10$tAxPrDdnhy8ctCpFGYtWO.24zdRcucwVLr7Wd6.0x8gRJpvRkqAYG"; // Admin@1234

export const AuthOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                // Check if it's the admin user
                if (credentials.email === ADMIN_EMAIL) {
                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        ADMIN_PASSWORD_HASH
                    );

                    if (isCorrectPassword) {
                        return {
                            id: "admin-1",
                            email: ADMIN_EMAIL,
                            name: "Super Admin",
                            role: "admin",
                        };
                    }
                }

                throw new Error("Invalid credentials");
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.role = (user as { role?: string }).role || "user";
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
