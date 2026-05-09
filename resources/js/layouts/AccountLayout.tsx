import React from 'react';
import CustomerLayout from './CustomerLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Package, Heart, MapPin, CreditCard, User, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountLayoutProps {
    children: React.ReactNode;
    title: string;
    activeTab: string;
}

export default function AccountLayout({ children, title, activeTab }: AccountLayoutProps) {
    const { auth } = usePage().props as any;

    const menuItems = [
        { name: 'Dashboard', icon: User, href: route('dashboard'), id: 'dashboard' },
        { name: 'My Orders', icon: Package, href: route('account.orders'), id: 'orders' },
        { name: 'My Wishlist', icon: Heart, href: route('wishlist.index'), id: 'wishlist' },
        { name: 'My Addresses', icon: MapPin, href: route('account.addresses'), id: 'addresses' },
        { name: 'Payment Methods', icon: CreditCard, href: route('account.payments'), id: 'payments' },
        { name: 'Profile Settings', icon: User, href: route('profile.edit'), id: 'profile' },
    ];

    return (
        <CustomerLayout>
            <Head title={title} />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Sidebar Navigation */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                                <div className="p-6 bg-green-600 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl border border-white/30">
                                            {(auth.user.name || 'U').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold truncate">{auth.user.name}</p>
                                            <p className="text-xs text-green-100 truncate">{auth.user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <nav className="p-2">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                                activeTab === item.id 
                                                ? 'bg-green-50 text-green-700 font-bold' 
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                                            }`}
                                        >
                                            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'}`} />
                                            <span>{item.name}</span>
                                            {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-600" />}
                                        </Link>
                                    ))}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 mt-2"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Log Out</span>
                                    </Link>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {children}
                            </motion.div>
                        </main>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
