import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function CheckoutSuccess() {
    return (
        <CustomerLayout>
            <Head title="Order Successful - FreshKart BD" />

            <div className="bg-gray-50 py-20 min-h-[70vh] flex items-center justify-center">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-lg shadow-green-100/50 border border-green-50">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle className="h-16 w-16 text-green-600" />
                            </div>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Thank you for your purchase. Your order number is <span className="font-bold text-green-600">#ORD-12345678</span>.
                            We've sent a confirmation email with your order details.
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left inline-block w-full max-w-md">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                                <Package className="h-5 w-5 text-green-600" /> Next Steps
                            </h3>
                            <ul className="space-y-3 text-gray-600 text-sm">
                                <li className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                                    Our team will verify your order shortly.
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                                    You will receive SMS updates on your delivery status.
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                                    Estimated delivery: Today, 2:00 PM - 5:00 PM.
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href={route('dashboard')} className="border border-gray-200 hover:border-green-600 hover:text-green-600 text-gray-700 font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2">
                                Track Order
                            </Link>
                            <Link href={route('home')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200">
                                Continue Shopping <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
