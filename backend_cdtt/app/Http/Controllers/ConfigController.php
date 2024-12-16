<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Config;

class ConfigController extends Controller
{
    // GET: Get all Categories
    public function index()
    {
        $configs = Config::where('status', '!=', 0)->get();
        return response()->json([
            'status' => true,
            'configs' => $configs
        ]);
    }

    // POST: Create a new Config
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'site_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phones' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'hotline' => 'nullable|string|max:255',
            'zalo' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'status' => 'required|integer|in:0,1',
        ]);

        $Config = Config::create($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Config created successfully',
            'Config' => $Config
        ]);
    }

    // GET: Get a specific Config by ID
    public function show($id)
    {
        // Find the configuration by its ID. If not found, throw a 404 error
        $Config = Config::find($id);

        // Check if the configuration exists
        if ($Config) {
            return response()->json([
                'status' => true,
                'message' => 'Tải dữ liệu thành công.',
                'Config' => $Config
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy config với ID này.'
            ]);
        }
    }


    // POST: Update a Config by ID
    public function update(Request $request, $id)
    {
        $Config = Config::findOrFail($id);
        $validatedData = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phones' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'hotline' => 'nullable|string|max:255',
            'zalo' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'status' => 'nullable|integer|in:0,1',
        ]);

        $Config->update($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Config updated successfully',
            'Config' => $Config
        ]);
    }

    // GET: Change the status of a Config
    public function changeStatus($id)
    {
        $Config = Config::findOrFail($id);
        $Config->status = $Config->status == 1 ? 0 : 1;
        $Config->save();

        return response()->json([
            'status' => true,
            'message' => 'Config status updated',
            'Config' => $Config
        ]);
    }

    // GET: Soft delete a Config (move to trash)
    public function delete($id)
    {
        $Config = Config::findOrFail($id);
        $Config->status = 0; // Assuming status '0' means deleted
        $Config->save();

        return response()->json([
            'status' => true,
            'message' => 'Config moved to trash'
        ]);
    }

    // GET: Restore a deleted Config
    public function restore($id)
    {
        $Config = Config::withTrashed()->findOrFail($id);
        $Config->restore();

        return response()->json([
            'status' => true,
            'message' => 'Config restored successfully'
        ]);
    }

    // DELETE: Permanently delete a Config
    public function destroy($id)
    {
        $Config = Config::find($id);

        if ($Config == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'Config' => null
            ]);
        }

        if ($Config->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'Config' => $Config
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'Config' => null
            ]);
        }
    }

    // GET: Get all Categories in the trash
    public function trash()
    {
        $configs = Config::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'configs' => $configs
        ]);
    }
}