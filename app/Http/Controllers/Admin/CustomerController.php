<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers
        ]);
    }

    public function show($id)
    {
        $customer = User::with(['orders', 'addresses'])->findOrFail($id);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $id)
    {
        $customer = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'status' => 'sometimes|in:active,inactive,banned',
            'role' => 'sometimes|in:customer,staff,admin',
        ]);

        $customer->update($request->only(['name', 'email', 'phone', 'status', 'role']));

        return redirect()->route('admin.customers.index')->with('success', 'Customer updated successfully.');
    }
}
