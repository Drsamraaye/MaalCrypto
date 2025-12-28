
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Test basic DB connection
        const userCount = await prisma.user.count();

        // Test Environment Variables
        const envCheck = {
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            HAS_SECRET: !!process.env.NEXTAUTH_SECRET,
            DATABASE_URL_PREFIX: process.env.DATABASE_URL?.split(':')[0], // Don't expose full URL
            NODE_ENV: process.env.NODE_ENV,
        };

        return NextResponse.json({
            status: 'ok',
            message: 'Database connection successful',
            userCount,
            env: envCheck
        });
    } catch (error: any) {
        console.error("Debug Route Error:", error);
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
