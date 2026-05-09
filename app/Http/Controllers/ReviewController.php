<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'body' => 'required|string|min:5|max:1000',
        ]);

        // Check if user already reviewed this product
        $existingReview = Review::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingReview) {
            return redirect()->back()->with('error', 'You have already reviewed this product.');
        }

        Review::create([
            'product_id' => $request->product_id,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'body' => $request->body,
            'is_approved' => true, // Auto-approve for now
        ]);

        // Update product average rating
        $product = Product::find($request->product_id);
        $avgRating = Review::where('product_id', $product->id)->avg('rating');
        $ratingCount = Review::where('product_id', $product->id)->count();
        
        $product->update([
            'rating_avg' => round($avgRating, 1),
            'rating_count' => $ratingCount
        ]);

        return redirect()->back()->with('success', 'Thank you for your review!');
    }
}
