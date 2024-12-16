<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStore extends Model
{
    use HasFactory;

    protected $table = 'product_store';

    protected $fillable = [
        'product_id',
        'type',
        'price',
        'qty',
        'status',
        'updated_by',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id'); // Thay 'product_id' bằng tên cột khóa ngoại thực tế
    }
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {
            $product->images()->delete(); // Xóa tất cả hình ảnh liên quan khi sản phẩm bị xóa
        });
    }
}