import { Head } from '@inertiajs/react';
import CustomerLayout from '../layouts/CustomerLayout';
import { ShoppingCart, ShieldCheck, Leaf } from 'lucide-react';

export default function About() {
    return (
        <CustomerLayout>
            <Head title="About Us - FreshKart BD" />
            
            <div className="bg-white py-16 min-h-[60vh]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">About FreshKart BD</h1>
                        <p className="text-lg text-gray-600">Delivering freshness to your doorstep every day.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600" 
                                alt="Fresh Produce" 
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We started FreshKart with a simple idea: everyone deserves access to fresh, high-quality groceries without the hassle of navigating crowded markets. We source directly from local farmers and trusted suppliers to bring the best of Bangladesh to your kitchen.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Whether you're planning a family dinner or just stocking up on daily essentials, our goal is to make your grocery shopping seamless, fast, and completely reliable.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">100% Fresh</h3>
                            <p className="text-gray-600 text-sm">We pick the freshest produce and guarantee its quality upon delivery.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                                <ShoppingCart className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                            <p className="text-gray-600 text-sm">Get your essentials delivered within hours across Dhaka city.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Secure Shopping</h3>
                            <p className="text-gray-600 text-sm">Your data and payments are always protected with top-tier security.</p>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
