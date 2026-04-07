"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Pusher from 'pusher-js';

interface NotificationContextType {
    unreadCount: number;
    setUnreadCount: (count: number) => void;
    decrementUnread: () => void;
    markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!session?.user?.email) return;

        // Fetch initial unread count
        const fetchUnread = async () => {
            try {
                const response = await fetch('/api/notifications');
                const data = await response.json();
                if (data.notifications) {
                    const count = data.notifications.filter((n: any) => !n.read).length;
                    setUnreadCount(count);
                }
            } catch (error) {
                console.error('Failed to fetch initial notification count');
            }
        };

        fetchUnread();

        // Initialize Pusher for real-time updates
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });

        // Use email as channel name like in notifications page
        const channelName = `user-${session.user.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const channel = pusher.subscribe(channelName);
        
        channel.bind('new-notification', () => {
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [session?.user?.email]);

    const decrementUnread = () => setUnreadCount(prev => Math.max(0, prev - 1));
    const markAllAsRead = () => setUnreadCount(0);

    return (
        <NotificationContext.Provider value={{
            unreadCount,
            setUnreadCount,
            decrementUnread,
            markAllAsRead
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
