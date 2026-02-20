"use client";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

interface ProfileProps {
    id: string;
    name: string;
    age: number;
    location: string;
    image: string;
    bio: string;
    isVerified?: boolean;
    onClick?: () => void;
}

export default function ProfileCard({ profile }: { profile: ProfileProps }) {
    const { isLoggedIn } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleProtectedAction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        if (!isLoggedIn) {
            showToast("Please log in to continue", "warning");
            router.push('/login');
            return;
        }
        action();
    };

    return (
        <div
            onClick={profile.onClick}
            className={`group glass-panel overflow-hidden w-full transition-transform duration-300 ${profile.onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : ''}`}
        >
            <div className="relative aspect-square w-full">
                <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-1.5 text-white">
                        {profile.name}
                        {profile.isVerified && (
                            <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-3.946-4.654a.75.75 0 01.042 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06-.042z" clipRule="evenodd" />
                                </svg>
                            </span>
                        )}
                        <span className="text-lg font-normal text-slate-300">, {profile.age}</span>
                    </h3>
                    <p className="text-violet-300 text-xs mb-1.5 font-medium">{profile.location}</p>

                    {/* Bio Highlight on Hover */}
                    <p className="text-slate-300 text-[11px] line-clamp-1 mb-4 leading-relaxed transition-all duration-300 group-hover:text-white group-hover:font-medium group-hover:scale-105 origin-left">
                        {profile.bio}
                    </p>

                    <div className="grid grid-cols-4 gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all border border-white/5 group/btn active:scale-90" title="Pass">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-slate-400 group-hover/btn:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleProtectedAction(e, () => router.push('/messages'))}
                            className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all border border-white/10 group/btn active:scale-90" title="Chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-violet-400 group-hover/btn:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleProtectedAction(e, () => router.push(`/profile/${profile.name.toLowerCase().replace(/ /g, '-')}`))}
                            className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all border border-white/10 group/btn active:scale-90" title="Profile"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-pink-400 group-hover/btn:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleProtectedAction(e, () => showToast("Liked!", "success"))}
                            className="flex flex-col items-center justify-center btn-primary p-2 rounded-xl transition-all active:scale-90 shadow-lg shadow-violet-500/20" title="Like"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
