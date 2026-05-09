import { Head, Link, router } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { Trash2, ShoppingCart, HeartCrack } from 'lucide-react';

export default function Wishlist({ products }: { products: any[] }) {
    
    const removeFromWishlist = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        router.post(route('wishlist.toggle'), {
            product_id: productId
        }, { preserveScroll: true });
    };

    const addToCart = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1
        }, { preserveScroll: true });
    };

    return (
        <CustomerLayout>
            <Head title="My Wishlist - FreshKart BD" />
            
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Wishlist</h1>
                    
                    {products.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="flex justify-center mb-4 text-gray-300">
                                <HeartCrack className="w-16 h-16" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                            <p className="text-gray-500 mb-6">Explore our products and add your favorites here!</p>
                            <Link href={route('shop.index')} className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-semibold">Product</th>
                                            <th className="p-4 font-semibold text-center">Price</th>
                                            <th className="p-4 font-semibold text-center">Stock Status</th>
                                            <th className="p-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-20 h-20 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                                            <img 
                                                                src={`https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&sig=${product.id}`} 
                                                                alt={product.name} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Link href={route('shop.product', product.slug)} className="font-bold text-gray-900 hover:text-green-600 transition-colors text-base">
                                                                {product.name}
                                                            </Link>
                                                            <div className="text-sm text-gray-500 mt-1">{product.unit_value} {product.unit}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    {product.sale_price ? (
                                                        <div>
                                                            <span className="font-bold text-gray-900 block">৳{product.sale_price}</span>
                                                            <span className="text-xs text-gray-400 line-through">৳{product.price}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="font-bold text-gray-900">৳{product.price}</span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-center">
                                                    {product.stock_quantity > 0 ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            In Stock
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Out of Stock
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button 
                                                            onClick={(e) => addToCart(e, product.id)}
                                                            disabled={product.stock_quantity <= 0}
                                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-bold text-sm transition-colors shadow-sm"
                                                        >
                                                            <ShoppingCart className="w-4 h-4" /> 
                                                            <span className="hidden sm:inline">Add to Cart</span>
                                                        </button>
                                                        <button 
                                                            onClick={(e) => removeFromWishlist(e, product.id)}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                            title="Remove from Wishlist"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CustomerLayout>
    );
}
