import AccountLayout from '@/layouts/AccountLayout';
import { MapPin, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

export default function Addresses({ addresses = [] }: { addresses: any[] }) {
    return (
        <AccountLayout title="My Addresses" activeTab="addresses">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm">
                    <Plus className="w-4 h-4" /> Add New Address
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <div 
                        key={addr.id} 
                        className={`bg-white rounded-2xl p-6 border-2 transition-all relative ${
                            addr.is_default ? 'border-green-600 shadow-md' : 'border-gray-100 hover:border-green-200'
                        }`}
                    >
                        {addr.is_default && (
                            <div className="absolute top-4 right-4 text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Default</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${addr.is_default ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-gray-900">{addr.label || 'Address'}</span>
                        </div>

                        <div className="space-y-1 mb-6">
                            <p className="font-bold text-gray-900">{addr.recipient_name}</p>
                            <p className="text-sm text-gray-600">{addr.phone}</p>
                            <p className="text-sm text-gray-500 leading-relaxed mt-2">{addr.address_line1}, {addr.city}</p>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                            <button className="text-sm font-bold text-gray-600 hover:text-green-600 flex items-center gap-1.5 transition-colors">
                                <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {addresses.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-gray-200" />
                    </div>
                    <p className="text-gray-500 font-medium">No saved addresses found.</p>
                </div>
            )}
        </AccountLayout>
    );
}
