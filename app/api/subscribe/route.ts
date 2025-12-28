import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existing = await prisma.subscriber.findUnique({
            where: { email },
        });

        if (existing) {
            if (!existing.active) {
                // Reactivate
                await prisma.subscriber.update({
                    where: { email },
                    data: { active: true },
                });
                return NextResponse.json(
                    { message: 'Welcome back! Subscription reactivated.' },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                { message: 'You are already subscribed.' },
                { status: 409 } // Conflict
            );
        }

        // Create new subscription
        await prisma.subscriber.create({
            data: { email },
        });

        // Optional: Send welcome email here using lib/email.ts
        // await sendEmail({ to: email, subject: "Welcome to MaalCrypto", html: "..." })

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
