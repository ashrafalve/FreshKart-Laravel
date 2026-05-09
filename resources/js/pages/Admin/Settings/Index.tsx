import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

interface SettingsIndexProps {
    settings: Record<string, any>;
}

export default function SettingsIndex({ settings }: SettingsIndexProps) {
    const [formData, setFormData] = useState({
        site_name: settings.site_name || 'FreshKart BD',
        site_email: settings.site_email || '',
        site_phone: settings.site_phone || '',
        site_address: settings.site_address || '',
        currency: settings.currency || 'BDT',
        tax_rate: settings.tax_rate || '0',
        delivery_charge: settings.delivery_charge || '60',
        min_order_amount: settings.min_order_amount || '0',
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        instagram_url: settings.instagram_url || '',
    });

    const handleSubmit = () => {
        router.post(route('admin.settings.update'), formData);
    };

    return (
        <AdminLayout>
            <Head title="Settings - Admin" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your store's general settings.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                    <div className="space-y-6">
                        {/* General Settings */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                                    <input
                                        type="text"
                                        value={formData.site_name}
                                        onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Email</label>
                                    <input
                                        type="email"
                                        value={formData.site_email}
                                        onChange={(e) => setFormData({ ...formData, site_email: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Phone</label>
                                    <input
                                        type="text"
                                        value={formData.site_phone}
                                        onChange={(e) => setFormData({ ...formData, site_phone: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    >
                                        <option value="BDT">BDT (Taka)</option>
                                        <option value="USD">USD (Dollar)</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Address</label>
                                    <textarea
                                        value={formData.site_address}
                                        onChange={(e) => setFormData({ ...formData, site_address: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Order Settings */}
                        <div className="pt-6 border-t border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.tax_rate}
                                        onChange={(e) => setFormData({ ...formData, tax_rate: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Charge (৳)</label>
                                    <input
                                        type="number"
                                        value={formData.delivery_charge}
                                        onChange={(e) => setFormData({ ...formData, delivery_charge: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount (৳)</label>
                                    <input
                                        type="number"
                                        value={formData.min_order_amount}
                                        onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="pt-6 border-t border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                    <input
                                        type="url"
                                        value={formData.facebook_url}
                                        onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                                    <input
                                        type="url"
                                        value={formData.twitter_url}
                                        onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                                    <input
                                        type="url"
                                        value={formData.instagram_url}
                                        onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
