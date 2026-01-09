'use client';

import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
    const { items, totalPrice, removeItem, updateQuantity, billingDetails, setBillingDetails } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item, index) => (
                                <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                        <p className="font-bold mt-2">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(index, item.quantity - 1)}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(index, item.quantity + 1)}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded ml-4"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-xl p-6 h-fit">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between py-2 border-b">
                                <span>Subtotal</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between py-4 text-lg font-bold">
                                <span>Total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
