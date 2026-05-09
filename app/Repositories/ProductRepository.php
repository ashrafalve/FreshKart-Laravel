<?php

namespace App\Repositories;

use App\Interfaces\Repositories\ProductRepositoryInterface;
use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function getActiveProducts(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->where('is_active', true)
            ->with(['category', 'brand'])
            ->latest()
            ->paginate($perPage);
    }

    public function getFeaturedProducts(int $limit = 10)
    {
        return $this->model->where('is_active', true)
            ->where('is_featured', true)
            ->with(['category', 'brand'])
            ->limit($limit)
            ->get();
    }

    public function getTrendingProducts(int $limit = 10)
    {
        return $this->model->where('is_active', true)
            ->where('is_trending', true)
            ->with(['category', 'brand'])
            ->limit($limit)
            ->get();
    }

    public function findBySlug(string $slug): ?Product
    {
        return $this->model->where('slug', $slug)
            ->with(['category', 'brand', 'images', 'variants', 'tags', 'reviews.user'])
            ->first();
    }

    public function search(string $query, int $perPage = 15): LengthAwarePaginator
    {
        return $this->getFilteredProducts(['q' => $query], $perPage);
    }

    public function getFilteredProducts(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->where('is_active', true);

        if (!empty($filters['q'])) {
            $searchTerm = $filters['q'];
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%")
                    ->orWhere('sku', 'like', "%{$searchTerm}%");
            });
        }

        if (!empty($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (!empty($filters['offers'])) {
            $query->where(function($q) {
                $q->whereNotNull('sale_price')->where('sale_price', '>', 0);
            });
        }

        if (!empty($filters['sort'])) {
            switch ($filters['sort']) {
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'popular':
                    $query->orderBy('is_trending', 'desc')->orderBy('is_featured', 'desc')->latest();
                    break;
                default:
                    $query->latest();
            }
        } else {
            $query->latest();
        }

        return $query->with(['category', 'brand'])
            ->paginate($perPage);
    }
}
