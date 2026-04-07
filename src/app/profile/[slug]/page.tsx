"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import ProfileCard from '@/components/ProfileCard';
import ProfileModal from '@/components/ProfileModal';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const { showToast } = useToast();
    const id = params?.slug as string;
    
    const [profile, setProfile] = useState<any>(null);
    const [relatedProfiles, setRelatedProfiles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRelatedProfile, setSelectedRelatedProfile] = useState<any>(null);

    // Initial Fetch
    useEffect(() => {
        if (id) {
            fetchProfile();
            fetchRelatedProfiles();
        }
    }, [id]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/profiles/${id}`);
            const data = await response.json();
            if (data.id) {
                setProfile(data);
            }
        } catch (error) {
            console.error('Failed to fetch profile');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRelatedProfiles = async () => {
        try {
            const response = await fetch('/api/profiles');
            const data = await response.json();
            if (Array.isArray(data)) {
                setRelatedProfiles(data.filter((p: any) => p.id !== id).slice(0, 4));
            }
        } catch (error) {
            console.error('Failed to fetch related profiles');
        }
    };

    const handleProtectedAction = (action: () => void) => {
        if (status === 'unauthenticated') {
            showToast("Please log in to continue", "warning");
            router.push('/login');
            return;
        }
        action();
    };

    if (isLoading || status === 'loading') {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Profile...</div>;
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-2xl font-bold">Profile not found</h1>
                <button onClick={() => router.push('/discover')} className="text-rose-400 hover:underline">Back to Discover</button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 pb-24">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
                        {/* Profile Image Container */}
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel border-white/10 shadow-2xl">
                            <Image
                                src={profile.image}
                                alt={profile.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Profile Details Container */}
                        <div className="space-y-10">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <h1 className="text-5xl font-bold text-white tracking-tight">
                                        {profile.name}, {profile.age}
                                    </h1>
                                    {profile.isVerified && (
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-rose-500 rounded-full shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                                                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-3.946-4.654a.75.75 0 01.042 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06-.042z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-rose-400 font-medium text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    {profile.location}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">About</h3>
                                <p className="text-slate-300 text-xl leading-relaxed">
                                    {profile.bio}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Looking for</span>
                                    <p className="text-white text-lg font-semibold">Serious Relationship</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Education</span>
                                    <p className="text-white text-lg font-semibold">Post Graduate</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Language</span>
                                    <p className="text-white text-lg font-semibold">English, Yoruba</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Zodiac</span>
                                    <p className="text-white text-lg font-semibold">Scorpio</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-4 pt-6">
                                <button className="py-5 bg-slate-900 border border-white/10 hover:bg-slate-800 rounded-2xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-base md:text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-slate-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="hidden sm:inline">Pass</span>
                                </button>
                                <button
                                    onClick={() => handleProtectedAction(() => router.push('/messages'))}
                                    className="py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-base md:text-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-rose-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <span className="hidden sm:inline">Chat</span>
                                </button>
                                <button
                                    onClick={() => handleProtectedAction(() => showToast("Liked!", "success"))}
                                    className="py-5 btn-primary rounded-2xl font-bold text-white shadow-xl shadow-rose-500/20 active:scale-95 flex items-center justify-center gap-2 text-base md:text-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    <span className="hidden sm:inline">Like</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Profiles Section */}
                    <div className="mt-24 pt-12 border-t border-white/10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">You May Also Like</h2>
                            <p className="text-slate-400 text-base">Explore more profiles that might be your perfect match.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
                            {relatedProfiles.map((p) => (
                                <ProfileCard
                                    key={p.id}
                                    profile={{
                                        ...p,
                                        onClick: () => setSelectedRelatedProfile(p)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ProfileModal
                profile={selectedRelatedProfile}
                isOpen={!!selectedRelatedProfile}
                onClose={() => setSelectedRelatedProfile(null)}
            />
        </main>
    );
}
