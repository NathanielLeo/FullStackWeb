<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Brand;
use App\Models\ProductSale;
use App\Models\Order;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';

    protected $fillable = [
        'name', 'category_id', 'brand_id', 'price', 'description', 'slug', 'detail', 'status',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function productsale()
    {
        return $this->belongsTo(ProductSale::class, 'productsale_id', 'id');
    }
        public function order()
        {
            return $this->belongsTo(Order::class, 'order_id', 'id');
        }

    // Sử dụng Cascade Delete để xóa hình ảnh khi sản phẩm bị xóa
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {
            $product->images()->delete(); // Xóa tất cả hình ảnh liên quan khi sản phẩm bị xóa
        });
    }
}