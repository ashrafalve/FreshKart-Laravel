<?php

namespace App\Services;

use App\Interfaces\Services\ProductServiceInterface;
use App\Interfaces\Repositories\ProductRepositoryInterface;
use App\Models\Category;
use App\Models\Banner;

class ProductService implements ProductServiceInterface
{
    protected ProductRepositoryInterface $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getHomePageData(): array
    {
        return [
            'hero_banners' => Banner::where('position', 'hero_slider')->where('is_active', true)->orderBy('sort_order')->get(),
            'featured_categories' => Category::where('is_featured', true)->where('is_active', true)->orderBy('sort_order')->get(),
            'featured_products' => $this->productRepository->getFeaturedProducts(10),
            'trending_products' => $this->productRepository->getTrendingProducts(10),
            'flash_sales' => $this->productRepository->getActiveProducts(8), // Placeholder logic
        ];
    }

    public function getShopPageData(array $filters): array
    {
        return [
            'products' => $this->productRepository->getFilteredProducts($filters),
            'categories' => Category::where('is_active', true)->withCount('products')->get(),
        ];
    }

    public function getProductDetails(string $slug): array
    {
        $product = $this->productRepository->findBySlug($slug);
        
        if (!$product) {
            abort(404);
        }

        return [
            'product' => $product,
            'related_products' => $this->productRepository->getFeaturedProducts(4), // Simplified related logic
        ];
    }
}
