import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { email, password, fullName } = await request.json();

        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                createdAt: true,
            }
        });

        return NextResponse.json(
            { message: 'User created successfully', user },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);

        if (error.code === 'P2021') {
            return NextResponse.json(
                { error: 'Database tables not found. Please ensure you have run "npx prisma db push".' },
                { status: 500 }
            );
        }

        if (error.code === 'P2024' || error.message?.includes('Can\'t reach database server')) {
            return NextResponse.json(
                { error: 'Database connection failed. Please ensure your Vercel database is connected.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: `Registration error: ${error.message || 'Unknown error'}. Please check your configuration.` },
            { status: 500 }
        );
    }
}
