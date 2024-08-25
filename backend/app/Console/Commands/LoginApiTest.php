<?php

namespace App\Console\Commands;

use App\Models\User;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class LoginApiTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'login-api-test';

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
        $email = $this->ask("email");
        $password = $this->ask("password");

        $user = User::where('email', $email)->first();


        if (!$user || !Hash::check($password, $user->password)) {
            $this->error('The provided credentials are incorrect.');
            return;
        }

        $this->info($user->createToken('token')->plainTextToken);
    }
}
