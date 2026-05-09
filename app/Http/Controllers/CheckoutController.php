<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index(): Response
    {
        // Assuming user must be logged in, or guest checkout is allowed
        // Need to pass cart data, addresses, delivery slots, etc.
        
        return Inertia::render('Shop/Checkout', [
            'cart' => [], // Add actual cart fetch logic
            'addresses' => auth()->check() ? auth()->user()->addresses : [],
        ]);
    }

    /**
     * Process the checkout.
     */
    public function store(Request $request)
    {
        $request->validate([
            'recipient_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address_line1' => 'required|string|max:500',
            'payment_method' => 'required|in:cod,bkash',
        ]);

        // In a real app, we would create the order in the database here
        // and clear the cart. For now, we redirect to success.
        
        return redirect()->route('checkout.success')->with('success', 'Your order has been placed!');
    }

    /**
     * Display success page.
     */
    public function success(): Response
    {
        return Inertia::render('Shop/CheckoutSuccess');
    }
}
