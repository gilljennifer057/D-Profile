<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class StartServer extends Command
{
    protected $signature = 'app:start-server';
    protected $description = 'Start the Laravel development server';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Use the full path to the PHP binary and Laravel artisan script
        $process = new Process(['php', 'artisan', 'serve']);

        // Start the process asynchronously
        $process->start();

        // Optionally handle the process output
        $process->waitUntil(function ($type, $output) {
            $this->info($output);
            return false; // Change to true to stop waiting, if needed
        });

        $this->info('Server started successfully');
    }
}
