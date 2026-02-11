'use client';

import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    const { items, totalPrice, removeItem, updateQuantity, billingDetails, setBillingDetails } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
    };

    return (
        <div className="min-h-screen py-10" style={{ background: 'var(--color-bg)' }}>
            <div className="w-full max-w-[1200px] mx-auto px-8">
                <h1
                    className="text-3xl font-bold mb-10"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                    Shopping Cart
                </h1>

                {items.length === 0 ? (
                    <div
                        className="rounded-2xl p-14 text-center"
                        style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border-light)',
                            boxShadow: 'var(--shadow-md)',
                        }}
                    >
                        <ShoppingBag
                            size={48}
                            className="mx-auto mb-4"
                            style={{ color: 'var(--color-text-muted)' }}
                        />
                        <p className="text-lg mb-6" style={{ color: 'var(--color-text-muted)' }}>
                            Your cart is empty
                        </p>
                        <Link href="/library" className="btn-golden inline-flex">
                            Browse Library
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl p-5 flex items-center gap-5"
                                    style={{
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border-light)',
                                        boxShadow: 'var(--shadow-sm)',
                                    }}
                                >
                                    <div className="flex-1">
                                        <h3
                                            className="font-semibold"
                                            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                                        >
                                            {item.name}
                                        </h3>
                                        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                            {item.description}
                                        </p>
                                        <p
                                            className="font-bold mt-2"
                                            style={{ color: 'var(--color-primary)' }}
                                        >
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(index, item.quantity - 1)}
                                            className="p-1.5 rounded-lg cursor-pointer"
                                            style={{
                                                border: '1px solid var(--color-border)',
                                                transition: 'all var(--transition-fast)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-surface-warm)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            <Minus size={14} style={{ color: 'var(--color-text-secondary)' }} />
                                        </button>
                                        <span
                                            className="w-8 text-center font-semibold text-sm"
                                            style={{ color: 'var(--color-text)' }}
                                        >
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(index, item.quantity + 1)}
                                            className="p-1.5 rounded-lg cursor-pointer"
                                            style={{
                                                border: '1px solid var(--color-border)',
                                                transition: 'all var(--transition-fast)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-surface-warm)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            <Plus size={14} style={{ color: 'var(--color-text-secondary)' }} />
                                        </button>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="p-2 rounded-lg ml-3 cursor-pointer"
                                            style={{
                                                color: 'var(--color-primary)',
                                                transition: 'all var(--transition-fast)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(139, 26, 26, 0.06)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div
                            className="rounded-xl p-6 h-fit"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border-light)',
                                boxShadow: 'var(--shadow-md)',
                                borderTop: '4px solid var(--color-secondary)',
                            }}
                        >
                            <h2
                                className="text-xl font-bold mb-4"
                                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                            >
                                Order Summary
                            </h2>
                            <div
                                className="flex justify-between py-3"
                                style={{ borderBottom: '1px solid var(--color-border-light)' }}
                            >
                                <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                <span style={{ color: 'var(--color-text)' }}>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between py-4 text-lg font-bold">
                                <span style={{ color: 'var(--color-text)' }}>Total</span>
                                <span style={{ color: 'var(--color-primary)' }}>{formatPrice(totalPrice)}</span>
                            </div>
                            <button className="btn-golden w-full justify-center cursor-pointer">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
