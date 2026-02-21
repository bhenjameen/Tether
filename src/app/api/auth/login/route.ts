import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    // Explicitly validate JWT_SECRET existence and length (jose HS256 requires 32 chars)
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        return NextResponse.json(
            { error: 'Server configuration error: JWT_SECRET is missing or too short (min 32 chars). Please check Vercel Environment Variables.' },
            { status: 500 }
        );
    }

    const JWT_SECRET_UINT8 = new TextEncoder().encode(secret);

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Missing email or password' },
                { status: 400 }
            );
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Verify user and password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { error: 'Wrong Username or Password. Try again' },
                { status: 401 }
            );
        }

        // Create JWT
        const token = await new jose.SignJWT({ id: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET_UINT8);

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);

        // Check for specific Prisma/DB connection errors to give better feedback
        if (error.code === 'P2024' || error.message?.includes('Can\'t reach database server')) {
            return NextResponse.json(
                { error: 'Database connection failed. Please ensure your Vercel database is connected.' },
                { status: 503 }
            );
        }

        if (error.code === 'P2021') {
            return NextResponse.json(
                { error: 'Database tables not found. Please ensure you have run "npx prisma db push".' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: `Login error: ${error.message || 'Unknown error'}. Please check your configuration.` },
            { status: 500 }
        );
    }
}
