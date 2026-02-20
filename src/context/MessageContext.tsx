"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Mock conversation data - this should match your actual data structure
const MOCK_CONVERSATIONS = [
    { name: 'Amara', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', verified: true, lastMsg: 'That sounds exciting! What kind of project?', time: '10:33 AM', unread: false },
    { name: 'Sarah', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', verified: true, lastMsg: 'Hey! Are you coming to the event?', time: '9:45 AM', unread: true },
    { name: 'Michael', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', verified: false, lastMsg: 'Sent you those photos we talked about.', time: 'Yesterday', unread: true },
    { name: 'Jessica', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80', verified: true, lastMsg: 'See you then!', time: 'Monday', unread: false },
    { name: 'Emma', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80', verified: true, lastMsg: 'That song is actually really good.', time: '2 days ago', unread: true }
];

interface MessageContextType {
    unreadCount: number;
    setUnreadCount: (count: number) => void;
    incrementUnread: () => void;
    decrementUnread: () => void;
    markAllAsRead: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
    // Calculate initial unread count from mock data
    const initialUnreadCount = MOCK_CONVERSATIONS.filter(conv => conv.unread).length;
    const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

    const incrementUnread = () => setUnreadCount(prev => prev + 1);
    const decrementUnread = () => setUnreadCount(prev => Math.max(0, prev - 1));
    const markAllAsRead = () => setUnreadCount(0);

    return (
        <MessageContext.Provider value={{
            unreadCount,
            setUnreadCount,
            incrementUnread,
            decrementUnread,
            markAllAsRead
        }}>
            {children}
        </MessageContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
}
