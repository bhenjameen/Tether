"use client";
import React, { useState, useEffect } from 'react';

export default function RegistrationAlert() {
    const [alert, setAlert] = useState<{ name: string; visible: boolean }>({ name: '', visible: false });
    const [profiles, setProfiles] = useState<any[]>([]);

    const closeAlert = () => setAlert(prev => ({ ...prev, visible: false }));

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/profiles');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProfiles(data);
                }
            } catch (error) {
                console.error('Failed to fetch profiles for alerts');
            }
        };
        fetchProfiles();
    }, []);

    useEffect(() => {
        if (profiles.length === 0) return;

        const triggerAlert = () => {
            const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
            setAlert({ name: randomProfile.name.split(' ')[0], visible: true });

            setTimeout(() => {
                setAlert(prev => ({ ...prev, visible: false }));
            }, 5000);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.4) {
                triggerAlert();
            }
        }, 12000);

        // Initial alert after a delay
        const initialTimer = setTimeout(triggerAlert, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(initialTimer);
        };
    }, [profiles]);

    if (!alert.visible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="glass-panel px-4 py-3 flex items-center gap-3 border-l-4 border-l-rose-500 shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={closeAlert}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>

                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    {alert.name[0]}
                </div>
                <div className="pr-2">
                    <p className="text-xs font-bold text-white">{alert.name} just registered!</p>
                    <p className="text-[10px] text-slate-400">Join the sparkles ✨</p>
                </div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </div>
        </div>
    );
}
