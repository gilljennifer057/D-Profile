<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoRequest;
use App\Models\Video;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Video::orderByDesc("id")->paginate(request("per_page") ?? 10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VideoRequest $request)
    {
        $data = $request->validated();

        if (isset($request->thumbnail)) {
            $file = $request->file('thumbnail');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $ext;
            $request->file('thumbnail')->move(public_path('thumbnails'), $fileName);
            $data['thumbnail'] = $fileName;
        }

        if (isset($request->name)) {
            $file = $request->file('name');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $ext;
            $request->file('name')->move(public_path('videos'), $fileName);
            $data['name'] = $fileName;
        }


        return Video::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function videoUpdate(VideoRequest $request, Video $video)
    {
        $data = $request->validated();

        if (isset($request->thumbnail)) {
            $file = $request->file('thumbnail');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $ext;
            $request->file('thumbnail')->move(public_path('thumbnails'), $fileName);
            $data['thumbnail'] = $fileName;
        }

        if (isset($request->name)) {
            $file = $request->file('name');
            $ext = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $ext;
            $request->file('name')->move(public_path('videos'), $fileName);
            $data['name'] = $fileName;
        }

        $video->update($data);

        return $video;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        $video->delete();

        return response()->noContent();
    }
}
