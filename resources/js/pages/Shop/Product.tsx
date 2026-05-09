import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { ShoppingCart, Star, Heart, Share2, Check, Truck, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailsProps {
    product: any;
    related_products: any[];
}

export default function ProductDetails({ product, related_products }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <CustomerLayout>
            <Head title={`${product.name} - FreshKart BD`} />

            <div className="bg-gray-50 py-8 min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <div className="text-sm text-gray-500 mb-8">
                        <Link href={route('home')} className="hover:text-green-600">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href={route('shop.index')} className="hover:text-green-600">Shop</Link>
                        <span className="mx-2">/</span>
                        {product.category && (
                            <>
                                <Link href={route('shop.index', { category: product.category.slug })} className="hover:text-green-600">
                                    {product.category.name}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        )}
                        <span className="text-gray-900 font-medium line-clamp-1 inline-block align-bottom max-w-xs">{product.name}</span>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-12">
                        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                            
                            {/* Product Image Gallery */}
                            <div className="w-full md:w-1/2 lg:w-2/5">
                                <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 mb-4 relative overflow-hidden group">
                                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                        <ShoppingCart className="h-24 w-24 opacity-20" />
                                     </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <button key={i} className={`aspect-square rounded-xl bg-gray-50 border-2 ${i === 1 ? 'border-green-500' : 'border-transparent hover:border-green-200'} flex items-center justify-center overflow-hidden`}>
                                             <ShoppingCart className="h-6 w-6 text-gray-300 opacity-50" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col">
                                {product.brand && (
                                    <span className="text-green-600 font-bold text-sm tracking-wider uppercase mb-2">
                                        {product.brand.name}
                                    </span>
                                )}
                                
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1 text-orange-400 bg-orange-50 px-2 py-1 rounded">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-bold text-sm">{product.rating_avg}</span>
                                    </div>
                                    <span className="text-sm text-gray-500 hover:text-green-600 cursor-pointer">
                                        {product.rating_count} Reviews
                                    </span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-sm text-gray-500">
                                        {product.sales_count > 100 ? `${product.sales_count}+ Sold` : `${product.sales_count} Sold`}
                                    </span>
                                </div>

                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-end gap-3 mb-2">
                                        {product.sale_price ? (
                                            <>
                                                <span className="text-4xl font-bold text-green-600">৳{product.sale_price}</span>
                                                <span className="text-xl text-gray-400 line-through mb-1">৳{product.price}</span>
                                                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded ml-2 mb-1">
                                                    {Math.round((1 - product.sale_price / product.price) * 100)}% OFF
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-4xl font-bold text-green-600">৳{product.price}</span>
                                        )}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        Unit: <span className="font-medium text-gray-900">{product.unit_value} {product.unit}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {product.short_description || "Premium quality fresh product sourced directly from verified suppliers. Guaranteed freshness and fast delivery to your doorstep."}
                                </p>

                                {/* Action Area */}
                                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                                            <button 
                                                className="px-4 py-2 text-gray-500 hover:text-green-600 disabled:opacity-50"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                disabled={quantity <= 1}
                                            >-</button>
                                            <div className="w-12 text-center font-bold text-gray-900">{quantity}</div>
                                            <button 
                                                className="px-4 py-2 text-gray-500 hover:text-green-600 disabled:opacity-50"
                                                onClick={() => setQuantity(Math.min(product.stock_quantity || 10, quantity + 1))}
                                                disabled={quantity >= (product.stock_quantity || 10)}
                                            >+</button>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {product.stock_quantity > 0 ? (
                                                <span className="text-green-600 font-medium flex items-center gap-1">
                                                    <Check className="h-4 w-4" /> In Stock ({product.stock_quantity} available)
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-medium">Out of Stock</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                                            <ShoppingCart className="h-5 w-5" />
                                            Add to Cart
                                        </button>
                                        <button className="bg-white border border-gray-200 text-gray-600 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors">
                                            <Heart className="h-6 w-6" />
                                        </button>
                                        <button className="bg-white border border-gray-200 text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-3 rounded-xl transition-colors">
                                            <Share2 className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="bg-green-50 p-2 rounded-lg text-green-600">
                                            <Truck className="h-5 w-5" />
                                        </div>
                                        <span>Fast Delivery<br/>in 30 mins</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="bg-green-50 p-2 rounded-lg text-green-600">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <span>100% Quality<br/>Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description & Details Tabs (Simplified) */}
                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">Product Details</h2>
                        <div className="prose max-w-none text-gray-600">
                            {product.description ? (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            ) : (
                                <p>No detailed description available for this product.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
