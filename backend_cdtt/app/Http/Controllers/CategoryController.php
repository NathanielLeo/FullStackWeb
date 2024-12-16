<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;


class CategoryController extends Controller
{
    // GET: Get all Categories
    public function index()
    {
        $categories = Category::where('status', '!=', 0)
            ->orderBy('sort_order', 'ASC')
            ->select("id", "name", "slug", "image", "parent_id", "sort_order", "description", "status")
            ->get();

        foreach ($categories as $category) {
            $category->image_url = url('images/category/' . $category->image);
        }

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'categories' => $categories
        ]);
    }
    // POST: Create a new Category
    public function store(StoreCategoryRequest $request)
    {
        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->parent_id = $request->parent_id;
        $category->sort_order = $request->sort_order;

        if ($request->hasFile('thumbnail')) {
            $imageName = date('YmdHis') . "." . $request->thumbnail->extension();
            $request->thumbnail->move(public_path('images/category'), $imageName);
            $category->thumbnail = $imageName;
        }

        $category->description = $request->description;
        $category->created_by = 1;
        $category->created_at = now();
        $category->status = $request->status;

        if ($category->save()) {
            $category->thumbnail_url = url('images/category/' . $category->thumbnail);
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'category' => null
            ]);
        }
    }

    // GET: Get a specific Category by ID
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json([
            'status' => true,
            'category' => $category
        ]);
    }

    // POST: Update a Category by ID
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255',
            'parent_id' => 'nullable|integer',
            'sort_order' => 'nullable|integer',
            'description' => 'nullable|string',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
            'status' => 'nullable|integer|in:0,1',
        ]);

        $category->update($validatedData);
        return response()->json([
            'status' => true,
            'message' => 'Category updated successfully',
            'category' => $category
        ]);
    }

    // GET: Change the status of a Category
    public function changeStatus($id)
    {
        $category = Category::findOrFail($id);
        $category->status = $category->status == 1 ? 0 : 1;
        $category->save();

        return response()->json([
            'status' => true,
            'message' => 'Category status updated',
            'category' => $category
        ]);
    }

    // GET: Soft delete a Category (move to trash)
    public function delete($id)
    {
        $category = Category::findOrFail($id);
        $category->status = 0; // Assuming status '0' means deleted
        $category->save();

        return response()->json([
            'status' => true,
            'message' => 'Category moved to trash'
        ]);
    }

    // GET: Restore a deleted Category
    public function restore($id)
    {
        $category = Category::withTrashed()->findOrFail($id);
        $category->restore();

        return response()->json([
            'status' => true,
            'message' => 'Category restored successfully'
        ]);
    }

    // DELETE: Permanently delete a Category
    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'category' => null
            ]);
        }

        if ($category->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'category' => null
            ]);
        }
    }

    // GET: Get all Categories in the trash
    public function trash()
    {
        $categories = Category::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'categories' => $categories
        ]);
    }
}