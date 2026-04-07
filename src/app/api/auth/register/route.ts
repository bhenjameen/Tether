import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { email, password, fullName } = await request.json();

        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          return NextResponse.json(
            { error: "User already exists with this email" },
            { status: 400 }
          );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user and initial profile
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                profile: {
                  create: {
                    bio: "New member of the Tether family",
                  }
                }
            },
            include: {
              profile: true
            }
        });

        return NextResponse.json(
            { 
              message: 'Account created successfully!', 
              user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName
              } 
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: `Registration error: ${error.message || 'Unknown error'}.` },
            { status: 500 }
        );
    }
}
