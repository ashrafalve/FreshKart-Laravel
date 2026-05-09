<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

use Illuminate\Support\Facades\Cache;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'cartCount' => function () {
                $cart = session()->get('cart', []);
                return array_sum(array_column($cart, 'quantity'));
            },
            'wishlistCount' => function () use ($request) {
                if ($request->user()) {
                    return \Illuminate\Support\Facades\DB::table('wishlists')->where('user_id', $request->user()->id)->count();
                }
                return 0;
            },
            'categories' => function () {
                return Cache::remember('all_categories', 3600, function() {
                    return \App\Models\Category::where('is_active', true)->withCount('products')->get();
                });
            },
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ]);
    }
}
