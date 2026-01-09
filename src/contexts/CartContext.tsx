'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
}

export interface BillingDetails {
    firstName: string;
    lastName: string;
    companyName: string;
    country: string;
    streetAddress: string;
    apartment: string;
    city: string;
    state: string;
    postcode: string;
    phone: string;
    email: string;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
    cartCount: number;
    billingDetails: BillingDetails;

    addItem: (item: CartItem) => void;
    removeItem: (index: number) => void;
    updateQuantity: (index: number, quantity: number) => void;
    clearCart: () => void;
    setBillingDetails: (details: Partial<BillingDetails>) => void;
}

const CartContext = createContext<CartState | undefined>(undefined);

const CART_STORAGE_KEY = 'fourteen-worlds-cart';
const BILLING_STORAGE_KEY = 'fourteen-worlds-billing';

const DEFAULT_BILLING: BillingDetails = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'India',
    streetAddress: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    postcode: '',
    phone: '',
    email: '',
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [billingDetails, setBillingDetailsState] = useState<BillingDetails>(DEFAULT_BILLING);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            const savedBilling = localStorage.getItem(BILLING_STORAGE_KEY);

            if (savedCart) {
                try {
                    setItems(JSON.parse(savedCart));
                } catch (e) {
                    console.error('Failed to parse cart from localStorage:', e);
                }
            }

            if (savedBilling) {
                try {
                    setBillingDetailsState({ ...DEFAULT_BILLING, ...JSON.parse(savedBilling) });
                } catch (e) {
                    console.error('Failed to parse billing from localStorage:', e);
                }
            }

            setIsHydrated(true);
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isHydrated && typeof window !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    useEffect(() => {
        if (isHydrated && typeof window !== 'undefined') {
            localStorage.setItem(BILLING_STORAGE_KEY, JSON.stringify(billingDetails));
        }
    }, [billingDetails, isHydrated]);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const value: CartState = {
        items,
        totalPrice,
        cartCount,
        billingDetails,

        addItem: (item: CartItem) => {
            setItems(prev => {
                const existingIndex = prev.findIndex(i => i.id === item.id);
                if (existingIndex >= 0) {
                    const updated = [...prev];
                    updated[existingIndex].quantity += item.quantity;
                    return updated;
                }
                return [...prev, item];
            });
        },

        removeItem: (index: number) => {
            setItems(prev => prev.filter((_, i) => i !== index));
        },

        updateQuantity: (index: number, quantity: number) => {
            setItems(prev => {
                const updated = [...prev];
                if (quantity <= 0) {
                    updated.splice(index, 1);
                } else {
                    updated[index].quantity = quantity;
                }
                return updated;
            });
        },

        clearCart: () => setItems([]),

        setBillingDetails: (details: Partial<BillingDetails>) => {
            setBillingDetailsState(prev => ({ ...prev, ...details }));
        },
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
