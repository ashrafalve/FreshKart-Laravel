<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlistProducts = [];
        
        if (Auth::check()) {
            $wishlistProducts = Auth::user()->wishlists()->with('product')->get()->pluck('product');
        }

        return Inertia::render('Shop/Wishlist', [
            'products' => $wishlistProducts
        ]);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to add items to wishlist.');
        }

        $user = Auth::user();
        $exists = DB::table('wishlists')
            ->where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->exists();

        if ($exists) {
            DB::table('wishlists')
                ->where('user_id', $user->id)
                ->where('product_id', $request->product_id)
                ->delete();
            $message = 'Item removed from wishlist.';
        } else {
            DB::table('wishlists')->insert([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $message = 'Item added to wishlist.';
        }

        return redirect()->back()->with('success', $message);
    }
}
