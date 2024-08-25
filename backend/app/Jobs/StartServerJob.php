<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Symfony\Component\Process\Process;

class StartServerJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        $process = new Process(['php', 'artisan', 'help']);
        $process->start();

        // Optional: Log the output or handle it as needed
        $process->waitUntil(function ($type, $output) {
            echo $output;
            return false; // Change to true to stop waiting, if needed
        });
    }
}
