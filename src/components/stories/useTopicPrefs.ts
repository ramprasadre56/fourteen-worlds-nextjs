'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getDbInstance } from '@/lib/firebase';

type Prefs = { followed: string[]; muted: string[] };
const LOCAL_KEY = 'storyTopicPrefs';
const EMPTY: Prefs = { followed: [], muted: [] };

function readLocal(): Prefs {
    try {
        const p = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null');
        return p && Array.isArray(p.followed) && Array.isArray(p.muted) ? p : EMPTY;
    } catch { return EMPTY; }
}

/** Followed / muted story topics: stored on users/{uid} when signed in, else in localStorage. */
export function useTopicPrefs() {
    const { user, loading } = useAuth();
    const [prefs, setPrefs] = useState<Prefs>(EMPTY);

    useEffect(() => {
        if (loading) return;
        let alive = true;
        (async () => {
            if (!user) { if (alive) setPrefs(readLocal()); return; }
            try {
                const db = await getDbInstance();
                if (!db) return;
                const { doc, getDoc } = await import('firebase/firestore');
                const snap = await getDoc(doc(db, 'users', user.uid));
                const d = snap.data() ?? {};
                if (alive) setPrefs({
                    followed: Array.isArray(d.followedTopics) ? d.followedTopics : [],
                    muted: Array.isArray(d.mutedTopics) ? d.mutedTopics : [],
                });
            } catch (e) { console.error(e); }
        })();
        return () => { alive = false; };
    }, [user, loading]);

    const save = useCallback(async (next: Prefs) => {
        setPrefs(next);
        if (!user) {
            try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); } catch { /* ignore */ }
            return;
        }
        try {
            const db = await getDbInstance();
            if (!db) return;
            const { doc, setDoc } = await import('firebase/firestore');
            await setDoc(doc(db, 'users', user.uid), { followedTopics: next.followed, mutedTopics: next.muted }, { merge: true });
        } catch (e) { console.error(e); }
    }, [user]);

    const toggleFollow = (slug: string) => {
        const on = prefs.followed.includes(slug);
        save({
            followed: on ? prefs.followed.filter((s) => s !== slug) : [...prefs.followed, slug],
            muted: prefs.muted.filter((s) => s !== slug),
        });
    };
    const toggleMute = (slug: string) => {
        const on = prefs.muted.includes(slug);
        save({
            muted: on ? prefs.muted.filter((s) => s !== slug) : [...prefs.muted, slug],
            followed: prefs.followed.filter((s) => s !== slug),
        });
    };

    return { followed: prefs.followed, muted: prefs.muted, toggleFollow, toggleMute };
}
