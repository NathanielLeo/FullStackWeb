<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Đảm bảo đã tạo model cho bảng này

class UserController extends Controller
{
    public function login()
    {
        return response()->json([
            'status' => true,
            'message' => 'Trang đăng nhập được tải thành công'
        ]);
    }

    // Xử lý đăng nhập
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Tìm người dùng dựa trên email
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy người dùng với email này'
            ], 404);
        }

        if ($user->password === $credentials['password']) {
            // Đăng nhập thành công
            return response()->json([
                'status' => true,
                'message' => 'Đăng nhập thành công',
                'user' => $user
            ]);
        } else {
            // Mật khẩu không đúng
            return response()->json([
                'status' => false,
                'message' => 'Email hoặc mật khẩu không đúng'
            ], 401);
        }
    }


    // UC 22.1. Quản lý danh sách người dùng
    public function index()
    {
        // Chỉnh sửa để chỉ chọn các cột cần thiết
        $users = User::where('status', '!=', 0)
        ->select("id", "name", "password", "fullname", "gender", "thumbnail", "email", "phone", "address", "roles", "created_by", "updated_by", "created_at", "updated_at", "status")
        ->get();

        foreach ($users as $user) {
            $user->image_url = url('images/user/' . $user->thumbnail);
        }

        $result =  [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'users' => $users
        ];


        return response()->json($result);
    }

    // UC 22.2. Quản lý thùng rác
    public function trash()
    {
        // Chỉ chọn các cột cần thiết khi lấy dữ liệu từ thùng rác
        $users = User::where('status', '=', 0)
            ->select("id", "name", "fullname","password", "gender", "thumbnail", "email", "phone", "address", "roles", "created_by", "updated_by", "created_at", "updated_at", "status")
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'users' => $users
        ];

        return response()->json($result);
    }

    // UC 22.3. Chi tiết người dùng
    public function show($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'user' => null
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'user' => $user
            ];
        }

        return response()->json($result);
    }

    // UC 22.4. Thêm người dùng mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'fullname' => 'required|string',
            'password' => 'required|string',
            'gender' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'roles' => 'required|string',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'required|integer'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->fullname = $request->fullname;
        // $user->password = bcrypt($request->password); // Mã hóa mật khẩu
        $user->password = $request->password; // Không mã hóa mật khẩu để test
        $user->gender = $request->gender;
        $user->thumbnail = $request->thumbnail;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->roles = $request->roles;
        $user->created_by = $request->created_by;
        $user->updated_by = $request->updated_by;
        $user->status = $request->status;

        if ($user->save()) {
            $result = [
                'status' => true,
                'message' => 'Thêm người dùng thành công',
                'user' => $user
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thêm người dùng',
                'user' => null
            ];
        }

        return response()->json($result);
    }

    // UC 22.5. Cập nhật người dùng
public function update(Request $request, $id)
{
    // Validate input data
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'fullname' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $id,
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
        'roles' => 'required|string|max:255',
        'status' => 'required|in:0,1', // 0 for inactive, 1 for active
        'password' => 'nullable|string|min:6', // Password can be optional
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Dữ liệu không hợp lệ.',
            'errors' => $validator->errors()
        ], 400);
    }

    // Find user by ID
    $user = User::find($id);
    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'Không tìm thấy người dùng.',
            'user' => null
        ], 404);
    }

    // Update user fields
    $user->name = $request->name;
    $user->fullname = $request->fullname;

    // Update password if provided and hash it
    if ($request->filled('password')) {
        $user->password = Hash::make($request->password); // Ensure password is hashed
    }

    $user->gender = $request->gender;
    $user->thumbnail = $request->thumbnail; // Make sure this is a file or a URL path to an image
    $user->email = $request->email;
    $user->phone = $request->phone;
    $user->address = $request->address;
    $user->roles = $request->roles;
    $user->created_by = $user->created_by; // Assuming this doesn't change
    $user->updated_by = $request->updated_by; // The ID of the user performing the update
    $user->status = $request->status;

    // Save updated user
    if ($user->save()) {
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật người dùng thành công.',
            'user' => $user
        ], 200);
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Không thể cập nhật người dùng.',
            'user' => null
        ], 500);
    }
}

    // UC 22.6. Thay đổi trạng thái người dùng
    public function status($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        $user->status = ($user->status == 1) ? 2 : 1;

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi trạng thái thành công',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thay đổi trạng thái',
                'user' => null
            ]);
        }
    }

    // UC 22.7. Xóa vào thùng rác
    public function delete($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        $user->status = 0; // Đưa vào thùng rác
        $user->updated_at = now();

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi trạng thái thành công',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thay đổi trạng thái',
                'user' => null
            ]);
        }
    }

    // UC 22.8. Khôi phục người dùng
    public function restore($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        $user->status = 2;

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Khôi phục thành công',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể khôi phục',
                'user' => null
            ]);
        }
    }

    // UC 22.9. Xóa khỏi CSDL
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        if ($user->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa người dùng thành công',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa người dùng',
                'user' => null
            ]);
        }
    }
}