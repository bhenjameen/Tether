"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import SearchModal from './SearchModal';
import SideMenu from './SideMenu';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { useMessages } from '@/context/MessageContext';

export default function Navbar() {
    const { isLoggedIn } = useAuth();
    const { showToast } = useToast();
    const { unreadCount } = useMessages();
    const router = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleInboxClick = (e: React.MouseEvent) => {
        if (!isLoggedIn) {
            e.preventDefault();
            showToast("Please log in to continue", "warning");
            router.push('/login');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-t-0 border-x-0 rounded-none px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo.png"
                        alt="Tether Logo"
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                        Tether
                    </span>
                </Link>
            </div>

            <div className="hidden md:flex gap-8 items-center font-medium">
                <Link href="/" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span>Home</span>
                </Link>
                <div className="flex items-center gap-6 border-l border-white/10 pl-8 ml-2">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-2 hover:text-violet-400 transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-violet-500/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <span className="text-sm">Search</span>
                    </button>
                    {!isLoggedIn ? (
                        <Link href="/discover" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <span>Discover</span>
                        </Link>
                    ) : (
                        <Link href="/notifications" className="flex items-center gap-2 hover:text-violet-400 transition-colors relative group">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-[9px] font-bold text-white shadow-sm ring-1 ring-slate-950/50 animate-pulse">
                                    3
                                </span>
                            </div>
                            <span>Notifications</span>
                        </Link>
                    )}
                </div>
                <Link
                    href="/messages"
                    onClick={handleInboxClick}
                    className="flex items-center gap-2 hover:text-violet-400 transition-colors"
                >
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        {isLoggedIn && unreadCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 text-[9px] font-bold text-white shadow-sm ring-1 ring-slate-950/50">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <span>Inbox</span>
                </Link>
            </div>

            <div className="flex gap-4">
                {!isLoggedIn ? (
                    <>
                        <Link href="/login" className="px-4 py-2 hover:bg-white/10 rounded-full transition-colors">
                            Login
                        </Link>
                        <Link href="/register" className="btn-primary text-sm px-6 py-2">
                            Join Free
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[10px] font-bold shadow-lg group-hover:scale-110 transition-transform">
                                ME
                            </div>
                            <span className="text-sm font-medium">Menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </nav>
    );
}
