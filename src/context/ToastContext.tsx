"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 items-center pointer-events-none w-full max-w-md px-4">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className="pointer-events-auto animate-in fade-in slide-in-from-top-5 duration-300 w-full"
                >
                    <div className={`glass-panel px-5 py-3 flex items-center gap-3 border-l-4 shadow-2xl min-w-[300px] ${toast.type === 'success' ? 'border-l-green-500' :
                        toast.type === 'error' ? 'border-l-red-500' :
                            toast.type === 'warning' ? 'border-l-amber-500' :
                                'border-l-violet-500'
                        }`}>
                        <div className={`p-1.5 rounded-lg ${toast.type === 'success' ? 'bg-green-500/20 text-green-400' :
                            toast.type === 'error' ? 'bg-red-500/20 text-red-400' :
                                toast.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-violet-500/20 text-violet-400'
                            }`}>
                            {toast.type === 'warning' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            )}
                            {toast.type === 'success' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            )}
                            {(toast.type === 'info' || toast.type === 'error') && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <p className="text-sm font-medium text-slate-200">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-auto text-slate-500 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
