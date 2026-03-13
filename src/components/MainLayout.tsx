"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { isLoggedIn, isLoading } = useAuth();

    // Calculate bottom padding for mobile when logged in
    // pb-32 (128px) ensures content sits comfortably above the ~70px mobile nav
    const mobilePaddingClass = isLoggedIn && !isLoading ? 'pb-32 md:pb-0' : '';

    return (
        <main className={`flex min-h-screen flex-col ${mobilePaddingClass}`}>
            {children}
        </main>
    );
}
