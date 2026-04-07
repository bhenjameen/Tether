"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
    const { status } = useSession();
    const isLoggedIn = status === 'authenticated';
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen pt-32">
            <Navbar />
            <div className="max-w-7xl mx-auto h-[calc(100vh-128px)] md:h-[calc(100vh-160px)]">
                <ChatInterface />
            </div>
        </div>
    );
}
