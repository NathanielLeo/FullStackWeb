<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\productSale;
use App\Models\ProductStore;

class ProductImage extends Model
{
    use HasFactory;
    protected $table = 'product_image';
    protected $fillable = [
        'product_id', 'path',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productsale()
    {
        return $this->belongsTo(ProductSale::class, 'product_sale_id');
    }

    public function productstore()
    {
        return $this->belongsTo(ProductStore::class, 'product_store_id');
    }

    public function getThumbnailAttribute($value)
    {
        return asset('images/productimage/' . $value); // Tạo đường dẫn URL đầy đủ cho hình ảnh
    }
}