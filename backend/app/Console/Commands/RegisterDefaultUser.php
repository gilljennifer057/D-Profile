<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class RegisterDefaultUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'register-default-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->ask("name", "admin");
        $number = $this->ask("number", '0' . rand(1000000000, 9999999999));
        $email = $this->ask("email", "admin");
        $password = $this->ask("password", Hash::make("admin"));

        User::truncate();


        User::create([
            "name" => $name,
            "number" => $number,
            "email" => $email,
            "password" => $password,
        ]);

        $this->info("Default User Created");
    }
}
