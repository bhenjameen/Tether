"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Notification {
    id: string;
    type: 'match' | 'like' | 'message' | 'system';
    user: {
        name: string;
        image: string;
    };
    message: string;
    createdAt: number; // Timestamp in ms
    isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'match',
        user: { name: 'Sarah', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
        message: 'matched with you! Send a message to start the conversation.',
        createdAt: Date.now() - 5000,
        isRead: false
    },
    {
        id: '2',
        type: 'like',
        user: { name: 'Jessica', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80' },
        message: 'liked your profile. Don\'t keep them waiting!',
        createdAt: Date.now() - 15000,
        isRead: false
    },
    {
        id: '5',
        type: 'like',
        user: { name: 'Amara', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
        message: 'liked one of your photos. Looking good!',
        createdAt: Date.now() - 30000,
        isRead: false
    },
    {
        id: '6',
        type: 'system',
        user: { name: 'Alex', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80' },
        message: 'viewed your profile recently. Explore their interests!',
        createdAt: Date.now() - 40000,
        isRead: true
    },
    {
        id: '3',
        type: 'message',
        user: { name: 'Michael', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80' },
        message: 'sent you a new message about your weekend plans.',
        createdAt: Date.now() - 45000,
        isRead: true
    },
    {
        id: '4',
        type: 'system',
        user: { name: 'Team', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
        message: 'Welcome to the premium club! Your profile is now boosted.',
        createdAt: Date.now() - 120000,
        isRead: true
    },
    {
        id: '7',
        type: 'match',
        user: { name: 'Emma', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80' },
        message: 'matched with you! Check out her favorite music.',
        createdAt: Date.now() - 180000,
        isRead: true
    }
];

export default function NotificationsPage() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    // Filter out message notifications as requested
    const [notifications, setNotifications] = useState<Notification[]>(
        MOCK_NOTIFICATIONS.filter(n => n.type !== 'message')
    );
    // Remove real-time timer, calculate once on load
    const [currentTime] = useState(Date.now());

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const formatTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((currentTime - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    if (!isLoggedIn) return null;

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-12 px-4">
            <Navbar />

            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
                        <p className="text-slate-400 text-base">Stay updated with your latest activities</p>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all active:scale-95 disabled:opacity-50"
                        disabled={notifications.every(n => n.isRead)}
                    >
                        Mark all as read
                    </button>
                </div>

                <div className="space-y-3">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`glass-panel p-4 flex gap-4 items-start transition-all hover:border-rose-500/30 group ${!notification.isRead ? 'bg-rose-500/5 border-rose-500/20' : ''}`}
                            >
                                <div className="relative">
                                    <img
                                        src={notification.user.image}
                                        alt={notification.user.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-800"
                                    />
                                    {!notification.isRead && (
                                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950 shadow-lg" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-200 leading-relaxed">
                                        <span className="font-bold text-white">{notification.user.name}</span> {notification.message}
                                    </p>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-2 block tabular-nums">
                                        {formatTimeAgo(notification.createdAt)}
                                    </span>
                                </div>
                                <div className="p-2">
                                    {notification.type === 'match' && (
                                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9c-.4-.336-.78-.688-1.135-1.054a10.825 10.825 0 01-1.358-1.638 7.269 7.269 0 01-1.03-2.43 5.39 5.39 0 01.034-2.226 5.105 5.105 0 011.102-2.023 5.149 5.149 0 011.942-1.366 5.352 5.352 0 014.288.13c.48.243.905.57 1.258.966.353-.396.778-.723 1.258-.966a5.352 5.352 0 014.288-.13 5.149 5.149 0 011.942 1.366 5.105 5.105 0 011.102 2.023 5.39 5.39 0 01.034 2.226 7.269 7.269 0 01-1.03 2.43 10.825 10.825 0 01-1.358 1.638c-.356.366-.735.718-1.135 1.054a22.045 22.045 0 01-2.582 1.9c-.43.33-.84.622-1.162.682l-.019.01-.005.003h-.002a.168.168 0 01-.001 0h-.001z" />
                                            </svg>
                                        </div>
                                    )}
                                    {notification.type === 'like' && (
                                        <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.972 9H19.5a.75.75 0 01.554 1.255l-8 9a.75.75 0 01-1.253-.742l1.396-6.513H5.25a.75.75 0 01-.554-1.255l8-9a.75.75 0 01.773-.15z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="glass-panel p-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold mb-1">Clear skies</h3>
                            <p className="text-slate-500 text-sm">No new notifications for you right now.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
