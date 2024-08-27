<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::truncate();

        \App\Models\User::factory(1)->create([
            // 'user_type' => "partner",
            'number' => "2222222222",
            'user_type' => "client"

        ]);
    }
}
