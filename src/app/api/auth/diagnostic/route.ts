import { NextResponse } from 'next/server';
import prisma, { getResolvedDatabaseUrl } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    const envStatus = {
        hasAuthSecret: !!process.env.AUTH_SECRET,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasPostgresPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        nodeEnv: process.env.NODE_ENV,
        activeDatabaseSource: process.env.DATABASE_URL
            ? 'DATABASE_URL'
            : process.env.POSTGRES_PRISMA_URL
            ? 'POSTGRES_PRISMA_URL'
            : process.env.POSTGRES_URL
            ? 'POSTGRES_URL'
            : 'NONE',
    };

    let dbConnected = false;
    let dbError: string | null = null;
    let userCount = 0;
    let usersList: Array<{ id: string; email: string; fullName: string | null; createdAt: Date }> = [];

    try {
        // Test basic DB connectivity
        await prisma.$queryRaw`SELECT 1`;
        dbConnected = true;

        // Count and list users
        userCount = await prisma.user.count();
        usersList = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                fullName: true,
                createdAt: true,
            },
            take: 20,
        });
    } catch (err: any) {
        dbConnected = false;
        dbError = err.message || 'Unknown database error';
    }

    return NextResponse.json({
        status: dbConnected ? 'ok' : 'database_error',
        timestamp: new Date().toISOString(),
        database: {
            connected: dbConnected,
            error: dbError,
            userCount,
            users: usersList,
        },
        environment: envStatus,
        recommendation: !dbConnected
            ? 'Database connection failed. Ensure POSTGRES_PRISMA_URL or DATABASE_URL is set in Vercel project settings.'
            : userCount === 0
            ? 'Database is connected, but has 0 users! Use POST to /api/auth/diagnostic to seed a test account or register at /register.'
            : 'Database is connected and accounts exist. Check the users list above for your registered email.',
    });
}

export async function POST(request: Request) {
    try {
        let body: any = {};
        try {
            body = await request.json();
        } catch {
            body = {};
        }

        const email = (body.email || 'admin@tether.com').trim().toLowerCase();
        const password = body.password || 'password123';
        const fullName = (body.fullName || 'Tether Tester').trim();

        const hashedPassword = await bcrypt.hash(password, 12);

        // Upsert user so this works for both initial seed and password resets
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                fullName,
            },
            create: {
                email,
                password: hashedPassword,
                fullName,
                profile: {
                    create: {
                        bio: 'Tether test account',
                    },
                },
            },
            select: {
                id: true,
                email: true,
                fullName: true,
            },
        });

        return NextResponse.json({
            message: 'User account seeded / reset successfully!',
            credentialsToLogin: {
                email: user.email,
                password: password,
            },
            user,
        });
    } catch (err: any) {
        console.error('[Diagnostic Seed Error]', err);
        return NextResponse.json(
            {
                error: 'Failed to seed or reset test user',
                details: err.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}
