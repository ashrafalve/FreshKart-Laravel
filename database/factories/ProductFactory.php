<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\Brand;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);
        $price = fake()->randomFloat(2, 50, 2000);
        $hasSale = fake()->boolean(30);
        
        return [
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'brand_id' => fake()->boolean(70) ? (Brand::inRandomOrder()->first()->id ?? Brand::factory()) : null,
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),
            'sku' => strtoupper(fake()->unique()->bothify('??###-###')),
            'barcode' => fake()->ean13(),
            'price' => $price,
            'sale_price' => $hasSale ? $price * fake()->randomFloat(2, 0.7, 0.9) : null,
            'cost_price' => $price * fake()->randomFloat(2, 0.4, 0.6),
            'unit' => fake()->randomElement(['piece', 'kg', 'liter', 'pack', 'box']),
            'unit_value' => fake()->randomElement([1, 0.5, 2, 5]),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'min_order_quantity' => 1,
            'max_order_quantity' => fake()->randomElement([10, 20, null]),
            'track_stock' => true,
            'stock_status' => 'in_stock',
            'is_active' => true,
            'is_featured' => fake()->boolean(20),
            'is_trending' => fake()->boolean(20),
            'rating_avg' => fake()->randomFloat(2, 3.5, 5.0),
            'rating_count' => fake()->numberBetween(0, 500),
            'sales_count' => fake()->numberBetween(0, 1000),
            'views_count' => fake()->numberBetween(100, 5000),
        ];
    }
}
