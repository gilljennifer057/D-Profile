<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogEntry extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        "formattedDateTime", "DateOnly", "TimeOnly"
    ];

    public function getDateOnlyAttribute()
    {
        return date("Y-m-d", strtotime($this->dateTime));
    }

    public function getTimeOnlyAttribute()
    {
        return date("H:ia", strtotime($this->dateTime));
    }

    public function getFormattedDateTimeAttribute()
    {
        return date("d M Y H:ia", strtotime($this->dateTime));
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function scopeFilter($query, $startDate, $endDate)
    {
        if (request("employee_ids") && count(request("employee_ids")) > 0) {
            $query->whereIn("employee_id", request("employee_ids") ?? []);
        }

        $query->whereBetween('dateTime', [$startDate, $endDate . " 23:59:59"]);

        return $query;
    }
}
