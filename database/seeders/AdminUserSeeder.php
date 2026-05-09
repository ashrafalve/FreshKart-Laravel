<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@freshkartbd.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'), // default password for dev
                'phone' => '01700000000',
                'role' => 'admin',
                'status' => 'active',
            ]
        );

        $admin->assignRole('admin');
        
        // Create a test customer
        $customer = User::firstOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Test Customer',
                'password' => Hash::make('password'),
                'phone' => '01800000000',
                'role' => 'customer',
                'status' => 'active',
            ]
        );
        $customer->assignRole('customer');
    }
}
