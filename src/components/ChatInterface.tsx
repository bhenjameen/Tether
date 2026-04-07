"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TriviaGame from './games/TriviaGame';
import TicTacToe from './games/TicTacToe';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/lib/pusher-client';

interface Message {
    id: string;
    senderId: string;
    text?: string;
    image?: string;
    createdAt: string;
}

interface Conversation {
    id: string;
    participants: any[];
    messages: Message[];
    updatedAt: string;
}

export default function ChatInterface() {
    const { data: session } = useSession();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [activeGame, setActiveGame] = useState<null | 'trivia' | 'tictactoe'>(null);
    const [showGameMenu, setShowGameMenu] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Fetch: Conversations
    useEffect(() => {
        if (session?.user) {
            fetchConversations();
        }
    }, [session]);

    // Fetch Messages when chat selected + Subscribe to Pusher
    useEffect(() => {
        if (!selectedChatId || !pusherClient) return;

        fetchMessages(selectedChatId);

        const channel = pusherClient.subscribe(`conversation-${selectedChatId}`);
        channel.bind('new-message', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            pusherClient.unsubscribe(`conversation-${selectedChatId}`);
        };
    }, [selectedChatId]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchConversations = async () => {
        const res = await fetch('/api/messages');
        const data = await res.json();
        if (Array.isArray(data)) setConversations(data);
    };

    const fetchMessages = async (id: string) => {
        const res = await fetch(`/api/messages/${id}`);
        const data = await res.json();
        if (Array.isArray(data)) setMessages(data);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !selectedChatId) return;

        const currentChat = conversations.find(c => c.id === selectedChatId);
        const recipient = currentChat?.participants.find(p => p.id !== session?.user?.id);

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationId: selectedChatId,
                    text: input,
                    receiverId: recipient?.id
                }),
            });
            setInput('');
        } catch (error) {
            console.error('Failed to send message');
        }
    };

    const activeChat = conversations.find(c => c.id === selectedChatId);
    const otherUser = activeChat?.participants.find(p => p.id !== session?.user?.id);

    return (
        <div className="flex h-full md:glass-panel overflow-hidden bg-slate-950 md:bg-transparent border-t border-white/5 md:border-none">
            {/* Sidebar - Chat List */}
            <div className={`w-full md:w-80 border-r border-slate-700/50 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
                <div className="px-6 py-4 border-b border-slate-700/50">
                    <h2 className="font-bold text-lg text-slate-100">Messages</h2>
                </div>
                <div className="overflow-y-auto flex-1">
                    {conversations.length > 0 ? (
                        conversations.map((chat) => {
                            const participant = chat.participants.find(p => p.id !== session?.user?.id);
                            return (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChatId(chat.id)}
                                    className={`px-6 py-4 flex gap-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 relative ${selectedChatId === chat.id ? 'bg-white/10' : ''}`}
                                >
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                                        <Image src={participant?.image || 'https://via.placeholder.com/100'} alt={participant?.name || 'User'} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-semibold truncate text-white">
                                                {participant?.name || 'Unknown'}
                                            </h3>
                                        </div>
                                        <p className="text-sm truncate text-slate-500">
                                            {chat.messages[0]?.text || 'No messages yet'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-slate-500 text-sm">No conversations yet</div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            {selectedChatId && otherUser ? (
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-3 bg-slate-950 md:bg-transparent">
                        <button onClick={() => setSelectedChatId(null)} className="p-2 -ml-2 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10">
                            <Image src={otherUser.image || 'https://via.placeholder.com/100'} alt={otherUser.name} fill className="object-cover" />
                        </div>
                        <h2 className="font-bold text-lg text-white">{otherUser.name}</h2>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.senderId === session?.user?.id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${msg.senderId === session?.user?.id
                                    ? 'bg-rose-600 text-white rounded-br-none'
                                    : 'bg-slate-700/50 text-slate-100 rounded-bl-none'
                                    }`}>
                                    {msg.text && <p>{msg.text}</p>}
                                    {msg.image && (
                                        <div className="relative w-64 h-48 mt-2 rounded-lg overflow-hidden">
                                            <Image src={msg.image} alt="Sent image" fill className="object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="px-6 py-4 border-t border-slate-700/50 flex gap-2 bg-slate-950 md:bg-transparent">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 focus:outline-none focus:border-rose-500 text-white"
                        />
                        <button type="submit" className="btn-primary rounded-full w-12 h-12 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            ) : (
                <div className="hidden md:flex flex-1 items-center justify-center bg-white/5 border-l border-white/5">
                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold text-slate-200">Select a message</h3>
                        <p className="text-slate-500 text-sm">Start a conversation with your matches.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
