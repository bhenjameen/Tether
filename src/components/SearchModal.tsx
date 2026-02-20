"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LOCATIONS = ['All Locations', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Enugu', 'Ibadan'];
const AGE_RANGES = ['All Ages', '18 - 35', '36 - 50', '51+'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const router = useRouter();
    const [location, setLocation] = useState('All Locations');
    const [ageRange, setAgeRange] = useState('All Ages');
    const [gender, setGender] = useState('all');
    const [photoOnly, setPhotoOnly] = useState(false);

    if (!isOpen) return null;

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location !== 'All Locations') params.set('location', location);
        if (ageRange !== 'All Ages') params.set('age', ageRange);
        if (gender !== 'all') params.set('gender', gender);
        if (photoOnly) params.set('photo', 'true');

        router.push(`/search?${params.toString()}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm glass-panel p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Search Filters</h2>
                    <button onClick={onClose} className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Location */}
                    <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Location</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-violet-500 transition-colors text-slate-300"
                        >
                            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>

                    {/* Age Range */}
                    <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Age Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            {AGE_RANGES.map(range => (
                                <button
                                    key={range}
                                    onClick={() => setAgeRange(range)}
                                    className={`px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all ${ageRange === range
                                        ? 'bg-violet-600/20 border-violet-500/50 text-violet-300'
                                        : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-white/5'}`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Looking For</label>
                        <div className="flex gap-2">
                            {['all', 'male', 'female'].map(g => (
                                <button
                                    key={g}
                                    onClick={() => setGender(g)}
                                    className={`flex-1 py-1.5 rounded-xl text-[11px] font-medium border transition-all capitalize ${gender === g
                                        ? 'bg-violet-600/20 border-violet-500/50 text-violet-300'
                                        : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-white/5'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Photo Toggle */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div>
                            <span className="text-xs font-medium text-slate-300 block">Profiles with photo</span>
                            <span className="text-[9px] text-slate-500">Only show users with media</span>
                        </div>
                        <button
                            onClick={() => setPhotoOnly(!photoOnly)}
                            className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-1 ${photoOnly ? 'bg-violet-600' : 'bg-slate-700'}`}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full transition-all shadow-sm ${photoOnly ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-bold text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm mt-2"
                    >
                        Search Profiles
                    </button>
                </div>
            </div>
        </div>
    );
}
