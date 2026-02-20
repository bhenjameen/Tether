"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import ProfileModal from '@/components/ProfileModal';

const MOCK_PROFILES = [
    { id: '1', name: 'Sarah', age: 24, location: 'Lagos, NG', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', bio: 'Art enthusiast, coffee lover.', isVerified: true },
    { id: '2', name: 'Michael', age: 28, location: 'Abuja, NG', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', bio: 'Tech entrepreneur.' },
    { id: '3', name: 'Amara', age: 23, location: 'Port Harcourt, NG', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80', bio: 'Fashion designer.', isVerified: true },
    { id: '4', name: 'David', age: 30, location: 'Lagos, NG', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', bio: 'Music producer.' },
    { id: '5', name: 'Zainab', age: 26, location: 'Kano, NG', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=80', bio: 'Medical student.' },
    { id: '6', name: 'Emmanuel', age: 29, location: 'Enugu, NG', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', bio: 'Architect.' },
    { id: '7', name: 'Ngozi', age: 25, location: 'Owerri', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80', bio: 'Model and entrepreneur.' },
    { id: '8', name: 'Tunde', age: 29, location: 'Ibadan', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', bio: 'Software engineer.' },
    { id: '9', name: 'Fatima', age: 24, location: 'Sokoto', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80', bio: 'Artist painting my own path.' },
    { id: '10', name: 'Samuel', age: 32, location: 'Lagos', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&q=80', bio: 'Businessman.' },
    { id: '11', name: 'Grace', age: 23, location: 'Benin City', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&q=80', bio: 'Nurse.', isVerified: true },
    { id: '12', name: 'Alex', age: 28, location: 'Jos', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80', bio: 'Adventure seeker.' },
    { id: '13', name: 'Chioma', age: 25, location: 'Asaba', gender: 'female', hasPhoto: false, image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=200&q=80', bio: 'Dancer.' },
    { id: '14', name: 'Michael', age: 27, location: 'Calabar', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80', bio: 'Writer.' },
    { id: '15', name: 'Jessica', age: 24, location: 'Lagos', gender: 'female', hasPhoto: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', bio: 'Love traveling.' },
    { id: '16', name: 'Emeka', age: 28, location: 'Enugu', gender: 'male', hasPhoto: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', bio: 'Architect.' },
];

const ITEMS_PER_PAGE = 8;
const LOCATIONS = ['All Locations', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Enugu', 'Ibadan'];
const AGE_RANGES = [
    { label: 'All Ages', min: 0, max: 150 },
    { label: '18 - 35', min: 18, max: 35 },
    { label: '36 - 50', min: 36, max: 50 },
    { label: '51+', min: 51, max: 150 }
];

function SearchPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('default');
    const [filterVerified, setFilterVerified] = useState(false);
    const [filterLocation, setFilterLocation] = useState('All Locations');
    const [filterAgeRange, setFilterAgeRange] = useState(AGE_RANGES[0]);
    const [filterGender, setFilterGender] = useState('all');
    const [filterPhotoOnly, setFilterPhotoOnly] = useState(false);

    const [showSort, setShowSort] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<any>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // Handle clicking outside of dropdowns
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setShowSort(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sync state with URL Search Params
    useEffect(() => {
        const loc = searchParams.get('location');
        const age = searchParams.get('age');
        const gender = searchParams.get('gender');
        const photo = searchParams.get('photo');

        if (loc) setFilterLocation(loc);
        else setFilterLocation('All Locations');

        if (age) {
            const range = AGE_RANGES.find(r => r.label === age);
            if (range) setFilterAgeRange(range);
        } else {
            setFilterAgeRange(AGE_RANGES[0]);
        }

        if (gender) setFilterGender(gender);
        else setFilterGender('all');

        setFilterPhotoOnly(photo === 'true');
    }, [searchParams]);

    // Derived Data: Filtered and Sorted Profiles
    const processedProfiles = useMemo(() => {
        let results = [...MOCK_PROFILES];

        if (filterVerified) results = results.filter(p => p.isVerified);
        if (filterLocation !== 'All Locations') results = results.filter(p => p.location.includes(filterLocation));
        if (filterAgeRange.label !== 'All Ages') {
            results = results.filter(p => p.age >= filterAgeRange.min && p.age <= filterAgeRange.max);
        }
        if (filterGender !== 'all') results = results.filter(p => p.gender === filterGender);
        if (filterPhotoOnly) results = results.filter(p => p.hasPhoto);

        switch (sortBy) {
            case 'age-asc': results.sort((a, b) => a.age - b.age); break;
            case 'age-desc': results.sort((a, b) => b.age - a.age); break;
            case 'name-asc': results.sort((a, b) => a.name.localeCompare(b.name)); break;
            default: break;
        }

        return results;
    }, [sortBy, filterVerified, filterLocation, filterAgeRange, filterGender, filterPhotoOnly]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterVerified, filterLocation, filterAgeRange, filterGender, filterPhotoOnly, sortBy]);

    const totalPages = Math.ceil(processedProfiles.length / ITEMS_PER_PAGE);
    const currentProfiles = processedProfiles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (!value || value === 'all' || value === 'All Locations' || value === 'All Ages' || value === 'false') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/search?${params.toString()}`);
    };

    return (
        <main className="min-h-screen bg-slate-950 pb-20">
            <Navbar />
            <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">Search Results</h1>
                        <p className="text-slate-400 mt-2">Showing {processedProfiles.length} matches based on your filters</p>
                    </div>

                    <div className="flex gap-3 relative" ref={sortRef}>
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className={`px-5 py-2.5 rounded-xl border border-white/10 transition-all text-sm font-medium flex items-center gap-2 ${showSort ? 'bg-white/10 border-violet-500/50' : 'hover:bg-white/5'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                            Sort
                        </button>
                        {showSort && (
                            <div className="absolute right-0 top-full mt-2 w-48 glass-panel p-2 z-50 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                                {[
                                    { label: 'Default', value: 'default' },
                                    { label: 'Age: Youngest', value: 'age-asc' },
                                    { label: 'Age: Oldest', value: 'age-desc' },
                                    { label: 'Name: A-Z', value: 'name-asc' }
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortBy === opt.value ? 'bg-violet-600/20 text-violet-300' : 'hover:bg-white/5 text-slate-400'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Filter Bar */}
                <div className="mb-10 p-5 glass-panel border-violet-500/10 bg-violet-500/5 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-wrap gap-8 items-center">
                        <div className="flex flex-col gap-1.5 min-w-[120px]">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Location</span>
                            <select
                                value={filterLocation}
                                onChange={(e) => updateParams('location', e.target.value)}
                                className="bg-transparent border-none text-sm font-medium text-white focus:ring-0 p-0 cursor-pointer hover:text-violet-400 transition-colors"
                            >
                                {LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-slate-900">{loc}</option>)}
                            </select>
                        </div>

                        <div className="w-px h-8 bg-white/10 hidden lg:block" />

                        <div className="flex flex-col gap-1.5 min-w-[100px]">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Age Range</span>
                            <select
                                value={filterAgeRange.label}
                                onChange={(e) => updateParams('age', e.target.value)}
                                className="bg-transparent border-none text-sm font-medium text-white focus:ring-0 p-0 cursor-pointer hover:text-violet-400 transition-colors"
                            >
                                {AGE_RANGES.map(range => <option key={range.label} value={range.label} className="bg-slate-900">{range.label}</option>)}
                            </select>
                        </div>

                        <div className="w-px h-8 bg-white/10 hidden lg:block" />

                        <div className="flex flex-col gap-1.5 min-w-[100px]">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Looking For</span>
                            <select
                                value={filterGender}
                                onChange={(e) => updateParams('gender', e.target.value)}
                                className="bg-transparent border-none text-sm font-medium text-white focus:ring-0 p-0 cursor-pointer hover:text-violet-400 transition-colors capitalize"
                            >
                                {['all', 'male', 'female'].map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                            </select>
                        </div>

                        <div className="w-px h-8 bg-white/10 hidden lg:block" />

                        <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Media</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-[11px] font-medium transition-colors ${filterPhotoOnly ? 'text-slate-500' : 'text-white'}`}>All</span>
                                <button
                                    onClick={() => updateParams('photo', (!filterPhotoOnly).toString())}
                                    className={`w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${filterPhotoOnly ? 'bg-violet-600' : 'bg-slate-700'}`}
                                >
                                    <div className={`w-3 h-3 bg-white rounded-full transition-all shadow-sm ${filterPhotoOnly ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>
                                <span className={`text-[11px] font-medium transition-colors ${filterPhotoOnly ? 'text-white' : 'text-slate-500'}`}>With Photo</span>
                            </div>
                        </div>
                    </div>
                </div>

                {currentProfiles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                        {currentProfiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                profile={{
                                    ...profile,
                                    onClick: () => setSelectedProfile(profile)
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center glass-panel border-dashed">
                        <p className="text-slate-400">No results found for your search.</p>
                        <button
                            onClick={() => router.push('/search')}
                            className="text-violet-400 mt-4 hover:underline text-sm font-bold"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-20 flex items-center justify-center gap-8 border-t border-white/5 pt-8">
                        <button
                            onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); scrollToTop(); }}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 transition-all font-medium text-sm ${currentPage === 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'hover:bg-white/5 text-slate-200 active:scale-95'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            Previous
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Page</span>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                <span className="text-sm font-bold text-violet-400">{currentPage}</span>
                                <span className="text-xs text-slate-500">/</span>
                                <span className="text-sm font-bold text-slate-300">{totalPages}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); scrollToTop(); }}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 transition-all font-medium text-sm ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed text-slate-500' : 'hover:bg-white/5 text-slate-200 active:scale-95'}`}
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <ProfileModal
                profile={selectedProfile}
                isOpen={!!selectedProfile}
                onClose={() => setSelectedProfile(null)}
            />
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}
