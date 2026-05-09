import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { ArrowLeft, Package, User, MapPin, CreditCard, Clock, CheckCircle, Truck, XCircle, Trash2 } from 'lucide-react';

interface OrderShowProps {
    order: any;
}

export default function OrderShow({ order }: OrderShowProps) {
    const { data, setData, put, processing } = useForm({
        status: order.status,
        payment_status: order.payment_status || 'unpaid',
    });

    const updateOrder = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.orders.update', order.id));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-orange-100 text-orange-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Order #${order.order_number} - Admin`} />

            <div className="mb-6 flex items-center gap-4">
                <Link href={route('admin.orders.index')} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-green-600 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order #{order.order_number}</h1>
                    <p className="text-gray-500 text-sm">Placed on {new Date(order.created_at).toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Items */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                            <Package className="h-5 w-5 text-green-600" />
                            <h2 className="font-bold text-gray-900">Order Items</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4 text-center">Price</th>
                                        <th className="px-6 py-4 text-center">Qty</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.items.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                                                        <img src={item.product?.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{item.product_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-600">৳{item.unit_price}</td>
                                            <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                                            <td className="px-6 py-4 text-right font-bold text-gray-900">৳{item.subtotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex justify-between w-full max-w-xs text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳{order.subtotal}</span>
                                </div>
                                <div className="flex justify-between w-full max-w-xs text-gray-600">
                                    <span>Shipping Charge</span>
                                    <span>৳{order.shipping_charge}</span>
                                </div>
                                <div className="flex justify-between w-full max-w-xs text-xl font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                                    <span>Total</span>
                                    <span className="text-green-600">৳{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <MapPin className="h-5 w-5 text-green-600" />
                            <h2 className="font-bold text-gray-900">Shipping Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Recipient</h4>
                                <p className="text-gray-900 font-medium text-lg">{order.shipping_name}</p>
                                <p className="text-gray-600">{order.shipping_phone}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Address</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {order.shipping_address_line1}<br/>
                                    {order.shipping_area}, {order.shipping_city}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Order Status Management */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-green-600" /> Manage Order
                        </h3>
                        
                        <form onSubmit={updateOrder} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                                <select 
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-green-500 focus:border-green-500 text-gray-900"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                                <select 
                                    value={data.payment_status}
                                    onChange={e => setData('payment_status', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-green-500 focus:border-green-500 text-gray-900"
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-200 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Status'}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <button 
                                onClick={() => {
                                    if(confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
                                        router.delete(route('admin.orders.destroy', order.id));
                                    }
                                }}
                                className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" /> Delete Order
                            </button>
                        </div>
                    </div>

                    {/* Customer Quick Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-green-600" /> Customer
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                                {order.user?.name?.charAt(0) || 'G'}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{order.user?.name || 'Guest'}</p>
                                <p className="text-xs text-gray-500">{order.user?.email || 'N/A'}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </AdminLayout>
    );
}
