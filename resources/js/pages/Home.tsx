import { Head, Link, router } from '@inertiajs/react';
import CustomerLayout from '../layouts/CustomerLayout';
import { 
    ArrowRight, ShoppingCart, ShieldCheck, Truck, RefreshCw, 
    ChevronLeft, ChevronRight, Heart, Grid, Apple, Milk, Beef, 
    Cookie, Coffee, Fish, Egg, Utensils, Wheat, Droplets 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const getCategoryIcon = (slug: string) => {
    const icons: Record<string, any> = {
        'fruits-vegetables': Apple,
        'fresh-produce': Apple,
        'vegetables': Apple,
        'dairy-bakery': Milk,
        'milk-butter': Milk,
        'chicken': Beef,
        'meat-seafood': Beef,
        'rice': Wheat,
        'snacks-beverages': Cookie,
        'beverages': Coffee,
        'grocery': Grid,
        'water': Droplets,
        'fish': Fish,
        'egg': Egg,
    };
    return icons[slug] || Grid;
};

interface HomeProps {
    featured_categories: any[];
    featured_products: any[];
    trending_products: any[];
}

export default function Home({ 
    featured_categories = [], 
    featured_products = [], 
    trending_products = [] 
}: HomeProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/images/freshkartbanner0.png",
            title: "Fresh Groceries",
            subtitle: "Delivered to your doorstep",
            buttonText: "Shop Now",
            color: "from-green-600/20"
        },
        {
            image: "/images/freshkartbanner1.png",
            title: "Weekly Amazing Deals",
            subtitle: "Save up to 50% on essentials",
            buttonText: "View Offers",
            color: "from-blue-600/20"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

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

    const categoryImages = [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1607006411046-2b47fdbb20f2?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400",
    ];

    return (
        <CustomerLayout>
            <Head title="Fresh Groceries Delivered Fast | FreshKart BD" />

            {/* Top Slider Section */}
            <section className="bg-white py-6">
                <div className="container mx-auto px-4">
                    <div className="relative w-full overflow-hidden bg-gray-100 aspect-[2.5/1] md:aspect-[3/1] rounded-2xl shadow-lg border border-gray-100">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img 
                                    src={slides[currentSlide].image} 
                                    alt={slides[currentSlide].title}
                                    className="w-full h-full object-fill"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button 
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/70 backdrop-blur-md text-gray-900 hover:bg-white hover:text-green-600 shadow-sm transition-all hidden md:block"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/70 backdrop-blur-md text-gray-900 hover:bg-white hover:text-green-600 shadow-sm transition-all hidden md:block"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Indicators */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1.5 transition-all rounded-full ${currentSlide === idx ? 'w-8 bg-green-500' : 'w-2.5 bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Hero Content Section */}
            <section className="relative bg-[#f8faf7] overflow-hidden pt-16 pb-20 border-b border-gray-100">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div 
                        className="max-w-4xl mx-auto text-center space-y-8"
                        initial="hidden" animate="visible" variants={staggerContainer}
                    >

                        
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                                Fresh Groceries, <br />
                                <span className="text-green-600 inline-block mt-2">একদম আপনার দরজায়!</span>
                            </motion.h1>
                            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                                সেরা মানের নিত্যপ্রয়োজনীয় পণ্য। আমাদের daily amazing deals মিস করবেন না! সরাসরি খামার থেকে আপনার টেবিলে।
                            </motion.p>
                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center pt-4">
                                <Link 
                                    href={route('shop.index')} 
                                    className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-green-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                                >
                                    Shop Now <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link 
                                    href={route('shop.index', { offers: 1 })} 
                                    className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2 transform hover:-translate-y-1"
                                >
                                    অফারগুলো দেখুন
                                </Link>
                            </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Fast Delivery</h3>
                                <p className="text-sm text-gray-500">ঢাকায় ২ ঘন্টার মধ্যে ডেলিভারি</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">১০০% Fresh Products</h3>
                                <p className="text-sm text-gray-500">সরাসরি খামার থেকে আপনার দরজায়</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                                <p className="text-sm text-gray-500">বিকাশ, নগদ সহ নিরাপদ পেমেন্ট সুবিধা</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">ক্যাটাগরি অনুযায়ী শপিং করুন</h2>
                            <p className="text-gray-500 mt-2 font-medium">আপনার নিত্যপ্রয়োজনীয় জিনিস খুঁজুন খুব সহজেই</p>
                        </div>
                        <Link href={route('shop.index')} className="hidden sm:flex text-green-600 font-bold hover:text-green-700 items-center gap-1 group">
                            See All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {featured_categories.map((category) => {
                            const IconComponent = getCategoryIcon(category.slug || category.name.toLowerCase());
                            return (
                                <motion.div variants={fadeIn} key={category.id}>
                                    <Link href={route('shop.index', { category: category.slug })} className="group block text-center">
                                        <div className="relative w-full aspect-square rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md group-hover:border-green-200 transition-all duration-300">
                                            <div className="p-6 rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                                <IconComponent className="w-10 h-10" />
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{category.name}</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{category.products_count || 0} Items</p>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-600 w-2 h-10 rounded-full" />
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">জনপ্রিয় প্রোডাক্ট (Trending Now)</h2>
                                <p className="text-gray-500 mt-1 font-medium hidden md:block">আমাদের স্টোরের সবচেয়ে বেশি বিক্রিত পণ্য</p>
                            </div>
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
                    <div className="relative rounded-lg overflow-hidden bg-gray-900 text-white shadow-xl group">
                        <div className="absolute inset-0">
                            <img 
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                                alt="Newsletter" 
                                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Stay updated with fresh deals!</h2>
                                <p className="text-lg text-gray-300 font-medium max-w-lg">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন এবং পান দারুণ সব অফার এবং নতুন পণ্যের আপডেট।</p>
                            </div>
                            <div className="flex w-full md:w-auto gap-2">
                                <input type="email" placeholder="আপনার ইমেইল দিন" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 outline-none focus:bg-white/20 transition-all flex-1 min-w-[200px]" />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg whitespace-nowrap">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </CustomerLayout>
    );
}

function ProductCard({ product }: { product: any }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisting, setIsWishlisting] = useState(false);

    if (!product) return null;
    
    const dummyImage = `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&sig=${product.id}`;
    
    const addToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAdding) return;
        
        setIsAdding(true);
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: 1
        }, { 
            preserveScroll: true,
            onFinish: () => setIsAdding(false)
        });
    };

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isWishlisting) return;

        setIsWishlisting(true);
        router.post(route('wishlist.toggle'), {
            product_id: product.id
        }, { 
            preserveScroll: true,
            onFinish: () => setIsWishlisting(false)
        });
    };

    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full">
            <Link href={product.slug ? route('shop.product', product.slug) : '#'} className="block relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden">
                 <img 
                    src={dummyImage} 
                    alt={product.name || 'Product'}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute top-2 right-2 z-10">
                    <button 
                        onClick={toggleWishlist}
                        disabled={isWishlisting}
                        className={`bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm transition-all ${product.is_wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-white'} ${isWishlisting ? 'opacity-50 scale-95' : ''}`}
                    >
                        <Heart className={`w-4 h-4 ${product.is_wishlisted ? 'fill-current' : ''} ${isWishlisting ? 'animate-pulse' : ''}`} />
                    </button>
                 </div>
            </Link>
            
            <div className="flex-grow flex flex-col">
                <div className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1 leading-none">{product.category?.name || 'Grocery'}</div>
                <Link href={product.slug ? route('shop.product', product.slug) : '#'}>
                    <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors mb-2 text-sm leading-tight h-10">
                        {product.name || 'Unnamed Product'}
                    </h3>
                </Link>
                
                <div className="mt-auto">
                    <div className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-wide">
                        {product.unit_value} {product.unit}
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            {product.sale_price ? (
                                <div className="flex flex-col">
                                    <span className="font-black text-lg text-gray-900 leading-none">৳{product.sale_price}</span>
                                    <span className="text-[10px] font-bold text-gray-400 line-through leading-none mt-1">৳{product.price}</span>
                                </div>
                            ) : (
                                <span className="font-black text-lg text-gray-900">৳{product.price || 0}</span>
                            )}
                        </div>
                        <button 
                            onClick={addToCart} 
                            disabled={isAdding}
                            className={`bg-green-600 text-white p-2.5 rounded-lg hover:bg-green-700 transition-all shadow-md active:scale-95 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ShoppingCart className={`h-5 w-5 ${isAdding ? 'animate-bounce' : ''}`} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
