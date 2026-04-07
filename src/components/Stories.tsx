"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Stories({ center = false }: { center?: boolean }) {
    const { data: session } = useSession();
    const [stories, setStories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('/api/profiles');
                const data = await response.json();
                if (Array.isArray(data)) {
                    // Just take a few for the stories bar
                    setStories(data.slice(0, 10));
                }
            } catch (error) {
                console.error('Failed to fetch stories');
            } finally {
                setIsLoading(false);
            }
        };
        fetchStories();
    }, []);

    const allStories = [
        { 
          id: 'me', 
          name: 'Your Story', 
          image: session?.user?.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80', 
          isMe: true 
        },
        ...stories.filter(s => s.id !== session?.user?.id).map(s => ({
            id: s.id,
            name: s.name.split(' ')[0],
            image: s.image,
            isMe: false
        }))
    ];

    if (isLoading) {
        return (
            <div className="w-full py-6 flex gap-4 overflow-x-auto px-4 md:px-0">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-20 h-20 rounded-full bg-white/5 animate-pulse shrink-0" />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full py-6">
            <div className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0 ${center ? 'md:justify-center' : ''}`}>
                {allStories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                        <div className={`relative w-20 h-20 rounded-full p-1 ${story.isMe ? 'bg-slate-700' : 'bg-gradient-to-tr from-rose-500 to-amber-500'}`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
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
