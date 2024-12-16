<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    // UC 22.1. Quản lý danh sách
    public function index()
    {
        $brands = Brand::where('status', '!=', 0)
            ->orderBy('sort_order', 'ASC')
            ->select("id", "name", "slug", "image", "status", "description")
            ->get();

        // Cập nhật đường dẫn đầy đủ của hình ảnh
        foreach ($brands as $Brand) {
            $Brand->image_url = url('images/brand/' . $Brand->image);
        }

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'brands' => $brands
        ];

        return response()->json($result);
    }

    // UC 22.2. Quản lý thùng rác
    public function trash()
    {
        $brands = Brand::where('status', '=', 0)
            ->orderBy('sort_order', 'ASC')
            ->select("id", "name", "slug", "image", "status", "description")
            ->get();

        foreach ($brands as $Brand) {
            $Brand->image = asset('images/brand/' . $Brand->image);
        }

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'brands' => $brands
        ];

        return response()->json($result);
    }

    // UC 22.3. Chi tiết
    public function show($id)
    {
        // Try to find the brand by ID
        $Brand = Brand::find($id);

        // If the brand is not found, return a failure response
        if ($Brand == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu', // Data not found
                'Brand' => null
            ];
        } else {
            // If the brand is found, update the image URL with full path
            $Brand->image = asset('images/brand/' . $Brand->image);

            // Return success response with the brand's details
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công', // Data loaded successfully
                'Brand' => $Brand
            ];
        }

        // Return the response as JSON
        return response()->json($result);
    }


    // UC 22.4. Thêm
    public function store(Request $request)
    {
        $Brand = new Brand();
        $Brand->name = $request->name;
        $Brand->slug = $request->slug;

        // Upload file
        $exten = $request->image->extension();
        $imageName = date('YmdHis') . "." . $exten;
        $request->image->move(public_path('images/brand'), $imageName);
        $Brand->image = $imageName;

        $Brand->description = $request->description;
        $Brand->sort_order = $request->sort_order;
        $Brand->created_by = 1;
        $Brand->created_at = date('Y-m-d H:i:s');
        $Brand->status = $request->status;

        if ($Brand->save()) {
            $result = [
                'status' => true,
                'message' => 'Thêm thành công',
                'Brand' => $Brand
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thêm',
                'Brand' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.5. Cập nhật
    public function update(Request $request, $id)
    {
        $Brand = Brand::find($id);
        if ($Brand == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'Brand' => null
            ];
            return response()->json($result);
        }

        $Brand->name = $request->name;
        $Brand->slug = $request->slug;

        // Upload file
        if ($request->image) {
            $exten = $request->image->extension();
            $imageName = date('YmdHis') . "." . $exten;
            $request->image->move(public_path('images/brand'), $imageName);
            $Brand->image = $imageName;
        }

        $Brand->description = $request->description;
        $Brand->sort_order = $request->sort_order;
        $Brand->updated_by = 1;
        $Brand->updated_at = date('Y-m-d H:i:s');
        $Brand->status = $request->status;

        if ($Brand->save()) {
            $result = [
                'status' => true,
                'message' => 'Cập nhật thành công',
                'Brand' => $Brand
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể cập nhật',
                'Brand' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.6. Thay đổi trạng thái
    public function status($id)
    {
        $Brand = Brand::find($id);
        if ($Brand == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'Brand' => null
            ];
            return response()->json($result);
        }

        $Brand->status = ($Brand->status == 1) ? 2 : 1;
        $Brand->updated_by = 1;
        $Brand->updated_at = date('Y-m-d H:i:s');

        if ($Brand->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'Brand' => $Brand
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'Brand' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.7. Xóa vào thùng rác
    public function delete($id)
    {
        $Brand = Brand::find($id);
        if ($Brand == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'Brand' => null
            ];
            return response()->json($result);
        }

        $Brand->status = 0;
        $Brand->updated_by = 1;
        $Brand->updated_at = date('Y-m-d H:i:s');

        if ($Brand->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'Brand' => $Brand
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'Brand' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.8. Khôi phục trạng thái rác
    public function restore($id)
    {
        $Brand = Brand::find($id);
        if ($Brand == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'Brand' => null
            ];
            return response()->json($result);
        }

        $Brand->status = 2;
        $Brand->updated_by = 1;
        $Brand->updated_at = date('Y-m-d H:i:s');

        if ($Brand->save()) {
            $result = [
                'status' => true,
                'message' => 'Khôi phục thành công',
                'Brand' => $Brand
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể khôi phục',
                'Brand' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.9. Xóa khỏi CSDL
    public function destroy($id)
    {
        $Brand = Brand::find($id);
        if ($Brand == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'Brand' => null
            ];
            return response()->json($result);
        }

        if ($Brand->delete()) {
            $result = [
                'status' => true,
                'message' => 'Xóa thành công',
                'Brand' => $Brand
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể xóa',
                'Brand' => null
            ];
        }

        return response()->json($result);
    }
}