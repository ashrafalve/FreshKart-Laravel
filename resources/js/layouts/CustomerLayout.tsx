import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import {
    ShoppingCart, Search, User, Menu, Heart, Phone, MapPin, ChevronDown,
    X, Grid, Percent, LogOut, UserCircle, Package, MapPin as MapPinIcon, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const page = usePage();
    const { auth } = page.props as any;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
            {/* Top Bar - Notice & Quick Links */}
            <div className="bg-gray-900 text-gray-200 text-xs py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-green-500" /> +880 1700 000 000</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-green-500" /> Delivering to: Dhaka City</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
                        <Link href="#" className="hover:text-white transition-colors">Track Order</Link>
                        <span className="text-gray-700">|</span>
                        <span className="text-green-400 font-bold">100% Secure Delivery</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`bg-white transition-all duration-300 z-50 sticky top-0 ${isScrolled ? 'shadow-md py-3' : 'py-4 border-b border-gray-200'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-4 lg:gap-8">

                        {/* Mobile Menu Button & Logo */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden text-gray-700 hover:text-green-600"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <Link href={route('home')} className="flex items-center gap-2 group">
                                <div className="bg-green-600 text-white p-1.5 rounded-md group-hover:bg-green-700 transition-colors">
                                    <ShoppingCart className="h-6 w-6" strokeWidth={2.5} />
                                </div>
                                <span className="font-black text-2xl tracking-tight text-gray-900 hidden sm:block">
                                    FreshKart<span className="text-green-600">.</span>
                                </span>
                            </Link>
                        </div>

                        {/* Search Bar - Center */}
                        <div className="hidden lg:flex flex-1 max-w-3xl relative">
                            <div className="relative w-full flex">
                                <select className="bg-gray-100 border-y border-l border-gray-200 text-gray-700 text-sm rounded-l-md px-3 py-3 outline-none focus:ring-0 focus:border-gray-200 font-medium border-r-0 cursor-pointer hover:bg-gray-200 transition-colors">
                                    <option>All Categories</option>
                                    <option>Grocery</option>
                                    <option>Meat</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full bg-white border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-3 px-4 transition-all outline-none text-gray-700"
                                />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-r-md transition-colors flex items-center justify-center">
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Actions - Right */}
                        <div className="flex items-center gap-5">
                            {/* Auth Dropdown / Links */}
                            <div className="hidden md:flex items-center">
                                {auth?.user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors p-2 rounded-md hover:bg-gray-50">
                                                <div className="w-8 h-8 rounded-md bg-green-600 text-white border border-green-700 flex items-center justify-center font-bold">
                                                    {(auth.user.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <span className="max-w-[100px] truncate">{auth.user.name}</span>
                                                <ChevronDown className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <div className="px-3 py-2 border-b border-gray-100">
                                                <p className="font-medium text-gray-900">{auth.user.name}</p>
                                                <p className="text-xs text-gray-500">{auth.user.email}</p>
                                            </div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={route('dashboard')} className="flex items-center gap-2 cursor-pointer">
                                                    <UserCircle className="h-4 w-4" /> My Account
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('dashboard')} className="flex items-center gap-2 cursor-pointer">
                                                    <Package className="h-4 w-4" /> My Orders
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('wishlist.index')} className="flex items-center gap-2 cursor-pointer">
                                                    <Heart className="h-4 w-4" /> My Wishlist
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="#" className="flex items-center gap-2 cursor-pointer">
                                                    <MapPinIcon className="h-4 w-4" /> My Addresses
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="#" className="flex items-center gap-2 cursor-pointer">
                                                    <CreditCard className="h-4 w-4" /> Payment Methods
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={route('profile.edit')} className="flex items-center gap-2 cursor-pointer">
                                                    <User className="h-4 w-4" /> Edit Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link method="post" href={route('logout')} as="button" className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50">
                                                    <LogOut className="h-4 w-4" /> Log Out
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Link href={route('login')} className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200">
                                        <User className="h-5 w-5" />
                                        <span>Sign In</span>
                                    </Link>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href={route('wishlist.index')} className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                    <Heart className="h-6 w-6" />
                                    {(page.props.wishlistCount as number) > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                            {page.props.wishlistCount as number}
                                        </span>
                                    )}
                                </Link>
                                <Link href={route('cart.index')} className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                    <ShoppingCart className="h-6 w-6" />
                                    {(page.props.cartCount as number) > 0 && (
                                        <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                            {page.props.cartCount as number}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="mt-4 lg:hidden relative">
                        <input
                            type="text"
                            placeholder="Search groceries..."
                            className="w-full bg-white border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-md py-2.5 px-4 pr-10 transition-all outline-none"
                        />
                        <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </header>

            {/* Category Navigation Bar */}
            <div className="bg-white border-b border-gray-200 hidden lg:block">
                <div className="container mx-auto px-4 flex items-center gap-8 h-12">
                    <button className="flex items-center gap-2 bg-green-600 text-white h-full px-6 font-bold hover:bg-green-700 transition-colors">
                        <Grid className="h-4 w-4" />
                        Browse Categories
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </button>
                    <nav className="flex-1 flex gap-8 text-sm font-bold text-gray-700">
                        <Link href={route('home')} className="hover:text-green-600 transition-colors">Home</Link>
                        <Link href={route('shop.index')} className="hover:text-green-600 transition-colors">Shop All</Link>
                        <Link href="#" className="hover:text-red-600 text-red-500 transition-colors flex items-center gap-1">
                            <Percent className="h-4 w-4" /> Offers
                        </Link>
                        <Link href="#" className="hover:text-green-600 transition-colors">Best Sellers</Link>
                        <Link href="#" className="hover:text-green-600 transition-colors">Fresh Produce</Link>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-gray-900/60 z-[60] backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
                        >
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <span className="font-bold text-xl">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded-md border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="p-4 flex-1 overflow-y-auto">
                                <nav className="space-y-2 font-medium text-gray-700">
                                    <Link href={route('home')} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md hover:text-green-600 border border-transparent hover:border-gray-200">
                                        <Grid className="h-5 w-5 text-gray-400" /> Home
                                    </Link>
                                    <Link href={route('shop.index')} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md hover:text-green-600 border border-transparent hover:border-gray-200">
                                        <ShoppingCart className="h-5 w-5 text-gray-400" /> Shop All
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-md text-red-500 border border-transparent hover:border-red-200">
                                        <Percent className="h-5 w-5" /> Offers & Discounts
                                    </Link>
                                    <div className="pt-4 mt-2 border-t border-gray-200">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Top Categories</p>
                                        <a href="#" className="block p-3 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-md">Fresh Produce</a>
                                        <a href="#" className="block p-3 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-md">Meat & Fish</a>
                                    </div>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Professional Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
                        <div className="lg:col-span-2">
                            <Link href={route('home')} className="flex items-center gap-2 mb-6">
                                <div className="bg-green-600 text-white p-1.5 rounded-md">
                                    <ShoppingCart className="h-6 w-6" strokeWidth={2.5} />
                                </div>
                                <span className="font-black text-2xl tracking-tight text-gray-900">FreshKart<span className="text-green-600">.</span></span>
                            </Link>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                                FreshKart BD is your ultimate destination for fresh, high-quality groceries delivered straight to your door in Bangladesh. We guarantee freshness and satisfaction.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm">
                                    <Phone className="h-8 w-8 text-gray-600" />
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Got questions? Call us 24/7</div>
                                        <div className="font-bold text-gray-900">+880 1700 000 000</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                <li><Link href={route('home')} className="hover:text-green-600 transition-colors">Home</Link></li>
                                <li><Link href={route('shop.index')} className="hover:text-green-600 transition-colors">Shop All</Link></li>
                                <li><Link href={route('about')} className="hover:text-green-600 transition-colors">About Us</Link></li>
                                <li><Link href={route('contact')} className="hover:text-green-600 transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Categories</h3>
                            <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                <li><Link href={route('shop.index', { category: 'produce' })} className="hover:text-green-600 transition-colors">Fresh Vegetables</Link></li>
                                <li><Link href={route('shop.index', { category: 'meat-seafood' })} className="hover:text-green-600 transition-colors">Meat & Seafood</Link></li>
                                <li><Link href={route('shop.index', { category: 'dairy' })} className="hover:text-green-600 transition-colors">Dairy & Bakery</Link></li>
                                <li><Link href={route('shop.index', { category: 'snacks' })} className="hover:text-green-600 transition-colors">Snacks & Beverages</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Download App</h3>
                            <p className="text-sm text-gray-500 mb-4">Get access to exclusive offers and a better shopping experience.</p>
                            <div className="space-y-3">
                                {/* Dummy App Store Buttons */}
                                <a href="#" className="block bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-3">
                                    <svg viewBox="0 0 384 512" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] leading-tight text-gray-300">Download on the</div>
                                        <div className="text-sm font-bold leading-tight">App Store</div>
                                    </div>
                                </a>
                                <a href="#" className="block bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-3">
                                    <svg viewBox="0 0 512 512" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] leading-tight text-gray-300">GET IT ON</div>
                                        <div className="text-sm font-bold leading-tight">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500 font-medium">© 2026 FreshKart BD. All rights reserved.</p>
                        <div className="flex gap-4">
                            <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">VISA</div>
                            <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">MC</div>
                            <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">bKash</div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
