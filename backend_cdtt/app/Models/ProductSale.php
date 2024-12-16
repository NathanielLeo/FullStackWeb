<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class ProductSale extends Model
{
    use HasFactory;
    protected $table = 'product_sale';
    protected $fillable = [
        'id','product_id', 'price_sale', 'date_begin', 'date_end','status'
    ];
    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id'); // Thay 'product_id' bằng tên cột khóa ngoại thực tế
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {
            $product->images()->delete(); // Xóa tất cả hình ảnh liên quan khi sản phẩm bị xóa
        });
    }
}