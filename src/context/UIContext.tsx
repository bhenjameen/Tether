"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
    isSearchOpen: boolean;
    setIsSearchOpen: (open: boolean) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <UIContext.Provider value={{
            isSearchOpen,
            setIsSearchOpen,
            isMenuOpen,
            setIsMenuOpen
        }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
