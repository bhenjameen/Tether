"use client";
import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function StatusCreator() {
    const [statusText, setStatusText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const { showToast } = useToast();

    const handlePostStatus = () => {
        if (!statusText.trim()) {
            showToast('Please write something', 'warning');
            return;
        }
        showToast('Posted successfully!', 'success');
        setStatusText('');
        setIsExpanded(false);
    };

    const handleImageUpload = () => {
        showToast('Image upload coming soon!', 'info');
    };

    return (
        <div className="relative group">
            {/* Main Card with Gradient Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-pink-500/5"></div>

                <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-violet-500/20">
                            ME
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white">Share your moment</h3>
                            <p className="text-xs text-slate-400">What's happening in your world?</p>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="relative">
                        <textarea
                            value={statusText}
                            onChange={(e) => setStatusText(e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                            placeholder="Share your thoughts, feelings, or what you're up to..."
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-slate-100 placeholder:text-slate-500"
                            rows={isExpanded ? 4 : 2}
                        />

                        {/* Character Count */}
                        {statusText.length > 0 && (
                            <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                                {statusText.length}/500
                            </div>
                        )}
                    </div>

                    {/* Action Buttons - Show when expanded or has text */}
                    {(isExpanded || statusText.length > 0) && (
                        <div className="mt-4 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Quick Actions */}
                            <div className="flex-1 flex gap-2">
                                <button
                                    onClick={handleImageUpload}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all text-sm font-medium group/btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-violet-400 group-hover/btn:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <span className="hidden sm:inline">Photo</span>
                                </button>

                                <button
                                    onClick={handleImageUpload}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-sm font-medium group/btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-pink-400 group-hover/btn:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                    <span className="hidden sm:inline">Mood</span>
                                </button>
                            </div>

                            {/* Post Button */}
                            <button
                                onClick={handlePostStatus}
                                disabled={!statusText.trim()}
                                className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold shadow-lg hover:shadow-violet-500/50 transition-all disabled:shadow-none transform hover:scale-105 disabled:scale-100"
                            >
                                Post
                            </button>
                        </div>
                    )}

                    {/* Story Prompt - Show when not expanded */}
                    {!isExpanded && statusText.length === 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all text-sm font-medium group/story"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-violet-400 group-hover/story:scale-110 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                                    Create a Story
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
