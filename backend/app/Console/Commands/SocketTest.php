<?php

namespace App\Console\Commands;

use App\Events\NewMessage;
use Illuminate\Console\Command;

class SocketTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:socket-test';

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
        echo json_encode(broadcast(new NewMessage("hello")));

        // echo "Message Sent";
    }
}
