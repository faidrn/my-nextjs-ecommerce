'use client';
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { toast } from 'sonner';
import { PaymentInfoCard } from '@/components/payment/PaymentSupport';
import { FallbackPaymentForm } from '@/components/payment/FallbackPaymentForm';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [usePaymentRequestAPI, setUsePaymentRequestAPI] = useState(false);

    useEffect(() => {
        if (isOpen) checkPaymentRequestAvailability();
    }, [isOpen]);

    const checkPaymentRequestAvailability = async () => {
        if (!window.PaymentRequest) {
            setUsePaymentRequestAPI(false);
            return;
        }

        try {
            const testMethods = [{ supportedMethods: 'basic-card' }];
            const testDetails = { total: { label: 'Test', amount: { currency: 'USD', value: '0.01' } } };
            new PaymentRequest(testMethods, testDetails);
            setUsePaymentRequestAPI(true);
        } catch (error) {
            console.log('Payment Request API not available, using fallback form');
            setUsePaymentRequestAPI(false);
        }
    };

    const handleCheckout = () => setShowPaymentForm(true);

    const handlePaymentRequestAPI = async () => {
        try {
        setIsProcessing(true);

        const supportedPaymentMethods = [
            {
                supportedMethods: 'basic-card',
                data: {
                    supportedNetworks: ['visa', 'mastercard', 'amex', 'discover'],
                    supportedTypes: ['debit', 'credit'],
                },
            },
        ];

        const displayItems = cart.map(item => ({
            label: `${item.title} x ${item.quantity}`,
            amount: { currency: 'USD', value: (item.price * item.quantity).toFixed(2) },
        }));

        const paymentDetails = {
            displayItems,
            total: { label: 'Total', amount: { currency: 'USD', value: totalAmount.toFixed(2) } },
        };

        const options = {
            requestPayerName: true,
            requestPayerEmail: true,
            requestPayerPhone: false,
            requestShipping: false,
        };

        const paymentRequest = new PaymentRequest(supportedPaymentMethods, paymentDetails, options);
        const paymentResponse = await paymentRequest.show();

        await processPaymentAPI(paymentResponse);
        await paymentResponse.complete('success');

        toast.success('Payment successful! Thank you for your purchase.');
        clearCart();
        setShowPaymentForm(false);
        onClose();
        } catch (error) {
            if (error.name === 'AbortError') toast.info('Payment cancelled');
            else {
                console.error('Payment error:', error);
                toast.error('Payment failed. Please try again.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFallbackPayment = async (formData) => {
        try {
            setIsProcessing(true);
            await processPaymentForm(formData);
            toast.success('Payment successful! Thank you for your purchase.');
            clearCart();
            setShowPaymentForm(false);
            onClose();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const processPaymentAPI = async (paymentResponse) => {
        return new Promise(resolve => {
            console.log('Processing payment via PaymentRequest API:', paymentResponse, { totalAmount, cart });
            setTimeout(resolve, 1500);
        });
    };

    const processPaymentForm = async (formData) => {
        return new Promise(resolve => {
            console.log('Processing payment via form:', formData, { totalAmount, cart });
            setTimeout(resolve, 1500);
        });
    };

    if (!isOpen) return null;
    
    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => {
                    if (!isProcessing) {
                        setShowPaymentForm(false);
                        onClose();
                    }
                }}
            />
            <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl dark:bg-gray-900 sm:w-96">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-xl font-semibold dark:text-white">
                            {showPaymentForm ? 'Checkout' : 'shoppingCart'}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                if (!isProcessing) {
                                    setShowPaymentForm(false);
                                    onClose();
                                }
                            }}
                            disabled={isProcessing}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex flex-1 items-center justify-center p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">{'emptyCart'}</p>
                        </div>
                    ) : showPaymentForm ? (
                        <ScrollArea className="flex-1 p-4">
                            <FallbackPaymentForm
                                totalAmount={totalAmount}
                                onSubmit={handleFallbackPayment}
                                onCancel={() => setShowPaymentForm(false)}
                            />
                        </ScrollArea>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex gap-4 rounded-lg border p-3 dark:border-gray-700">
                                            <img
                                                src={item.images[0] || 'https://via.placeholder.com/80'}
                                                alt={item.title}
                                                className="h-20 w-20 rounded-md object-cover"
                                                onError={e => { e.currentTarget.src = 'https://via.placeholder.com/80'; }}
                                            />
                                            <div className="flex flex-1 flex-col">
                                                <h3 className="line-clamp-2 text-sm font-medium dark:text-white">{item.title}</h3>
                                                <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center dark:text-white">{item.quantity}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-red-600 hover:text-red-700"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="border-t p-4 dark:border-gray-700">
                                <PaymentInfoCard />
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="font-semibold dark:text-white">{'total'}:</span>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ${totalAmount.toFixed(2)}
                                    </span>
                                </div>
                                <Button onClick={handleCheckout} className="w-full" size="lg" disabled={isProcessing}>
                                    {isProcessing ? (
                                        <>
                                            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="mr-2 h-5 w-5" />
                                            {'checkout'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;