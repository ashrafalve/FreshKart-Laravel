import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { ArrowLeft, Save, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function EditProduct({ product, categories, brands }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        category_id: product.category_id || '',
        brand_id: product.brand_id || '',
        description: product.description || '',
        price: product.price || '',
        sale_price: product.sale_price || '',
        stock_quantity: product.stock_quantity || '0',
        unit: product.unit || 'kg',
        unit_value: product.unit_value || '1',
        sku: product.sku || '',
        is_active: (product.is_active == 1) as boolean,
        is_featured: (product.is_featured == 1) as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Product - Admin" />

            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.products.index')} className="p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                        <p className="text-gray-500 text-sm mt-1">Update details for {product.name}.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Basic Information</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input 
                                    type="text" 
                                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`} 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    rows={4} 
                                    className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`}
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Pricing & Inventory</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
                                <input 
                                    type="number" step="0.01" 
                                    className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`}
                                    value={data.price} 
                                    onChange={e => setData('price', e.target.value)} 
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (৳)</label>
                                <input 
                                    type="number" step="0.01" 
                                    className={`w-full border ${errors.sale_price ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`}
                                    value={data.sale_price || ''} 
                                    onChange={e => setData('sale_price', e.target.value)} 
                                />
                                {errors.sale_price && <p className="text-red-500 text-xs mt-1">{errors.sale_price}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                                <input 
                                    type="number" 
                                    className={`w-full border ${errors.stock_quantity ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`}
                                    value={data.stock_quantity} 
                                    onChange={e => setData('stock_quantity', e.target.value)} 
                                />
                                {errors.stock_quantity && <p className="text-red-500 text-xs mt-1">{errors.stock_quantity}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                <input 
                                    type="text" 
                                    className={`w-full border ${errors.sku ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`}
                                    value={data.sku || ''} 
                                    onChange={e => setData('sku', e.target.value)} 
                                />
                                {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Organization</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select 
                                    className={`w-full border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none`}
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((c: any) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <select 
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none"
                                    value={data.brand_id || ''}
                                    onChange={e => setData('brand_id', e.target.value)}
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((b: any) => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                                    <select 
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none"
                                        value={data.unit}
                                        onChange={e => setData('unit', e.target.value)}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="g">g</option>
                                        <option value="L">L</option>
                                        <option value="ml">ml</option>
                                        <option value="piece">piece</option>
                                        <option value="pack">pack</option>
                                        <option value="box">box</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit Value *</label>
                                    <input 
                                        type="number" step="0.01" 
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-green-500 outline-none"
                                        value={data.unit_value}
                                        onChange={e => setData('unit_value', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Status</h2>
                        
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500" 
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                />
                                <span className="text-gray-700 font-medium">Active (Visible in store)</span>
                            </label>
                            
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500" 
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                />
                                <span className="text-gray-700 font-medium">Featured Product</span>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex justify-center items-center gap-2"
                    >
                        {processing ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        Update Product
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
