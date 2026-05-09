<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Fresh Produce' => [
                'Vegetables', 'Fruits', 'Fresh Herbs'
            ],
            'Meat & Seafood' => [
                'Chicken', 'Beef & Mutton', 'Fresh Fish', 'Dried Fish'
            ],
            'Dairy & Eggs' => [
                'Milk & Butter', 'Eggs', 'Cheese & Yogurt'
            ],
            'Pantry' => [
                'Rice', 'Dal or Lentil', 'Spices', 'Oil', 'Salt & Sugar'
            ],
            'Snacks' => [
                'Biscuits & Cookies', 'Chips & Crackers', 'Noodles & Pasta', 'Chocolates'
            ],
            'Beverages' => [
                'Tea & Coffee', 'Juices', 'Soft Drinks', 'Water'
            ]
        ];

        $sortOrder = 1;
        foreach ($categories as $parentName => $children) {
            $parent = Category::factory()->create([
                'name' => $parentName,
                'slug' => \Illuminate\Support\Str::slug($parentName),
                'sort_order' => $sortOrder++ * 10,
            ]);

            $childSort = 1;
            foreach ($children as $childName) {
                Category::factory()->create([
                    'parent_id' => $parent->id,
                    'name' => $childName,
                    'slug' => \Illuminate\Support\Str::slug($childName),
                    'sort_order' => $childSort++ * 10,
                ]);
            }
        }
    }
}
