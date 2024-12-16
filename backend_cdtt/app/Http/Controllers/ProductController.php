<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // GET: Get all products
    public function index()
    {
        $products = Product::where('status', '!=', 0)
        ->with('images')
        ->get();
        return response()->json([
            'status' => true,
            'products' => $products]);
    }

    // POST: Create a new product
    public function store(Request $request)
    {
        // Validate dữ liệu từ form
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'brand_id' => 'required|integer|exists:brands,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'slug' => 'required|string|max:255|unique:product,slug', // Đảm bảo slug là duy nhất
            'detail' => 'nullable|string',
            'status' => 'required|integer|in:0,1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Xác thực hình ảnh
        ]);

        // Tạo sản phẩm mới
        $product = Product::create($validatedData);

        // Nếu có upload hình ảnh, xử lý lưu hình ảnh
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Lưu từng hình ảnh và liên kết với sản phẩm
                $imagePath = $image->store('productimage', 'public');
                $product->images()->create([
                    'path' => $imagePath,
                ]);
            }
        }

        // Trả về kết quả phản hồi
         return response()->json([
            'status' => true,
            'message' => 'Product created successfully',
            'product' => $product->load('images', 'category', 'brand'), // Tải kèm thông tin hình ảnh, category, brand
        ]);
    }


    // GET: Get a specific product by ID
    public function show($id)
    {
        // Tìm product theo ID
        $product = Product::with('images')->find($id);


        // Kiểm tra nếu không tìm thấy sản phẩm
        if ($product == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy sản phẩm',
                'product' => null
            ]);
        }



        // Trả về chi tiết sản phẩm nếu tìm thấy
        return response()->json([
            'status' => true,
            'product' => $product
        ]);
    }

    // POST: Update a product by ID
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'category_id' => 'integer|exists:category,id',
            'brand_id' => 'integer|exists:brand,id',
            'price' => 'numeric|min:0',
            'status' => 'integer|in:0,1',
        ]);

        $product->update($validatedData);
        return response()->json(['status' => true, 'message' => 'Product updated successfully', 'product' => $product]);
    }

    // GET: Change the status of a product
    public function changeStatus($id)
    {
        $product = Product::findOrFail($id);
        $product->status = $product->status == 1 ? 0 : 1;
        $product->save();

        return response()->json(['status' => true, 'message' => 'Product status updated', 'product' => $product]);
    }

    // GET: Soft delete a product (move to trash)
    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->status = 0; // Assuming status '0' means deleted
        $product->save();

        return response()->json(['status' => true, 'message' => 'Product moved to trash']);
    }

    // GET: Restore a deleted product
    public function restore($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();

        return response()->json(['status' => true, 'message' => 'Product restored successfully']);
    }

    // DELETE: Permanently delete a product
    public function destroy($id)
    {
        // Tìm product theo ID
        $product = Product::find($id);

        // Kiểm tra nếu không tìm thấy product
        if ($product == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'product' => null
            ];
            return response()->json($result);
        }

        // Nếu xóa thành công
        if ($product->delete()) {
            $result = [
                'status' => true,
                'message' => 'Xóa thành công',
                'product' => $product
            ];
        } else {
            // Nếu xóa không thành công
            $result = [
                'status' => false,
                'message' => 'Không thể xóa',
                'product' => null
            ];
        }

        // Trả về kết quả JSON
        return response()->json($result);
    }

    // GET: Get all products in the trash
    public function trash()
    {
        $products = Product::onlyTrashed()->get();
        return response()->json(['status' => true, 'products' => $products]);
    }

}