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

export default function RegisterPage() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isRegistering, setIsRegistering] = useState(false);
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
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setShouldShake(true);
            setTimeout(() => setShouldShake(false), 500);
            return;
        }

        setIsRegistering(true);
        setError(null);
        setShouldShake(false);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/login?registered=true');
            } else {
                setError(data.error || 'Registration failed');
                setIsRegistering(false);
                setShouldShake(true);
                setTimeout(() => setShouldShake(false), 500);
            }
        } catch (err) {
            setError('Something went wrong');
            setIsRegistering(false);
            setShouldShake(true);
            setTimeout(() => setShouldShake(false), 500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Don't render the page if already logged in
    if (isLoggedIn) return null;

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col relative">
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row pt-20 lg:pt-32">
                {/* Left Side: Community Showcase (65%) */}
                <div className="hidden lg:flex lg:w-[65%] flex-col px-8 py-12 border-r border-white/5 bg-slate-900/10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-1">Join the Spark</h2>
                        <p className="text-slate-400">Find your best match today in our growing community.</p>
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
                <div className="w-full lg:w-[35%] p-4 sm:p-6 lg:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] lg:min-h-0">
                    {/* Centered Wrapper for Desktop */}
                    <div className="relative w-full lg:fixed lg:top-0 lg:right-0 lg:w-[35%] lg:h-screen lg:px-8 lg:pt-20 flex flex-col items-center justify-center px-6">
                        <div className={`w-full max-w-[420px] lg:max-w-[380px] glass-panel p-8 lg:p-6 shadow-2xl border border-white/10 transition-all duration-300 ${shouldShake ? 'animate-shake border-rose-500/50 shadow-rose-500/10' : ''} ${error ? 'scale-[1.02]' : 'scale-100'}`}>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400 mb-2">
                                    Join Community
                                </h1>
                                <p className="text-base lg:text-sm text-slate-400">Create your free account today</p>
                            </div>

                            {error && (
                                <div className="mb-6 px-4 py-3 bg-rose-500/10 backdrop-blur-md border border-rose-500/20 rounded-2xl text-xs lg:text-[11px] text-rose-300 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-rose-400">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="leading-tight font-medium">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-5">
                                    <div>
                                        <label className="block text-sm lg:text-xs font-medium text-slate-300 mb-2">Full Name</label>
                                        <input
                                            name="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 lg:py-2.5 text-base lg:text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 outline-none text-white"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm lg:text-xs font-medium text-slate-300 mb-2">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 lg:py-2.5 text-base lg:text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 outline-none text-white"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-4">
                                    <div>
                                        <label className="block text-sm lg:text-xs font-medium text-slate-300 mb-2">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 lg:py-2.5 text-base lg:text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 outline-none text-white"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm lg:text-xs font-medium text-slate-300 mb-2">Confirm</label>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 lg:py-2.5 text-base lg:text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 outline-none text-white"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 py-1">
                                    <input type="checkbox" id="terms" className="w-5 h-5 lg:w-4 lg:h-4 rounded border-slate-700 bg-slate-900 text-rose-600 focus:ring-rose-500" required />
                                    <label htmlFor="terms" className="text-sm lg:text-xs text-slate-400">
                                        I agree to the <Link href="#" className="underline">Terms & Conditions</Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isRegistering}
                                    className="w-full btn-primary py-4 lg:py-3 font-bold text-base lg:text-sm mt-4 disabled:opacity-50"
                                >
                                    {isRegistering ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </form>

                            <p className="mt-8 lg:mt-6 text-center text-slate-400 text-base lg:text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="text-rose-400 hover:text-rose-300 font-bold">
                                    Sign In
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
