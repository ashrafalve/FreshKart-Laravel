import AccountLayout from '@/layouts/AccountLayout';
import { Package, Search, ExternalLink } from 'lucide-react';

export default function Orders({ orders }: { orders: any }) {
    const orderList = orders.data || [];

    return (
        <AccountLayout title="My Orders" activeTab="orders">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-md-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                </div>

                <div className="overflow-x-auto">
                    {orderList.length > 0 ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orderList.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 rounded-lg">
                                                    <Package className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <span className="font-bold text-gray-900">{order.order_number}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">৳{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                                                order.status === 'delivered' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-bold text-sm">
                                                View <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <Package className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No orders yet</h3>
                            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    );
}
