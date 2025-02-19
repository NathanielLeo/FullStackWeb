<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orderdetail extends Model
{
    use HasFactory;
    protected $table = 'orderdetail';
     public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}