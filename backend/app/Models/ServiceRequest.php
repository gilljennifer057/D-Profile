<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    const PENDING = 0;
    const APPROVE = 1;
    const REJECT = 2;
    const CANCELLED = 3;

    use HasFactory;

    protected $guarded = [];

    public function client()
    {
        return $this->belongsTo(User::class, "client_id");
    }

    public function partner()
    {
        return $this->belongsTo(User::class, "partner_id");
    }
}
