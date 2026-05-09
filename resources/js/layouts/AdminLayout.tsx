import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
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
    Bell,
    Check,
    CheckCheck,
    XCircle
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const navigation = [
        { name: 'Dashboard', routeName: 'admin.dashboard', icon: LayoutDashboard },
        { name: 'Orders', routeName: 'admin.orders.index', icon: ShoppingCart },
        { name: 'Products', routeName: 'admin.products.*', icon: Package },
        { name: 'Categories', routeName: 'admin.categories.index', icon: Tag },
        { name: 'Customers', routeName: 'admin.customers.index', icon: Users },
        { name: 'Settings', routeName: 'admin.settings.index', icon: Settings },
    ];

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        fetch(route('admin.notifications.index'), {
            headers: { 'X-Inertia': 'false' }
        })
            .then(res => res.json())
            .then(data => {
                setNotifications(data.notifications);
                setUnreadCount(data.unread_count);
            });
    };

    const markAsRead = (id: number) => {
        fetch(route('admin.notifications.read'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ ids: [id] })
        }).then(() => {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        });
    };

    const markAllAsRead = () => {
        fetch(route('admin.notifications.readAll'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }
        }).then(() => {
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        });
    };

    const deleteNotification = (id: number) => {
        fetch(route('admin.notifications.destroy', id), {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }
        }).then(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
            if (!notifications.find(n => n.id === id)?.is_read) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        });
    };

    const getIconColor = (color: string) => {
        const colors: Record<string, string> = {
            green: 'text-green-600 bg-green-100',
            red: 'text-red-600 bg-red-100',
            orange: 'text-orange-600 bg-orange-100',
            blue: 'text-blue-600 bg-blue-100',
            purple: 'text-purple-600 bg-purple-100',
        };
        return colors[color] || colors.green;
    };

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
                            const isActive = route().current(item.routeName);
                            const targetRoute = item.routeName.replace('.*', '.index');

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={route(targetRoute)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive
                                                ? 'bg-green-600 text-white shadow-md'
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
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <Bell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                                                >
                                                    <CheckCheck className="h-3 w-3" /> Mark all read
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length > 0 ? notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                                                        !notif.is_read ? 'bg-blue-50/50' : ''
                                                    }`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notif.color)}`}>
                                                            <Bell className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">{notif.title}</p>
                                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                                            <p className="text-xs text-gray-400 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-1 flex-shrink-0">
                                                            {!notif.is_read && (
                                                                <button
                                                                    onClick={() => markAsRead(notif.id)}
                                                                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                                    title="Mark as read"
                                                                >
                                                                    <Check className="h-3 w-3" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteNotification(notif.id)}
                                                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                                                                title="Delete"
                                                            >
                                                                <XCircle className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="p-8 text-center text-gray-500">
                                                    <Bell className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                                                    <p className="text-sm">No notifications</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
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
