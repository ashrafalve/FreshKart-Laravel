import AccountLayout from '@/layouts/AccountLayout';
import { CreditCard, Plus, ShieldCheck, Trash2, Smartphone } from 'lucide-react';

export default function Payments() {
    const paymentMethods = [
        { id: 1, type: 'Card', brand: 'Visa', last4: '4242', expiry: '12/25', isDefault: true, icon: CreditCard, color: 'bg-blue-600' },
        { id: 2, type: 'Mobile', brand: 'bKash', last4: '017****5566', expiry: null, isDefault: false, icon: Smartphone, color: 'bg-pink-600' },
    ];

    return (
        <AccountLayout title="Payment Methods" activeTab="payments">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm">
                    <Plus className="w-4 h-4" /> Add New Method
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {paymentMethods.map((method) => (
                    <div 
                        key={method.id} 
                        className={`bg-white rounded-2xl p-6 border-2 transition-all relative overflow-hidden group ${
                            method.isDefault ? 'border-green-600 shadow-md' : 'border-gray-100 hover:border-green-200 shadow-sm'
                        }`}
                    >
                        {method.isDefault && (
                            <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                                Primary
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-8">
                            <div className={`p-3 rounded-xl text-white ${method.color}`}>
                                <method.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{method.brand}</span>
                        </div>

                        <div className="space-y-1 mb-6">
                            <p className="text-xl font-black text-gray-900 tracking-widest">
                                {method.type === 'Card' ? `•••• •••• •••• ${method.last4}` : method.last4}
                            </p>
                            {method.expiry && (
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Expires {method.expiry}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-2 text-gray-400">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-xs font-medium">Secure Payment</span>
                            </div>
                            <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-green-600 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-green-900 mb-1">Safe and Secure Payments</h3>
                    <p className="text-sm text-green-700 leading-relaxed">
                        We use industry-standard encryption to protect your payment details. Your sensitive information is never stored directly on our servers.
                    </p>
                </div>
            </div>
        </AccountLayout>
    );
}
