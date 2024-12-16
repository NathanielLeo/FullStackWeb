<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ProductSale;

class ProductSaleController extends Controller
{
    // UC 22.1. Quản lý danh sách
    public function index()
    {
        $productsales = ProductSale::where('status', '!=', 0)
            ->with('images') // Tải kèm hình ảnh
            ->get();

        return response()->json([
            'status' => true,
            'productsales' => $productsales
        ]);
    }

    // UC 22.4. Thêm
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'price_sale' => 'required|numeric|min:0',
            'date_begin' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_begin',
            'status' => 'required|integer|in:0,1',
        ]);

        try {
            // Tạo mới sản phẩm khuyến mãi
            $productsale = ProductSale::create($validatedData);

            return response()->json([
                'status' => true,
                'message' => 'Tạo mới sản phẩm khuyến mãi thành công',
                'productsale' => $productsale,
            ], 201);
        } catch (\Exception $e) {
            // Bắt lỗi khi không thể thêm mới
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi khi tạo sản phẩm khuyến mãi: ' . $e->getMessage(),
            ], 500);
        }
    }

    // UC 22.3. Chi tiết
    public function show($id)
    {
        // Tìm product sale theo ID
        $productsale = ProductSale::with('images')->find($id);

        // Kiểm tra nếu không tìm thấy sản phẩm
        if ($productsale == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'productsale' => null
            ]);
        }

        // Trả về chi tiết sản phẩm nếu tìm thấy
        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productsale' => $productsale
        ]);
    }

    // UC 22.5. Cập nhật
    public function update(Request $request, $id)
    {
        try {
            $productsale = ProductSale::findOrFail($id);
            $validatedData = $request->validate([
                'product_id' => 'required|integer|exists:products,id',
                'price_sale' => 'required|numeric|min:0',
                'date_begin' => 'required|date',
                'date_end' => 'required|date|after_or_equal:date_begin',
                'status' => 'required|integer|in:0,1',
            ]);

            $productsale->update($validatedData);

            return response()->json([
                'status' => true,
                'message' => 'Cập nhật sản phẩm khuyến mãi thành công',
                'productsale' => $productsale->load('images'),
            ]);
        } catch (\Exception $e) {
            \Log::error('Lỗi cập nhật sản phẩm khuyến mãi: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Có lỗi xảy ra khi cập nhật sản phẩm khuyến mãi.'], 500);
        }
    }


    public function delete($id)
    {
        $productsale = ProductSale::findOrFail($id);
        $productsale->status = 0; // Assuming status '0' means deleted
        $productsale->save();

        return response()->json(['status' => true, 'message' => 'Product moved to trash']);
    }



    // Các phương thức khác (trash, delete, restore, destroy, v.v.) không thay đổi
    // ...
}