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
        return $this->model->where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('sku', 'like', "%{$query}%");
            })
            ->with(['category', 'brand'])
            ->paginate($perPage);
    }
}
