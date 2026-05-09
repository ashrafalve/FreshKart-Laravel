<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Radhuni', 'Pran', 'Fresh', 'Teer', 'Aarong', 'Kazi Farms', 'Nestle', 'Unilever'
        ];

        foreach ($brands as $brand) {
            Brand::factory()->create([
                'name' => $brand,
                'slug' => \Illuminate\Support\Str::slug($brand),
            ]);
        }
    }
}
