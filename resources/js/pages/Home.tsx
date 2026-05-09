import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '../layouts/CustomerLayout';
import { ArrowRight, TrendingUp, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
    featured_categories: any[];
    featured_products: any[];
    trending_products: any[];
}

export default function Home({ featured_categories, featured_products, trending_products }: HomeProps) {
    
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    // Beautiful Unsplash Images for demo
    const categoryImages = [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400", // Produce
        "https://images.unsplash.com/photo-1607006411046-2b47fdbb20f2?auto=format&fit=crop&q=80&w=400", // Meat
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=400", // Dairy
        "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&q=80&w=400", // Pantry
        "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&q=80&w=400", // Snacks
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400", // Beverages
    ];

    return (
        <CustomerLayout>
            <Head title="Fresh Groceries Delivered Fast | FreshKart BD" />

            {/* Premium Hero Section */}
            <section className="relative bg-[#f8faf7] overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                        <motion.div 
                            className="flex-1 space-y-8 text-center lg:text-left"
                            initial="hidden" animate="visible" variants={staggerContainer}
                        >
                            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 py-2 px-4 rounded-md bg-white border border-green-100 shadow-sm text-green-700 text-sm font-bold tracking-wide uppercase">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                100% Organic & Fresh
                            </motion.div>
                            
                            <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                                Don't miss our <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                                    daily amazing
                                </span> deals.
                            </motion.h1>
                            
                            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium">
                                Save up to 50% off on your first order. Fresh groceries, meat, and daily essentials delivered right to your door within 30 minutes.
                            </motion.p>
                            
                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link href={route('shop.index')} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-[0_8px_30px_rgb(22,163,74,0.3)] hover:shadow-[0_8px_30px_rgb(22,163,74,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                                    Shop Now <ArrowRight className="w-5 h-5" />
                                </Link>
                                <div className="flex -space-x-4 ml-4">
                                    <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Customer" />
                                    <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Customer" />
                                    <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Customer" />
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm z-10">
                                        5k+
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex-1 relative w-full max-w-lg lg:max-w-none"
                            initial={{ opacity: 0, scale: 0.8, rotate: -2 }} 
                            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Hero Image with reduced border radius */}
                            <div className="relative aspect-[4/3] w-full">
                                <img 
                                    src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800" 
                                    alt="Fresh Groceries Bag" 
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl z-10"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Value Props Section */}
            <section className="py-10 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="flex items-center gap-4 p-4 md:justify-center">
                            <Truck className="w-10 h-10 text-green-600 stroke-[1.5]" />
                            <div>
                                <h3 className="font-bold text-gray-900">Free Delivery</h3>
                                <p className="text-sm text-gray-500">Orders over ৳1000</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 md:justify-center">
                            <ShieldCheck className="w-10 h-10 text-green-600 stroke-[1.5]" />
                            <div>
                                <h3 className="font-bold text-gray-900">100% Secure Payment</h3>
                                <p className="text-sm text-gray-500">We ensure your money is safe</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 md:justify-center">
                            <RefreshCw className="w-10 h-10 text-green-600 stroke-[1.5]" />
                            <div>
                                <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
                                <p className="text-sm text-gray-500">Return if not satisfied</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
                            <p className="text-gray-500 mt-2 font-medium">Find what you need from our wide selection</p>
                        </div>
                        <Link href={route('shop.index')} className="hidden sm:flex text-green-600 hover:text-green-700 font-bold items-center gap-1 group bg-green-50 px-5 py-2.5 rounded-lg transition-colors">
                            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <motion.div 
                        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    >
                        {featured_categories.map((category, index) => (
                            <motion.div variants={fadeIn} key={category.id}>
                                <Link href={route('shop.index', { category: category.slug })} className="group block text-center">
                                    <div className="relative w-full aspect-square rounded-lg bg-gray-100 overflow-hidden mb-4 shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
                                        <img 
                                            src={categoryImages[index % categoryImages.length]} 
                                            alt={category.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg">{category.name}</h3>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-20 bg-[#f8faf7]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-orange-600 stroke-[2]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {trending_products.slice(0, 5).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Banner Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-lg overflow-hidden bg-gray-900 text-white shadow-xl">
                        <div className="absolute inset-0">
                            <img src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-40" alt="Banner" />
                        </div>
                        <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col items-start max-w-2xl">
                            <span className="bg-green-500 text-white text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-md mb-6">Limited Time Offer</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Fresh Meat & Seafood <br/>Delivered Today</h2>
                            <p className="text-lg text-gray-200 mb-8 font-medium">Get 20% off on your first meat & seafood order. Use code: <span className="text-yellow-400 font-bold">FRESH20</span></p>
                            <Link href={route('shop.index')} className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-colors flex items-center gap-2">
                                Shop Now <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </CustomerLayout>
    );
}

// Internal ProductCard with less rounded styling
function ProductCard({ product }: { product: any }) {
    const dummyImage = `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&sig=${product.id}`;
    
    return (
        <div className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col h-full">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.is_flash_sale && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-[4px] uppercase tracking-wide">
                        Sale
                    </span>
                )}
                {product.is_featured && (
                    <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2.5 py-1 rounded-[4px] uppercase tracking-wide">
                        Hot
                    </span>
                )}
            </div>
            
            <Link href={route('shop.product', product.slug)} className="block relative aspect-[4/3] bg-gray-50 rounded-md mb-5 overflow-hidden">
                 <img 
                    src={dummyImage} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 {/* Add to cart overlay for desktop */}
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
                    <button className="bg-white text-gray-900 font-bold px-4 py-2 rounded-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-sm flex items-center gap-2 hover:bg-green-600 hover:text-white">
                        <ShoppingCart className="w-4 h-4" /> Quick Add
                    </button>
                 </div>
            </Link>
            
            <div className="flex-grow flex flex-col">
                <div className="text-[11px] font-bold uppercase tracking-wider text-green-600 mb-1.5">{product.category?.name || 'Grocery'}</div>
                <Link href={route('shop.product', product.slug)}>
                    <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors mb-2 text-[15px] leading-tight">
                        {product.name}
                    </h3>
                </Link>
                
                <div className="mt-auto pt-4">
                    <div className="text-xs text-gray-500 font-medium mb-2 bg-gray-50 inline-block px-2 py-1 rounded border border-gray-200">
                        {product.unit_value} {product.unit}
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            {product.sale_price ? (
                                <div className="flex flex-col">
                                    <span className="font-extrabold text-xl text-gray-900">৳{product.sale_price}</span>
                                    <span className="text-xs font-medium text-gray-400 line-through">৳{product.price}</span>
                                </div>
                            ) : (
                                <span className="font-extrabold text-xl text-gray-900">৳{product.price}</span>
                            )}
                        </div>
                        <button className="bg-gray-100 border border-gray-200 text-gray-700 hover:bg-green-600 hover:border-green-600 hover:text-white p-2.5 rounded-md transition-colors md:hidden">
                            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
