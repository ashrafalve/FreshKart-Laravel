import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Plus, Search, Edit, Trash2, Package, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ProductsIndexProps {
    products: any; // Using any for quick scaffolding, ideally type this properly
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AdminLayout>
            <Head title="Manage Products - Admin" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your store's inventory and product details.</p>
                </div>
                <Link href={route('admin.products.create')} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto">
                    <Plus className="h-4 w-4" /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Table Header Controls */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg py-2 px-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none w-full sm:w-auto">
                            <option value="">All Categories</option>
                            <option value="produce">Fresh Produce</option>
                            <option value="meat">Meat & Seafood</option>
                        </select>
                        <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg py-2 px-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none w-full sm:w-auto">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-gray-200 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.data.map((product: any) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                {/* In a real app, use the actual thumbnail URL */}
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">SKU: {product.sku || `PRD-${product.id}`}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {product.category?.name || 'Uncategorized'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">৳{product.sale_price || product.price}</div>
                                        {product.sale_price && <div className="text-xs text-gray-400 line-through">৳{product.price}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className={`font-medium ${product.stock_quantity > 10 ? 'text-gray-900' : 'text-red-600'}`}>
                                                {product.stock_quantity}
                                            </span>
                                            <span className="text-xs text-gray-500">{product.unit_value} {product.unit}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                                            product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {product.is_active ? 'Active' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.products.edit', product.id)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <Link href={route('admin.products.destroy', product.id)} method="delete" as="button" className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <Package className="h-8 w-8 mx-auto text-gray-300 mb-3" />
                                        <p>No products found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium text-gray-900">{products.from}</span> to <span className="font-medium text-gray-900">{products.to}</span> of <span className="font-medium text-gray-900">{products.total}</span> results
                        </div>
                        <div className="flex gap-1">
                            {products.links.map((link: any, i: number) => (
                                <Link 
                                    key={i} 
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded-md text-sm ${link.active ? 'bg-green-600 text-white font-medium' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
