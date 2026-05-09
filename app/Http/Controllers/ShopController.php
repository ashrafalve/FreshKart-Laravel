<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\Services\ProductServiceInterface;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    protected ProductServiceInterface $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display the home page.
     */
    public function home(): Response
    {
        $data = $this->productService->getHomePageData();
        return Inertia::render('Home', $data);
    }

    /**
     * Display the shop/category page.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['q', 'category', 'brand', 'sort', 'min_price', 'max_price']);
        $data = $this->productService->getShopPageData($filters);
        
        return Inertia::render('Shop/Index', array_merge($data, ['filters' => $filters]));
    }

    /**
     * Display product details.
     */
    public function show(string $slug): Response
    {
        $data = $this->productService->getProductDetails($slug);
        return Inertia::render('Shop/Product', $data);
    }
}
