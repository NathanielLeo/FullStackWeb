<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $table = 'brand';
    protected $fillable = [
        'name', 'slug', 'image', 'description', 'sort_order', 'created_by', 'updated_by','created_at','updated_at', 'status'
    ];
}