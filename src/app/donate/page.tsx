'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import Script from 'next/script';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function DonatePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        donationFor: 'General Donation',
        amount: '',
        name: '',
        email: '',
        mobile: '',
        pan: '',
        address: '',
        pinCode: '',
        isMemorial: false,
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!formData.name || !formData.email || !formData.mobile) {
            alert('Please fill in all required fields');
            return;
        }

        setIsLoading(true);

        try {
            // Create Razorpay order
            const response = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                    currency: 'INR',
                    receipt: `donation_${Date.now()}`,
                    notes: {
                        donation_for: formData.donationFor,
                        name: formData.name,
                        email: formData.email,
                        mobile: formData.mobile,
                    },
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to create order');
            }

            // Open Razorpay checkout
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'Fourteen Worlds',
                description: formData.donationFor,
                order_id: data.orderId,
                handler: async function (response: any) {
                    // Verify payment
                    try {
                        const verifyResponse = await fetch('/api/razorpay/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.verified) {
                            setIsSuccess(true);
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        alert('Payment completed but verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.mobile,
                },
                theme: {
                    color: '#d97706',
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setIsLoading(false);
        } catch (error: any) {
            console.error('Donation error:', error);
            alert(error.message || 'Failed to process donation. Please try again.');
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-16">
                <div className="max-w-md mx-auto px-4 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={40} className="text-green-600" fill="currentColor" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Thank You!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Your donation of ₹{formData.amount} for "{formData.donationFor}" has been received.
                            May Krishna bless you abundantly!
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                        >
                            Return Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />

            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Heart size={48} className="text-red-500" fill="currentColor" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Make a Donation
                        </h1>
                        <p className="text-gray-600">
                            Support the mission of spreading Vedic knowledge worldwide
                        </p>
                    </div>

                    {/* Donation Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                        {/* Donation Type - Fixed as General Donation */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Donation For
                            </label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                                General Donation
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount (₹) *
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="1"
                                placeholder="Enter amount"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <div className="flex gap-2 mt-2">
                                {[101, 251, 501, 1001, 2501].map(amt => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, amount: amt.toString() }))}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-600"
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PAN (for 80G receipt)
                                </label>
                                <input
                                    type="text"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleChange}
                                    placeholder="Optional"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message/Prayer (max 250 chars)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={250}
                                rows={3}
                                placeholder="Optional message or prayer request"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Donate Now'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Secure payment powered by Razorpay
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
