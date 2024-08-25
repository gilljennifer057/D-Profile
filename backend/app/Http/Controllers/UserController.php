<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::orderByDesc("id")
            ->where("user_type", request("user_type", "partner"))
            ->withCount([
                "service_requests",
                "partner_service_request" => function ($q) {
                    $q->where("client_id", 8);
                }
            ])
            ->with("service_requests")
            ->paginate(request('itemsPerPage') ?? 15);
    }

    public function Clients()
    {

        return User::orderByDesc("id")
            ->where("user_type", "client")
            ->with(["isRequest" => function ($q) {
                $q->where("partner_id", request("partner_id"));
            }])
            ->paginate(request('itemsPerPage') ?? 15);
    }

    public function Partners()
    {
        return User::orderByDesc("id")
            ->where("user_type", "partner")
            ->withCount([
                "service_requests",
            ])
            ->with(["partner_service_request" => function ($q) {
                $q->where("client_id", request("client_id"));
            }])
            ->with("service_requests")
            ->paginate(request('itemsPerPage') ?? 15);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return User::create($request->validated());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function login(StoreRequest $request)
    {
        return User::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(User $User)
    {
        return $User;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, User $User)
    {
        $User->update($request->validated());

        return $User;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $User)
    {
        $User->delete();

        return response()->noContent();
    }
    public function clean(User $User)
    {
        $User->truncate();

        return "hello world";
    }
}
