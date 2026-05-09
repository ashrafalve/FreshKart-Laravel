import { Head, Link, router } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart({ cartItems = [], subtotal = 0, tax = 0, total = 0 }: any) {
    const items = cartItems;

    const displaySubtotal = subtotal;
    const deliveryCharge = items.length > 0 ? 60 : 0;
    const displayTotal = displaySubtotal + deliveryCharge + tax;

    const updateQuantity = (id: string | number, newQuantity: number) => {
        if (newQuantity < 1) return;
        router.put(route('cart.update', id), { quantity: newQuantity }, { preserveScroll: true });
    };

    const removeItem = (id: string | number) => {
        router.delete(route('cart.destroy', id), { preserveScroll: true });
    };

    return (
        <CustomerLayout>
            <Head title="Your Cart - FreshKart BD" />

            <div className="bg-gray-50 py-10 min-h-screen">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                    {items.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-50 p-6 rounded-full text-green-600">
                                    <ShoppingBag className="h-16 w-16" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                            <Link href={route('shop.index')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block shadow-lg shadow-green-200">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items List */}
                            <div className="w-full lg:w-2/3">
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                                    <div className="hidden md:grid grid-cols-6 gap-4 border-b border-gray-100 pb-4 mb-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="col-span-3">Product</div>
                                        <div className="text-center">Price</div>
                                        <div className="text-center">Quantity</div>
                                        <div className="text-right">Total</div>
                                    </div>

                                    <div className="space-y-6">
                                        {items.map((item: any) => (
                                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                                <div className="col-span-3 flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <Link href={route('shop.product', item.slug || item.id)}>
                                                            <h3 className="font-bold text-gray-900 hover:text-green-600 transition-colors">{item.name}</h3>
                                                        </Link>
                                                        <p className="text-sm text-gray-500 mt-1">Unit: {item.unit_value} {item.unit}</p>
                                                        <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm flex items-center gap-1 mt-2 hover:text-red-600 transition-colors">
                                                            <Trash2 className="h-4 w-4" /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-center font-medium text-gray-900 hidden md:block">
                                                    ৳{item.price}
                                                </div>
                                                <div className="flex justify-center">
                                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-900 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">-</button>
                                                        <span className="w-10 text-center text-sm font-bold text-gray-900 border-x border-gray-200 py-1 bg-white">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-900 hover:text-green-600 transition-colors">+</button>
                                                    </div>
                                                </div>
                                                <div className="text-right font-bold text-green-600 hidden md:block">
                                                    ৳{item.price * item.quantity}
                                                </div>

                                                {/* Mobile Price & Total */}
                                                <div className="flex justify-between items-center md:hidden mt-2">
                                                    <span className="text-gray-500 text-sm">৳{item.price} / each</span>
                                                    <span className="font-bold text-green-600 text-lg">৳{item.price * item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="w-full lg:w-1/3">
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-gray-900">৳{displaySubtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery Charge</span>
                                            <span className="font-medium text-gray-900">৳60</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tax</span>
                                            <span className="font-medium text-gray-900">৳0</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Promo Code" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500" />
                                            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Apply</button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-green-600">৳{displayTotal}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 text-right mt-1">Including all taxes</p>
                                    </div>

                                    <Link href={route('checkout.index')} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200">
                                        Proceed to Checkout <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CustomerLayout>
    );
}
