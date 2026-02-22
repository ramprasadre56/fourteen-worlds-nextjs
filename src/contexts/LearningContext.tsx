'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getDbInstance } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// ─── Types ───────────────────────────────────────────────
export interface LessonProgress {
    completed: boolean;
    completedAt?: string;
}

export interface CourseProgress {
    slug: string;
    enrolledAt: string;
    lastAccessedAt: string;
    lastLessonIndex: number;
    lessons: Record<number, LessonProgress>;
    totalLessons: number;
}

interface LearningContextType {
    enrolledCourses: Record<string, CourseProgress>;
    enrollInCourse: (slug: string, totalLessons: number) => void;
    unenrollFromCourse: (slug: string) => void;
    isEnrolled: (slug: string) => boolean;
    markLessonComplete: (slug: string, lessonIndex: number) => void;
    markLessonIncomplete: (slug: string, lessonIndex: number) => void;
    setLastLesson: (slug: string, lessonIndex: number) => void;
    getProgress: (slug: string) => CourseProgress | undefined;
    getProgressPercent: (slug: string) => number;
    getCompletedCount: (slug: string) => number;
    getEnrolledList: () => CourseProgress[];
    getInProgressList: () => CourseProgress[];
    getCompletedList: () => CourseProgress[];
}

const STORAGE_KEY = 'fourteen-worlds-learning-progress';

const LearningContext = createContext<LearningContextType>({} as LearningContextType);

