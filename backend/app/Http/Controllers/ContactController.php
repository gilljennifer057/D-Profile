<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\StoreRequest;
use App\Http\Requests\Contact\UpdateRequest;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contact::orderByDesc("id")->paginate(request("per_page") ?? 10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $foundUser = User::where("number", $data["number"])->value("id");

        if (!$foundUser) {

            return response()->json([
                "message" => "User does not exist",
                "errors" => [
                    "number" => "User does not exist"
                ]
            ], 422);
        }

        $data["user_id"] = $foundUser;

        return Contact::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return $contact;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->noContent();
    }
}
