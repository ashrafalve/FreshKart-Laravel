<?php

namespace App\Interfaces\Services;

interface ProductServiceInterface
{
    public function getHomePageData(): array;
    public function getShopPageData(array $filters): array;
    public function getProductDetails(string $slug): array;
}
