"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMessages } from '@/context/MessageContext';
import { useNotifications } from '@/context/NotificationContext';
import { useUI } from '@/context/UIContext';
import SearchModal from './SearchModal';
import SideMenu from './SideMenu';

export default function MobileNav() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated';
    const { unreadCount: messageCount } = useMessages();
    const { unreadCount: notificationCount } = useNotifications();
    const { isSearchOpen, setIsSearchOpen, isMenuOpen, setIsMenuOpen } = useUI();
    const pathname = usePathname();

    if (!isLoggedIn) {
        return (
            <>
                <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </>
        );
    }

    const navItems = [
        {
            label: 'Search',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            ),
            onClick: () => setIsSearchOpen(true),
            active: isSearchOpen
        },
        {
            label: 'Discover',
            href: '/discover',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
            active: pathname === '/discover'
        },
        {
            label: 'Inbox',
            href: '/messages',
            icon: (
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {messageCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-slate-950/50">
                            {messageCount}
                        </span>
                    )}
                </div>
            ),
            active: pathname === '/messages'
        },
        {
            label: 'Alerts',
            href: '/notifications',
            icon: (
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {notificationCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-slate-950/50">
                            {notificationCount}
                        </span>
                    )}
                </div>
            ),
            active: pathname === '/notifications'
        },
        {
            label: 'Menu',
            icon: (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-[10px] font-bold shadow-lg overflow-hidden">
                    {session?.user?.image ? (
                        <img src={session.user.image} alt={session.user.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                        <span>{session?.user?.name?.slice(0, 2).toUpperCase() || 'ME'}</span>
                    )}
                </div>
            ),
            onClick: () => setIsMenuOpen(true),
            active: isMenuOpen
        }
    ];

    return (
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                <nav className="glass-panel w-full px-2 py-4 shadow-2xl border-t border-x-0 border-b-0 rounded-none border-white/10 pointer-events-auto">
                    <div className="flex items-center justify-around max-w-lg mx-auto">
                        {navItems.map((item, idx) => (
                            item.href ? (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-90 ${item.active ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    <div className={`transition-transform duration-300 ${item.active ? 'scale-110 -translate-y-1' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <span className={`text-[10px] font-medium tracking-tight transition-opacity duration-300 ${item.active ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
                                </Link>
                            ) : (
                                <button
                                    key={idx}
                                    onClick={item.onClick}
                                    className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-90 ${item.active ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    <div className={`transition-transform duration-300 ${item.active ? 'scale-110 -translate-y-1' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <span className={`text-[10px] font-medium tracking-tight transition-opacity duration-300 ${item.active ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
                                </button>
                            )
                        ))}
                    </div>
                </nav>
            </div>
            
            {/* Render modals globally here so they are always accessible */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
