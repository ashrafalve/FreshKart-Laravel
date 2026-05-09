<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ShopController;

Route::get('/', [ShopController::class, 'home'])->name('home');
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/product/{slug}', [ShopController::class, 'show'])->name('shop.product');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'store'])->name('cart.store');
    Route::put('/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
});

Route::prefix('checkout')->middleware('auth')->group(function () {
    Route::get('/', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/success', [CheckoutController::class, 'success'])->name('checkout.success');
});

use App\Http\Controllers\WishlistController;

Route::prefix('wishlist')->middleware('auth')->group(function () {
    Route::get('/', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/toggle', [WishlistController::class, 'toggle'])->name('wishlist.toggle');
});

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;

// Admin Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Products full CRUD
    Route::resource('products', AdminProductController::class);
    
    // Placeholders for other sections
    Route::get('/orders', function() { return Inertia::render('Admin/Orders/Index'); })->name('orders.index');
    Route::get('/categories', function() { return Inertia::render('Admin/Categories/Index'); })->name('categories.index');
    Route::get('/customers', function() { return Inertia::render('Admin/Customers/Index'); })->name('customers.index');
    Route::get('/settings', function() { return Inertia::render('Admin/Settings/Index'); })->name('settings.index');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
