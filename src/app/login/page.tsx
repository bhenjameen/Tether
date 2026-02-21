"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Stories from '@/components/Stories';
import ProfileCard from '@/components/ProfileCard';
import RegistrationAlert from '@/components/RegistrationAlert';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const BACKGROUND_PROFILES = [
    { id: 'b1', name: 'Sarah', age: 24, location: 'Lagos', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', bio: 'Art enthusiast.', isVerified: true },
    { id: 'b2', name: 'Michael', age: 28, location: 'Abuja', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', bio: 'Tech entrepreneur.' },
    { id: 'b3', name: 'Amara', age: 23, location: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80', bio: 'Fashion designer.', isVerified: true },
    { id: 'b4', name: 'James', age: 31, location: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', bio: 'Music producer.' },
    { id: 'b5', name: 'Zainab', age: 26, location: 'Kano', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=80', bio: 'Medical student.' },
    { id: 'b6', name: 'Emmanuel', age: 29, location: 'Enugu', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', bio: 'Architect.' },
    { id: 'b7', name: 'Ngozi', age: 25, location: 'Owerri', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80', bio: 'Model.' },
    { id: 'b8', name: 'Tunde', age: 29, location: 'Ibadan', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', bio: 'Software engineer.' },
    { id: 'b9', name: 'Fatima', age: 24, location: 'Sokoto', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80', bio: 'Artist.' },
    { id: 'b10', name: 'Samuel', age: 32, location: 'Lagos', image: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&q=80', bio: 'Businessman.' },
    { id: 'b11', name: 'Grace', age: 23, location: 'Benin City', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&q=80', bio: 'Nurse.', isVerified: true },
    { id: 'b12', name: 'Alex', age: 28, location: 'Jos', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80', bio: 'Adventure seeker.' },
];

export default function LoginPage() {
    const { login, isLoggedIn } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [shouldShake, setShouldShake] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError(null);
        setShouldShake(false);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                router.push('/discover');
            } else {
                setError(data.error || 'Login failed. Please try again.');
                setIsLoggingIn(false);
                setShouldShake(true);
                // Reset shake after animation completes
                setTimeout(() => setShouldShake(false), 500);
            }
        } catch (err) {
            setError('Something went wrong. Please check your connection.');
            setIsLoggingIn(false);
            setShouldShake(true);
            setTimeout(() => setShouldShake(false), 500);
        }
    };

    // Don't render the page if already logged in
    if (isLoggedIn) return null;

    return (
        <main className={`min-h-screen bg-slate-950 flex flex-col relative transition-opacity duration-500 ${isLoggingIn ? 'opacity-50' : 'opacity-100'}`}>
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row pt-32">
                {/* Left Side: Community Showcase (65%) */}
                <div className="lg:w-[65%] flex flex-col px-8 py-12 border-r border-white/5 bg-slate-900/10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-1">Happening Now</h2>
                        <p className="text-slate-400">Join thousands of people finding connections today.</p>
                    </div>

                    <div className="mb-10">
                        <Stories center={false} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BACKGROUND_PROFILES.map(p => (
                            <div key={p.id} className="opacity-80 hover:opacity-100 transition-opacity">
                                <ProfileCard profile={p} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Static/Fixed Auth Pane (35%) */}
                <div className="lg:w-[35%] p-4 lg:p-6 flex flex-col">
                    {/* Centered Wrapper for Desktop */}
                    <div className="lg:fixed lg:top-0 lg:right-0 lg:w-[35%] lg:h-screen lg:px-8 lg:pt-20 flex flex-col items-center justify-center">
                        <div className={`w-full max-w-[360px] glass-panel p-4 shadow-2xl border border-white/10 transition-all duration-300 ${shouldShake ? 'animate-shake border-rose-500/50 shadow-rose-500/10' : ''} ${error ? 'scale-[1.02]' : 'scale-100'}`}>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400 mb-1.5">
                                    Welcome Back
                                </h1>
                                <p className="text-sm text-slate-400">Sign in to your account</p>
                            </div>

                            {error && (
                                <div className="mb-6 px-4 py-3 bg-rose-500/10 backdrop-blur-md border border-rose-500/20 rounded-2xl text-[11px] text-rose-300 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-rose-400">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="leading-tight font-medium">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 outline-none text-white"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="block text-xs font-medium text-slate-300">Password</label>
                                        <Link href="#" className="text-[11px] text-rose-400 hover:text-rose-300">
                                            Forgot?
                                        </Link>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 outline-none text-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full btn-primary py-3 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoggingIn ? 'Signing In...' : 'Sign In'}
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-slate-500 text-[10px] mb-4 uppercase tracking-widest">Or continue with</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 bg-white/5 border border-slate-700 hover:bg-white/10 py-2 rounded-xl transition-colors text-xs text-slate-300">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Google
                                    </button>
                                    <button className="flex items-center justify-center gap-2 bg-white/5 border border-slate-700 hover:bg-white/10 py-2 rounded-xl transition-colors text-xs text-slate-300">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        Facebook
                                    </button>
                                </div>
                            </div>

                            <p className="mt-6 text-center text-slate-400 text-sm">
                                New here?{' '}
                                <Link href="/register" className="text-rose-400 hover:text-rose-300 font-bold">
                                    Join Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <RegistrationAlert />
        </main>
    );
}
