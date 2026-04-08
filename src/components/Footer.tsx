"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Footer() {
    const { status } = useSession();
    const isLoggedIn = status === 'authenticated';
    const isLoading = status === 'loading';

    // Do not show footer if user is logged in or during initial auth check
    if (isLoggedIn || isLoading) return null;

    return (
        <footer className="relative z-10 glass-panel border-b-0 border-x-0 rounded-none px-6 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Branding Section */}
                <div className="md:col-span-2 space-y-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#tether-gradient-footer)" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                            <defs>
                                <linearGradient id="tether-gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fb7185" />
                                    <stop offset="100%" stopColor="#fbbf24" />
                                </linearGradient>
                            </defs>
                            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                        </svg>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
                            Tether
                        </span>
                    </Link>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                        A premium dating experience designed for meaningful connections. Join thousands of people finding their perfect match on Tether.
                    </p>
                    <div className="pt-2 text-xs text-slate-500 font-medium tracking-wide uppercase">
                        © {new Date().getFullYear()} Tether
                    </div>
                </div>

                {/* Simplified Links Section */}
                <div className="md:col-span-2 flex flex-col gap-8 md:gap-6 md:justify-start items-start md:items-end">
                    <ul className="flex flex-col md:flex-row gap-x-8 gap-y-4 md:gap-y-3">
                        <li>
                            <Link href="#" className="text-slate-400 hover:text-rose-400 text-sm transition-colors font-medium">About Us</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-slate-400 hover:text-rose-400 text-sm transition-colors font-medium">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-slate-400 hover:text-rose-400 text-sm transition-colors font-medium">Terms of Service</Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col md:flex-row gap-x-8 gap-y-4 md:gap-y-3">
                        <li>
                            <Link href="#" className="text-slate-400 hover:text-rose-400 text-sm transition-colors font-bold text-rose-400/90 tracking-wide uppercase text-[11px]">Contact</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-slate-400 hover:text-rose-400 text-sm transition-colors font-bold text-rose-400/90 tracking-wide uppercase text-[11px]">Support</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
