<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\LogEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Attendance::query();

        $query->whereHas("employee");

        $query->with("employee");

        $query->filter(request('start_date') ?? date("Y-m-d"), request('end_date') ?? date("Y-m-d"));

        if (request("employee_ids") && count(request("employee_ids")) > 0) {
            $query->whereIn("employee_id", request("employee_ids") ?? []);
        }

        $query->with(["employee", "in_log", "out_log"]);

        return $query->paginate(request("per_page") ?? 10);
    }

    public function store()
    {
        $dates = request("dates");
        $attendanceRecords = [];

        foreach ($dates as $date) {
            $logs = LogEntry::whereDate('dateTime', $date)
                ->where("is_rendered", 0)
                ->with('employee')
                ->orderBy("dateTime")
                ->get()
                ->groupBy("employee_id");

            foreach ($logs as $employeeId => $log) {
                $firstLog = $log->first();
                $lastLog = $log->last();

                if ($firstLog && $lastLog) {
                    $inDateTime = Carbon::parse($firstLog->dateTime);
                    $outDateTime = Carbon::parse($lastLog->dateTime);

                    $diff = $inDateTime->diff($outDateTime);
                    $totalHours = sprintf("%02d", $diff->h);
                    $totalMinutes = sprintf("%02d", $diff->i);

                    $attendanceRecords[] = [
                        "date" => $date,
                        "in_id" => $firstLog->id,
                        "out_id" => $lastLog->id,
                        "employee_id" => $employeeId,
                        "total_hours" => "{$totalHours}:{$totalMinutes}",
                    ];
                }
            }
            if (count($attendanceRecords) == 0) {
                return response()->json(["status" => false, "message" => "No record found"]);
            }

            $employeeIds = array_column($attendanceRecords, "employee_id");

            $model = Attendance::query();
            $model->whereIn("employee_id", $employeeIds);
            $model->whereDate("date", $date);
            $model->delete();
            $model->insert($attendanceRecords);

            $ids  = implode(",", $employeeIds);

            LogEntry::whereDate("dateTime", $date)
                ->whereIn("employee_id", $employeeIds)
                ->update(["is_rendered" => 1]);


            return response()->json(["status" => true, "message" => "Date has need processed for these ids ($ids)"]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
