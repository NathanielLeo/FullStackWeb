<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ProductStore;

class ProductStoreController extends Controller
{
    // UC 22.1. Quản lý danh sách sản phẩm
    public function index()
    {
        $productstores = ProductStore::where('status', '!=', 0)
            ->with('images') // Tải kèm hình ảnh
            ->get();

        return response()->json([
            'status' => true,
            'productstores' => $productstores
        ]);
    }

    // UC 22.4. Thêm sản phẩm
    public function store(Request $request)
    {
        // Validate dữ liệu từ form
        $validatedData = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'type' => 'required|string',
            'price' => 'required|numeric|min:0',
            'qty' => 'required|integer',
            'status' => 'required|integer|in:0,1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Tạo sản phẩm mới
        $productstore = ProductStore::create($validatedData);

        // Nếu có upload hình ảnh, xử lý lưu hình ảnh
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Lưu từng hình ảnh và liên kết với sản phẩm
                $imagePath = $image->store('productimage', 'public');
                $productstore->images()->create([
                    'path' => $imagePath,
                    'product_store_id' => $productstore->id, // Thêm khóa ngoại
                ]);
            }
        }

        // Trả về kết quả phản hồi
        return response()->json([
            'status' => true,
            'message' => 'Product store created successfully',
            'productstore' => $productstore->load('images'), // Tải kèm thông tin hình ảnh
        ]);
    }

    // UC 22.3. Chi tiết sản phẩm
    public function show($id)
    {
        // Tìm product store theo ID
        $productstore = ProductStore::with('images')->find($id);

        if ($productstore == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'productstore' => null
            ]);
        }

        // Trả về chi tiết sản phẩm nếu tìm thấy
        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productstore' => $productstore
        ]);
    }

    // UC 22.5. Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        try {
            $productstore = ProductStore::findOrFail($id);
            $validatedData = $request->validate([
                'product_id' => 'required|integer|exists:products,id',
                'type' => 'required|string',
                'price' => 'required|numeric|min:0',
                'qty' => 'required|integer',
                'status' => 'required|integer|in:0,1',
            ]);

            $productstore->update($validatedData);

            // Xử lý lưu hình ảnh mới nếu có
            if ($request->hasFile('images')) {
                $productstore->images()->delete();
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('productimage', 'public');
                    $productstore->images()->create([
                        'path' => $imagePath,
                        'product_store_id' => $productstore->id,
                    ]);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Cập nhật sản phẩm thành công',
                'productstore' => $productstore->load('images'),
            ]);
        } catch (\Exception $e) {
            \Log::error('Lỗi cập nhật sản phẩm: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Có lỗi xảy ra khi cập nhật sản phẩm.'], 500);
        }
    }

    // Các phương thức khác như trash, delete, restore, destroy giữ nguyên
}