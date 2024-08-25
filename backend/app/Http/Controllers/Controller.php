<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Jobs\StartServerJob;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function startServer()
    {
        StartServerJob::dispatch();

        return response()->json(['status' => 'Server starting']);
    }


    public function getWebViewUrl()
    {
        // return request("url");
        return "https://alarm.xtremeguard.org/login/";
    }

    public function processImage($folder): string
    {
        $base64Image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', request('attachment')));
        $imageName = time() . ".png";
        $publicDirectory = public_path($folder);
        if (!file_exists($publicDirectory)) {
            mkdir($publicDirectory, 0777, true);
        }
        file_put_contents($publicDirectory . '/' . $imageName, $base64Image);
        return $imageName;
    }

    public function sendMessage()
    {
        broadcast(new NewMessage("hello"));

        echo "Message Sent";
    }
}
