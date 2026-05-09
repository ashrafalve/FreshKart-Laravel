import { Head, router, Link } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Search, Users, Mail, Phone, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CustomersIndex({ customers, filters = {} }: { customers: any, filters: any }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSearch = () => {
        router.get(route('admin.customers.index'), { search: searchQuery }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AdminLayout>
            <Head title="Customers - Admin" />

            <div className="mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your store's customers.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.data.length > 0 ? customers.data.map((customer: any) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                                                {customer.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{customer.name}</p>
                                                <p className="text-xs text-gray-500">{customer.role || 'customer'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{customer.phone || '-'}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(customer.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                            customer.status === 'active' ? 'bg-green-100 text-green-700' :
                                            customer.status === 'banned' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {customer.status || 'active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => {
                                                if(confirm('Are you sure you want to delete this user?')) {
                                                    router.delete(route('admin.customers.destroy', customer.id));
                                                }
                                            }}
                                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <Users className="h-8 w-8 mx-auto text-gray-300 mb-3" />
                                        <p>No customers found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {customers.last_page > 1 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
                        {customers.links.map((link: any, i: number) => (
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

