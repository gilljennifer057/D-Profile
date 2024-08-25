<?php

namespace App\Http\Controllers;

use App\Models\LogEntry;
use Illuminate\Http\Request;

class LogEntryController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = LogEntry::query();

        $query->whereHas("employee");

        $query->with("employee");

        $query->filter(request('start_date') ?? date("Y-m-d"), request('end_date') ?? date("Y-m-d"));

        return $query->paginate(request("per_page") ?? 10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'employee_id' => 'required|integer',
            'dateTime' => 'required|date_format:Y-m-d H:i',
        ]);

        return LogEntry::create($validatedData);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LogEntry $logEntry)
    {
        $validatedData = $request->validate([
            'employee_id' => 'required|integer',
            'dateTime' => 'required|date_format:Y-m-d H:i',
        ]);

        $logEntry->update($validatedData);

        return $logEntry;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LogEntry $logEntry)
    {
        $logEntry->delete();

        return response()->noContent();
    }
}
