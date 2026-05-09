import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { ShoppingCart, Star, Heart, Share2, Check, Truck, ShieldCheck, User, Calendar, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailsProps {
    product: any;
    related_products: any[];
}

export default function ProductDetails({ product, related_products }: ProductDetailsProps) {
    const { auth } = usePage().props as any;
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisting, setIsWishlisting] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        product_id: product.id,
        rating: 5,
        body: '',
    });

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('reviews.store'), {
            onSuccess: () => {
                reset('body', 'rating');
            },
            preserveScroll: true,
        });
    };

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
                                    <div className="flex items-center gap-1 text-orange-400 bg-orange-50 px-2 py-1 rounded cursor-pointer" onClick={() => setActiveTab('reviews')}>
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-bold text-sm">{product.rating_avg || 0}</span>
                                    </div>
                                    <span className="text-sm text-gray-500 hover:text-green-600 cursor-pointer" onClick={() => setActiveTab('reviews')}>
                                        {product.rating_count || 0} Reviews
                                    </span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-sm text-gray-500">
                                        {product.sales_count > 100 ? `${product.sales_count}+ Sold` : `${product.sales_count || 0} Sold`}
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
                                        <button 
                                            onClick={() => {
                                                if (isAdding) return;
                                                setIsAdding(true);
                                                router.post(route('cart.store'), {
                                                    product_id: product.id,
                                                    quantity: quantity
                                                }, { 
                                                    preserveScroll: true,
                                                    onFinish: () => setIsAdding(false)
                                                });
                                            }}
                                            disabled={isAdding || product.stock_quantity <= 0}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isAdding ? (
                                                <ShoppingCart className="h-5 w-5 animate-bounce" />
                                            ) : (
                                                <ShoppingCart className="h-5 w-5" />
                                            )}
                                            {isAdding ? 'Adding...' : 'Add to Cart'}
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (isWishlisting) return;
                                                setIsWishlisting(true);
                                                router.post(route('wishlist.toggle'), {
                                                    product_id: product.id
                                                }, { 
                                                    preserveScroll: true,
                                                    onFinish: () => setIsWishlisting(false)
                                                });
                                            }}
                                            disabled={isWishlisting}
                                            className={`bg-white border border-gray-200 p-3 rounded-xl transition-colors ${product.is_wishlisted ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-600 hover:text-red-500 hover:bg-red-50'} ${isWishlisting ? 'opacity-50 scale-95' : ''}`}
                                        >
                                            <Heart className={`h-6 w-6 ${product.is_wishlisted ? 'fill-current' : ''} ${isWishlisting ? 'animate-pulse' : ''}`} />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: product.name,
                                                        url: window.location.href
                                                    });
                                                } else {
                                                    navigator.clipboard.writeText(window.location.href);
                                                    alert('Link copied to clipboard!');
                                                }
                                            }}
                                            className="bg-white border border-gray-200 text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-3 rounded-xl transition-colors"
                                        >
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

                    {/* Tabs Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                        <div className="flex border-b">
                            <button 
                                onClick={() => setActiveTab('details')}
                                className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'details' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                            >
                                Product Details
                            </button>
                            <button 
                                onClick={() => setActiveTab('reviews')}
                                className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'reviews' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                            >
                                Customer Reviews ({product.rating_count || 0})
                            </button>
                        </div>

                        <div className="p-6 md:p-10">
                            <AnimatePresence mode="wait">
                                {activeTab === 'details' ? (
                                    <motion.div 
                                        key="details"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="prose max-w-none text-gray-600"
                                    >
                                        {product.description ? (
                                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                        ) : (
                                            <p>No detailed description available for this product.</p>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="reviews"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className="flex flex-col lg:flex-row gap-12">
                                            {/* Review Summary & Form */}
                                            <div className="w-full lg:w-1/3">
                                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
                                                    {auth.user ? (
                                                        <form onSubmit={submitReview} className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                                                <div className="flex gap-2">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <button 
                                                                            key={star}
                                                                            type="button"
                                                                            onClick={() => setData('rating', star)}
                                                                            className="focus:outline-none transition-transform hover:scale-110"
                                                                        >
                                                                            <Star className={`h-8 w-8 ${data.rating >= star ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                                                                <textarea 
                                                                    value={data.body}
                                                                    onChange={e => setData('body', e.target.value)}
                                                                    placeholder="What did you like or dislike about this product?"
                                                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-green-500 focus:border-green-500 text-gray-900 min-h-[120px]"
                                                                    required
                                                                ></textarea>
                                                                {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                                                            </div>
                                                            <button 
                                                                type="submit" 
                                                                disabled={processing}
                                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-50"
                                                            >
                                                                {processing ? 'Submitting...' : 'Submit Review'}
                                                                <Send className="h-4 w-4" />
                                                            </button>
                                                        </form>
                                                    ) : (
                                                        <div className="text-center py-4">
                                                            <p className="text-gray-500 mb-4 text-sm">Please login to write a review.</p>
                                                            <Link href={route('login')} className="bg-gray-900 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                                Login
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Reviews List */}
                                            <div className="w-full lg:w-2/3">
                                                <h3 className="text-lg font-bold text-gray-900 mb-6">Customer Feedback</h3>
                                                {product.reviews && product.reviews.length > 0 ? (
                                                    <div className="space-y-8">
                                                        {product.reviews.map((review: any) => (
                                                            <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                                                                <div className="flex justify-between items-start mb-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                                                            {review.user?.name?.charAt(0) || 'U'}
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-bold text-gray-900">{review.user?.name || 'Anonymous'}</h4>
                                                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                                                <Calendar className="h-3 w-3" />
                                                                                {new Date(review.created_at).toLocaleDateString()}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-0.5">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                            <Star key={star} className={`h-4 w-4 ${review.rating >= star ? 'text-orange-400 fill-current' : 'text-gray-200'}`} />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <p className="text-gray-600 leading-relaxed italic">
                                                                    "{review.body}"
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}

