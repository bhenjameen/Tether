"use client";
import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

interface Profile {
    id: string;
    name: string;
    age: number;
    location: string;
    image: string;
    bio: string;
    isVerified?: boolean;
}

interface ProfileModalProps {
    profile: Profile | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileModal({ profile, isOpen, onClose }: ProfileModalProps) {
    const { isLoggedIn } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleProtectedAction = (action: () => void) => {
        if (!isLoggedIn) {
            showToast("Please log in to continue", "warning");
            router.push('/login');
            onClose(); // Close modal on redirect
            return;
        }
        action();
    };

    if (!isOpen || !profile) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg glass-panel overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-white/10 flex flex-col max-h-full">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-slate-900/80 rounded-full transition-colors text-white backdrop-blur-sm border border-white/10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto custom-scrollbar">
                    {/* Hero Image Section */}
                    <div className="relative aspect-[4/5] w-full">
                        <Image
                            src={profile.image}
                            alt={profile.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-4xl font-bold text-white tracking-tight">
                                    {profile.name}, {profile.age}
                                </h2>
                                {profile.isVerified && (
                                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                                            <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-3.946-4.654a.75.75 0 01.042 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06-.042z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <p className="text-rose-400 font-medium flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                {profile.location}
                            </p>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-8 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">About Me</h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {profile.bio}
                            </p>
                            <p className="text-slate-400 mt-4 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Interests</span>
                                <p className="text-white text-sm font-medium">Art, Coffee, Travel</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Education</span>
                                <p className="text-white text-sm font-medium">University Graduate</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                            <button className="py-3 bg-slate-900 border border-white/10 hover:bg-slate-800 rounded-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Pass
                            </button>
                            <button
                                onClick={() => handleProtectedAction(() => router.push('/messages'))}
                                className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rose-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.598.598 0 0 1-.474-.065.598.598 0 0 1-.25-.353 7.72 7.72 0 0 0 1.282-3.648C4.162 15.39 3 13.804 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                                Chat
                            </button>
                            <button
                                onClick={() => handleProtectedAction(() => router.push(`/profile/${profile.name.toLowerCase().replace(/ /g, '-')}`))}
                                className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                Profile
                            </button>
                            <button
                                onClick={() => handleProtectedAction(() => showToast("Liked!", "success"))}
                                className="py-3 btn-primary rounded-xl font-bold text-white shadow-lg shadow-rose-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                Like
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
