import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Plus, Search, Edit, Trash2, Package, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface CategoriesIndexProps {
    categories: any;
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        is_active: true,
        sort_order: 0,
    });

    const handleSearch = () => {
        router.get(route('admin.categories.index'), { search: searchQuery }, {
            preserveState: true,
            replace: true
        });
    };

    const handleSubmit = () => {
        if (editingId) {
            router.put(route('admin.categories.update', editingId), formData);
        } else {
            router.post(route('admin.categories.store'), formData);
        }
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', slug: '', description: '', is_active: true, sort_order: 0 });
    };

    const openEditModal = (category: any) => {
        setEditingId(category.id);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            is_active: category.is_active,
            sort_order: category.sort_order || 0,
        });
        setShowModal(true);
    };

    const deleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Categories - Admin" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage product categories.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            onBlur={handleSearch}
                            className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-gray-200 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Products</th>
                                <th className="px-6 py-4">Sort Order</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.data.map((category: any) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{category.products?.length || 0}</td>
                                    <td className="px-6 py-4 text-gray-600">{category.sort_order || 0}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${category.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {category.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(category)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => deleteCategory(category.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <Package className="h-8 w-8 mx-auto text-gray-300 mb-3" />
                                        <p>No categories found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:ring-green-500 focus:border-green-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:ring-green-500 focus:border-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:ring-green-500 focus:border-green-500 outline-none"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:ring-green-500 focus:border-green-500 outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                />
                                <label htmlFor="is_active" className="text-sm text-gray-700">Active</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => { setShowModal(false); setEditingId(null); }} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">{editingId ? 'Update' : 'Create'}</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
