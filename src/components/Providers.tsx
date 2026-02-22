'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { StateProvider } from '@/contexts/StateContext';
import { CartProvider } from '@/contexts/CartContext';
import { LearningProvider } from '@/contexts/LearningContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <StateProvider>
                <CartProvider>
                    <LearningProvider>
                        {children}
                    </LearningProvider>
                </CartProvider>
            </StateProvider>
        </AuthProvider>
    );
}
