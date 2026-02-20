import { NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-for-development-only'
);

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ isLoggedIn: false }, { status: 200 });
        }

        try {
            const { payload } = await jose.jwtVerify(token, JWT_SECRET);

            const user = await prisma.user.findUnique({
                where: { id: payload.id as string },
                select: { id: true, email: true, fullName: true }
            });

            if (!user) {
                return NextResponse.json({ isLoggedIn: false }, { status: 200 });
            }

            return NextResponse.json({ isLoggedIn: true, user });
        } catch (e) {
            return NextResponse.json({ isLoggedIn: false }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ isLoggedIn: false }, { status: 200 });
    }
}
