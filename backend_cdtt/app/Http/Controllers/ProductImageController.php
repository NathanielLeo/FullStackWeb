<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductImage;

class ProductImageController extends Controller
{
    // GET: Get all product images
    public function index()
    {
        try {
            $productImages = ProductImage::orderBy('id', 'ASC')
                ->select("id", "product_id", "thumbnail")
                ->get();

            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'product_images' => $productImages
            ];

            return response()->json($result);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    // GET: Get product image by ID
    public function show($id)
    {
        try {
            $productImage = ProductImage::select("id", "product_id", "thumbnail")->find($id);
            if (!$productImage) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy hình ảnh',
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'product_image' => $productImage,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    // POST: Store a new product image
    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|integer|exists:products,id', // Kiểm tra ID sản phẩm có tồn tại
                'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $productImage = new ProductImage();
            $productImage->product_id = $request->product_id; // Gán ID sản phẩm

            // Upload file thumbnail
            $exten = $request->thumbnail->extension();
            $imageName = date('YmdHis') . "." . $exten;
            $request->thumbnail->move(public_path('images/productimage'), $imageName);
            $productImage->thumbnail = $imageName;

            $productImage->save();

            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'product_image' => $productImage
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm: ' . $e->getMessage()
            ], 500);
        }
    }

    // PUT: Update a product image
    public function update(Request $request, $id)
    {
        try {
            $productImage = ProductImage::find($id);
            if (!$productImage) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy thông tin'
                ], 404);
            }

            // Gán ID sản phẩm từ request nếu có
            if ($request->has('product_id')) {
                $productImage->product_id = $request->product_id; // Gán ID sản phẩm mới nếu có
            }

            // Upload file thumbnail nếu có
            if ($request->hasFile('thumbnail')) {
                $exten = $request->thumbnail->extension();
                $imageName = date('YmdHis') . "." . $exten;
                $request->thumbnail->move(public_path('images/productimage'), $imageName);
                $productImage->thumbnail = $imageName;
            }

            $productImage->save();

            return response()->json([
                'status' => true,
                'message' => 'Cập nhật thành công',
                'product_image' => $productImage
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không thể cập nhật: ' . $e->getMessage()
            ], 500);
        }
    }

    // DELETE: Delete a product image
    public function destroy($id)
    {
        try {
            $productImage = ProductImage::find($id);
            if (!$productImage) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy thông tin'
                ], 404);
            }

            $productImage->delete();

            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa: ' . $e->getMessage()
            ], 500);
        }
    }
}