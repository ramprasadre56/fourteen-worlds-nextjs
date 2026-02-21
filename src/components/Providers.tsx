'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { StateProvider } from '@/contexts/StateContext';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <StateProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </StateProvider>
        </AuthProvider>
    );
}
