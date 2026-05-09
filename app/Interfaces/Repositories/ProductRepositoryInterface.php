<?php

namespace App\Interfaces\Repositories;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function getActiveProducts(int $perPage = 15): LengthAwarePaginator;
    public function getFeaturedProducts(int $limit = 10);
    public function getTrendingProducts(int $limit = 10);
    public function findBySlug(string $slug): ?Product;
    public function search(string $query, int $perPage = 15): LengthAwarePaginator;
    public function getFilteredProducts(array $filters, int $perPage = 15): LengthAwarePaginator;
}
