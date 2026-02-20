"use client";
import ProfileCard from './ProfileCard';
import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

const FEATURED_PROFILES = [
    { id: '101', name: 'Jessica', age: 24, location: 'Lagos', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', bio: 'Love traveling and trying new food.', isVerified: true },
    { id: '102', name: 'David', age: 29, location: 'Abuja', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', bio: 'Tech enthusiast and gym rat.' },
    { id: '103', name: 'Amina', age: 25, location: 'Kano', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80', bio: 'Fashion designer looking for inspiration.', isVerified: true },
    { id: '104', name: 'James', age: 31, location: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', bio: 'Music producer. Let’s vibe.' },
    { id: '105', name: 'Zainab', age: 22, location: 'Kaduna', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=80', bio: 'Student and bookworm.' },
    { id: '106', name: 'Emeka', age: 28, location: 'Enugu', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', bio: 'Architect building dreams.' },
    { id: '107', name: 'Sarah', age: 26, location: 'Lagos', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80', bio: 'Photographer seeing the world.', isVerified: true },
    { id: '108', name: 'Daniel', age: 30, location: 'Abuja', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&q=80', bio: 'Chef who loves to cook for two.' },
    { id: '109', name: 'Ngozi', age: 27, location: 'Owerri', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80', bio: 'Model and entrepreneur.' },
    { id: '110', name: 'Tunde', age: 29, location: 'Ibadan', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', bio: 'Software engineer. Code and coffee.' },
    { id: '111', name: 'Fatima', age: 24, location: 'Sokoto', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80', bio: 'Artist painting my own path.' },
    { id: '112', name: 'Samuel', age: 32, location: 'Lagos', image: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&q=80', bio: 'Businessman. ambition is key.' },
    { id: '113', name: 'Grace', age: 23, location: 'Benin City', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&q=80', bio: 'Nurse with a caring heart.' },
    { id: '114', name: 'Alex', age: 28, location: 'Jos', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80', bio: 'Adventure seeker. Hike with me.' },
    { id: '115', name: 'Chioma', age: 25, location: 'Asaba', image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&q=80', bio: 'Dancer expressing life through movement.' },
    { id: '116', name: 'Michael', age: 27, location: 'Calabar', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&q=80', bio: 'Writer telling stories.' },
];

export default function FeaturedProfiles() {
    const [selectedProfile, setSelectedProfile] = useState<any>(null);

    return (
        <section className="pt-10 pb-20 px-8 w-full max-w-[1800px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                        Active Singles
                    </span> Near You
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Join thousands of people looking for their perfect connection.
                    Here are just a few of the people online right now.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4 xl:px-20 place-items-center">
                {FEATURED_PROFILES.map((profile) => (
                    <ProfileCard
                        key={profile.id}
                        profile={{
                            ...profile,
                            onClick: () => setSelectedProfile(profile)
                        }}
                    />
                ))}
            </div>

            <ProfileModal
                profile={selectedProfile}
                isOpen={!!selectedProfile}
                onClose={() => setSelectedProfile(null)}
            />
        </section>
    );
}
