import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import { TrendingUp, Users, ShoppingBag, PackageOpen, DollarSign, CheckCircle } from 'lucide-react';

interface DashboardProps {
    stats: {
        total_sales: number;
        total_orders: number;
        total_customers: number;
        total_products: number;
        recent_orders: any[];
        low_stock_products: any[];
    }
}

export default function AdminDashboard({ stats }: DashboardProps) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard - FreshKart BD" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening with your store today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Revenue" 
                    value={`৳${stats.total_sales.toLocaleString()}`} 
                    icon={DollarSign} 
                    trend="+12.5%" 
                    trendUp={true} 
                    color="bg-green-100 text-green-600"
                />
                <StatCard 
                    title="Total Orders" 
                    value={stats.total_orders.toString()} 
                    icon={ShoppingBag} 
                    trend="+5.2%" 
                    trendUp={true} 
                    color="bg-blue-100 text-blue-600"
                />
                <StatCard 
                    title="Total Customers" 
                    value={stats.total_customers.toString()} 
                    icon={Users} 
                    trend="+18.1%" 
                    trendUp={true} 
                    color="bg-purple-100 text-purple-600"
                />
                <StatCard 
                    title="Products" 
                    value={stats.total_products.toString()} 
                    icon={PackageOpen} 
                    trend="2 Out of Stock" 
                    trendUp={false} 
                    color="bg-orange-100 text-orange-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                        <h2 className="font-bold text-gray-900">Recent Orders</h2>
                        <Link href={route('admin.orders.index')} className="text-sm text-green-600 hover:text-green-700 font-medium">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stats.recent_orders.length > 0 ? stats.recent_orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">#{order.order_number}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.user?.name || 'Guest'}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">৳{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No recent orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                        <h2 className="font-bold text-gray-900">Low Stock Alerts</h2>
                    </div>
                    <div className="p-0 flex-1">
                        {stats.low_stock_products.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {stats.low_stock_products.map((product) => (
                                    <li key={product.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                                <PackageOpen className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="truncate">
                                                <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                                                <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0 pl-2">
                                            <p className="text-red-600 font-bold text-sm">{product.stock_quantity} left</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                                <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                                <p>All products are well stocked!</p>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                        <Link href={route('admin.products.index')} className="text-sm font-medium text-gray-600 hover:text-gray-900">Manage Inventory</Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon: Icon, trend, trendUp, color }: any) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="overflow-hidden">
                <p className="text-sm text-gray-500 font-medium mb-1 truncate">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 truncate">{value}</h3>
                <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 transform rotate-180" />}
                    {trend} vs last month
                </p>
            </div>
        </div>
    );
}
