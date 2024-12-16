<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Category extends Model
{
    use HasFactory;
    protected $table = 'category';
    protected $fillable = [
        'name', 'slug', 'parent_id', 'sort_order', 'image', 'description', 'created_by', 'updated_by','created_at','updated_at', 'status'
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'product_id', 'id');
    }
}
