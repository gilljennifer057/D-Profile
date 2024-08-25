<?php

namespace App\Http\Controllers;

use App\Models\Diary;
use Illuminate\Http\Request;

class DiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return Diary::latest()->paginate();

    }


    public function store(Request $request,Diary $diary)
    {

        $data = $request->all();

        if (request('attachment')) {
            $data["attachment"] = $this->processImage("attachment");
        }

        return $diary->create($data);
    }


    public function update(Request $request, Diary $diary)
    {
        $data = $request->all();

        if (request('attachment')) {
            $data["attachment"] = $this->processImage("attachment");
        }

        return $diary->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diary $diary)
    {
        $diary->delete();

        return response()->noContent();
    }
}
