<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // For SQLite compatibility, delete instead of truncate
        DB::table('products')->delete();

        // Ensure we have a default category
        $category = Category::firstOrCreate([
            'slug' => 'grocery'
        ], [
            'name' => 'Grocery',
            'is_active' => true
        ]);

        $products = [
            [
                'name' => 'Miniket Rice (Premium)',
                'price' => 380,
                'sale_price' => 365,
                'unit' => 'kg',
                'unit_value' => '5',
                'stock_quantity' => 100,
                'is_featured' => true,
                'is_flash_sale' => false,
                'is_trending' => true,
            ],
            [
                'name' => 'Rupchanda Soyabean Oil',
                'price' => 850,
                'sale_price' => 830,
                'unit' => 'Liter',
                'unit_value' => '5',
                'stock_quantity' => 50,
                'is_featured' => true,
                'is_flash_sale' => true,
                'is_trending' => true,
            ],
            [
                'name' => 'Radhuni Turmeric Powder',
                'price' => 120,
                'sale_price' => null,
                'unit' => 'g',
                'unit_value' => '200',
                'stock_quantity' => 200,
                'is_featured' => false,
                'is_flash_sale' => false,
                'is_trending' => false,
            ],
            [
                'name' => 'Fresh Refined Sugar',
                'price' => 140,
                'sale_price' => 135,
                'unit' => 'kg',
                'unit_value' => '1',
                'stock_quantity' => 150,
                'is_featured' => true,
                'is_flash_sale' => false,
                'is_trending' => true,
            ],
            [
                'name' => 'Teer Atta',
                'price' => 130,
                'sale_price' => 125,
                'unit' => 'kg',
                'unit_value' => '2',
                'stock_quantity' => 80,
                'is_featured' => false,
                'is_flash_sale' => false,
                'is_trending' => false,
            ],
            [
                'name' => 'Pran Tomato Ketchup',
                'price' => 110,
                'sale_price' => null,
                'unit' => 'g',
                'unit_value' => '340',
                'stock_quantity' => 120,
                'is_featured' => false,
                'is_flash_sale' => true,
                'is_trending' => true,
            ],
            [
                'name' => 'ACI Pure Salt',
                'price' => 40,
                'sale_price' => null,
                'unit' => 'kg',
                'unit_value' => '1',
                'stock_quantity' => 300,
                'is_featured' => false,
                'is_flash_sale' => false,
                'is_trending' => false,
            ],
            [
                'name' => 'Radhuni Chilli Powder',
                'price' => 140,
                'sale_price' => 135,
                'unit' => 'g',
                'unit_value' => '200',
                'stock_quantity' => 150,
                'is_featured' => true,
                'is_flash_sale' => false,
                'is_trending' => true,
            ],
            [
                'name' => 'Farm Fresh Milk (Pasteurized)',
                'price' => 90,
                'sale_price' => 85,
                'unit' => 'ml',
                'unit_value' => '1000',
                'stock_quantity' => 60,
                'is_featured' => true,
                'is_flash_sale' => true,
                'is_trending' => true,
            ],
            [
                'name' => 'Local Onion',
                'price' => 110,
                'sale_price' => 100,
                'unit' => 'kg',
                'unit_value' => '1',
                'stock_quantity' => 200,
                'is_featured' => false,
                'is_flash_sale' => true,
                'is_trending' => true,
            ]
        ];

        foreach ($products as $p) {
            Product::create([
                'name' => $p['name'],
                'slug' => Str::slug($p['name']),
                'category_id' => $category->id,
                'brand_id' => null,
                'price' => $p['price'],
                'sale_price' => $p['sale_price'],
                'unit' => $p['unit'],
                'unit_value' => $p['unit_value'],
                'stock_quantity' => $p['stock_quantity'],
                'sku' => strtoupper(Str::random(8)),
                'is_featured' => $p['is_featured'],
                'is_flash_sale' => $p['is_flash_sale'],
                'is_trending' => $p['is_trending'],
                'description' => 'A premium quality product from Bangladesh. Perfect for your daily needs.',
            ]);
        }
    }
}
