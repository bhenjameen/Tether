"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import TriviaGame from './games/TriviaGame';
import TicTacToe from './games/TicTacToe';

const MOCK_MESSAGES = [
    { id: '1', sender: 'Amara', text: 'Hey there! How is your day going?', time: '10:30 AM', isMe: false },
    { id: '2', sender: 'You', text: 'Hi Amara! It\'s going great, thanks. Just working on a cool project.', time: '10:32 AM', isMe: true },
    { id: '3', sender: 'Amara', text: 'That sounds exciting! What kind of project?', time: '10:33 AM', isMe: false },
    { id: '4', sender: 'Amara', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', time: '10:35 AM', isMe: false },
];

export default function ChatInterface() {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [input, setInput] = useState('');
    const [activeGame, setActiveGame] = useState<null | 'trivia' | 'tictactoe'>(null);
    const [showGameMenu, setShowGameMenu] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            id: `msg-${Date.now()}-${Math.random()}`,
            sender: 'You',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };

        setMessages([...messages, newMessage]);
        setInput('');

        // Simulate reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: `msg-${Date.now()}-${Math.random()}`,
                sender: 'Amara',
                text: 'That is really interesting! Tell me more.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: false,
            }]);
        }, 2000);
    };

    const sendImage = () => {
        // Mock sending an image
        const newMessage = {
            id: `msg-img-${Date.now()}`,
            sender: 'You',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="flex h-[calc(100vh-100px)] glass-panel overflow-hidden">
            {/* Sidebar - Chat List */}
            <div className="w-80 border-r border-slate-700/50 hidden md:flex flex-col">
                <div className="p-4 border-b border-slate-700/50">
                    <h2 className="font-bold text-lg">Messages</h2>
                </div>
                <div className="overflow-y-auto flex-1">
                    {[
                        { name: 'Amara', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', verified: true, lastMsg: 'That sounds exciting! What kind of project?', time: '10:33 AM', unread: false },
                        { name: 'Sarah', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', verified: true, lastMsg: 'Hey! Are you coming to the event?', time: '9:45 AM', unread: true },
                        { name: 'Michael', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', verified: false, lastMsg: 'Sent you those photos we talked about.', time: 'Yesterday', unread: true },
                        { name: 'Jessica', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80', verified: true, lastMsg: 'See you then!', time: 'Monday', unread: false },
                        { name: 'Emma', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80', verified: true, lastMsg: 'That song is actually really good.', time: '2 days ago', unread: true }
                    ].map((user, i) => (
                        <div key={user.name} className={`p-4 flex gap-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 relative ${i === 0 ? 'bg-white/10' : ''}`}>
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                                <Image src={user.img} alt={user.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className={`font-semibold truncate flex items-center gap-1 ${user.unread ? 'text-white' : 'text-slate-200'}`}>
                                        {user.name}
                                        {user.verified && (
                                            <span className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-white">
                                                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-3.946-4.654a.75.75 0 01.042 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06-.042z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                    </h3>
                                    <span className={`text-[10px] ${user.unread ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>{user.time}</span>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className={`text-sm truncate ${user.unread ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                                        {user.lastMsg}
                                    </p>
                                    {user.unread && (
                                        <span className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(230,90,90,0.5)]" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden md:hidden relative">
                        <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Amara" fill className="object-cover" />
                    </div>
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        Amara
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
                                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-3.946-4.654a.75.75 0 01.042 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06-.042z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </h2>
                    <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${msg.isMe
                                ? 'bg-rose-600 text-white rounded-br-none'
                                : 'bg-slate-700/50 text-slate-100 rounded-bl-none'
                                }`}>
                                {msg.text && <p>{msg.text}</p>}
                                {msg.image && (
                                    <div className="relative w-64 h-48 mt-2 rounded-lg overflow-hidden border border-white/10">
                                        <Image src={msg.image} alt="Sent image" fill className="object-cover" />
                                    </div>
                                )}
                                <p className={`text-[10px] mt-1 opacity-70 ${msg.isMe ? 'text-rose-200' : 'text-slate-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700/50 flex flex-col gap-2 relative">
                    {showGameMenu && (
                        <div className="absolute bottom-20 left-4 glass-panel p-2 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-4 duration-300 z-40">
                            <div className="flex flex-col gap-1 min-w-[160px]">
                                <button
                                    onClick={() => { setActiveGame('trivia'); setShowGameMenu(false); }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all text-sm font-medium text-slate-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rose-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                        </svg>
                                    </div>
                                    Tether Trivia
                                </button>
                                <button
                                    onClick={() => { setActiveGame('tictactoe'); setShowGameMenu(false); }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-500/10 hover:text-amber-400 transition-all text-sm font-medium text-slate-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    Tic-Tac-Toe
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSend} className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowGameMenu(!showGameMenu)}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${showGameMenu ? 'bg-rose-600 border-rose-500 shadow-lg shadow-rose-500/20' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${showGameMenu ? 'text-white' : 'text-slate-400'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={sendImage}
                            className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 focus:outline-none focus:border-rose-500 transition-colors text-white"
                        />
                        <button type="submit" className="btn-primary rounded-full w-12 h-12 flex items-center justify-center p-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Games Overlay */}
            {activeGame === 'trivia' && (
                <TriviaGame
                    onClose={() => setActiveGame(null)}
                    onComplete={(answers) => {
                        const gameMsg = {
                            id: `game-${Date.now()}`,
                            sender: 'You',
                            text: `🎮 I completed Tether Trivia! Answers: ${answers.slice(0, 2).join(', ')}...`,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            isMe: true,
                        };
                        setMessages([...messages, gameMsg]);
                    }}
                />
            )}
            {activeGame === 'tictactoe' && (
                <TicTacToe
                    onClose={() => setActiveGame(null)}
                    onComplete={(result) => {
                        const gameMsg = {
                            id: `game-${Date.now()}`,
                            sender: 'You',
                            text: `🎲 Played Tic-Tac-Toe: ${result}`,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            isMe: true,
                        };
                        setMessages([...messages, gameMsg]);
                    }}
                />
            )}
        </div>
    );
}
