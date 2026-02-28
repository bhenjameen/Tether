"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Footer() {
    const { isLoggedIn, isLoading } = useAuth();

    // Do not show footer if user is logged in or during initial auth check
    if (isLoggedIn || isLoading) return null;

    return (
        <footer className="relative z-10 glass-panel border-b-0 border-x-0 rounded-none px-6 py-12 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Branding Section */}
                <div className="md:col-span-2 space-y-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/logo.png"
                            alt="Tether Logo"
                            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
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
                <div className="md:col-span-2 flex flex-col gap-6 md:justify-start items-start md:items-end">
                    <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
                    <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
