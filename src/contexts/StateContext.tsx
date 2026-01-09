'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { World, getWorldById } from '@/data/worlds';

interface AppState {
    // World selection
    selectedWorldId: number;
    showDetail: boolean;
    selectWorld: (worldId: number) => void;
    closeDetail: () => void;

    // Media tabs
    mediaTab: 'videos' | 'photos' | 'flipbooks';
    setMediaTab: (tab: 'videos' | 'photos' | 'flipbooks') => void;

    // Articles tabs
    articlesTab: string;
    setArticlesTab: (tab: string) => void;

    // Calendar navigation
    calendarMonthOffset: number;
    prevCalendarMonth: () => void;
    nextCalendarMonth: () => void;
    resetCalendarMonth: () => void;

    // Flipbook viewer
    viewingFlipbook: boolean;
    currentFlipbookUrl: string;
    openFlipbook: (pdfUrl: string) => void;
    closeFlipbook: () => void;

    // ISKCON Kids Archive
    kidsSelectedCategory: string;
    selectKidsCategory: (category: string) => void;
    clearKidsCategory: () => void;

    // Photo gallery
    selectedPhoto: string;
    setSelectedPhoto: (url: string) => void;
    clearSelectedPhoto: () => void;
}

const StateContext = createContext<AppState | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
    // World selection state
    const [selectedWorldId, setSelectedWorldId] = useState(0);
    const [showDetail, setShowDetail] = useState(false);

    // Media tabs
    const [mediaTab, setMediaTab] = useState<'videos' | 'photos' | 'flipbooks'>('videos');

    // Articles tabs
    const [articlesTab, setArticlesTab] = useState('articles');

    // Calendar navigation
    const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);

    // Flipbook viewer
    const [viewingFlipbook, setViewingFlipbook] = useState(false);
    const [currentFlipbookUrl, setCurrentFlipbookUrl] = useState('');

    // ISKCON Kids Archive
    const [kidsSelectedCategory, setKidsSelectedCategory] = useState('');

    // Photo gallery
    const [selectedPhoto, setSelectedPhoto] = useState('');

    const value: AppState = {
        // World selection
        selectedWorldId,
        showDetail,
        selectWorld: (worldId: number) => {
            setSelectedWorldId(worldId);
            setShowDetail(true);
        },
        closeDetail: () => {
            setShowDetail(false);
            setSelectedWorldId(0);
        },

        // Media tabs
        mediaTab,
        setMediaTab,

        // Articles tabs
        articlesTab,
        setArticlesTab,

        // Calendar navigation
        calendarMonthOffset,
        prevCalendarMonth: () => setCalendarMonthOffset(prev => Math.max(prev - 1, -1)),
        nextCalendarMonth: () => setCalendarMonthOffset(prev => Math.min(prev + 1, 1)),
        resetCalendarMonth: () => setCalendarMonthOffset(0),

        // Flipbook viewer
        viewingFlipbook,
        currentFlipbookUrl,
        openFlipbook: (pdfUrl: string) => {
            setCurrentFlipbookUrl(pdfUrl);
            setViewingFlipbook(true);
        },
        closeFlipbook: () => {
            setViewingFlipbook(false);
            setCurrentFlipbookUrl('');
        },

        // ISKCON Kids Archive
        kidsSelectedCategory,
        selectKidsCategory: setKidsSelectedCategory,
        clearKidsCategory: () => setKidsSelectedCategory(''),

        // Photo gallery
        selectedPhoto,
        setSelectedPhoto,
        clearSelectedPhoto: () => setSelectedPhoto(''),
    };

    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a StateProvider');
    }
    return context;
}
