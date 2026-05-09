import AccountLayout from '@/layouts/AccountLayout';
import { usePage, Link } from '@inertiajs/react';
import { 
    Package, Heart, ShoppingBag, Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ recentOrders = [] }: { recentOrders: any[] }) {
    const { auth, wishlistCount, cartCount } = usePage().props as any;

    const stats = [
        { label: 'Total Orders', value: '0', icon: Package, color: 'bg-blue-50 text-blue-600' }, // For now using placeholder for total
        { label: 'Wishlist', value: wishlistCount || '0', icon: Heart, color: 'bg-red-50 text-red-600' },
        { label: 'Cart Items', value: cartCount || '0', icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
    ];

    return (
        <AccountLayout title="User Dashboard" activeTab="dashboard">
            {/* Welcome Banner */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Hello, {auth.user.name}! 👋</h1>
                    <p className="text-gray-500">Welcome back to FreshKart BD. Manage your orders and account settings here.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-50 to-transparent pointer-events-none hidden md:block" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5"
                    >
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        Recent Orders
                    </h2>
                    <Link href={route('account.orders')} className="text-green-600 text-sm font-bold hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    {recentOrders.length > 0 ? (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{order.order_number}</td>
                                        <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">৳{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                order.status === 'delivered' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-green-600 hover:text-green-700 font-bold text-sm">Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-gray-200" />
                            </div>
                            <p className="text-gray-500 font-medium">No recent orders found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    );
}
