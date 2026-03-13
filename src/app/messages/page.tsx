"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen pt-32">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 h-[calc(100vh-128px)] md:h-[calc(100vh-160px)]">
                <ChatInterface />
            </div>
        </div>
    );
}
