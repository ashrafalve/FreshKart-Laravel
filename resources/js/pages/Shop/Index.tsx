import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '../../layouts/CustomerLayout';
import { Filter, ChevronDown, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ShopProps {
    products: any;
    categories: any[];
    filters: any;
}

export default function ShopIndex({ products, categories, filters }: ShopProps) {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    return (
        <CustomerLayout>
            <Head title="Shop - FreshKart BD" />

            <div className="bg-gray-50 py-8 min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs & Header */}
                    <div className="mb-8">
                        <div className="text-sm text-gray-500 mb-2">
                            <Link href={route('home')} className="hover:text-green-600">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">Shop</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            {/* Mobile filter toggle */}
                            <button 
                                className="md:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-lg font-medium text-gray-900"
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            >
                                <Filter className="h-5 w-5" />
                                Filters
                            </button>

                            <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} md:block bg-white rounded-lg border border-gray-200 p-6 mt-4 md:mt-0 sticky top-24`}>
                                {/* Categories */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-lg mb-4 pb-2 border-b border-gray-100 text-gray-900">Categories</h3>
                                    <div className="space-y-2">
                                        <Link 
                                            href={route('shop.index')} 
                                            className={`block text-sm py-1 ${!filters.category ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600 font-medium'}`}
                                        >
                                            All Categories
                                        </Link>
                                        {categories.filter(c => !c.parent_id).map((category) => (
                                            <Link 
                                                key={category.id} 
                                                href={route('shop.index', { category: category.slug })}
                                                className={`block text-sm py-1 ${filters.category === category.slug ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600 font-medium'}`}
                                            >
                                                {category.name} <span className="text-gray-400 text-xs">({category.products_count})</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="font-bold text-lg mb-4 pb-2 border-b border-gray-100 text-gray-900">Price Range</h3>
                                    <div className="flex items-center gap-2">
                                        <input type="number" placeholder="Min" className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none" />
                                        <span className="text-gray-400">-</span>
                                        <input type="number" placeholder="Max" className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none" />
                                    </div>
                                    <button className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-md text-sm font-bold hover:bg-gray-800 transition-colors">
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {/* Sort & Stats Bar */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-wrap justify-between items-center gap-4 shadow-sm">
                                <div className="text-sm text-gray-600 font-medium">
                                    Showing <span className="font-bold text-gray-900">{products.from || 0} - {products.to || 0}</span> of <span className="font-bold text-gray-900">{products.total}</span> products
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                                    <select className="bg-white border border-gray-300 text-gray-900 font-medium text-sm rounded-md py-2 px-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none">
                                        <option value="latest">Latest Added</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="popular">Most Popular</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {products.data.map((product: any) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Empty State */}
                            {products.data.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="text-gray-400 mb-4 flex justify-center">
                                        <Filter className="h-12 w-12" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                                    <Link href={route('shop.index')} className="mt-4 inline-block text-green-600 font-bold hover:underline">
                                        Clear all filters
                                    </Link>
                                </div>
                            )}

                            {/* Pagination (Simplified visually) */}
                            {products.last_page > 1 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    {products.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-md text-sm font-bold ${
                                                link.active 
                                                ? 'bg-green-600 text-white' 
                                                : link.url 
                                                    ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' 
                                                    : 'bg-transparent text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
