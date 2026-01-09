'use client';

import { SessionProvider } from 'next-auth/react';
import { StateProvider } from '@/contexts/StateContext';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <StateProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </StateProvider>
        </SessionProvider>
    );
}
