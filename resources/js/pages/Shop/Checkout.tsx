import { Head, useForm, usePage } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { MapPin, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Checkout({ cart = [], addresses = [], subtotal = 0, shipping = 60 }: { cart: any[], addresses: any[], subtotal: number, shipping: number }) {
    const { auth } = usePage().props as any;
    
    const { data, setData, post, processing, errors } = useForm({
        recipient_name: auth?.user?.name || '',
        phone: auth?.user?.phone || '',
        address_line1: '',
        city: 'Dhaka',
        area: 'Banani',
        payment_method: 'cod',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const total = subtotal + shipping;

    return (
        <CustomerLayout>
            <Head title="Checkout - FreshKart BD" />

            <div className="bg-gray-50 py-10 min-h-screen">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                        {/* Checkout Form */}
                        <div className="w-full lg:w-2/3 space-y-6">
                            
                            {/* Delivery Address */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={data.recipient_name}
                                            onChange={e => setData('recipient_name', e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500 text-gray-900" 
                                            placeholder="John Doe" 
                                            required
                                        />
                                        {errors.recipient_name && <p className="text-red-500 text-xs mt-1">{errors.recipient_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input 
                                            type="text" 
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500 text-gray-900" 
                                            placeholder="+880 1..." 
                                            required
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Address (House, Road, Area)</label>
                                        <textarea 
                                            value={data.address_line1}
                                            onChange={e => setData('address_line1', e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500 text-gray-900" 
                                            rows={3} 
                                            placeholder="e.g. House 12, Road 5, Block C, Banani"
                                            required
                                        ></textarea>
                                        {errors.address_line1 && <p className="text-red-500 text-xs mt-1">{errors.address_line1}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input 
                                            type="text"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                                            placeholder="e.g. Dhaka"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Area / Thana</label>
                                        <input 
                                            type="text"
                                            value={data.area}
                                            onChange={e => setData('area', e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                                            placeholder="e.g. Banani"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                </div>
                                <div className="space-y-4">
                                    <label className={`border ${data.payment_method === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-colors`}>
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="cod" 
                                            checked={data.payment_method === 'cod'} 
                                            onChange={() => setData('payment_method', 'cod')}
                                            className="text-green-600 focus:ring-green-500" 
                                        />
                                        <span className="font-bold text-gray-900">Cash on Delivery</span>
                                    </label>
                                    <label className={`border ${data.payment_method === 'bkash' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-colors`}>
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="bkash" 
                                            checked={data.payment_method === 'bkash'} 
                                            onChange={() => setData('payment_method', 'bkash')}
                                            className="text-green-600 focus:ring-green-500" 
                                        />
                                        <span className="font-bold text-gray-900">bKash Payment</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary (Sidebar) */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
                                
                                <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">৳{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Delivery Charge</span>
                                        <span className="font-medium text-gray-900">৳{shipping}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-green-600">৳{total}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-lg mb-6">
                                    <ShieldCheck className="h-4 w-4" />
                                    Secure and encrypted payment processing.
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </CustomerLayout>
    );
}
