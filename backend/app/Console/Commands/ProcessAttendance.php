<?php

namespace App\Console\Commands;

use App\Http\Controllers\AttendanceController;
use App\Models\Attendance;
use App\Models\LogEntry;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ProcessAttendance extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-attendance {is_rendered?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $date = date("Y-m-d");

        $logs = LogEntry::whereDate('dateTime', $date)
            ->where("is_rendered", $this->argument("is_rendered") ?? 0)
            ->with('employee')
            ->orderBy("dateTime")
            ->get()
            ->groupBy("employee_id");

        if (count($logs) == 0) {
            $this->info("No record found");
            return;
        }

        $attendanceRecords = [];

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

        $employeeIds = array_column($attendanceRecords, "employee_id");

        $model = Attendance::query();
        $model->whereIn("employee_id", $employeeIds);
        $model->whereDate("date", $date);
        $model->delete();
        $model->insert($attendanceRecords);

        $ids  = implode(",", $employeeIds);

        LogEntry::whereDate("dateTime", $date)->whereIn("employee_id", $employeeIds)->update(["is_rendered" => 1]);

        $this->info("Date has need processed for these ids ($ids)");
    }
}
