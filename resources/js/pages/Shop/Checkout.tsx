import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    return (
        <CustomerLayout>
            <Head title="Checkout - FreshKart BD" />

            <div className="bg-gray-50 py-10 min-h-screen">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>

                    <div className="flex flex-col lg:flex-row gap-8">
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
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500" placeholder="+880 1..." />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Address (House, Road, Area)</label>
                                        <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="e.g. House 12, Road 5, Block C, Banani"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500">
                                            <option>Dhaka</option>
                                            <option>Chittagong</option>
                                            <option>Sylhet</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Area / Thana</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500">
                                            <option>Banani</option>
                                            <option>Gulshan</option>
                                            <option>Dhanmondi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Time */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Delivery Time</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="border border-green-500 bg-green-50 rounded-xl p-4 cursor-pointer flex items-start gap-3">
                                        <input type="radio" name="delivery_time" className="mt-1 text-green-600 focus:ring-green-500" defaultChecked />
                                        <div>
                                            <div className="font-bold text-gray-900">Standard Delivery</div>
                                            <div className="text-sm text-gray-500">Today, 2:00 PM - 5:00 PM</div>
                                        </div>
                                    </label>
                                    <label className="border border-gray-200 rounded-xl p-4 cursor-pointer flex items-start gap-3 hover:border-green-200 transition-colors">
                                        <input type="radio" name="delivery_time" className="mt-1 text-green-600 focus:ring-green-500" />
                                        <div>
                                            <div className="font-bold text-gray-900">Express Delivery (+$50)</div>
                                            <div className="text-sm text-gray-500">Within 1 Hour</div>
                                        </div>
                                    </label>
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
                                    <label className={`border ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-colors`}>
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="cod" 
                                            checked={paymentMethod === 'cod'} 
                                            onChange={() => setPaymentMethod('cod')}
                                            className="text-green-600 focus:ring-green-500" 
                                        />
                                        <span className="font-bold text-gray-900">Cash on Delivery</span>
                                    </label>
                                    <label className={`border ${paymentMethod === 'bkash' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-colors`}>
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="bkash" 
                                            checked={paymentMethod === 'bkash'} 
                                            onChange={() => setPaymentMethod('bkash')}
                                            className="text-green-600 focus:ring-green-500" 
                                        />
                                        <span className="font-bold text-gray-900">bKash Payment</span>
                                    </label>
                                    <label className={`border ${paymentMethod === 'ssl' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-colors`}>
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="ssl" 
                                            checked={paymentMethod === 'ssl'} 
                                            onChange={() => setPaymentMethod('ssl')}
                                            className="text-green-600 focus:ring-green-500" 
                                        />
                                        <span className="font-bold text-gray-900">Credit / Debit Card (SSLCommerz)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary (Sidebar) */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                    {/* Dummy Items */}
                                    <div className="flex justify-between text-sm">
                                        <div className="flex gap-2">
                                            <span className="font-medium text-gray-900">2x</span>
                                            <span className="text-gray-600 line-clamp-1">Fresh Organic Apples</span>
                                        </div>
                                        <span className="font-medium text-gray-900">৳500</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <div className="flex gap-2">
                                            <span className="font-medium text-gray-900">1x</span>
                                            <span className="text-gray-600 line-clamp-1">Whole Wheat Bread</span>
                                        </div>
                                        <span className="font-medium text-gray-900">৳80</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">৳580</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Delivery Charge</span>
                                        <span className="font-medium text-gray-900">৳60</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-green-600">৳640</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-lg mb-6">
                                    <ShieldCheck className="h-4 w-4" />
                                    Secure and encrypted payment processing.
                                </div>

                                <Link href={route('checkout.success')} method="post" as="button" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200">
                                    Place Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
