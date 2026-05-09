<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $recentOrders = Order::where('user_id', $user->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('dashboard', [
            'recentOrders' => $recentOrders
        ]);
    }

    public function orders()
    {
        $orders = Order::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Account/Orders', [
            'orders' => $orders
        ]);
    }

    public function addresses()
    {
        $addresses = Address::where('user_id', Auth::id())
            ->orderBy('is_default', 'desc')
            ->get();

        return Inertia::render('Account/Addresses', [
            'addresses' => $addresses
        ]);
    }

    public function payments()
    {
        // For now, since we don't store cards directly, we show an empty list or mock data from a service
        return Inertia::render('Account/Payments', [
            'paymentMethods' => []
        ]);
    }
}
