"use client";
import React from 'react';
import { useSession } from 'next-auth/react';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { status } = useSession();
    const isLoggedIn = status === 'authenticated';
    const isLoading = status === 'loading';

    // Calculate bottom padding for mobile when logged in
    // pb-32 (128px) ensures content sits comfortably above the ~70px mobile nav
    const mobilePaddingClass = isLoggedIn && !isLoading ? 'pb-32 md:pb-0' : '';

    return (
        <main className={`flex min-h-screen flex-col ${mobilePaddingClass}`}>
            {children}
        </main>
    );
}
