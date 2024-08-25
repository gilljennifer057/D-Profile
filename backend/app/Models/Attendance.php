<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        "formattedDateTime"
    ];

    public function getFormattedDateTimeAttribute()
    {
        return date("d M Y", strtotime($this->date));
    }



    /**
     * Get the Employee that owns the Attendance
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function in_log()
    {
        return $this->belongsTo(LogEntry::class, "in_id");
    }

    public function out_log()
    {
        return $this->belongsTo(LogEntry::class, "out_id");
    }

    public function scopeFilter($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }
}
