<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductStoreController;
use App\Http\Controllers\ProductImageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('config_web',[ConfigController::class,'config_web']);
Route::get('menu_list/{position}/{parentid?}/{limit?}',[MenuController::class,'menu_list']);
Route::get('slider_list/{position}/{limit?}',[BannerController::class,'slider_list']);
Route::get('product_new/{limit}',[ProductController::class,'product_new']);
Route::get('product_sale/{limit}',[ProductController::class,'product_sale']);
Route::get('product_bestseller/{limit}',[ProductController::class,'product_bestseller']);
Route::get('category_list/{parentid?}',[CategoryController::class,'category_list']);
Route::get('product_category/categoryid/{limit}',[ProductController::class,'product_category']);
Route::get('post_new/{limit}',[PostController::class,'post_new']);
Route::get('post_page/{slug}',[PostController::class,'post_page']);
Route::get('product_all/{categoryid}/{limit}',[ProductController::class,'product_all']);
Route::get('product_detail/{slug}/{limit}',[ProductController::class,'product_detail']);
Route::get('post_detail/{slug}/{limit}',[PostController::class,'post_detail']);
Route::post('contact/store',[ContactController::class,'store']);
Route::post('customer/register',[UserController::class, 'customer_register']);
Route::get('customer/login',[UserController::class, 'customer_login']);
Route::get('customer/profile/{id}',[UserController::class, 'customer_profile']);
Route::get('customer/cart/{id}',[UserController::class, 'customer_cart']);
Route::get('customer/checkout/{id}',[UserController::class, 'customer_checkout']);

Route::get('login',[UserController::class, 'login']);
Route::post('login', [UserController::class, 'postLogin']);
Route::get('admin/register', [UserController::class, 'getRegister']);
Route::post('admin/register', [UserController::class, 'postRegister']);
Route::get('admin/forget',[UserController::class, 'getforget']);
Route::post('admin/forget',[UserController::class, 'postforget']);

Route::prefix('config')->group(function () {
    Route::get('/', [ConfigController::class, 'index']);
    Route::get('/trash', [ConfigController::class, 'trash']);
    Route::get('/show/{id}', [ConfigController::class, 'show']);
    Route::post('/store', [ConfigController::class, 'store']);
    Route::put('/update/{id}', [ConfigController::class, 'update']);
    Route::patch('/status/{id}', [ConfigController::class, 'status']);
    Route::delete('/delete/{id}', [ConfigController::class, 'delete']);
    Route::patch('/restore/{id}', [ConfigController::class, 'restore']);
    Route::delete('/{id}', [ConfigController::class, 'destroy']);
});

