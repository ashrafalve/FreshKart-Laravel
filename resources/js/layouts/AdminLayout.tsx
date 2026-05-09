import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    ShoppingCart, 
    Package, 
    Users, 
    Tag, 
    Settings, 
    Menu, 
    X,
    LogOut,
    Bell
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: 'Orders', href: '#', icon: ShoppingCart },
        { name: 'Products', href: '#', icon: Package },
        { name: 'Categories', href: '#', icon: Tag },
        { name: 'Customers', href: '#', icon: Users },
        { name: 'Settings', href: '#', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 left-0 bottom-0 w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } flex flex-col`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-2">
                        <div className="bg-green-600 p-1.5 rounded">
                            <ShoppingCart className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl">FreshKart Admin</span>
                    </Link>
                    <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-2">
                        {navigation.map((item) => {
                            const active = route().current(item.href.replace(window.location.origin + '/', '')); // Simplified active check
                            const isActive = item.name === 'Dashboard'; // Hardcoded for demo
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive
                                                ? 'bg-green-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="font-bold text-sm">{auth?.user?.name?.charAt(0) || 'A'}</span>
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium truncate">{auth?.user?.name || 'Admin User'}</div>
                            <div className="text-xs text-gray-400 truncate">{auth?.user?.email || 'admin@example.com'}</div>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
                    <button 
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex-1 px-4 flex justify-end">
                        <div className="flex items-center gap-4">
                            <Link href={route('home')} className="text-sm text-green-600 hover:text-green-700 font-medium hidden sm:block">
                                View Store
                            </Link>
                            <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
