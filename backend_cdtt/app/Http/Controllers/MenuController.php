<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Menu;

class MenuController extends Controller
{
    // GET: Get all Menus
    public function index()
    {
        $menus = Menu::where('status', '!=', 0)->get();
        return response()->json([
            'status' => true,
            'menus' => $menus
        ]);
    }

    // POST: Create a new Menu
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'table_id' => 'nullable|integer',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'required|integer|in:0,1',
        ]);

        $menu = Menu::create($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Menu created successfully',
            'menu' => $menu
        ]);
    }

    // GET: Get a specific Menu by ID
    public function show($id)
    {
        $menu = Menu::findOrFail($id);
        return response()->json([
            'status' => true,
            'menu' => $menu
        ]);
    }

    // POST: Update a Menu by ID
public function update(Request $request, $id)
{
    // Find the menu by ID, throw an exception if not found
    $menu = Menu::findOrFail($id);

    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'nullable|string|max:255',
        'link' => 'nullable|string|max:255',
        'type' => 'nullable|string|max:255',
        'table_id' => 'nullable|integer',
        'status' => 'nullable|integer|in:0,1', // Only 0 or 1 (Active/Inactive)
    ]);

    // Assign the authenticated user as the updater (assuming you're using Laravel's Auth system)
    $validatedData['updated_by'] = auth()->id(); // Automatically assign the current user

    // Update the menu with the validated data
    $menu->update($validatedData);

    // Return a response confirming the update
    return response()->json([
        'status' => true,
        'message' => 'Menu updated successfully',
        'menu' => $menu
    ]);
}


    // GET: Change the status of a Menu
    public function changeStatus($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->status = $menu->status == 1 ? 0 : 1;
        $menu->save();

        return response()->json([
            'status' => true,
            'message' => 'Menu status updated',
            'menu' => $menu
        ]);
    }

    // GET: Soft delete a Menu (move to trash)
    public function delete($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->status = 0; // Assuming status '0' means deleted
        $menu->save();

        return response()->json([
            'status' => true,
            'message' => 'Menu moved to trash'
        ]);
    }

    // GET: Restore a deleted Menu
    public function restore($id)
    {
        $menu = Menu::withTrashed()->findOrFail($id);
        $menu->restore();

        return response()->json([
            'status' => true,
            'message' => 'Menu restored successfully'
        ]);
    }

    // DELETE: Permanently delete a Menu
    public function destroy($id)
    {
        $menu = Menu::find($id);

        if ($menu == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'menu' => null
            ]);
        }

        if ($menu->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'menu' => $menu
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'menu' => null
            ]);
        }
    }

    // GET: Get all Menus in the trash
    public function trash()
    {
        $menus = Menu::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'menus' => $menus
        ]);
    }
}