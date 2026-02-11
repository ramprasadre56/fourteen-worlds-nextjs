'use client';

import { useState } from 'react';
import { Heart, Loader2, Sparkles } from 'lucide-react';
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

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'Fourteen Worlds',
                description: formData.donationFor,
                order_id: data.orderId,
                handler: async function (response: any) {
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
                    color: '#8B1A1A',
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
            <div className="min-h-screen py-16" style={{ background: 'var(--color-bg)' }}>
                <div className="max-w-md mx-auto px-4 text-center">
                    <div
                        className="rounded-2xl p-10"
                        style={{
                            background: 'var(--color-surface)',
                            boxShadow: 'var(--shadow-xl)',
                            borderTop: '4px solid var(--color-secondary)',
                        }}
                    >
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'linear-gradient(135deg, #FFF8E1, #FFF4D4)' }}
                        >
                            <Heart size={40} style={{ color: 'var(--color-primary)' }} fill="currentColor" />
                        </div>
                        <h1
                            className="text-2xl font-bold mb-2"
                            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                        >
                            Thank You!
                        </h1>
                        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            Your donation of ₹{formData.amount} for &ldquo;{formData.donationFor}&rdquo; has been received.
                            May Krishna bless you abundantly!
                        </p>
                        <a
                            href="/"
                            className="btn-golden inline-flex"
                        >
                            Return Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        fontSize: 'var(--text-sm)',
        transition: 'border-color var(--transition-fast)',
        outline: 'none',
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />

            <div className="min-h-screen py-10" style={{ background: 'var(--color-bg)' }}>
                <div className="max-w-2xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-4">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                }}
                            >
                                <Heart size={28} style={{ color: '#F5EDE0' }} fill="currentColor" />
                            </div>
                        </div>
                        <h1
                            className="text-3xl font-bold mb-2"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                        >
                            Make a Donation
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Support the mission of spreading Vedic knowledge worldwide
                        </p>
                    </div>

                    {/* Donation Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl p-8"
                        style={{
                            background: 'var(--color-surface)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--color-border-light)',
                            borderTop: '4px solid var(--color-secondary)',
                        }}
                    >
                        {/* Donation Type */}
                        <div className="mb-6">
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text)' }}
                            >
                                Donation For
                            </label>
                            <div
                                className="w-full p-3 rounded-lg"
                                style={{
                                    background: 'var(--color-surface-warm)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                General Donation
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="mb-6">
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text)' }}
                            >
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
                                style={inputStyle}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                            />
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {[101, 251, 501, 1001, 2501].map(amt => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, amount: amt.toString() }))}
                                        className="px-4 py-1.5 text-sm rounded-full font-medium cursor-pointer"
                                        style={{
                                            border: '1px solid var(--color-border)',
                                            color: 'var(--color-text-secondary)',
                                            background: 'transparent',
                                            transition: 'all var(--transition-fast)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--color-secondary)';
                                            e.currentTarget.style.color = 'var(--color-primary)';
                                            e.currentTarget.style.background = 'rgba(212, 168, 83, 0.08)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--color-border)';
                                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                    Full Name *
                                </label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                    Email *
                                </label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                    Mobile Number *
                                </label>
                                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required style={inputStyle}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                    PAN (for 80G receipt)
                                </label>
                                <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="Optional" style={inputStyle}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                Message/Prayer (max 250 chars)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={250}
                                rows={3}
                                placeholder="Optional message or prayer request"
                                style={{ ...inputStyle, resize: 'none' as const }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-golden w-full justify-center text-lg cursor-pointer"
                            style={{
                                padding: '1rem',
                                opacity: isLoading ? 0.6 : 1,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                            }}
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

                        <p className="text-center text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>
                            Secure payment powered by Razorpay
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
