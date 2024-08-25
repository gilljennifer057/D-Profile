<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest\StoreRequest;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ServiceRequest::orderByDesc("id")->paginate(request('itemsPerPage') ?? 15);
    }

    // for client side only only pass user id
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return ServiceRequest::create($request->validated());
    }



    // partner side only =? user_id , stauts = (1,2,3)

    public function update(StoreRequest $request, ServiceRequest $ServiceRequest)
    {
        $ServiceRequest->update($request->validated());

        return $ServiceRequest;
    }

    public function destroy(ServiceRequest $ServiceRequest)
    {
        $ServiceRequest->delete();

        return response()->noContent();
    }


    public function clean(ServiceRequest $ServiceRequest)
    {
        $ServiceRequest->truncate();

        return "hello world";
    }
}