// Route::prefix('banner')->group(function(){
// 	Route::get('/',[BannerController::class, 'index']);
// 	Route::get('/trash',[BannerController::class, 'trash']);
// 	Route::get('/show/{id}',[BannerController::class, 'show']);
//     Route::post('/store',[BannerController::class, 'store']);
// 	Route::post('/update/{id}',[BannerController::class, 'update']);
//     Route::get('/status/{id}',[BannerController::class, 'status']);
//     Route::get('/delete/{id}',[BannerController::class, 'delete']);
//     Route::get('/restore/{id}',[BannerController::class, 'restore']);
// 	Route::delete('/destroy/{id}',[BannerController::class, 'destroy']);
// });
Route::prefix('banner')->group(function () {
    Route::get('/', [BannerController::class, 'index']); // Lấy tất cả banners
    Route::get('/trash', [BannerController::class, 'trash']); // Lấy tất cả banners đã xóa
    Route::get('/show/{id}', [BannerController::class, 'show']); // Hiển thị chi tiết banner theo ID
    Route::post('/store', [BannerController::class, 'store']); // Thêm mới banner
    Route::put('/update/{id}', [BannerController::class, 'update']); // Cập nhật banner
    Route::patch('/status/{id}', [BannerController::class, 'status']); // Thay đổi trạng thái
    Route::delete('/delete/{id}', [BannerController::class, 'delete']); // Xóa tạm thời banner
    Route::patch('/restore/{id}', [BannerController::class, 'restore']); // Khôi phục banner
    Route::delete('/{id}', [BannerController::class, 'destroy']); // Xóa hoàn toàn banner
});
Route::prefix('brand')->group(function(){
	Route::get('/',[BrandController::class, 'index']);
	Route::get('/trash',[BrandController::class, 'trash']);
	Route::get('/show/{id}',[BrandController::class, 'show']);
    Route::post('/store',[BrandController::class, 'store']);
	Route::post('/update/{id}',[BrandController::class, 'update']);
    Route::get('/status/{id}',[BrandController::class, 'status']);
    Route::get('/delete/{id}',[BrandController::class, 'delete']);
    Route::get('/restore/{id}',[BrandController::class, 'restore']);
	Route::delete('/destroy/{id}',[BrandController::class, 'destroy']);
});
Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/trash', [CategoryController::class, 'trash']);
    Route::get('/show/{id}', [CategoryController::class, 'show']);
    Route::post('/store', [CategoryController::class, 'store']);
    Route::post('/update/{id}', [CategoryController::class, 'update']);
    Route::get('/status/{id}', [CategoryController::class, 'status']);
    Route::get('/delete/{id}', [CategoryController::class, 'delete']);
    Route::get('/restore/{id}', [CategoryController::class, 'restore']);
    Route::delete('/destroy/{id}', [CategoryController::class, 'destroy']);
});
Route::prefix('menu')->group(function(){
	Route::get('/',[MenuController::class, 'index']);
	Route::get('/trash',[MenuController::class, 'trash']);
	Route::get('/show/{id}',[MenuController::class, 'show']);
    Route::post('/store',[MenuController::class, 'store']);
	Route::post('/update/{id}',[MenuController::class, 'update']);
    Route::get('/status/{id}',[MenuController::class, 'status']);
    Route::get('/delete/{id}',[MenuController::class, 'delete']);
    Route::get('/restore/{id}',[MenuController::class, 'restore']);
	Route::delete('/destroy/{id}',[MenuController::class, 'destroy']);
});
Route::prefix('contact')->group(function(){
	Route::get('/',[ContactController::class, 'index']);
	Route::get('/trash',[ContactController::class, 'trash']);
	Route::get('/show/{id}',[ContactController::class, 'show']);
    Route::post('/reply/{id}',[ContactController::class, 'reply']);
    Route::get('/status/{id}',[ContactController::class, 'status']);
    Route::get('/delete/{id}',[ContactController::class, 'delete']);
    Route::get('/restore/{id}',[ContactController::class, 'restore']);
	Route::delete('/destroy/{id}',[ContactController::class, 'destroy']);
});
Route::prefix('post')->group(function(){
	Route::get('/',[PostController::class, 'index']);
	Route::get('/trash',[PostController::class, 'trash']);
	Route::get('/show/{id}',[PostController::class, 'show']);
    Route::post('/store',[PostController::class, 'store']);
	Route::post('/update/{id}',[PostController::class, 'update']);
    Route::get('/status/{id}',[PostController::class, 'status']);
    Route::get('/delete/{id}',[PostController::class, 'delete']);
    Route::get('/restore/{id}',[PostController::class, 'restore']);
	Route::delete('/destroy/{id}',[PostController::class, 'destroy']);
});
Route::prefix('topic')->group(function(){
	Route::get('/',[TopicController::class, 'index']);
	Route::get('/trash',[TopicController::class, 'trash']);
	Route::get('/show/{id}',[TopicController::class, 'show']);
    Route::post('/store',[TopicController::class, 'store']);
	Route::post('/update/{id}',[TopicController::class, 'update']);
    Route::get('/status/{id}',[TopicController::class, 'status']);
    Route::get('/delete/{id}',[TopicController::class, 'delete']);
    Route::get('/restore/{id}',[TopicController::class, 'restore']);
	Route::delete('/destroy/{id}',[TopicController::class, 'destroy']);
});
Route::prefix('user')->group(function(){
	Route::get('/',[UserController::class, 'index']);
	Route::get('/trash',[UserController::class, 'trash']);
	Route::get('/show/{id}',[UserController::class, 'show']);
    Route::post('/store',[UserController::class, 'store']);
	Route::post('/update/{id}',[UserController::class, 'update']);
    Route::get('/status/{id}',[UserController::class, 'status']);
    Route::get('/delete/{id}',[UserController::class, 'delete']);
    Route::get('/restore/{id}',[UserController::class, 'restore']);
	Route::delete('/destroy/{id}',[UserController::class, 'destroy']);
});
Route::prefix('order')->group(function(){
	Route::get('/',[OrderController::class, 'index']);
	Route::get('/trash',[OrderController::class, 'trash']);
	Route::get('/show/{id}',[OrderController::class, 'show']);
    Route::get('/status/{id}',[OrderController::class, 'status']);
	Route::delete('/destroy/{id}',[OrderController::class, 'destroy']);
});
Route::prefix('product')->group(function(){
	Route::get('/',[ProductController::class, 'index']);
	Route::get('/trash',[ProductController::class, 'trash']);
	Route::get('/show/{id}',[ProductController::class, 'show']);
    Route::post('/store',[ProductController::class, 'store']);
	Route::put('/update/{id}',[ProductController::class, 'update']);
    Route::get('/status/{id}',[ProductController::class, 'status']);
    Route::get('/delete/{id}',[ProductController::class, 'delete']);
    Route::get('/restore/{id}',[ProductController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductController::class, 'destroy']);
});
Route::prefix('productsale')->group(function(){
	Route::get('/',[ProductSaleController::class, 'index']);
	Route::get('/trash',[ProductSaleController::class, 'trash']);
	Route::get('/show/{id}',[ProductSaleController::class, 'show']);
    Route::post('/store',[ProductSaleController::class, 'store']);
	Route::put('/update/{id}',[ProductSaleController::class, 'update']);
    Route::get('/status/{id}',[ProductSaleController::class, 'status']);
    Route::get('/delete/{id}',[ProductSaleController::class, 'delete']);
    Route::get('/restore/{id}',[ProductSaleController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductSaleController::class, 'destroy']);
});
Route::prefix('productstore')->group(function(){
	Route::get('/',[ProductStoreController::class, 'index']);
	Route::get('/trash',[ProductStoreController::class, 'trash']);
	Route::get('/show/{id}',[ProductStoreController::class, 'show']);
    Route::post('/store',[ProductStoreController::class, 'store']);
	Route::post('/update/{id}',[ProductStoreController::class, 'update']);
    Route::get('/status/{id}',[ProductStoreController::class, 'status']);
    Route::get('/delete/{id}',[ProductStoreController::class, 'delete']);
    Route::get('/restore/{id}',[ProductStoreController::class, 'restore']);
	Route::delete('/destroy/{id}',[ProductStoreController::class, 'destroy']);
});
Route::prefix('productimage')->group(function () {
    Route::get('/', [ProductImageController::class, 'index']);
    Route::get('/show/{id}', [ProductImageController::class, 'show']);
    Route::post('/store', [ProductImageController::class, 'store']);
    Route::post('/update/{id}', [ProductImageController::class, 'update']);
    Route::delete('/destroy/{id}', [ProductImageController::class, 'destroy']);
});