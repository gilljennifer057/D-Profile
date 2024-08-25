<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getNameAttribute($value)
    {
        return asset("videos/" . $value);
    }

    public function getThumbnailAttribute($value)
    {
        return asset("thumbnails/" . $value);
    }

}
