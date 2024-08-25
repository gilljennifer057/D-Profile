<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UserApiTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:user-api-test';

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
        $user = (new User)->setConnection('sqlite-test');

        $result = $user->create(array(
            "name" => "John Doe",
            "number" => "1234567890",
            "password" => "password123",
            "profession" => "Software Developer",
            "description" => "Experienced developer in web and mobile applications.",
            "twitter" => "https://twitter.com/johndoe",
            "instagram" => "https://instagram.com/johndoe",
            "linkedin" => "https://linkedin.com/in/johndoe",
            "facebook" => "https://facebook.com/johndoe"
        ));

        $this->info(json_encode($result,JSON_PRETTY_PRINT));
    }
}
