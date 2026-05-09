<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index(): Response
    {
        $cart = session()->get('cart', []);
        
        $subtotal = 0;
        foreach ($cart as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }
        
        return Inertia::render('Shop/Checkout', [
            'cart' => array_values($cart),
            'addresses' => auth()->check() ? auth()->user()->addresses : [],
            'subtotal' => round($subtotal, 2),
            'shipping' => 60,
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
            'city' => 'required|string|max:100',
            'area' => 'required|string|max:100',
            'payment_method' => 'required|in:cod,bkash',
        ]);

        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('shop.index')->with('error', 'Your cart is empty.');
        }

        $subtotal = 0;
        foreach ($cart as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }

        $shippingCharge = 60;
        $total = $subtotal + $shippingCharge;

        DB::beginTransaction();

        try {
            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'user_id' => auth()->id(),
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $request->payment_method,
                'subtotal' => $subtotal,
                'shipping_charge' => $shippingCharge,
                'total' => $total,
                'shipping_name' => $request->recipient_name,
                'shipping_phone' => $request->phone,
                'shipping_address_line1' => $request->address_line1,
                'shipping_city' => $request->city,
                'shipping_area' => $request->area,
            ]);

            foreach ($cart as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'product_name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                    'subtotal' => $item['price'] * $item['quantity'],
                ]);
                
                // Update product stock if needed
                Product::where('id', $item['product_id'])->decrement('stock_quantity', $item['quantity']);
            }

            DB::commit();

            // Clear the cart
            session()->forget('cart');

            return redirect()->route('checkout.success')->with('success', 'Your order has been placed!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to place order. ' . $e->getMessage());
        }
    }

    /**
     * Display success page.
     */
    public function success(): Response
    {
        return Inertia::render('Shop/CheckoutSuccess');
    }
}
