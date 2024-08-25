<?php

namespace App\Http\Controllers;

use App\Http\Requests\Employee\StoreRequest;
use App\Http\Requests\Employee\UpdateRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class EmployeeController extends Controller
{
    public function dropDown()
    {
        return Employee::get();
    }

    public function index()
    {
        return Employee::paginate(request("per_page") ?? 100);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->filled("profile_picture")) {
            $data['profile_picture'] = $this->processImage("employees");
        }

        if ($request->filled("password")) {
            $data['password'] = Hash::make($data['password']);
        }

        return Employee::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return $employee;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Employee $employee)
    {
        $data = $request->validated();

        if ($request->filled("profile_picture")) {
            $data['profile_picture'] = $this->processImage("employees");
        }

        // if ($request->filled("password")) {
        // }

        $data['password'] = Hash::make($data['password']);


        $employee->update($data);

        return $employee;
    }

    public function employeeUpdate(UpdateRequest $request, $id)
    {
        $data = $request->validated();

        if ($request->filled("profile_picture")) {
            $data['profile_picture'] = $this->processImage("employees");
        }

        if ($request->filled("password")) {
            $data['password'] = Hash::make($data['password']);
        }

        return Employee::where("id", $id)->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->noContent();
    }

    public function login(Request $request)
    {
        $user = Employee::where('phone', $request->number)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        return [
            'token' => $user->createToken('myApp')->plainTextToken,
            'user' => $user,
        ];
    }

    public function me()
    {
        return ['user' => Auth::guard("employee")->user()];
    }

    public function logout(Request $request)
    {
        Auth::guard('employee')->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