// ─── Provider ────────────────────────────────────────────
export function LearningProvider({ children }: { children: React.ReactNode }) {
    const { user, loading: authLoading } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState<Record<string, CourseProgress>>({});
    const [loaded, setLoaded] = useState(false);

    // Use a ref to prevent infinite loops when syncing from remote to local state
    const isSyncingFromRemote = useRef(false);

    // Initial Load - from localStorage first (for speed), then Firestore if logged in
    useEffect(() => {
        const loadInitialData = async () => {
            // Load local storage first
            if (typeof window !== 'undefined') {
                try {
                    const stored = localStorage.getItem(STORAGE_KEY);
                    if (stored) {
                        setEnrolledCourses(JSON.parse(stored));
                    }
                } catch (e) {
                    console.warn('Failed to load local learning progress:', e);
                }
            }

            // If user is logged in, overwrite/merge with Firestore data
            if (user && !authLoading) {
                try {
                    const db = await getDbInstance();
                    if (db) {
                        const userRef = doc(db, 'users', user.uid);
                        const docSnap = await getDoc(userRef);
                        
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            if (data.learningProgress) {
                                isSyncingFromRemote.current = true;
                                
                                // Simple merge: remote overwrites local
                                setEnrolledCourses(prev => {
                                    const merged = { ...prev, ...data.learningProgress };
                                    // Save the merged data back to local storage
                                    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                                    return merged;
                                });
                            }
                        }
                    }
                } catch (e) {
                    console.error('Failed to sync learning progress from Firestore:', e);
                }
            }
            
            setLoaded(true);
        };

        loadInitialData();
    }, [user, authLoading]);

    // Save to LocalStorage & Firestore when state changes
    useEffect(() => {
        if (!loaded) return;

        // Skip writing back to Firestore immediately if we just updated from remote
        if (isSyncingFromRemote.current) {
            isSyncingFromRemote.current = false;
            return;
        }

        // Always save to localStorage
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolledCourses));
        } catch (e) {
            console.warn('Failed to save learning progress to local storage:', e);
        }

        // If user is logged in, save to Firestore
        if (user && !authLoading) {
            const saveToFirestore = async () => {
                try {
                    const db = await getDbInstance();
                    if (db) {
                        const userRef = doc(db, 'users', user.uid);
                        // We use setDoc with merge: true so we don't overwrite other user fields
                        await setDoc(userRef, { learningProgress: enrolledCourses }, { merge: true });
                    }
                } catch (e) {
                    console.error('Failed to sync learning progress to Firestore:', e);
                }
            };
            saveToFirestore();
        }
    }, [enrolledCourses, loaded, user, authLoading]);

    const enrollInCourse = useCallback((slug: string, totalLessons: number) => {
        setEnrolledCourses((prev) => {
            if (prev[slug]) return prev;
            return {
                ...prev,
                [slug]: {
                    slug,
                    enrolledAt: new Date().toISOString(),
                    lastAccessedAt: new Date().toISOString(),
                    lastLessonIndex: 0,
                    lessons: {},
                    totalLessons,
                },
            };
        });
    }, []);

    const unenrollFromCourse = useCallback((slug: string) => {
        setEnrolledCourses((prev) => {
            const next = { ...prev };
            delete next[slug];
            return next;
        });
    }, []);

    const isEnrolled = useCallback((slug: string): boolean => {
        return !!enrolledCourses[slug];
    }, [enrolledCourses]);

    const markLessonComplete = useCallback((slug: string, lessonIndex: number) => {
        setEnrolledCourses((prev) => {
            const course = prev[slug];
            if (!course) return prev;
            return {
                ...prev,
                [slug]: {
                    ...course,
                    lastAccessedAt: new Date().toISOString(),
                    lastLessonIndex: Math.max(course.lastLessonIndex, lessonIndex),
                    lessons: {
                        ...course.lessons,
                        [lessonIndex]: {
                            completed: true,
                            completedAt: new Date().toISOString(),
                        },
                    },
                },
            };
        });
    }, []);

    const markLessonIncomplete = useCallback((slug: string, lessonIndex: number) => {
        setEnrolledCourses((prev) => {
            const course = prev[slug];
            if (!course) return prev;
            const lessons = { ...course.lessons };
            delete lessons[lessonIndex];
            return {
                ...prev,
                [slug]: {
                    ...course,
                    lastAccessedAt: new Date().toISOString(),
                    lessons,
                },
            };
        });
    }, []);

    const setLastLesson = useCallback((slug: string, lessonIndex: number) => {
        setEnrolledCourses((prev) => {
            const course = prev[slug];
            if (!course) return prev;
            return {
                ...prev,
                [slug]: {
                    ...course,
                    lastAccessedAt: new Date().toISOString(),
                    lastLessonIndex: lessonIndex,
                },
            };
        });
    }, []);

    const getProgress = useCallback((slug: string): CourseProgress | undefined => {
        return enrolledCourses[slug];
    }, [enrolledCourses]);

    const getProgressPercent = useCallback((slug: string): number => {
        const course = enrolledCourses[slug];
        if (!course || course.totalLessons === 0) return 0;
        const completedCount = Object.values(course.lessons).filter((l) => l.completed).length;
        return Math.round((completedCount / course.totalLessons) * 100);
    }, [enrolledCourses]);

    const getCompletedCount = useCallback((slug: string): number => {
        const course = enrolledCourses[slug];
        if (!course) return 0;
        return Object.values(course.lessons).filter((l) => l.completed).length;
    }, [enrolledCourses]);

    const getEnrolledList = useCallback((): CourseProgress[] => {
        return Object.values(enrolledCourses).sort(
            (a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
        );
    }, [enrolledCourses]);

    const getInProgressList = useCallback((): CourseProgress[] => {
        return getEnrolledList().filter((c) => {
            const completed = Object.values(c.lessons).filter((l) => l.completed).length;
            return completed < c.totalLessons;
        });
    }, [getEnrolledList]);

    const getCompletedList = useCallback((): CourseProgress[] => {
        return getEnrolledList().filter((c) => {
            const completed = Object.values(c.lessons).filter((l) => l.completed).length;
            return completed >= c.totalLessons && c.totalLessons > 0;
        });
    }, [getEnrolledList]);

    return (
        <LearningContext.Provider value={{
            enrolledCourses,
            enrollInCourse,
            unenrollFromCourse,
            isEnrolled,
            markLessonComplete,
            markLessonIncomplete,
            setLastLesson,
            getProgress,
            getProgressPercent,
            getCompletedCount,
            getEnrolledList,
            getInProgressList,
            getCompletedList,
        }}>
            {children}
        </LearningContext.Provider>
    );
}

export const useLearning = () => useContext(LearningContext);
