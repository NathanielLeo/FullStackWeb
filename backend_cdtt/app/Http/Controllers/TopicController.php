<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Topic; // Đảm bảo đã tạo model cho bảng này

class TopicController extends Controller
{
    // UC 22.1. Quản lý danh sách chủ đề
    public function index()
    {
        // Chỉnh sửa để chỉ chọn các cột cần thiết
        $topics = Topic::where('status', '!=', 0)
            ->select("id", "name", "slug", "sort_order", "description", "created_by", "updated_by", "created_at", "updated_at", "status")
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'topics' => $topics
        ];

        return response()->json($result);
    }

    // UC 22.2. Quản lý thùng rác
    public function trash()
    {
        // Chỉ chọn các cột cần thiết khi lấy dữ liệu từ thùng rác
        $topics = Topic::where('status', '=', 0)
            ->select("id", "name", "slug", "sort_order", "description", "created_by", "updated_by", "created_at", "updated_at", "status")
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'topics' => $topics
        ];

        return response()->json($result);
    }

    // UC 22.3. Chi tiết chủ đề
    public function show($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'topic' => null
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'topic' => $topic
            ];
        }

        return response()->json($result);
    }

    // UC 22.4. Thêm chủ đề mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string',
            'sort_order' => 'nullable|integer',
            'description' => 'nullable|string',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'required|integer'
        ]);

        $topic = new Topic();
        $topic->name = $request->name;
        $topic->slug = $request->slug;
        $topic->sort_order = $request->sort_order;
        $topic->description = $request->description;
        $topic->created_by = $request->created_by;
        $topic->updated_by = $request->updated_by;
        $topic->status = $request->status;

        if ($topic->save()) {
            $result = [
                'status' => true,
                'message' => 'Thêm chủ đề thành công',
                'topic' => $topic
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thêm chủ đề',
                'topic' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.5. Cập nhật chủ đề
    public function update(Request $request, $id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'topic' => null
            ]);
        }

        $topic->name = $request->name;
        $topic->slug = $request->slug;
        $topic->sort_order = $request->sort_order;
        $topic->description = $request->description;
        $topic->created_by = $request->created_by;
        $topic->updated_by = $request->updated_by;
        $topic->status = $request->status;

        if ($topic->save()) {
            $result = [
                'status' => true,
                'message' => 'Cập nhật chủ đề thành công',
                'topic' => $topic
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể cập nhật chủ đề',
                'topic' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.6. Thay đổi trạng thái chủ đề
    public function status($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'topic' => null
            ]);
        }

        $topic->status = ($topic->status == 1) ? 2 : 1;

        if ($topic->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi trạng thái thành công',
                'topic' => $topic
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thay đổi trạng thái',
                'topic' => null
            ]);
        }
    }

    // UC 22.7. Xóa vào thùng rác
    public function delete($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'topic' => null
            ]);
        }

        $topic->status = 0; // Đưa vào thùng rác
        $topic->updated_at = now();

        if ($topic->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi trạng thái thành công',
                'topic' => $topic
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thay đổi trạng thái',
                'topic' => null
            ]);
        }
    }

    // UC 22.8. Khôi phục chủ đề
    public function restore($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'topic' => null
            ]);
        }

        $topic->status = 2;

        if ($topic->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Khôi phục thành công',
                'topic' => $topic
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể khôi phục',
                'topic' => null
            ]);
        }
    }

    // UC 22.9. Xóa khỏi CSDL
    public function destroy($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'topic' => null
            ]);
        }

        if ($topic->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa chủ đề thành công',
                'topic' => $topic
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa chủ đề',
                'topic' => null
            ]);
        }
    }
}