import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Eye, Edit, Search, Package, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface OrdersIndexProps {
    orders: any;
}

export default function OrdersIndex({ orders, filters = {} }: { orders: any, filters: any }) {
    const [searchQuery, setSearchQuery] = useState(filters.q || '');

    const handleFilter = (key: string, value: string) => {
        router.get(route('admin.orders.index'), {
            ...filters,
            [key]: value
        }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AdminLayout>
            <Head title="Orders - Admin" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and track all customer orders.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search by Order # or Customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter('q', searchQuery)}
                                onBlur={() => handleFilter('q', searchQuery)}
                                className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={filters.status || ''}
                            onChange={(e) => handleFilter('status', e.target.value)}
                            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg py-2 px-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none w-full sm:w-auto"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Items</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.data.length > 0 ? orders.data.map((order: any) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{order.order_number}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.user?.name || 'Guest'}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.items?.length || 0}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">৳{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.orders.show', order.id)} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="View">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button 
                                                onClick={() => {
                                                    if(confirm('Are you sure you want to delete this order?')) {
                                                        router.delete(route('admin.orders.destroy', order.id));
                                                    }
                                                }}
                                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <Package className="h-8 w-8 mx-auto text-gray-300 mb-3" />
                                        <p>No orders found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {orders.last_page > 1 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
                        {orders.links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded-md text-sm ${link.active ? 'bg-green-600 text-white font-medium' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
