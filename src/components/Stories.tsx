"use client";
import React from 'react';
import Image from 'next/image';

const MOCK_STORIES = [
    { id: '1', name: 'Your Story', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80', isMe: true },
    { id: '2', name: 'Amara', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
    { id: '3', name: 'Sarah', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
    { id: '4', name: 'Jessica', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80' },
    { id: '5', name: 'Amina', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80' },
    { id: '6', name: 'Grace', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=200&q=80' },
    { id: '7', name: 'Ngozi', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80' },
    { id: '8', name: 'Chioma', image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=200&q=80' },
];

export default function Stories({ center = false }: { center?: boolean }) {
    return (
        <div className="w-full py-6">
            <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0 ${center ? 'md:justify-center' : ''}`}>
                {MOCK_STORIES.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                        <div className={`relative w-20 h-20 rounded-full p-1 ${story.isMe ? 'bg-slate-700' : 'bg-gradient-to-tr from-rose-500 to-amber-500'}`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-950">
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            {story.isMe && (
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center border-2 border-slate-950">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <span className={`text-xs font-medium truncate w-20 text-center ${story.isMe ? 'text-slate-400' : 'text-slate-100'}`}>
                            {story.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
